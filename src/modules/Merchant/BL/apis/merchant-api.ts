import { Urls, invokeApi } from "@network";
import { merchantByIdApiResponse } from "./responses";
import { merchantErrorHandler } from "./error-handler";
import AppConfig from "@fast_track/src/AppConfig.json";

export const merchantById = async (token: string, merchant_id: number) => {
  let requestObj = {
    path: Urls.MERCHANT_BASE_URL + `merchants/${merchant_id}`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: merchantErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return merchantByIdApiResponse();
  }

  return invokeApi(requestObj);
};
