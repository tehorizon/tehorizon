import { invokeApi, Urls } from "@network";
import { outletsApiResponse } from "./responses";

import {
  outletParams,
  outletParamsMaps,
  outletSearchApiParams,
} from "../Interfaces";
import { outletErrorHandler } from "./error-handler";
import AppConfig from "@fast_track/src/AppConfig.json";

export const getOutlets = async (token: string, params: outletParams) => {
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
      errorHandler: outletErrorHandler,
    };

    if (AppConfig.mode === "test") {
      return outletsApiResponse();
    }
    return invokeApi(requestObj);
  } catch (error) {
    console.log(error);
  }
};

export const getOutletsMaps = async (
  token: string,
  params: outletParamsMaps
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
      errorHandler: outletErrorHandler,
    };

    if (AppConfig.mode === "test") {
      return outletsApiResponse();
    }

    return invokeApi(requestObj);
  } catch (error) {
    console.log(error);
  }
};

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
      errorHandler: outletErrorHandler,
    };

    if (AppConfig.mode === "test") {
      return outletsApiResponse();
    }

    return invokeApi(requestObj);
  } catch (error) {
    console.log(error);
  }
};
