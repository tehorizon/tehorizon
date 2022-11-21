import { invokeApi } from "@network";
import { analyticsErrorHandler } from "./error-handler";
const mongoDomain = "https://entqaapi.etenvbiz.com";
export const sendAppFlyerAnalytics = async (devId, appId, body) => {
  let requestObj = {
    path: `${mongoDomain}/inappevent/${appId}`,
    method: "POST",
    headers: {
      authentication: devId,
    },
    errorHandler: analyticsErrorHandler,
    appendCommonParams: false,
    analyticsCall: true,
  };
  requestObj["postData"] = body;

  return invokeApi(requestObj);
};
