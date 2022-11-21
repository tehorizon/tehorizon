import { setItem, getItem } from "../../utils/storage";
import {
  makeSessionId,
  getDeviceInfo,
  isNotAnalyticsEnable,
} from "../../utils/index";
import moment from "moment";
import AppConfig from "@fast_track/src/AppConfig.json";
export const SESSION_ID_KEY = "session_id";
import { AUTH_KEY } from "../../utils/strings";
import AsyncStorage from "@react-native-community/async-storage";
import { mongoInit } from "@fast_track/src/utils/horizonAnalytics";
// const SESSION_KEY = "session";
const SESSION_OBJECT_KEY = "sessionObject";
const SCREEN_NO = "screen_sequence_number";
export const getSessionId = async () => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  let session_id = await getItem(SESSION_ID_KEY);
  if (session_id === null) {
    session_id = "no_session";
  }
  return session_id;
};

export const getAllSessionObject = async () => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  let sessionObject = await getItem(SESSION_OBJECT_KEY);
  if (sessionObject === null) {
    sessionObject = {};
  } else {
    try {
      sessionObject = JSON.parse(sessionObject);
    } catch (error) {
      sessionObject = {};
    }
  }
  return sessionObject;
};

//this function save session objects
export const setSessionObject = async (sessionObject) => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  const sessionObjectStringify = await JSON.stringify(sessionObject);
  await setItem(SESSION_OBJECT_KEY, sessionObjectStringify);
};

export const makeSession = async () => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  if (typeof (await AsyncStorage.getItem(AUTH_KEY)) != "string") {
    await mongoInit();
  }
  try {
    // const sessionObjectStringify = JSON.stringify(sessionObject);
    // await setItem(SESSION_KEY, sessionObjectStringify);
    const deviceInfo = await getDeviceInfo();
    const session_id = await makeSessionId();
    setItem(SESSION_ID_KEY, session_id);

    setItem(SCREEN_NO, 0); //setting screen sequance number this is update accordingly when a stack pushed
    let sessionData = {
      session_id,
      app_ver: deviceInfo.version,
      app_version: deviceInfo.version,
      device_os: deviceInfo.os,
      device_uid: deviceInfo?.device_uid,
      device_model: deviceInfo.model,
      device_install_token: deviceInfo?.device_uid,
      screen_resolution: deviceInfo.screen_resolution,
      device_type: deviceInfo.isMobile ? "mobile" : "tablet",
      language: deviceInfo?.language,
      api_version: "v2",
      company: AppConfig.company,
      device_os_ver: deviceInfo.osVersion,
      network: "wifi",
      created_at:
        moment(new Date())?.format("YYYY-MM-DD HH:mm:SS")?.toString() || "",
      wlcompany: AppConfig.company,
    };

    let allSessionObject = await getAllSessionObject();
    console.log({ allSessionObjectPre: allSessionObject }, "analytics");

    allSessionObject = {
      ...allSessionObject,
      [session_id]: sessionData, //session data is an object
    };
    console.log({ allSessionObject }, "analytics");
    await setSessionObject(allSessionObject);
  } catch (error) {
    console.log(error, "analytics");
  }
};

// a function that will update session by customer_id
// fetch all sessions and update ith with customer_id and save them
export const updateSessions = async (customer_id = "", location_id = "") => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  try {
    let allSessionObject = await getAllSessionObject(); // fetch all sessions
    //setting values to customer_id
    Object.keys(allSessionObject).map((key) => {
      if (customer_id !== "") {
        allSessionObject[key].customer_id = customer_id + "";
      }

      if (location_id !== "") {
        allSessionObject[key].location_id = location_id;
      }
    });
    await setSessionObject(allSessionObject);
  } catch (error) {
    console.log(error);
  }
};

export const getSession = async () => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  let sessionObject = await getItem(SESSION_OBJECT_KEY);
  if (sessionObject === null) {
    sessionObject = {};
  } else {
    try {
      sessionObject = JSON.parse(sessionObject);
    } catch (error) {
      sessionObject = {};
    }
  }
  return sessionObject;
};

export const resetSessionObject = async () => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  const sessionObject = [];
  const sessionObjectStringify = JSON.stringify(sessionObject);
  await setItem(SESSION_OBJECT_KEY, sessionObjectStringify);
};
