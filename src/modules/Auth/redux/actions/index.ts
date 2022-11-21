import { ActionTypes } from "../types";
import { RequestTypes } from "../../interfaces";
import { LoginDataType } from "@Auth/BL/Interfaces";

export const loginRequest = (data: RequestTypes.login) => ({
  type: ActionTypes.LOGIN_REQUEST,
  data,
});

export const signupRequest = (data: RequestTypes.registration) => ({
  type: ActionTypes.REGISTRATION_REQUEST,
  data,
});

export const forgotPasswordRequest = (data: RequestTypes.forgotPassword) => ({
  type: ActionTypes.FORGOT_PASSWORD_REQUEST,
  data,
});

export const setCaptchaToken = (captchaToken: string) => ({
  type: ActionTypes.AUTH_UPDATE_CAPTCHA_TOKEN,
  captchaToken,
});

export const setForceLogin = (force_login: boolean) => ({
  type: ActionTypes.AUTH_UPDATE_FORCE_LOGIN,
  force_login,
});

export const updateResendEmail = (resendEmail: RequestTypes.resendEmail) => ({
  type: ActionTypes.AUTH_UPDATE_RESEND_EMAIL,
  resendEmail,
});

export const updateAlreadyLoginData = (
  alreadyLoginData: RequestTypes.alreadyLoginData
) => ({
  type: ActionTypes.AUTH_UPDATE_ALREADY_LOGIN_DATA,
  alreadyLoginData,
});

export const updateLoginData = (loginData: LoginDataType) => ({
  type: ActionTypes.AUTH_UPDATE_LOGIN_DATA,
  loginData,
});

export const setRegistrationSuccessString = (message: string) => ({
  type: ActionTypes.AUTH_UPDATE_REGISTRATION_SUCCESS_MSG,
  message,
});

export const setLoginShow = (alreadyLoginShow: boolean) => ({
  type: ActionTypes.AUTH_UPDATE_LOGIN_SHOW,
  alreadyLoginShow,
});
