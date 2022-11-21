import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Platform, BackHandler } from "react-native";
import { makeStackMongo } from "@utils/horizonAnalytics";
import moment from "moment";

import { useRoute } from "@react-navigation/core";
import { useAppSelector } from "@redux/root-reducer";
import { ScreenTypes } from "../../../interfaces";

const Register = ({ children, navigation }: ScreenTypes.screen) => {
  let route = useRoute();
  let {
    onCloseRegistrationSuccess,
    keyValidationData,
    showRegistrationSuccessModal,
    pushAnalytics,
    onRegistration,
    pp_url,
    eula_url,
  } = route?.params || {};
  const appConfigs = useAppSelector((state) => state?.appReducer?.AppConfigs);

  const registrationSuccessString = useAppSelector(
    (state) => state?.authReducer?.registrationSuccessString
  );

  const { isKeyValidationEnabled } = appConfigs || {};
  const { type } = keyValidationData || {};

  const token = useAppSelector((state) => state?.userReducer?.token);

  const [isPrivacyPolicyAccepted, updatePPAccepted] = useState(false);
  const [isEndUserLicenceAccepted, updateEULAccepted] = useState(false);
  const [showErrorModal, toggleErrorModal] = useState(false);
  const [showCountryModal, toggleCountryModal] = useState(false);
  const [showNationalityModal, toggleNationalityModal] = useState(false);
  const [showPassword, togglePassword] = useState(false);
  const [showConfirmPassword, toggleConfirmPassword] = useState(false);
  const [isDatePickerVisible, toggleDatePicker] = useState(false);
  const [showWebView, toggleWebView] = useState(false);
  const [selectedCountry, updateCountry] = useState("");
  const [selectedNationality, updateSelectedNationality] = useState("");
  const [dateOfBirth, updateDOB] = useState("");
  const [gender, updateGender] = useState("");
  const [nationality, updateNationality] = useState("");
  const [webviewURL, updateWebViewURL] = useState("");
  const [webViewTitle, updateWebViewTitle] = useState("");

  //cDM
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    //cWUM
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  // refecnces
  const phoneNumRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const confirmEmailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleBackButton = useCallback(() => {
    if (showWebView) {
      disableWebView();
      return true;
    } else {
      return false;
    }
  }, [showWebView]);

  const handleRegisterButton = () => {
    //fetching all the variable from state

    makeAnalyticsStack("Register", "click_register", "", "", "", 0, false);

    let registrationData = {};

    if (isKeyValidationEnabled === true && type === "RegisterSuccess") {
      //fetching data from state and key validation data
      registrationData = {
        email: keyValidationData?.email,
        confirmEmail: confirmEmailRef?.current?.getValue(),
        password: passRef?.current?.getValue(),
        confirm_password: confirmPasswordRef?.current?.getValue(),
        gender,
        nationality: selectedNationality,
        date_of_birth: dateOfBirth,
        firstname: firstNameRef?.current?.getValue(),
        lastname: lastNameRef?.current?.getValue(),
        mobile_phone: phoneNumRef?.current?.getValue(),
        country_of_residence: selectedCountry,
        privacyPolicyCheck: isPrivacyPolicyAccepted,
        endUserLicenseAgreementCheck: isEndUserLicenceAccepted,
        terms_acceptance: isPrivacyPolicyAccepted && isEndUserLicenceAccepted,
        key: keyValidationData?.key,
      };
    } else {
      //fetching data from state to pass in callback
      registrationData = {
        email: emailRef?.current?.getValue(),
        confirmEmail: confirmEmailRef?.current?.getValue(),
        password: passRef?.current?.getValue(),
        confirm_password: confirmPasswordRef?.current?.getValue(),
        gender,
        nationality: selectedNationality,
        date_of_birth: dateOfBirth,
        firstname: firstNameRef?.current?.getValue(),
        lastname: lastNameRef?.current?.getValue(),
        mobile_phone: phoneNumRef?.current?.getValue(),
        country_of_residence: selectedCountry,
        privacyPolicyCheck: isPrivacyPolicyAccepted,
        endUserLicenseAgreementCheck: isEndUserLicenceAccepted,
        terms_acceptance: isPrivacyPolicyAccepted && isEndUserLicenceAccepted,
        key: route?.params?.vip_key || "",
      };
    }

    //callback func
    onRegistration({ ...registrationData, token });
  };

  const handlePrivacyPolicy = useCallback(() => {
    makeAnalyticsStack("Login", "click_privay_plociy", "", "", "", 0, false);
    toggleWebView(true);
    updateWebViewURL(pp_url);
    updateWebViewTitle("Privacy Policy");
  }, [[pp_url]]);

  const handleEULA = useCallback(() => {
    makeAnalyticsStack("Login", "click_accept_terms", "", "", "", 0, true);
    toggleWebView(true);
    updateWebViewURL(eula_url);
    updateWebViewTitle("End User License Agreement");
  }, [eula_url]);

  const disableWebView = useCallback(() => toggleWebView(false), []);

  const handlePasswordToolTip = useCallback(() => {
    if (!showPassword) {
      makeAnalyticsStack("Register", "click_show_password");
    }
    togglePassword(!showPassword);
  }, [showPassword]);

  const handleConfirmPasswordToolTip = useCallback(() => {
    if (!showPassword) {
      makeAnalyticsStack("Register", "click_show_password");
    }
    toggleConfirmPassword(!showConfirmPassword);
  }, []);

  const handleSelectedCountryCallback = useCallback((country: string) => {
    updateCountry(country);
    toggleCountryModal(false);
  }, []);

  const handleSelectedNationalityCallback = useCallback((country: string) => {
    updateSelectedNationality(country);
    toggleNationalityModal(false);
  }, []);

  const showDatePicker = useCallback(() => toggleDatePicker(true), []);
  const hideDatePicker = useCallback(() => toggleDatePicker(false), []);

  const handleDateChange = useCallback((event, date) => {
    if (date !== undefined) {
      updateDOB(moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD/MM/YYYY"));
    }
    if (Platform.OS === "android") {
      hideDatePicker();
    }
  }, []);

  const makeAnalyticsStack = useCallback(
    async (
      screenName = "",
      action = "",
      category_id = "",
      categories = "",
      categories_analytics = "",
      location_id = 0,
      changeSequenceNumber = false
    ) => {
      const stackData = {
        current_screen: screenName,
        action: action,
        category_id: category_id,
        categories: categories,
        categories_analytics: categories_analytics,
        location_id: location_id,
        changeSequenceNumber: changeSequenceNumber,
      };
      await makeStackMongo(stackData);
      //resetStackObject();
      // const dataStack = await getStackArrayMongo();
    },
    []
  );

  const privacyPolicyPressed = useCallback(() => {
    Keyboard.dismiss();
    updatePPAccepted(!isPrivacyPolicyAccepted);
  }, [isPrivacyPolicyAccepted]);

  const EULPressed = useCallback(() => {
    updateEULAccepted(!isEndUserLicenceAccepted);
    Keyboard.dismiss();
    makeAnalyticsStack("Register", "click_accept_terms");
  }, [isEndUserLicenceAccepted]);

  return children({
    onCloseRegistrationSuccess,
    keyValidationData,
    showRegistrationSuccessModal,
    appConfigs,
    registrationSuccessString,
    isKeyValidationEnabled,
    type,
    isPrivacyPolicyAccepted,
    isEndUserLicenceAccepted,
    showCountryModal,
    showNationalityModal,
    showPassword,
    showConfirmPassword,
    isDatePickerVisible,
    showWebView,
    selectedCountry,
    selectedNationality,
    dateOfBirth,
    gender,
    webviewURL,
    webViewTitle,
    phoneNumRef,
    firstNameRef,
    lastNameRef,
    emailRef,
    confirmEmailRef,
    passRef,
    confirmPasswordRef,
    navigation,
    //methods
    toggleCountryModal,
    toggleNationalityModal,
    updateGender,
    handleRegisterButton,
    handlePrivacyPolicy,
    handleEULA,
    disableWebView,
    handleSelectedCountryCallback,
    handleSelectedNationalityCallback,
    showDatePicker,
    hideDatePicker,
    handleDateChange,
    privacyPolicyPressed,
    EULPressed,
  } as ScreenTypes.signupScreen);
};

export default Register;
