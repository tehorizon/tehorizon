import { takeLatest, put } from "@fast_track/node_modules/redux-saga/effects";
import { UserActionTypes } from "../types";
import {
  GetProfileRequestParams,
  UploadProfileImageRequestParams,
  LogoutRequest,
  RedemptionHistoryRequest,
  ForgotPasswordRequest,
  SavingHistoryRequest,
  updateProfileRequestParams,
} from "../../interfaces";
import { UserProfileDataType } from "@Profile/BL/Interfaces";

import {
  logoutSuccess,
  setAppLoading,
  setAppValues,
  setErrorObject,
} from "@redux/appReducer/app.actions";
import { setUser } from "../actions";
import UserProfileBL from "@Profile/BL";
import { AppActionTypes } from "@redux/appReducer/app.types";
import { Alert } from "react-native";
import I18n from "@localization";

function* getProfileRequest(params: {
  type: string;
  data: GetProfileRequestParams;
}) {
  let { postData } = params.data;

  try {
    yield put(setAppLoading(true));
    const { currency, language, token } = postData;
    const userProfile: UserProfileDataType = yield UserProfileBL.userProfile(
      token,
      language,
      currency
    );
    yield put(setUser(userProfile));
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* uploadProfileImageRequest(params: {
  type: string;
  data: UploadProfileImageRequestParams;
}) {
  let { postData, refreshProfile } = params.data;
  try {
    yield put(setAppLoading(true));
    yield UserProfileBL.UpateUserProfilemage(postData);
    yield put(setAppLoading(false));
    refreshProfile();
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* logoutRequest(params: { type: string; data: LogoutRequest }) {
  let { postData } = params.data;
  try {
    yield put(setAppLoading(true));
    yield UserProfileBL.logout(postData.token);
    yield put(setAppLoading(false));
    yield put(logoutSuccess());
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* redemptionHistoryRequest(params: {
  type: string;
  data: RedemptionHistoryRequest;
}) {
  let { postData, setRedemptionData } = params.data;
  try {
    yield put(setAppLoading(true));
    const data = yield UserProfileBL.redemptionHistory(postData);
    setRedemptionData(data);
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* forgotPasswordRequest(params: {
  type: string;
  data: ForgotPasswordRequest;
}) {
  let { postData, setDoneMessage, setIsResetSuccessModalVisible } = params.data;
  try {
    yield put(setAppLoading(true));
    console.log("forgotPasswordRequest: ", postData);
    const forgotResponse = yield UserProfileBL.forgotPassword(postData);
    setIsResetSuccessModalVisible(true);
    setDoneMessage(forgotResponse);
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* savingHistoryRequest(params: {
  type: string;
  data: SavingHistoryRequest;
}) {
  let { postData, onChangeTabHandler } = params.data;
  try {
    yield put(setAppLoading(true));
    const redemData = yield UserProfileBL.userSaving(postData);
    onChangeTabHandler(redemData, postData.activeTab);
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* accountInfoRequest(params: { type: string; data: LogoutRequest }) {
  let { postData, deleteAccountCall } = params.data;
  try {
    yield put(setAppLoading(true));
    const response = yield UserProfileBL.deleteUserInfo(postData.token);
    if (response?.data?.account_deletion_status) {
      Alert.alert(
        "Delete Account",
        response?.data?.deletion_in_process_message,
        [
          {
            text: I18n.t("Ok"),
            onPress: () => {},
          },
        ]
      );
    } else {
      Alert.alert(
        response?.data?.alert_dialogue?.title,
        response?.data?.alert_dialogue?.message,
        [
          {
            text: response?.data?.alert_dialogue?.cancel_button_title,
            style: "cancel",
          },
          {
            text: response?.data?.alert_dialogue?.delete_button_title,
            style: "destructive",
            onPress: () => {
              deleteAccountCall && deleteAccountCall();
            },
          },
        ]
      );
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* deleteUserRequest(params: { type: string; data: LogoutRequest }) {
  let { postData } = params.data;
  try {
    yield put(setAppLoading(true));
    const response = yield UserProfileBL.deleteUser(postData.token);
    if (response?.data?.account_deletion_status) {
      Alert.alert(
        "Delete Account",
        response?.data?.deletion_in_process_message,
        [
          {
            text: I18n.t("Ok"),
          },
        ]
      );
    }
    // yield UserProfileBL.logout(postData.token);
    yield put(setAppLoading(false));
    // yield put(logoutSuccess());
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* updateProfileRequest(params: {
  type: string;
  data: updateProfileRequestParams;
}) {
  let { postData, showLoading, navigation, callBack } = params.data;

  try {
    yield showLoading && put(setAppLoading(true));
    yield UserProfileBL.updateProfile(postData);
    yield callBack && callBack();
    yield navigation?.goBack();
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

export function* ProfileSagas() {
  yield takeLatest(UserActionTypes.GET_PROFILE_REQUEST, getProfileRequest);
  yield takeLatest(
    UserActionTypes.UPLOAD_PROFILE_IMAGE_REQUEST,
    uploadProfileImageRequest
  );
  yield takeLatest(UserActionTypes.LOGOUT_REQUEST, logoutRequest);
  yield takeLatest(
    UserActionTypes.REDEMPTION_HISTORY_REQUEST,
    redemptionHistoryRequest
  );
  yield takeLatest(
    UserActionTypes.SAVING_HISTORY_REQUEST,
    savingHistoryRequest
  );
  yield takeLatest(
    UserActionTypes.FORGOT_PASSWORD_REQUEST,
    forgotPasswordRequest
  );
  yield takeLatest(UserActionTypes.ACCOUNT_INFO_REQUEST, accountInfoRequest);
  yield takeLatest(UserActionTypes.DELETE_ACCOUNT_REQUEST, deleteUserRequest);
  yield takeLatest(
    UserActionTypes.UPDATE_PROFILE_REQUEST,
    updateProfileRequest
  );
}
