import { invokeApi } from "@network";
import { homeApiResponse } from "./responses/index";
import { HomeAPIdataType, RequestObjectDataType } from "../Interfaces";
import { Urls } from "@network";
import i18n from "@localization";
import AppConfig from "@fast_track/src/AppConfig.json";

const homeErrorHandler = (error: any, requestData?: any) => {
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

export const homeApi = (data: HomeAPIdataType) => {
  let requestObj: RequestObjectDataType = {
    path: Urls.HOME_BASE_URL,
    method: "GET",
    headers: {
      Authorization: "Bearer " + data.token,
    },
    errorHandler: homeErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return homeApiResponse();
  }
  return invokeApi(requestObj);
};

export const locationListApi = (token: string) => {
  let requestObj: RequestObjectDataType = {
    path: Urls.CONFIG_BASE_URL + "locations",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: homeErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return homeApiResponse();
  }
  return invokeApi(requestObj);
};
