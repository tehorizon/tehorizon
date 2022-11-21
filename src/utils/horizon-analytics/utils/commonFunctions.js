import * as Device from "expo-device";
import { Dimensions, Platform } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import * as RNLocalize from "react-native-localize";
import deviceInfoModule from "react-native-device-info";
import { disableAnalytics } from "@fast_track/src/AppConfig.json";
import { store } from "@redux/store";
export const getPlateform = () => {
  let plateform = "android";
  if (isIOS || isAndroid) {
    plateform = isIOS ? "ios" : "android";
  } else {
    plateform = "web";
  }
  return plateform;
};

const genRand = () => {
  const lower = 1;
  const upper = 999999;
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const makeSessionId = () =>
  `${Platform?.OS?.slice(0, 3) || "ios"}-${Date.now()}-${genRand()}`;

export const deviceDetect = () => {
  return {
    os: Platform.OS,
    model: Device.modelName,
    isMobile: true,
    osVersion: Device.osVersion,
    screen_resolution: windowWidth + "x" + windowHeight,
    device_uid: deviceInfoModule.getUniqueId(),
    language: RNLocalize.getLocales()
      ? RNLocalize.getLocales()[0]?.languageCode
      : "en",
    version: deviceInfoModule.getVersion(),
  };
};
//a function to get all the information about device
export const getDeviceInfo = () => {
  const deviceInfo = deviceDetect();
  return deviceInfo;
};

export const isNotAnalyticsEnable = () =>
  disableAnalytics || !store?.getState()?.homeReducer?.log_analytics;
