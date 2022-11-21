import { Keyboard, Platform } from "react-native";
import { AppActionTypes } from "./app.types";
import appConfig from "../../AppConfig.json";
import endPoints from "../../EndPoints.json";
import Device from "react-native-device-info";
import { currentLanguage } from "@localization";

const env = appConfig.env; //this env is used for endpoints
import { getNetInfo } from "../../utils/commons";

const isDemographicsEnable = (appConfigs, screenName, isDemographicUpdated) => {
  if (appConfigs.demographics_is_active && isDemographicUpdated === 0) {
    if (appConfigs.demographics_screen_locations.indexOf(screenName) > -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const INITIAL_STATE = {
  skipMode: false,
  AppConfigs: appConfig,
  deviceInfo: {
    company: appConfig.companyName,
    app_version: appConfig.appVerison,
    buildNumber: Device.getBuildNumber(),
    device_uid: Device.getUniqueId(),
    device_key: Device.getUniqueId(),
    device_brand: Device.getBrand(),
    device_model: Device.getModel(),
    device_os: Platform.OS,
    __device_id: Device.getUniqueId(),
    language: currentLanguage(),
    wlcompany: appConfig.company,
    hasGms: false,
    //Invariant Violation: Calling synchronous methods on native modules is not supported in Chrome.
    netInfo: getNetInfo(),
  }, //TODO: add more device info data

  isLoading: false,
  errorObject: { status: false, message: "" },
  successObject: { status: false, message: "" },
  isVisibleDemographic: false,
  webViewObject: { status: false, url: "", headerText: "" },
  keyValidationData: { key: "", email: "" },
  deeplinkData: {},
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppActionTypes.SET_CONSUME_VALUES:
      return {
        ...state,
        ...action.dataObj,
      };
    case AppActionTypes.SET_EXPOSE_VALUES:
      return {
        ...state,
        exposeFunction: action.exposeFunction,
      };

    case AppActionTypes.SET_SKIP_MODE:
      return {
        ...state,
        skipMode: action.value,
      };

    case AppActionTypes.SET_APP_CONFIGS:
      return {
        ...state,
        AppConfigs: { ...state.AppConfigs, ...action.data },
      };

    case AppActionTypes.SET_GMS_ANDROID:
      return {
        ...state,
        deviceInfo: {
          ...state.deviceInfo,
          hasGms: action.data,
        },
      };

    case AppActionTypes.SET_APP_LOADING:
      Keyboard.dismiss();
      return {
        ...state,
        isLoading: action.data,
      };

    case AppActionTypes.SET_APP_ERROR:
      Keyboard.dismiss();
      let error_data=action.data
      if(!action.data.message||action.data.message==''){
      error_data.status=false}
      
      return {
        ...state,
        errorObject: error_data,
      };

    case AppActionTypes.SET_APP_WEBVIEW:
      Keyboard.dismiss();
      return {
        ...state,
        webViewObject: action.data,
      };

    case AppActionTypes.SET_APP_SUCCESS:
      Keyboard.dismiss();
      return {
        ...state,
        successObject: action.data,
      };

    case AppActionTypes.SET_IS_DEMOGRAPHIC_VISIBLE:
      Keyboard.dismiss();
      return {
        ...state,
        isVisibleDemographic: isDemographicsEnable(
          state.AppConfigs,
          action.data.screenName,
          action.data.isDemographicUpdated
        ),
      };

    case AppActionTypes.SET_DISMISS_DEMOGRAPHIC:
      Keyboard.dismiss();
      return {
        ...state,
        isVisibleDemographic: false,
      };

    case AppActionTypes.SET_APP_VALUES:
      return {
        ...state,
        ...action.data,
      };

    case AppActionTypes.SET_KEY_VALIDATION_DATA:
      return {
        ...state,
        keyValidationData: action.data,
      };

    case AppActionTypes.SET_DEELINK_DATA:
      return {
        ...state,
        deeplinkData: {
          ...state.deeplinkData,
          ...action.data,
        },
      };
    case AppActionTypes.LOGOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};

export default appReducer;
