import { invokeApi, Urls } from "@network";
import { redemptionApiResponse } from "./responses";
import { merchantErrorHandler } from "./error-handler";
import AppConfig from "@fast_track/src/AppConfig.json";

export const redemption = (token: string, params: any) => {
  let requestObj = {
    path: Urls.REDEMPTION_SERVICE_URL + "offer/redeem",
    method: "POST",
    postData: {
      ...params,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: merchantErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return redemptionApiResponse();
  }

  return invokeApi(requestObj);
};
