import { invokeApi, Urls } from "@network";
import { deliveryLocationApiResponse } from "./responses";
import {
  RequestObjectDataType,
  addLocationDataType,
  getDeliveryOutletsI,
  updateLocationDataType,
  pendingOrderStatusType,
  orderStatusDataType,
  orderDetailsDataType,
  cashlessOrderHistoryDataType,
  editOrderDetailsDataType,
  reOrderValidationDataType,
} from "../Interfaces";
import { Base64 } from "rn-gzip";
import JniKeys from "@HybridComponents/JniKeys";
import { store } from "@redux/store";
import { deliveryErrorHandler } from "./error-handler";
import { getEncyptedString } from "@network";

const getUrl = (path: string) => Urls?.DELIVERY_BASE_URL + path;
const getCashlessUrl = (path: string) => Urls.DELIVERY_CASHLESS + path;

export const deliveryLocationApi = async () => {
  const state = store.getState();
  let postData = {};

  if (state.userReducer?.userSessionToken === "")
    throw new Error("Token not found");
  if (state.appReducer.deviceInfo.language === "")
    throw new Error("language not found");

  let requestObj: RequestObjectDataType = {
    path: getUrl(`user/delivery_locations`),
    method: "POST",
    headers: {
      Authorization: "Bearer " + state.userReducer?.token,
    },
    postData: {
      params: await getEncyptedString(postData),
    },
    errorHandler: deliveryErrorHandler,
  };

  return invokeApi(requestObj);
};

export const addNewLocationApi = async (data: addLocationDataType) => {
  const state = store.getState();
  let postData = {
    //const state = store.getState();
    ...data,
  };

  if (state.userReducer?.userSessionToken === "")
    throw new Error("Token not found");
  if (state.appReducer.deviceInfo.language === "")
    throw new Error("language not found");

  let requestObj: RequestObjectDataType = {
    path: getUrl(`user/add_delivery_location`),
    method: "POST",
    headers: {
      Authorization: "Bearer " + state.userReducer?.token,
    },
    postData: {
      params: await getEncyptedString(postData),
    },
    errorHandler: deliveryErrorHandler,
  };
  return await invokeApi(requestObj);
};

export const updateLocationApi = (data: updateLocationDataType) => {
  const state = store.getState();
  let postData = {
    //const state = store.getState();
    ...data,
  };

  if (state.userReducer?.userSessionToken === "")
    throw new Error("Token not found");
  if (state.appReducer.deviceInfo.language === "")
    throw new Error("language not found");

  let requestObj: RequestObjectDataType = {
    path: getUrl("user/update_delivery_location"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + state.userReducer?.token,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };
  return invokeApi(requestObj);
};

export const deleteNewLocationApi = (delivery_location_id: string) => {
  const state = store.getState();
  let postData = {
    //const state = store.getState();
    delivery_location_id,
  };

  if (state.userReducer?.userSessionToken === "")
    throw new Error("Token not found");
  if (state.appReducer.deviceInfo.language === "")
    throw new Error("language not found");

  let requestObj: RequestObjectDataType = {
    path: getUrl("user/remove_delivery_location"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + state.userReducer?.token,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };
  return invokeApi(requestObj);
};

export const getOutletsApi = (data: getDeliveryOutletsI, token: string) => {
  // const state = store.getState();
  let postData = {
    ...data,
    encryption_disable_key: "0af5d6f0-4dd9-498d-8d2c-acf8c80ad9ba",
  };
  let requestObj: RequestObjectDataType = {
    path: getUrl("outlets"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };
  console.log({ requestObj, url: getUrl("outlets") }, "api");

  return invokeApi(requestObj);
};

export const getOutletDetailApi = async (data: any, token: string) => {
  let postData = {
    ...data,
    // encryption_disable_key: "0af5d6f0-4dd9-498d-8d2c-acf8c80ad9ba",
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl(`merchants/${data.merchant_id}`),
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };

  return invokeApi(requestObj);
};

export const getPendingOrderStatus = async () => {
  let postData = {
    //const state = store.getState();
  };
  console.log("requestdata===PendingOrder", postData);
  let requestObj: RequestObjectDataType = {
    path: getCashlessUrl("/cashless/pending_order_status"),
    method: "POST",

    headers: {
      Authorization: `Basic ${Base64.btoa(
        `${await JniKeys.getKey("CASHLESS_USERNAME")}:${await JniKeys.getKey(
          "CASHLESS_PASSWORD"
        )}`
      )}`,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };

  return invokeApi(requestObj);
};

export const orderStatusesApi = (data: orderStatusDataType) => {
  const state = store.getState();
  let postData = {
    //const state = store.getState();
    ...data,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl(`cashless/order_current_status`),
    method: "POST",
    headers: {
      Authorization: "Bearer " + state.userReducer?.token,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };
  return invokeApi(requestObj);
};

export const orderStatusDetailsApi = (data: orderDetailsDataType) => {
  const state = store.getState();
  let postData = {
    //const state = store.getState();
    ...data,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl(`cashless/order_details`),
    method: "POST",
    headers: {
      Authorization: "Bearer " + state.userReducer?.token,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };
  console.log("requestObj123: ", requestObj);
  return invokeApi(requestObj);
};

export const editOrderDetailsApi = async (data: editOrderDetailsDataType) => {
  let postData = {
    //const state = store.getState();
    ...data,
  };
  let requestObj: RequestObjectDataType = {
    path: getCashlessUrl("/cashless/edit_order"),
    method: "POST",
    headers: {
      Authorization: `Basic ${Base64.btoa(
        `${await JniKeys.getKey("CASHLESS_USERNAME")}:${await JniKeys.getKey(
          "CASHLESS_PASSWORD"
        )}`
      )}`,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };

  return invokeApi(requestObj);
};

export const cashlessOrderHistoryDetailsApi = (
  data: cashlessOrderHistoryDataType
) => {
  const state = store.getState();
  let postData = {
    //const state = store.getState();
    ...data,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl(`cashless/order_history`),
    method: "POST",
    headers: {
      Authorization: "Bearer " + state.userReducer?.token,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };
  console.log("requestObj: ", requestObj);
  return invokeApi(requestObj);
};

export const cancelOrderAPI = (data: orderStatusDataType) => {
  const state = store.getState();
  let postData = {
    //const state = store.getState();
    ...data,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl(`cashless/cancel_order`),
    method: "POST",
    headers: {
      Authorization: "Bearer " + state.userReducer?.token,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };
  return invokeApi(requestObj);
};

export const validateReorderAPI = async (data: reOrderValidationDataType) => {
  const state = store.getState();
  let postData = {
    //const state = store.getState();
    ...data,
  };
  let requestObj: RequestObjectDataType = {
    path: getCashlessUrl("/cashless/re-order/validation"),
    method: "POST",
    headers: {
      Authorization: `Basic ${Base64.btoa(
        `${await JniKeys.getKey("CASHLESS_USERNAME")}:${await JniKeys.getKey(
          "CASHLESS_PASSWORD"
        )}`
      )}`,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    postData: postData,
    errorHandler: deliveryErrorHandler,
  };

  console.log("validateReorderAPI request object: ", requestObj);

  return invokeApi(requestObj);
};
