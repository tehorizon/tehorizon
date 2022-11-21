import { invokeApi, Urls } from "@network";
import { cheersApiResponse } from "./responses";
import { cheersParams } from "../Interfaces";
import { outletErrorHandler } from "./error-handler";
import AppConfig from "@fast_track/src/AppConfig.json";

export const getCheersData = async (token: string, params: cheersParams) => {
  let requestObj = {
    path: Urls.CONFIG_BASE_URL + "configs/cheers",
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
    return cheersApiResponse();
  }

  return invokeApi(requestObj);
};
