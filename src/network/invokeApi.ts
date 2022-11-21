import I18n from "@localization";
import { logoutSuccess } from "@redux/appReducer/app.actions";
import { store } from "@redux/store";
import axios from "axios";
import { getCommonParams } from "./networkHelpers";
axios.defaults.headers.post["Content-Type"] = "application/json";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
  errorHandler = (error: any, requestData: any) => {},
  appendCommonParams = true,
  analyticsCall = false,
}: any) {
  const commonParams = getCommonParams();
  let reqObj = {
    method: method,
    url: path,
    headers: {
      ...headers,
    },
  };

  postData = appendCommonParams ? { ...commonParams, ...postData } : postData;
  queryParams = appendCommonParams
    ? { ...commonParams, ...queryParams }
    : queryParams;
  console.log("invokeApi", { reqObj, postData, queryParams });

  if (method === "POST" || method === "PUT") {
    reqObj["data"] = postData;
  } else {
    reqObj["params"] = queryParams;
  }
  let results = undefined;
  try {
    results = await axios(reqObj);
    console.log("invokeApi", { results });
    return results.data;
  } catch (error: any) {
    console.log({ error }, "invokeApi");
    if (
      !analyticsCall &&
      (error?.response?.status === 401 || error?.response?.status === 403)
    ) {
      // logout
      store.dispatch(logoutSuccess());
      throw Error();
    } else {
      errorHandler(error, postData);
    }
  }
}
