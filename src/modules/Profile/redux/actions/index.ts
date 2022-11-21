import { UserActionTypes } from "../types";
import {
  GetProfileRequestParams,
  UploadProfileImageRequestParams,
  LogoutRequest,
  RedemptionHistoryRequest,
  ForgotPasswordRequest,
  SavingHistoryRequest,
} from "../../interfaces";

export const setUser = (data) => ({
  type: UserActionTypes.SET_USER,
  data: data,
});

export const setToken = (data) => ({
  type: UserActionTypes.SET_TOKEN,
  data: data,
});

export const setUserValues = (data) => ({
  type: UserActionTypes.SET_USER_VALUES,
  data: data,
});

export const getProfileRequest = (data: GetProfileRequestParams) => ({
  type: UserActionTypes.GET_PROFILE_REQUEST,
  data,
});

export const uploadProfileImageRequest = (
  data: UploadProfileImageRequestParams
) => ({
  type: UserActionTypes.UPLOAD_PROFILE_IMAGE_REQUEST,
  data,
});

export const logoutRequest = (data: LogoutRequest) => ({
  type: UserActionTypes.LOGOUT_REQUEST,
  data,
});

export const redemptionHistoryRequest = (data: RedemptionHistoryRequest) => ({
  type: UserActionTypes.REDEMPTION_HISTORY_REQUEST,
  data,
});

export const forgotPasswordRequest = (data: ForgotPasswordRequest) => ({
  type: UserActionTypes.FORGOT_PASSWORD_REQUEST,
  data,
});

export const savingHistoryRequest = (data: SavingHistoryRequest) => ({
  type: UserActionTypes.SAVING_HISTORY_REQUEST,
  data,
});

export const accountInfoRequest = (data: LogoutRequest) => ({
  type: UserActionTypes.ACCOUNT_INFO_REQUEST,
  data,
});

export const deleteAccountRequest = (data: LogoutRequest) => ({
  type: UserActionTypes.DELETE_ACCOUNT_REQUEST,
  data,
});
export const updateProfileRequest = (data: LogoutRequest) => ({
  type: UserActionTypes.UPDATE_PROFILE_REQUEST,
  data,
});
