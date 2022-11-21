import { invokeApi, Urls } from "@network";
import {
  updateUserApiResponse,
  userProfileApiResponse,
  logOutApiResponse,
  forgotPasswordApiResponse,
} from "./responses/index";
import {
  ForgotPasswordDataType,
  RequestObjectDataType,
  UserUpdateDataType,
  RedemptionhistoryAPIdataType,
  UserSavingAPIdataType,
  userProfileImage,
} from "../Interfaces";
import { profileErrorHandler } from "./error-handler";
import AppConfig from "@fast_track/src/AppConfig.json";
import JniKeys from "@HybridComponents/JniKeys";

const getUrl = (path: string) => Urls.USER_BASE_URL + path;
const getDeleteUrl = (path: string) => Urls.USER_DELETE_BASE_URL + path;
export const updateUserProfileImageApi = (data: any, token) => {
  // const postData = {
  //     profile_image: data.profile_image,
  // };
  //TODO: remove this token
  let requestObj = {
    path: getUrl("profile/image"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      // "Content-Type": "multipart/form-data",
    },
    postData: data,
    appendCommonParams: false,
    isFormData: true,
    errorHandler: profileErrorHandler,
  };
  if (AppConfig.mode === "test") {
    return userProfileApiResponse();
  }
  return invokeApi(requestObj);
};

export const updateUserApi = (postData: UserUpdateDataType) => {
  let requestObj = {
    path: getUrl("profile"),
    method: "PUT",
    headers: {
      Authorization: "Bearer " + postData.token,
    },
    postData: postData,
    errorHandler: profileErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return updateUserApiResponse();
  }

  return invokeApi(requestObj);
};

export const getUserProfileApi = async (
  token: string,
  language: string,
  currency: string
) => {
  let requestObj = {
    path: getUrl("profile"),
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    queryParams: {
      language,
      currency,
    },
    errorHandler: profileErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return userProfileApiResponse();
  }

  return invokeApi(requestObj);
};

export const logOutApi = (token: string) => {
  let requestObj = {
    path: getUrl("logout"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: profileErrorHandler,
  };
  if (AppConfig.mode === "test") {
    return logOutApiResponse();
  }
  return invokeApi(requestObj);
};

export const forgotPasswordApi = (data: ForgotPasswordDataType) => {
  const postData = {
    email: data.email,
    language: data.language,
  };

  let requestObj: RequestObjectDataType = {
    path: getUrl("password/reset"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + data.token,
    },
    postData: postData,
    errorHandler: profileErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return forgotPasswordApiResponse();
  }

  return invokeApi(requestObj);
};

export const redemptionhistoryAPI = async (
  data: RedemptionhistoryAPIdataType
) => {
  const postData = {
    session_token: data.sessionToken,
    company: data.company,
    currency: data.currency,
    current_year: data.currentYear,
    language: data.language,
  };

  let requestObj: RequestObjectDataType = {
    path: Urls.REDEMPTION_URL,
    method: "POST",
    headers: {
      authorizationToken: await JniKeys.getKey("AuthToken"),
    },
    postData: postData,
    errorHandler: profileErrorHandler,
  };
  if (AppConfig.mode === "test") {
    return updateUserApiResponse();
  }
  return invokeApi(requestObj);
};

export const userSavingAPI = async (data: UserSavingAPIdataType) => {
  const postData: any = {
    session_token: data.sessionToken,
    company: data.company,
    currency: data.currency,
    summary_type: data.summaryType,
    language: data.language,
  };

  let requestObj = {
    path: Urls.SAVING_HISTORY_URL,
    method: "POST",
    headers: {
      authorizationToken: await JniKeys.getKey("AuthToken"),
    },
    postData: postData,
    errorHandler: profileErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return updateUserApiResponse();
  }
  return invokeApi(requestObj);
};

export const getHTMLapi = (token: string, url: string) => {
  const postData = {
    url: url,
  };

  let requestObj: RequestObjectDataType = {
    method: "POST",
    path: Urls.WEBPAGE_URL,
    headers: {
      Authorization: "Bearer " + token,
    },
    postData: postData,
    errorHandler: profileErrorHandler,
  };

  if (AppConfig.mode === "test") {
    return {
      data: {
        web_page_response: "<h1>TEST</h1>",
      },
    };
  }

  return invokeApi(requestObj);
};

export const deleteUserApi = (token: string) => {
  let requestObj = {
    path: getDeleteUrl("user/account/delete"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: profileErrorHandler,
  };
  if (AppConfig.mode === "test") {
    return logOutApiResponse();
  }
  return invokeApi(requestObj);
};

export const deleteUserInfoApi = (token: string) => {
  let requestObj = {
    path: getDeleteUrl("user/account/info"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    errorHandler: profileErrorHandler,
  };
  if (AppConfig.mode === "test") {
    return logOutApiResponse();
  }
  return invokeApi(requestObj);
};
