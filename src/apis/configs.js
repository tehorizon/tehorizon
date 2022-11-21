import { invokeApi } from "@network";
import { ConfigsApiResponse } from "./responses";
import apiInfo from "./info.json";
import appConfigs from "../AppConfig.json";
import EndPoints from "../EndPoints.json";
import { configErrorHandler } from "./error-handler";

const mode = apiInfo.mode;

const currentEnvEndPoint = EndPoints[appConfigs.env];

export const configs = (token) => {
  if (token == null || token === "") {
    throw { messageType: "tokenError", messageText: "Token not found" };
  }

  let requestObj = {
    path: currentEnvEndPoint.configService,
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: configErrorHandler,
  };

  if (mode === "test") {
    return ConfigsApiResponse();
  }

  return invokeApi(requestObj);
};
