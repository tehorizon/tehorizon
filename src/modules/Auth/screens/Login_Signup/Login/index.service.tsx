import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, BackHandler, Platform } from "react-native";
import { useDispatch } from "react-redux";
import {
  setAppLoading,
  setErrorObject,
  setSkipMode,
} from "@redux/appReducer/app.actions";
import { setToken } from "@Profile/redux/actions";
import JniKeys from "@HybridComponents/JniKeys";
import JWT from "expo-jwt";
import { makeStackMongo } from "@utils/horizonAnalytics";
import { useRoute } from "@react-navigation/core";
import { useAppSelector } from "@redux/root-reducer";
import {
  forgotPasswordRequest,
  loginRequest,
  setForceLogin,
  setLoginShow,
  setCaptchaToken,
} from "@Auth/redux/actions";
import { LoginDataType } from "@Auth/BL/Interfaces";
import { ForgotPasswordData } from "@Auth/interfaces/network";
import { ScreenTypes } from "@Auth/interfaces";
import AuthBL from "@Auth/BL";
import appConfigs from "@fast_track/src/AppConfig.json";
import ReCaptchaV3 from "@HybridComponents/ReCaptchaV3";
import { InputRef } from "@components/Input";
import { ForgetRefObj } from "../components/ForgetPassword";

const Login = ({ children, navigation }: ScreenTypes.screen) => {
  let route = useRoute();
  let { preEmail = "", key = "" } = route?.params || {};

  //redux states
  const token = useAppSelector((state) => state?.userReducer?.token);
  const resendEmail = useAppSelector(
    (state) => state?.authReducer?.resendEmail
  );
  const captchaToken = useAppSelector(
    (state) => state?.authReducer?.captchaToken
  );

  const loginData = useAppSelector((state) => state?.authReducer?.loginData);
  const alreadyLoginData = useAppSelector(
    (state) => state?.authReducer?.alreadyLoginData
  );
  const keyValidationData = useAppSelector(
    (state) => state?.appReducer?.keyValidationData
  );
  //states
  const [isPrivacyPolicyAccepted, updatePPAccepted] = useState(false);
  const [isEndUserLicenceAccepted, updateEULAccepted] = useState(false);
  const [siteKey, updateSiteKey] = useState("");
  const [showWebView, toggleWebView] = useState(false);
  const [webviewURL, updateWebViewURL] = useState("");
  const [webViewTitle, updateWebViewTitle] = useState("");
  const [showDoneMessage, toggleDoneMessage] = useState(false);
  const [registrationSuccessMessage, updateRegistrationSuccessMessage] =
    useState(false);
  const [doneMessage, updateDoneMessage] = useState("");
  const [showRegistrationSuccessModal, toggleRegistrationSuccessModal] =
    useState(false);
  const [showResendEmailPopup, toggleResendEmailPopup] = useState(false);

  const pp_url = appConfigs?.ppURL || "";
  const eula_url = appConfigs?.eulaURL || "";

  // dispatch action to reducer
  const dispatch = useDispatch();

  // dispach
  const onSetAppLoading = (data: boolean) => dispatch(setAppLoading(data));
  const changeForceLogin = (data: boolean) => dispatch(setForceLogin(data));
  const onSetErrorObject = (data: any) => dispatch(setErrorObject(data));
  const onSetSkipMode = (data: boolean) => dispatch(setSkipMode(data));
  const onSetToken = (data: string) => dispatch(setToken(data));
  const updateLoginShow = (data: boolean) => dispatch(setLoginShow(data));
  const updateCaptchaToken = (captchaToken: string) =>
    dispatch(setCaptchaToken(captchaToken));
  // saga call
  const onLogin = (data: LoginDataType) =>
    dispatch(
      loginRequest({
        postData: data,
        checkCaptcha,
        toggleResendEmailPopup: () =>
          toggleResendEmailPopup(!showResendEmailPopup),
        makeAnalyticsStack,
        createSessionJwt,
        checkIsDemographic,
      })
    );

  const onForgotPassword = (data: ForgotPasswordData) =>
    dispatch(
      forgotPasswordRequest({
        postData: data,
        toggleForgetPasswordModal: (status: boolean) =>
          forgetRef?.current?.toggleVisibility(status),
        doneMessageHandler,
      })
    );

  // refecnces
  let emailRef = useRef<InputRef>(null);
  let passRef = useRef<InputRef>(null);
  let forgetRef = useRef<ForgetRefObj>(null);
  const _captchaRef = useRef<ReCaptchaV3>(null);

  const { isKeyValidationEnabled } = appConfigs || {};
  const { type } = keyValidationData || {};
  const errorText = "";

  //cDM
  useEffect(() => {
    makeAnalyticsStack("Login", "Open", "", "", "", 0, false);

    (async () => {
      updateSiteKey(await JniKeys.getKey("RECAPTCHA"));
    })();
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    //cWUM
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const onResendEmail = useCallback(
    async (token: string) => {
      try {
        onSetAppLoading(true);
        toggleResendEmailPopup(!showResendEmailPopup);

        const message = await AuthBL.resendEmail({
          email: resendEmail?.email,
          token,
        });
        onSetAppLoading(false);
      } catch (error) {
        onSetAppLoading(false);
        errorHandler({
          message: true,
          messageText: error.messageText,
        });
      }
    },
    [showResendEmailPopup, resendEmail]
  );

  const onResendEmailContinue = useCallback(
    () => toggleResendEmailPopup(false),
    []
  );

  const errorHandler = useCallback((data: any) => {
    const { message, messageText } = data;
    const errorObj = {
      status: message,
      message: messageText,
    };
    onSetErrorObject(errorObj);
  }, []);

  const handleBackButton = useCallback(() => {
    if (showWebView) {
      disableWebView();
      return true;
    } else {
      return false;
    }
  }, [showWebView]);

  const doneMessageHandler = useCallback((data: any) => {
    const {
      showDoneMessage,
      doneMessage,
      registrationSuccessMessage = false,
    } = data;
    toggleDoneMessage(showDoneMessage);
    updateDoneMessage(doneMessage);
    updateRegistrationSuccessMessage(registrationSuccessMessage);
  }, []);

  const handlePrivacyPolicy = useCallback(() => {
    console.log("blahblah");

    makeAnalyticsStack("Login", "click_privay_plociy", "", "", "", 0, false);
    toggleWebView(true);
    updateWebViewURL(pp_url);
    updateWebViewTitle("Privacy Policy");
  }, [pp_url]);

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
        i_c_e:
          Platform.OS == "web" ? false : appConfigs.is_captcha_verification,
        captcha_token: captchaToken,
      };
    } else {
      loginData = {
        email: emailRef?.current?.getValue(),
        password: passRef?.current?.getValue(),
        privacyPolicyCheck: isPrivacyPolicyAccepted,
        endUserLicenseAgreementCheck: isEndUserLicenceAccepted,
        i_c_e:
          Platform.OS == "web" ? false : appConfigs.is_captcha_verification,
        captcha_token: captchaToken,
      };
    }
    onLogin({ ...loginData, token, key });
  }, [
    appConfigs,
    keyValidationData,
    passRef?.current?.getValue(),
    isPrivacyPolicyAccepted,
    isEndUserLicenceAccepted,
    captchaToken,
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

  useEffect(() => {
    const interval = setInterval(() => {
      checkCaptcha();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkCaptcha = () => {
    try {
      if (appConfigs.is_captcha_verification === true) {
        _captchaRef?.current?.refreshToken();
      }
    } catch (error) {
      throw error;
    }
  };

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

  const hideResetModal = useCallback(() => {
    toggleDoneMessage(false);
    if (registrationSuccessMessage) {
      checkIsDemographic({});
      updateRegistrationSuccessMessage(false);
    }
  }, [registrationSuccessMessage]);

  const handleSkipMode = useCallback(async () => {
    makeAnalyticsStack("Login", "click_skip");

    onSetSkipMode(true);
    const jwt = await createJwt();
    onSetToken(jwt);
  }, []);

  const createJwt = useCallback(async () => {
    const apiToken = await JniKeys.getKey("apiToken");
    const serectKey = await JniKeys.getKey("serectKey");
    const payload = {
      api_token: apiToken,
    };
    const jwt = JWT.encode(payload, serectKey);
    return jwt;
  }, []);

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

  const handleForceLogin = async () => {
    await changeForceLogin(false);
    await updateLoginShow(false);

    onLogin({ ...loginData, captcha_token: captchaToken, force_login: true });
  };

  const changedMindCallback = useCallback(() => updateLoginShow(false), []);

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
    isKeyValidationEnabled,
    type,
    emailRef,
    passRef,
    forgetRef,
    showDoneMessage,
    registrationSuccessMessage,
    doneMessage,
    showRegistrationSuccessModal,
    alreadyLoginData,
    navigation,
    _captchaRef,
    siteKey,
    //methods
    onResendEmailContinue,
    updateCaptchaToken,
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
    hideResetModal,
    handleSkipMode,
    changedMindCallback,
    handleForceLogin,
  } as ScreenTypes.loginScreen);
};

export default Login;
