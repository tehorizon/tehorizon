import { invokeApi } from "@network";
import appConfigs from "../../../../AppConfig.json";
import EndPoints from "../../../../EndPoints.json";
import { analyticsErrorHandler } from "./error-handler";
const currentEnvEndPoint = EndPoints[appConfigs.env];

const mongoDomain = currentEnvEndPoint.analyticsService;

export const postStackApiCalling = async (header, body) => {
  let requestObj = {
    path: `${mongoDomain}/log-analytics`,
    method: "POST",
    headers: header,
    errorHandler: analyticsErrorHandler,
    appendCommonParams: true,
    analyticsCall: true,
  };

  requestObj["postData"] = body;

  return invokeApi(requestObj);
};
