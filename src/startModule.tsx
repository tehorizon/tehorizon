import React, { useEffect, useLayoutEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import appConfig from "@fast_track/src/AppConfig.json";
import App from "./App";
import { configs } from "./apis/configs";
import JWT from "expo-jwt";
import JniKeys from "@HybridComponents/JniKeys";
import { useDispatch } from "react-redux";

import I18n, { i18n_Init } from "@localization";

import {
  Loader,
  ErrorModal,
  WebViewModal,
  DemographicModal,
  Intro,
} from "@components";
import {
  setAppConfigs,
  setErrorObject,
  setWebViewObject,
} from "@redux/appReducer/app.actions";
import * as Font from "expo-font";

import { fonts } from "rn_fast_track_uilib";
import { useAppSelector } from "@redux/root-reducer";

import { setGmsAndroid } from "@redux/appReducer/app.actions";
import { hasGmsAndroid } from "@utils/commons";
import { setToken } from "@Profile/redux/actions";

import appboy from "@HybridComponents/AppBoy";
import AsyncStorage from "@react-native-community/async-storage";
import { setAnalyticsFlag } from "@Home/redux/actions";

const {
  // AppBoyGetInitialURL,
  initialize,
} = appboy;

// console.disableYellowBox = true;

const Base = () => {
  //states
  const [appIsReady, updateAppState] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  //reducer
  let sessionToken = useAppSelector(
    (state) => state?.userReducer?.userSessionToken
  );
  let email = useAppSelector((state) => state?.userReducer?.userInfo?.email);

  let loadingOverlayActive = useAppSelector(
    (state) => state?.appReducer?.isLoading
  );
  let errorObject = useAppSelector((state) => state?.appReducer?.errorObject);
  const skipMode = useAppSelector((state) => state?.appReducer?.skipMode);
  let webViewObject = useAppSelector(
    (state) => state?.appReducer?.webViewObject
  );
  let isDemographicVisible = useAppSelector(
    (state) => state?.appReducer?.isVisibleDemographic
  );

  // dispatch
  const dispatch = useDispatch();
  const onSetAppConfig = (data: Object) => dispatch(setAppConfigs(data));
  const onSetAnalyticsFlag = (flag: boolean) =>
    dispatch(setAnalyticsFlag(flag));
  const onSetErrorObject = (data: Object) => dispatch(setErrorObject(data));
  const onSetWebViewObject = (data: Object) => dispatch(setWebViewObject(data));
  const onSetGmsAndroid = (gms: Object) => dispatch(setGmsAndroid(gms));
  const onSetToken = (token: string) => dispatch(setToken(token));

  // componentWillMount
  useEffect(() => {
    initialize();
    prepareResources();
    showAppIntro();
  }, []);

  // update session token
  useEffect(() => {
    updateConfig();
  }, [email, skipMode]);

  const prepareResources = async () => {
    try {
      await Font.loadAsync(fonts);
      await i18n_Init();
      updateAppState(true);
      SplashScreen?.hide();
    } catch (error) {
      console.log(error);
    }
  };

  const createJwt = async () => {
    const apiToken = await JniKeys.getKey("apiToken");
    const serectKey = await JniKeys.getKey("serectKey");
    const payload = {
      api_token: apiToken,
    };
    const jwt = JWT.encode(payload, serectKey);
    return jwt;
  };

  const updateConfig = async () => {
    const gms = await hasGmsAndroid();
    onSetGmsAndroid(gms);
    const jwt = await createJwt();
    invokeConfigsAPI(jwt);

    if (!sessionToken) {
      onSetToken(jwt);
    }
  };

  const invokeConfigsAPI = async (token: string) => {
    let result = {};
    try {
      result = await configs(token);
      if (result?.data?.config) {
        onSetAppConfig(result?.data?.config);
        onSetAnalyticsFlag(result?.data?.config?.log_analytics || false);
      }
    } catch (e) {
      showErrorPopup(e.message);
      console.log("error: ", e.message);
    }
  };

  const hideErrorPopup = () => onSetErrorObject({ status: false, message: "" });

  const showErrorPopup = (message: string) =>
    onSetErrorObject({ status: true, message: message });

  const hideWebViewPopup = () =>
    onSetWebViewObject({ status: false, message: "" });

  const showAppIntro = async () => {
    const alradyShowed = await AsyncStorage.getItem("@introShowed");
    console.log(alradyShowed, "already showed");

    if (alradyShowed != "true" && appConfig?.showIntro) {
      setShowIntro(true);
    }
  };

  const onSkipIntro = async () => {
    setShowIntro(false);
    await AsyncStorage.setItem("@introShowed", "true");
  };

  return appIsReady ? (
    <>
      <App />
      <Loader isVisible={loadingOverlayActive} />
      <ErrorModal
        dataString={errorObject?.message}
        isVisible={errorObject?.status}
        disable={hideErrorPopup}
        buttonText={errorObject?.okText || I18n.t("OK")}
        callBack={errorObject?.callBack}
      />

      <WebViewModal
        urlString={webViewObject.url}
        headerString={webViewObject.headerText}
        isVisible={webViewObject?.status}
        disableCalback={hideWebViewPopup}
      />
      <DemographicModal isVisible={isDemographicVisible} />
      <Intro isVisible={showIntro} onPressSkip={onSkipIntro} />
    </>
  ) : null;
};

export default Base;
