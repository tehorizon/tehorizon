import { store } from "@redux/store";
import appConfig from "@fast_track/src/AppConfig.json";
import { Platform } from "react-native";
import moment from "moment-timezone";
import deviceInfoModule from "react-native-device-info";
import * as RNLocalize from "react-native-localize";
export function getCommonParams() {
  const state = store.getState();
  console.log(deviceInfoModule.getVersion(), "sherazi");

  //const appConfig = state.appReducer.AppConfigs;
  const deviceInfo = state?.appReducer?.deviceInfo;
  const userParams = state?.userReducer?.userInfo;
  let LocationList = state.locationReducer?.LocationList;
  let locationIndex = state.locationReducer?.locationIndex;
  let location =
    LocationList?.length > 0 && locationIndex >= 0
      ? LocationList[locationIndex]
      : {};

  //common object have non-sensitive data
  const commonParams = {
    device_os: deviceInfo?.device_os,
    currency: userParams?.currency || "USD",
    language: RNLocalize?.getLocales()[0]?.languageCode || "en",
    device_uid: deviceInfo?.device_uid,
    device_key: `${Platform.OS?.toLowerCase()?.slice(0, 3)}-${
      deviceInfo?.device_key
    }`,
    device_model: deviceInfo?.device_model,
    time_zone: moment?.tz?.guess(),
    __platform: Platform.OS,
    app_name: appConfig.companyName,
    session_token: state?.userReducer?.userSessionToken || "",
    __sid: state?.userReducer?.userSessionToken || "",
    identifier: `entertainer_express`,
    app_version:
      Platform.OS != "web"
        ? deviceInfoModule.getVersion()
        : appConfig?.appVerison,
    build_no: Platform.OS == "web" ? 1 : deviceInfoModule.getBuildNumber(),
    __i: state?.userReducer?.userInfo?.userId || null,
    user_id: state?.userReducer?.userInfo?.userId || null,
    location_id: location?.id || null,
    __lat: location?.lat || 0,
    lat: location?.lat || 0,
    __lng: location?.lng || 0,
    lng: location?.lng || 0,
    timezone: moment?.tz?.guess() || "",
    company: appConfig.company,
    wl_company: appConfig.company,
    wlcompany: appConfig.company,
  };
  return commonParams;
}
