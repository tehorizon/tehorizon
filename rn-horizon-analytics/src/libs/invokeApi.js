import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
import i18n from "i18next";

export const invokeApi = async ({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
}) => {
  let reqObj = {
    method: method,
    url: path,
    headers: headers,
  };
  reqObj["params"] = queryParams;
  if (method === "POST") {
    reqObj["data"] = postData;
  }
  let results = undefined;
  try {
    results = await axios(reqObj);
    return results.data;
  } catch (error) {
    console.log(
      "%c" + error.message + ": error",
      "font-weight:bold; color:red"
    );
    // if (error.response && error.response.data && error.response.data.message) {
    //   throw new Error(error.response.data.message);
    // } else if (
    //   error.response &&
    //   error.response.status &&
    //   error.response.statusText
    // ) {
    //   if (error.response.status === 401) {
    //   }
    //   throw new Error(error.response.statusText);
    // } else {
    //   throw new Error(i18n.t("you_need_internet"));
    // }
  }
};
