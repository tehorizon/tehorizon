import { invokeApi, Urls } from "@network";
import {
  updateUserApiResponse,
  getUserProfileApiResponse,
  signUpUserApiResponse,
  signInUserApiResponse,
  forgotPasswordApiResponse,
  ValidateVipKeyResponse,
} from "./responses";
import {
  RequestObjectDataType,
  SignupDataType,
  LoginDataType,
  ForgotPasswordDataType,
  ResendEmailDataType,
  DemographicsDataType,
} from "../Interfaces";
// import { getVIPKey } from "../getVIP";
import { authErrorHandler } from "./error-handler";
import AppConfig from "@fast_track/src/AppConfig.json";

const getUrl = (path: string) => Urls.AUTH_BASE_URL + path;

export const signUpUserApi = async (postData: SignupDataType) => {
  // let keyObject = {};
  // // const _vipKey = await getVIPKey();
  // // if (_vipKey) {
  // //   keyObject = {
  // //     key: _vipKey,
  // //   };
  // // }

  // if (data.captcha_token) {
  //   keyObject["captcha_token"] = data.captcha_token;
  // }

  // const postData = {
  //   ...data,
  //   ...keyObject
  // };

  let requestObj: RequestObjectDataType = {
    path: getUrl("signup"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + postData.token,
    },
    postData: postData,
    errorHandler: authErrorHandler,
  };

  if (AppConfig?.mode === "test") {
    return signUpUserApiResponse();
  }
  return invokeApi(requestObj);
};

export const loginUserApi = async (data: LoginDataType) => {
  // let keyObject = {};
  // const _vipKey = await getVIPKey();
  // if (_vipKey) {
  //   keyObject = {
  //     key: _vipKey,
  //   };
  // }
  // if (data?.captcha_token) {
  //   keyObject["captcha_token"] = data.captcha_token;
  // }

  const postData = {
    email: data.email,
    password: data.password,
    is_privacy_policy_accepted: data.privacyPolicyCheck,
    is_user_agreement_accepted: data.endUserLicenseAgreementCheck,
    force_login: data.force_login,
    platform: data.platform,
    key: data.key,
    i_c_e: data?.i_c_e,
    captcha_token: data?.captcha_token,
    // ...keyObject,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl("login"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + data.token,
    },
    postData: postData,
    errorHandler: authErrorHandler,
  };

  if (AppConfig?.mode === "test") {
    return signInUserApiResponse();
  }

  return invokeApi(requestObj);
};

export const forgotPasswordApi = (data: ForgotPasswordDataType) => {
  const postData = {
    email: data.email,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl("password/reset"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + data.token,
    },
    postData: postData,
    errorHandler: authErrorHandler,
  };

  if (AppConfig?.mode === "test") {
    return forgotPasswordApiResponse();
  }

  return invokeApi(requestObj);
};

export const ResendEmailApi = (data: ResendEmailDataType) => {
  const postData = {
    email: data.email,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl("email/resend"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + data.token,
    },
    postData: postData,
    errorHandler: authErrorHandler,
  };

  if (AppConfig?.mode === "test") {
    return forgotPasswordApiResponse();
  }

  return invokeApi(requestObj);
};

export const updateDemographicApi = (data: DemographicsDataType) => {
  const postData = {
    nationality: data.nationality,
    date_of_birth: data.date_of_birth,
    gender: data.gender,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl("profile"),
    method: "PUT",
    headers: {
      Authorization: "Bearer " + data.token,
    },
    postData: postData,
    errorHandler: authErrorHandler,
  };

  if (AppConfig?.mode === "test") {
    return updateUserApiResponse();
  }
  return invokeApi(requestObj);
};

export const getUserProfileApi = async ({ token, currency }) => {
  let requestObj: RequestObjectDataType = {
    path: getUrl("profile"),
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    queryParams: {
      currency,
    },
    errorHandler: authErrorHandler,
    appendCommonParams: false,
  };

  if (AppConfig?.mode === "test") {
    return getUserProfileApiResponse();
  }

  return invokeApi(requestObj);
};

export const ValidateVipKeyApi = async (token: string, body) => {
  let requestObj: RequestObjectDataType = {
    path: getUrl("validates"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: authErrorHandler,
  };
  requestObj["postData"] = body;
  if (AppConfig?.mode === "test") {
    return ValidateVipKeyResponse();
  }

  return invokeApi(requestObj);
};
