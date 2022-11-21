import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Platform, BackHandler } from "react-native";
import { makeStackMongo } from "@utils/horizonAnalytics";
import moment from "moment";

import { useRoute } from "@react-navigation/core";
import { useAppSelector } from "@redux/root-reducer";
import { ScreenTypes } from "../../../interfaces";
import { useDispatch } from "react-redux";
import JniKeys from "@HybridComponents/JniKeys";
import JWT from "expo-jwt";
import { SignupDataType } from "@Auth/BL/Interfaces";
import { setCaptchaToken, signupRequest } from "@Auth/redux/actions";
import { delay } from "redux-saga/effects";
import JNIKEYS from "@HybridComponents/JniKeys";
import appConfigs from "@fast_track/src/AppConfig.json";
import { InputRef } from "@components/Input";
import ReCaptchaV3 from "@HybridComponents/ReCaptchaV3";

const Register = ({ children, navigation }: ScreenTypes.screen) => {
  let route = useRoute();

  const registrationSuccessString = useAppSelector(
    (state) => state?.authReducer?.registrationSuccessString
  );
  const token: string = useAppSelector((state) => state?.userReducer?.token);
  const keyValidationData = useAppSelector(
    (state) => state?.appReducer?.keyValidationData
  );
  const captchaToken = useAppSelector(
    (state) => state?.authReducer?.captchaToken
  );

  const { isKeyValidationEnabled } = appConfigs || {};
  const { type } = keyValidationData || {};

  const [siteKey, updateSiteKey] = useState("");
  const [isPrivacyPolicyAccepted, updatePPAccepted] = useState(false);
  const [isEndUserLicenceAccepted, updateEULAccepted] = useState(false);
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
  const [webviewURL, updateWebViewURL] = useState("");
  const [webViewTitle, updateWebViewTitle] = useState("");

  const [showRegistrationSuccessModal, toggleRegistrationSuccessModal] =
    useState(false);

  const pp_url = appConfigs?.ppURL || "";
  const eula_url = appConfigs?.eulaURL || "";

  const dispatch = useDispatch(); // dispatch action to reducer
  const updateCaptchaToken = (captchaToken: string) =>
    dispatch(setCaptchaToken(captchaToken));
  //cDM
  useEffect(() => {
    makeAnalyticsStack("Register", "Open", "", "", "", 0, false);
    (async () => {
      updateSiteKey(await JNIKEYS.getKey("RECAPTCHA"));
    })();
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    //cWUM
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  // refecnces
  const phoneNumRef = useRef<InputRef>(null);
  const firstNameRef = useRef<InputRef>(null);
  const lastNameRef = useRef<InputRef>(null);
  const emailRef = useRef<InputRef>(null);
  const confirmEmailRef = useRef<InputRef>(null);
  const passRef = useRef<InputRef>(null);
  const confirmPasswordRef = useRef<InputRef>(null);
  // refrences
  const _captchaRef = useRef<ReCaptchaV3>(null);

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
        i_c_e:
          Platform.OS == "web" ? false : appConfigs?.is_captcha_verification,
        captcha_token: captchaToken,
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
        i_c_e:
          Platform.OS == "web" ? false : appConfigs?.is_captcha_verification,
        captcha_token: captchaToken,
      };
    }

    //callback func
    onRegistration({ ...registrationData, token });
  };

  const handlePrivacyPolicy = useCallback(() => {
    makeAnalyticsStack("Register", "click_privay_plociy", "", "", "", 0, false);
    toggleWebView(true);
    updateWebViewURL(pp_url);
    updateWebViewTitle("Privacy Policy");
  }, [[pp_url]]);

  const handleEULA = useCallback(() => {
    makeAnalyticsStack("Register", "click_accept_terms", "", "", "", 0, true);
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

  const onCloseRegistrationSuccess = useCallback(() => {
    toggleRegistrationSuccessModal(false);
    navigation.navigate("Login");
  }, []);

  const checkCaptcha = async () => {
    try {
      if (appConfigs.is_captcha_verification === true) {
        _captchaRef?.current?.refreshToken();
        await delay(500);
      }
    } catch (error) {
      throw error;
    }
  };

  const createSessionJwt = useCallback(async (sessionToken: string) => {
    const apiToken = await JniKeys.getKey("apiToken");
    const serectKey = await JniKeys.getKey("serectKey");
    const payload = {
      api_token: apiToken,
      session_token: sessionToken,
    };
    const sessionJwt = JWT.encode(payload, serectKey);
    return sessionJwt;
  }, []);

  const handleNavigation = (type: string, data = {}) => {
    if (type === "login" || type === "demographic" || type === "skipMode") {
      navigation?.current?.reset({
        index: 0,
        routes: [{ name: "Tab" }],
      });
    }
  };

  const checkIsDemographic = (userData = {}) =>
    handleNavigation("login", userData);

  const onRegistration = (postData: SignupDataType) =>
    dispatch(
      signupRequest({
        postData,
        navigation,
        checkCaptcha,
        toggleRegistrationSuccessModal,
        makeAnalyticsStack,
        createSessionJwt,
        checkIsDemographic,
      })
    );
  const navigateToLogin = () => navigation.navigate("Login");
  return children({
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
    siteKey,
    navigation,
    _captchaRef,
    //methods
    onCloseRegistrationSuccess,
    toggleCountryModal,
    updateCaptchaToken,
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
    navigateToLogin,
  } as ScreenTypes.signupScreen);
};

export default Register;
