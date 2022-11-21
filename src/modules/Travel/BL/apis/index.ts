import { invokeApi } from "@network";
import { countryListResponse } from "./responses/index";
import { HomeAPIdataType, RequestObjectDataType } from "../Interfaces";
import { Urls } from "@network";
import i18n from "@localization";
import AppConfig from "@fast_track/src/AppConfig.json";
import { Base64 } from "rn-gzip";
import JniKeys from "@HybridComponents/JniKeys";
import { getEncyptedString } from "@network";

const travelErrorHandler = (error: any, requestData?: any) => {
  if (error?.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else if (error?.response?.statusText) {
    if (error.response?.status === 500 || error.response?.status === 502) {
      throw new Error("Oops! Some Thing Went Wrong!");
    } else {
      throw new Error(error.response?.statusText);
    }
  } else {
    throw new Error(i18n.t("you_need_internet"));
  }
};

export const countryListApi = async (postData: any) => {
  let requestObj: RequestObjectDataType = {
    path: Urls.TRAVEL_BASE_URL + "country",
    method: "POST",
    headers: {
      Authorization: `Basic ${Base64.btoa(
        `${await JniKeys.getKey("BASIC_AUTH_API_USER")}:${await JniKeys.getKey(
          "BASIC_API_PASSWORD"
        )}`
      )}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    postData: { params: await getEncyptedString(postData) },
    errorHandler: travelErrorHandler,
    // appendCommonParams: false,
  };

  if (AppConfig.mode === "test") {
    return countryListResponse();
  }
  return invokeApi(requestObj);
};
