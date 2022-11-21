import { AppActionTypes } from "./app.types";

export const setComsumeValues = (dataObj) => ({
  type: AppActionTypes.SET_CONSUME_VALUES,
  dataObj: dataObj,
});

export const setExposeFun = (exposeFunction) => ({
  type: AppActionTypes.SET_EXPOSE_VALUES,
  exposeFunction: exposeFunction,
});

export const setSkipMode = (value) => ({
  type: AppActionTypes.SET_SKIP_MODE,
  value: value,
});

export const setAppConfigs = (data) => ({
  type: AppActionTypes.SET_APP_CONFIGS,
  data: data,
});

export const setAppLoading = (data) => ({
  type: AppActionTypes.SET_APP_LOADING,
  data: data,
});

export const setErrorObject = (data) => ({
  type: AppActionTypes.SET_APP_ERROR,
  data: data,
});

export const setWebViewObject = (data) => ({
  type: AppActionTypes.SET_APP_WEBVIEW,
  data: data,
});

export const setDismissDemographic = (data) => ({
  type: AppActionTypes.SET_DISMISS_DEMOGRAPHIC,
  data: data,
});

export const setDemographicVisible = (data) => ({
  type: AppActionTypes.SET_IS_DEMOGRAPHIC_VISIBLE,
  data: data,
});

export const setAppValues = (data) => ({
  type: AppActionTypes.SET_APP_VALUES,
  data: data,
});

export const setGmsAndroid = (data) => ({
  type: AppActionTypes.SET_GMS_ANDROID,
  data: data,
});

export const setKeyValidationData = (data) => ({
  type: AppActionTypes.SET_KEY_VALIDATION_DATA,
  data: data,
});

export const logoutSuccess = () => ({
  type: AppActionTypes.LOGOUT_SUCCESS,
});

export const setDeeplinkData = (data) => ({
  type: AppActionTypes.SET_DEELINK_DATA,
  data: data,
});
