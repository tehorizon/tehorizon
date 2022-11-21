import { setItem, getItem } from "../../utils/storage";
import { postStackApiCalling } from "../../libs/apiCalling/mongoAnalytics";
import { getSession, getSessionId, setSessionObject } from "./session";
import { AUTH_KEY } from "../../utils/strings";
import { isNotAnalyticsEnable } from "../../utils/index";
import { store } from "../../../../redux/store";
import JniKeys from "@HybridComponents/JniKeys";
import NetInfo from "@react-native-community/netinfo";
import moment from "moment-timezone";
import AsyncStorage from "@react-native-community/async-storage";
const STACK_OBJECT_KEY = "stackObject";
const SCREEN_NO = "screen_sequence_number";
const EVENT_NO = "sequence_no";
import { SESSION_ID_KEY } from "./session";
import { makeSessionMongo } from "@fast_track/src/utils/horizonAnalytics";
//update screen sequance by adding key pair values in async function when a session is created
// before  push a stack/trail update the screen sequance number and use it in stack and push stack accordingly
export const getAllStackObject = async () => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  let stackObject = await getItem(STACK_OBJECT_KEY);
  if (stackObject === null) {
    stackObject = {};
  } else {
    try {
      stackObject = JSON.parse(stackObject);
    } catch (error) {
      stackObject = {};
    }
  }
  return stackObject;
};

export const setStackObject = async (stackObject) => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  const stackObjectStringify = await JSON.stringify(stackObject);
  await setItem(STACK_OBJECT_KEY, stackObjectStringify);
};

export const makeStack = async (stackObject) => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  if (typeof (await AsyncStorage.getItem(SESSION_ID_KEY)) != "string") {
    await makeSessionMongo();
  }
  //fetching screen sequance number to update its values
  let screenSequenceNumber = 0;
  let eventNo = 0;
  try {
    screenSequenceNumber = await getItem(SCREEN_NO);
    eventNo = await getItem(EVENT_NO);
    if (stackObject.changeSequenceNumber === true) {
      if (
        screenSequenceNumber === undefined ||
        screenSequenceNumber == "" ||
        screenSequenceNumber === null
      ) {
        screenSequenceNumber = "0";
      }
      screenSequenceNumber = parseInt(screenSequenceNumber) + 1;
    }

    if (eventNo === undefined || eventNo == "" || eventNo === null) {
      eventNo = "0";
    }

    eventNo = parseInt(eventNo) + 1;
  } catch (error) {}

  let state = await store.getState();
  const netState = await NetInfo.fetch();
  let LocationList = state.locationReducer?.LocationList;
  let locationIndex = state.locationReducer?.locationIndex;
  let location =
    LocationList?.length > 0 && locationIndex >= 0
      ? LocationList[locationIndex]
      : {};

  let stackData = {
    current_screen: "",
    screen_sequence_number: screenSequenceNumber?.toString() || "1",
    sequence_no: eventNo.toString(),
    action: "",
    category_id: "",
    categories: "",
    categories_analytics: "",
    location_id: "",
    lat: location?.lat?.toString() || "",
    lng: location?.lng?.toString() || "",

    location_id: location?.id || "",

    network: netState.type,
  };
  //if user don't send proper key value pair then we implicitly adding values
  stackData = {
    ...stackData,
    ...stackObject,
  };

  let allStackObject = await getAllStackObject();
  const sessionId = await getSessionId();

  let stackArray = await getStackArray();

  stackArray.push(stackData);
  allStackObject[sessionId] = stackArray;

  setItem(SCREEN_NO, screenSequenceNumber);
  setItem(EVENT_NO, eventNo);
  await setStackObject(allStackObject);
};

export const getStackArray = async () => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  let allStackObject = await getAllStackObject();
  const sessionId = await getSessionId();
  let stackArray = allStackObject[sessionId];

  if (stackArray) {
    return stackArray;
  }
  return [];
};

export const resetStackObject = async () => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  const stackObject = {};
  const stackObjectStringify = JSON.stringify(stackObject);
  setItem(SCREEN_NO, 0);
  setItem(EVENT_NO, 0);
  await setItem(STACK_OBJECT_KEY, stackObjectStringify);
};
export const postStack = async () => {
  try {
    if (isNotAnalyticsEnable()) {
      return;
    }
    let allStackObject = await getAllStackObject();
    const authToken = await JniKeys.getKey(AUTH_KEY);
    const sessionId = await getSessionId();
    for (let [key, value] of Object.entries(allStackObject)) {
      let getSessionObject = await getSession();
      console.log({ getSessionObject }, key, "after analytics");
      const header = getSessionObject[key];
      const body = value;
      if (key != sessionId) {
        if (header !== undefined && body !== undefined) {
          try {
            const bodyOkay = {
              header: header,
              body: body,
            };
            const headerOkay = {
              AuthorizationToken: authToken,
            };
            const apiResponse = await postStackApiCalling(headerOkay, bodyOkay);
            console.log(apiResponse, "log-analytics");
            if (apiResponse?.success) {
              await setStackAndSessionObjectAfterPost(key);
            }
            setItem(SCREEN_NO, 0);
            setItem(EVENT_NO, 0);
          } catch (error) {
            console.log({ error }, "log-analytics");
          }
        } else {
          console.log(header, body, key, "log-analytics");
          await setStackAndSessionObjectAfterPost(key);
        }
      }
    }
  } catch (error) {
    console.log(error, "log-analytics");
    throw Error(error.message);
  }
};

export const setStackAndSessionObjectAfterPost = async (key) => {
  if (isNotAnalyticsEnable()) {
    return;
  }
  try {
    let allStackObject = await getAllStackObject();
    let stack = { ...allStackObject };
    delete stack[key];
    await setStackObject(stack);
  } catch (error) {}
  try {
    let getSessionObject = await getSession();
    let session = { ...getSessionObject };
    delete session[key];
    await setSessionObject(session);
  } catch (error) {}
};
