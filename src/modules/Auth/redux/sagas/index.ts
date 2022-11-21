import { takeLatest, put, select } from "redux-saga/effects";
import { RequestTypes } from "../../interfaces";
import { ActionTypes } from "../types";
import {
  logoutSuccess,
  setAppLoading,
  setErrorObject,
  setSkipMode,
} from "@redux/appReducer/app.actions";
import AuthBL from "@Auth/BL";
import ProfileBL from "@Profile/BL";
import {
  setRegistrationSuccessString,
  updateAlreadyLoginData,
  updateLoginData,
  updateResendEmail,
  loginRequest as loginRequestForce,
} from "../actions";
import { setToken, setUserValues } from "@Profile/redux/actions";
import emailValidation, { mobileValidate } from "@Auth/BL/Validator";
import I18n from "@localization";
import { store } from "@redux/store";
import appboy from "@HybridComponents/AppBoy";
import JniKeys from "@HybridComponents/JniKeys";
const { registerUserAppBoy, registrationCompleteEvent } = appboy;
import JWT from "expo-jwt";

const createJwt = async () => {
  const apiToken = await JniKeys.getKey("apiToken");
  const serectKey = await JniKeys.getKey("serectKey");
  const payload = {
    api_token: apiToken,
  };
  const jwt = JWT.encode(payload, serectKey);
  return jwt;
};

function* loginRequest(params: { type: string; data: RequestTypes.login }) {
  let {
    postData,
    checkCaptcha = () => {},
    toggleResendEmailPopup = () => {},
    makeAnalyticsStack = () => {},
    createSessionJwt = () => {},
    checkIsDemographic = () => {},
  } = params.data;
  try {
    yield put(setAppLoading(true));
    let {
      token,
      email,
      password,
      endUserLicenseAgreementCheck,
      privacyPolicyCheck,
    } = postData;

    // validation
    if (token == null || token == "") {
      const jwt = yield createJwt();
      yield put(setToken(jwt));
      postData.token = jwt;
    }

    if (!(email?.length > 0 && password?.length > 0)) {
      throw Error(I18n.t("All_fields_are_required"));
    } else if (!emailValidation(email)) {
      throw Error(I18n.t("Please_enter_a_valid_email"));
    } else if (!privacyPolicyCheck) {
      throw Error(I18n.t("Please_review_accept_the_Privacy_Policy"));
    } else if (!endUserLicenseAgreementCheck) {
      throw Error(
        I18n.t("Please_review_accept_the_End_User_License_Agreement")
      );
    }

    const { currency, sessionToken, logoutFromAnotherDevice, resendEmailData } =
      yield AuthBL.login(postData);

    yield put(logoutSuccess());
    yield checkCaptcha();
    if (resendEmailData) {
      yield put(updateResendEmail(resendEmailData));
      yield toggleResendEmailPopup();
      yield put(setAppLoading(false));
      return;
    }

    if (logoutFromAnotherDevice) {
      yield put(
        updateAlreadyLoginData({
          ...logoutFromAnotherDevice,
          alreadyLoginShow: true,
        })
      );
      yield put(updateLoginData(postData));
    } else {
      const sessionJwt: string = yield createSessionJwt(sessionToken);
      yield makeAnalyticsStack("Login", "login_success");
      let userProfile: Object = yield AuthBL.getUserProfile({
        token: sessionJwt,
        currency,
      });

      yield put(setToken(sessionJwt));
      yield put(setSkipMode(false));
      yield put(
        setUserValues({
          skipMode: false,
          userSessionToken: sessionToken,
          userInfo: userProfile,
        })
      );
      registerUserAppBoy(userProfile);
      yield checkIsDemographic(userProfile);
    }

    yield put(setAppLoading(false));
  } catch (e) {
    yield makeAnalyticsStack("Login", "login_fail");
    yield checkCaptcha();
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* signupRequest(params: {
  type: string;
  data: RequestTypes.registration;
}) {
  let {
    postData,
    navigation,
    checkCaptcha = () => {},
    toggleRegistrationSuccessModal = () => {},
    createSessionJwt = () => {},
    checkIsDemographic = () => {},
    makeAnalyticsStack = () => {},
  } = params.data;
  try {
    yield put(setAppLoading(true));

    let isDemographics =
      store?.getState()?.appReducer?.AppConfigs?.is_signup_with_demographic;
    let {
      token,
      email,
      password,
      confirm_password,
      country_of_residence,
      firstname,
      lastname,
      endUserLicenseAgreementCheck,
      privacyPolicyCheck,
      confirmEmail,
      mobile_phone,
    } = postData;

    // validation
    if (!token) {
      const jwt = yield createJwt();
      yield put(setToken(jwt));
      postData.token = jwt;
    }

    if (
      !email ||
      !password ||
      !confirm_password ||
      !country_of_residence ||
      (typeof mobile_phone == "string" && !mobile_phone)
    ) {
      throw {
        messageType: "emptyFields",
        messageText: I18n.t("Please_fill_in_all_the_required_fields"),
      };
    } else if (
      typeof mobile_phone == "string" &&
      !mobileValidate(mobile_phone)
    ) {
      throw {
        messageType: "inavlidMobile",
        messageText: I18n.t("Mobile number is invalid"),
      };
    } else if (!emailValidation(email)) {
      throw {
        messageType: "invalidEmailError",
        messageText: I18n.t("Please_enter_a_valid_email"),
      };
    } else if (password.length < 6) {
      throw {
        messageType: "passwordError",
        messageText: I18n.t("Please_enter_atleast_characters_for_password"),
      };
    } else if (password !== confirm_password) {
      throw {
        messageType: "passwordError",
        messageText: I18n.t("Password_and_confirm_password_do_not_match"),
      };
    } else if (!privacyPolicyCheck) {
      throw {
        messageType: "privacyPolicyError",
        messageText: I18n.t("Please_review_accept_the_Privacy_Policy"),
      };
    } else if (!endUserLicenseAgreementCheck) {
      throw {
        messageType: "endUserLicenseAgreementError",
        messageText: I18n.t(
          "Please_review_accept_the_End_User_License_Agreement"
        ),
      };
    }

    if (isDemographics) {
      if (typeof confirmEmail == "string" && confirmEmail != email) {
        throw {
          messageType: "confirmEmailError",
          messageText: I18n.t(
            "Email_and_confirm_email_do_not_match_Please_enter_the_same_email"
          ),
        };
      } else if (!firstname || !lastname)
        throw {
          messageType: "emptyFields",
          messageText: I18n.t("Please_fill_in_all_the_required_fields"),
        };
    }

    yield checkCaptcha();

    const { sessionToken, currency, message } = yield AuthBL.signup({
      ...postData,
      isDemographics,
    });
    yield put(logoutSuccess());
    if (message) {
      yield makeAnalyticsStack("Register", "register_success");
      yield put(setAppLoading(false));
      toggleRegistrationSuccessModal(true);
      put(setRegistrationSuccessString(message));
      return;
    }
    const sessionJwt: string = yield createSessionJwt(sessionToken);
    let userProfile: Object = yield AuthBL.getUserProfile({
      token: sessionJwt,
      currency,
    });

    yield put(setToken(sessionJwt));
    yield put(setSkipMode(false));
    yield put(
      setUserValues({
        skipMode: false,
        userSessionToken: sessionToken,
        userInfo: userProfile,
      })
    );

    registerUserAppBoy(userProfile);
    registrationCompleteEvent();
    yield put(setAppLoading(false));

    let appConfigs = store?.getState()?.appReducer?.AppConfigs;

    if (
      !(
        appConfigs?.first_time_registration_message &&
        appConfigs?.first_time_registration_message !== "" &&
        postData?.key != ""
      )
    ) {
      checkIsDemographic(userProfile);
    }
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({
        message: e?.message || e?.messageText,
        status: true,
        callBack:
          e?.code == 91
            ? () =>
                navigation?.navigate("Login", {
                  preEmail: postData?.email,
                  key: postData?.key,
                })
            : null, // user already exists
      })
    );
  }
}

function* forgotPasswordRequest(params: {
  type: string;
  data: RequestTypes.forgotPassword;
}) {
  let {
    postData,
    toggleForgetPasswordModal = () => {},
    doneMessageHandler = () => {},
  } = params.data;
  try {
    let { token, email } = postData;
    //validation
    if (!token) {
      const jwt = yield createJwt();
      yield put(setToken(jwt));
      postData.token = jwt;
    } else if (!email || !emailValidation(email)) {
      throw new Error(I18n.t("Please_enter_a_valid_email"));
    }

    yield toggleForgetPasswordModal(false);
    yield put(setAppLoading(true));

    const message: string = yield AuthBL.forgotPassword(postData);
    yield put(setAppLoading(false));
    doneMessageHandler({
      showDoneMessage: true,
      doneMessage: message,
    });
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}
export function* AuthSagas() {
  yield takeLatest(ActionTypes.LOGIN_REQUEST, loginRequest);
  yield takeLatest(ActionTypes.REGISTRATION_REQUEST, signupRequest);
  yield takeLatest(ActionTypes.FORGOT_PASSWORD_REQUEST, forgotPasswordRequest);
}
