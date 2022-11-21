import { loginUserApi } from "./apis";
import { LoginDataType } from "./Interfaces";
import i18n from "i18next";
import { store } from "@redux/store";

const STRINGS = {
  tokenCheck: i18n.t("Token_not_found"),
  sessionTokenCheck: i18n.t("Session_Toke_n_not_found"),
  allCheck: i18n.t("Please_fill_in_all_the_required_fields"),
  emailCheck: i18n.t("Please_enter_a_valid_email"),
  passwordCheck: i18n.t("Please_enter_a_password!"),
  privacyPolicyCheckString: i18n.t("Please_review_accept_the_Privacy_Policy"),
  endUserLicenseAgreementCheckString: i18n.t(
    "Please_review_accept_the_End_User_License_Agreement"
  ),
};

const LoginBL = async (postData: LoginDataType) => {
  try {
    let state = store.getState();

    // let captcha_token = "";
    // if (state?.appReducer?.AppConfigs?.is_captcha_verification) {
    //   captcha_token = state?.authReducer?.captchaToken;
    // }

    let data = {
      force_login: state?.authReducer?.force_login,
      platform: state?.appReducer?.deviceInfo?.device_os,
      ...postData,
      // captcha_token,
    };

    //form validation
    // if (
    //     email === '' &&
    //     password === '' &&
    //     endUserLicenseAgreementCheck === false &&
    //     privacyPolicyCheck === false
    // ) {
    //     throw new Error(STRINGS.allCheck);
    // } else if (
    //     email !== '' &&
    //     password !== '' &&
    //     privacyPolicyCheck === false
    // ) {
    //     throw new Error(STRINGS.privacyPolicyCheckString);
    // } else if (
    //     email !== '' &&
    //     password !== '' &&
    //     privacyPolicyCheck === true &&
    //     endUserLicenseAgreementCheck === false
    // ) {
    //     throw new Error(STRINGS.endUserLicenseAgreementCheckString);
    // } else if (email === '' && endUserLicenseAgreementCheck === true) {
    //     throw new Error(STRINGS.emailCheck);
    // } else if (email === '' && privacyPolicyCheck === false) {
    //     throw new Error(STRINGS.emailCheck);
    // } else if (email === '') {
    //     throw new Error(STRINGS.emailCheck);
    // }

    const loginResult = await loginUserApi(data);
    const sessionToken = loginResult.data.session_token;
    const logoutFromAnotherDevice =
      loginResult.data.user_already_logged_in_section;
    const currency =
      loginResult.data.currency && loginResult.data.currency !== ""
        ? loginResult.data.currency
        : "AED";

    const resendEmailData = loginResult.data.resend_invite_section
      ? loginResult.data.resend_invite_section
      : null;

    // if (
    //     (sessionToken === undefined ||
    //     sessionToken === null ||
    //     sessionToken === '') && (logoutFromAnotherDevice !== undefined ||
    //         logoutFromAnotherDevice !== null ||
    //         logoutFromAnotherDevice !== '')
    // ){

    //     throw ({ messageType: "sessionTokenError", messageText: STRINGS.sessionTokenCheck })
    // }

    return {
      sessionToken,
      currency,
      logoutFromAnotherDevice,
      resendEmailData,
    };
  } catch (e) {
    throw e;
  }
};

export default LoginBL;
