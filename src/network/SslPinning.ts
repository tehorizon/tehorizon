import i18n from "i18next";
import { fetch, ReactNativeSSLPinning } from "react-native-ssl-pinning";
import qs from "qs";
import { getCommonParams } from "./networkHelpers";
import { getSslKeys } from "./SslHelper";
import { store } from "@redux/store";
import { logoutSuccess } from "@redux/appReducer/app.actions";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
  errorHandler = (error: any, requestData: any) => {},
  appendCommonParams = true,
  isFormData = false,
  analyticsCall = false,
}: any) {
  let options: ReactNativeSSLPinning.Options = {
    method: method,
    pkPinning: true, // android
    headers: {
      ...headers,
    },
    sslPinning: {
      certs: [...getSslKeys()],
    },
  };

  const commonParams = getCommonParams();
  postData = appendCommonParams ? { ...commonParams, ...postData } : postData;
  queryParams = appendCommonParams
    ? { ...commonParams, ...queryParams }
    : queryParams;
  if (method === "POST" || method === "PUT") {
    if (!isFormData) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(postData);
    } else {
      options.body = postData;
    }
  }

  let results = null;
  console.log(
    {
      method:
        method === "POST"
          ? path
          : `${path}?${qs.stringify(queryParams, {
              arrayFormat: "brackets",
            })}`,
      options,
    },
    "invokeAPI SSL"
  );
  console.log({ postData, queryParams }, "invokeAPI SSL");

  try {
    results = await fetch(
      method === "POST"
        ? path
        : `${path}?${qs.stringify(queryParams, {
            arrayFormat: "brackets",
          })}`,
      options
    );
    console.log({ results }, "invokeAPI SSL");

    if (!(results?.status == 200 || results?.status == 201)) {
      throw Error(i18n.t("Something_went_wrong"));
    }
    let data;
    if (results.bodyString.includes("{")) {
      data = JSON.parse(results.bodyString);
    } else {
      data = results.bodyString;
    }
    console.log({ results: data }, "invokeAPI SSL");
    return data;
  } catch (error: any) {
    console.log({ error }, "invokeAPI SSL");

    if (
      typeof error == "string" &&
      (error?.toLowerCase()?.includes("certificate") ||
        error?.toLowerCase()?.includes("security"))
    ) {
      /*
       * ssl error has "security" in it
       **/
      throw new Error(i18n.t("SSL_ERROR"));
    } else {
      if (
        !analyticsCall &&
        (error?.response?.status === 401 ||
          error?.response?.status === 403 ||
          error?.status == 401 ||
          error?.status == 403)
      ) {
        // logout
        store.dispatch(logoutSuccess());
        throw Error();
      } else {
        let errorBody = {};
        try {
          if (error?.bodyString && JSON.parse(error.bodyString)) {
            errorBody = JSON.parse(error.bodyString);
            errorBody = {
              response: {
                status: errorBody.http_response,
                code: errorBody.code,
                data: {
                  message: errorBody.message,
                  code: errorBody.code,
                },
                statusText: errorBody.message,
              },
            };
          }
        } catch (e) {
          console.log({ error: e });

          throw Error("Oops! Some Thing Went Wrong!");
        }
        console.log({ errorBody });
        errorHandler(errorBody, postData);
      }
    }
  }
}
