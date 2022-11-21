import { invokeApi, Urls } from "@network";
import { outletsApiResponse } from "./responses";
import { outletSearchApiParams } from "../../interfaces";
import { searchErrorHandler } from "./error-handler";
import AppConfig from "@fast_track/src/AppConfig.json";

export const outletSearch = async (
  token: string,
  params: outletSearchApiParams
) => {
  try {
    let requestObj = {
      path: Urls.OUTLET_BASE_URL,
      queryParams: {
        ...params,
      },

      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      errorHandler: searchErrorHandler,
    };
    console.log({ requestObj });
    if (AppConfig.mode === "test") {
      return outletsApiResponse();
    }

    return invokeApi(requestObj);
  } catch (error) {
    console.log(error);
  }
};
