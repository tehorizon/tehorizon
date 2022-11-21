import { invokeApi, Urls } from "@network";
import { tabsApiResponse } from "./responses";
import { tabsParams } from "../Interfaces";
import { outletErrorHandler } from "./error-handler";
import AppConfig from "@fast_track/src/AppConfig.json";

export const getTabs = async (token: string, params: tabsParams) => {
  let requestObj = {
    path: Urls.CONFIG_BASE_URL + "app/tabs",
    method: "GET",
    queryParams: {
      ...params,
    },

    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: outletErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return tabsApiResponse();
  }

  return invokeApi(requestObj);
};
