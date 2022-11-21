// const { invokeApi } = require('../invokeApi');
import { invokeApi } from "../invokeApi";

// const mongoDomain = 'https://api.theentertainerme.com';
import EndPoints from "../../../../src/EndPoints.json";
import appConfigs from "../../../../src/AppConfig.json";
const currentEnvEndPoint = EndPoints[appConfigs.env];
const mongoDomain = currentEnvEndPoint.analyticsService;

export const postStackApiCalling = async (header, body) => {
  let requestObj = {
    path: `${mongoDomain}/log-analytics`,
    method: "POST",
    headers: header,
  };

  requestObj["postData"] = body;

  return invokeApi(requestObj);
};
