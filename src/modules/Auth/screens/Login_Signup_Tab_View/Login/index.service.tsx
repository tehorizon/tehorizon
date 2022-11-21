import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, BackHandler } from "react-native";

import { makeStackMongo } from "@utils/horizonAnalytics";
import { useRoute } from "@react-navigation/core";
import { useAppSelector } from "@redux/root-reducer";
import { ScreenTypes } from "../../../interfaces";

const Login = ({ children, navigation }: ScreenTypes.screen) => {
  let route = useRoute();
  let {
    pp_url,
    eula_url,
    onLogin,
    appConfigs = {},
    keyValidationData,
    errorText,
    showResendEmailPopup,
    resendEmail,
    onForgotPassword,
    onResendEmail,
    onResendEmailContinue,
    preEmail = "",
    key = "",
  } = route?.params || {};

  let { loginMessage = [] } = appConfigs;

  const { isKeyValidationEnabled } = appConfigs || {};
  const { type } = keyValidationData || {};
  const token = useAppSelector((state) => state?.userReducer?.token);

  const [isPrivacyPolicyAccepted, updatePPAccepted] = useState(false);
  const [isEndUserLicenceAccepted, updateEULAccepted] = useState(false);
  const [showWebView, toggleWebView] = useState(false);
  const [webviewURL, updateWebViewURL] = useState("");
  const [webViewTitle, updateWebViewTitle] = useState("");

  // refecnces
  let emailRef = useRef(null);
  let passRef = useRef(null);
  let forgetRef = useRef(null);

  //cDM
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    //cWUM
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = useCallback(() => {
    if (showWebView) {
      disableWebView();
      return true;
    } else {
      return false;
    }
  }, [showWebView]);

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

  const handleLoginButton = useCallback(() => {
    makeAnalyticsStack("Login", "click_login", "", "", "", 0, false);

    let loginData = {};

    if (isKeyValidationEnabled === true && type === "LoginSuccess") {
      loginData = {
        email: keyValidationData?.email,
        key: keyValidationData?.key,
        password: passRef?.current?.getValue(),
        privacyPolicyCheck: isPrivacyPolicyAccepted,
        endUserLicenseAgreementCheck: isEndUserLicenceAccepted,
      };
    } else {
      loginData = {
        email: emailRef?.current?.getValue(),
        password: passRef?.current?.getValue(),
        privacyPolicyCheck: isPrivacyPolicyAccepted,
        endUserLicenseAgreementCheck: isEndUserLicenceAccepted,
      };
    }
    onLogin({ ...loginData, token, key });
  }, [
    appConfigs,
    keyValidationData,
    passRef?.current?.getValue(),
    isPrivacyPolicyAccepted,
    isEndUserLicenceAccepted,
  ]);

  const showForgotPasswordModal = useCallback(() => {
    makeAnalyticsStack("Login", "click_forgot");
    forgetRef?.current?.toggleVisibility(true);
  }, []);

  const closeForgotPasswordModal = useCallback(
    () => forgetRef?.current?.toggleVisibility(false),
    []
  );

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
    },
    []
  );

  const privacyPolicyPressed = useCallback(() => {
    updatePPAccepted(!isPrivacyPolicyAccepted);

    Keyboard.dismiss();
    makeAnalyticsStack("Login", "click_accept_privacy_policy");
  }, [isPrivacyPolicyAccepted]);

  const endUserLicensePressed = useCallback(() => {
    updateEULAccepted(!isEndUserLicenceAccepted);

    Keyboard.dismiss();
    makeAnalyticsStack("Login", "click_accept_terms");
  }, [isEndUserLicenceAccepted]);

  const onResendEmailPressed = useCallback(() => onResendEmail(token), [token]);
  const onForgotPasswordPressed = useCallback(
    (email) => onForgotPassword({ email, token }),
    [token]
  );

  // listner to email value
  useEffect(() => {
    preEmail != "" && emailRef?.current?.setValue(preEmail);
  }, [preEmail]);

  return children({
    isPrivacyPolicyAccepted,
    isEndUserLicenceAccepted,
    showWebView,
    webviewURL,
    webViewTitle,
    appConfigs,
    keyValidationData,
    errorText,
    showResendEmailPopup,
    resendEmail,
    loginMessage,
    isKeyValidationEnabled,
    onResendEmailContinue,
    type,
    emailRef,
    passRef,
    forgetRef,
    navigation,
    //methods
    handlePrivacyPolicy,
    handleEULA,
    handleLoginButton,
    privacyPolicyPressed,
    endUserLicensePressed,
    onResendEmailPressed,
    closeForgotPasswordModal,
    showForgotPasswordModal,
    disableWebView,
    onForgotPasswordPressed,
  } as ScreenTypes.loginScreen);
};

export default Login;
