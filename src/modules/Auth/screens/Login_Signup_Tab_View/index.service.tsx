import { ScreenTypes } from "@Auth/interfaces";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  setAppLoading,
  setErrorObject,
  setSkipMode,
} from "@redux/appReducer/app.actions";
import { setToken } from "@Profile/redux/actions";
import JniKeys from "@HybridComponents/JniKeys";
import JWT from "expo-jwt";
import { useAppSelector } from "@redux/root-reducer";
import {
  loginRequest,
  setCaptchaToken,
  setForceLogin,
  forgotPasswordRequest,
  signupRequest,
  setLoginShow,
} from "@Auth/redux/actions";
import AuthBL from "@Auth/BL";
import { makeStackMongo } from "@utils/horizonAnalytics";
import { useRoute } from "@react-navigation/core";
import { LoginDataType, SignupDataType } from "@Auth/BL/Interfaces";
import { ForgotPasswordData } from "@Auth/interfaces/network";
import { delay } from "@redux-saga/core/effects";

/* component containing the business logic separated from view for
 api call trigger */
const LoginServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  const route = useRoute();

  //reducers
  const appConfigs = useAppSelector((state) => state?.appReducer?.AppConfigs);
  const deviceInfo = useAppSelector((state) => state?.appReducer?.deviceInfo);
  const resendEmail = useAppSelector(
    (state) => state?.authReducer?.resendEmail
  );
  const loginData = useAppSelector((state) => state?.authReducer?.loginData);

  const alreadyLoginData = useAppSelector(
    (state) => state?.authReducer?.alreadyLoginData
  );
  const keyValidationData = useAppSelector(
    (state) => state?.appReducer?.keyValidationData
  );
  const token = useAppSelector((state) => state?.userReducer?.token);

  // states
  const [showDoneMessage, toggleDoneMessage] = useState(false);
  const [registrationSuccessMessage, updateRegistrationSuccessMessage] =
    useState(false);
  const [doneMessage, updateDoneMessage] = useState("");
  const [captcha, updateCaptcha] = useState("");
  const [pp_url, updatePpUrl] = useState(appConfigs?.ppURL || "");
  const [eula_url, updateEulaUrl] = useState(appConfigs?.eulaURL || "");
  const [showResendEmailPopup, toggleResendEmailPopup] = useState(false);
  const [showRegistrationSuccessModal, toggleRegistrationSuccessModal] =
    useState(false);
  const [showForgetPasswordModal, toggleForgetPasswordModal] = useState(false);

  // cDM
  useEffect(() => {
    configureURLs();
    setTokenCall();
    // componentWillUnmount
    return () => {
      onSetAppLoading(false);
    };
  }, []);

  // refrences
  const _captchaRef = useRef(null);

  let initialRouteName = appConfigs.activeAuthTab;

  const dispatch = useDispatch(); // dispatch action to reducer

  // dispach
  const onSetAppLoading = (data: boolean) => dispatch(setAppLoading(data));
  const changeForceLogin = (data: boolean) => dispatch(setForceLogin(data));
  const updateCaptchaToken = (captchaToken: string) =>
    dispatch(setCaptchaToken(captchaToken));
  const onSetErrorObject = (data: any) => dispatch(setErrorObject(data));
  const onSetSkipMode = (data: boolean) => dispatch(setSkipMode(data));
  const onSetToken = (data: string) => dispatch(setToken(data));
  const updateLoginShow = (data: boolean) => dispatch(setLoginShow(data));

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
        toggleForgetPasswordModal: toggleForgetPasswordModal,
        doneMessageHandler,
      })
    );

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
        doneMessageHandler,
      })
    );

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
    makeAnalyticsStack("Login Signup", "click_skip");
    onSetSkipMode(true);
    const jwt = await createJwt();
    onSetToken(jwt);
  }, []);

  const setTokenCall = async () => {
    const jwt = await createJwt();
    onSetToken(jwt);
  };

  const createJwt = useCallback(async () => {
    const apiToken = await JniKeys.getKey("apiToken");
    const serectKey = await JniKeys.getKey("serectKey");
    const payload = {
      api_token: apiToken,
    };
    const jwt = JWT.encode(payload, serectKey);
    return jwt;
  }, []);

  const changedMindCallback = useCallback(() => updateLoginShow(false), []);

  const handleForceLogin = async () => {
    await changeForceLogin(false);
    await updateLoginShow(false);

    onLogin({ ...loginData, force_login: true });
  };

  const checkCaptcha = useCallback(async () => {
    try {
      if (appConfigs.is_captcha_verification === true) {
        _captchaRef?.current?.refreshToken();
        await delay(500);
      }
    } catch (error) {
      throw error;
    }
  }, [appConfigs, _captchaRef]);

  const errorHandler = useCallback((data: any) => {
    const { message, messageText } = data;
    const errorObj = {
      status: message,
      message: messageText,
    };
    onSetErrorObject(errorObj);
  }, []);

  const configureURLs = useCallback(() => {
    const chat_flag = !appConfigs?.is_live_chat_enabled;
    const language = deviceInfo?.language ? deviceInfo?.language : "en";

    let queryParams = "?language=" + language;
    if (chat_flag) {
      queryParams = queryParams + "&no_chat=true";
    }
    const temp_pp_url = pp_url + queryParams;
    const temp_eula_url = eula_url + queryParams;

    updatePpUrl(temp_pp_url);
    updateEulaUrl(temp_eula_url);
  }, [appConfigs, deviceInfo, pp_url, eula_url]);

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

  const onCloseRegistrationSuccess = useCallback(() => {
    toggleRegistrationSuccessModal(false);
    navigation.navigate("Login");
  }, []);

  const pushAnalytics = useCallback(
    (data: any) => makeAnalyticsStack(data),
    []
  );

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

  // const makeCustomAnalyticsStack = useCallback(async (stackData) => {
  //   await makeStackMongo(stackData);
  // }, []);

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

  const errorText = "";
  return children({
    navigation,
    showDoneMessage,
    doneMessage,
    alreadyLoginData,
    _captchaRef,
    appConfigs,
    initialRouteName,
    pp_url,
    eula_url,
    errorText,
    showResendEmailPopup,
    resendEmail,
    showRegistrationSuccessModal,
    captcha,
    keyValidationData,
    // methods
    handleSkipMode,
    handleForceLogin,
    changedMindCallback,
    updateCaptchaToken,
    hideResetModal,
    onLogin,
    errorHandler,
    pushAnalytics,
    onForgotPassword,
    onResendEmail,
    onResendEmailContinue,
    makeAnalyticsStack,
    onRegistration,
    onCloseRegistrationSuccess,
  });
};

export default LoginServiceComponent;
