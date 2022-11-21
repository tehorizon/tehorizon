import { signUpUserApi } from "./apis";
import { SignupDataType } from "./Interfaces";
import emailValidation from "./Validator";
import i18n from "i18next";
import { store } from "@redux/store";

const STRINGS = {
  tokenCheck: i18n.t("Token_not_found"),
  sessionTokenCheck: i18n.t("Session_Toke_n_not_found"),
  allCheck: i18n.t("Please_fill_in_all_the_required_fields"),
  emailCheck: i18n.t("Please_enter_a_valid_email"),
  confirmEmailError: i18n.t(
    "Email_and_confirm_email_do_not_match_Please_enter_the_same_email"
  ),
  passwordCheck: i18n.t("Password_and_confirm_password_do_not_match"),
  passwordValidation: i18n.t("Please_enter_atleast_characters_for_password"),
  privacyPolicyCheckString: i18n.t(
    "Please_review_accept_the_End_User_License_Agreement"
  ),
  endUserLicenseAgreementCheckString: i18n.t(
    "Please_review_accept_the_Privacy_Policy"
  ),
};

const SignupBL = async (postData: SignupDataType) => {
  try {
    let state = store?.getState();

    // let captcha_token = "";
    // if (state?.appReducer?.AppConfigs?.is_captcha_verification) {
    //   captcha_token = state?.authReducer?.captchaToken;
    // }
    let data = {
      platform: state?.appReducer?.deviceInfo?.device_os,
      ...postData,
      // captcha_token,
    };
    const signUpResult = await signUpUserApi(data);
    const sessionToken = signUpResult.data.session_token;
    const currency =
      signUpResult.data.currency && signUpResult.data.currency !== ""
        ? signUpResult.data.currency
        : "AED";
    const message = signUpResult.data.message;

    // if (
    //   sessionToken === undefined ||
    //   sessionToken === null ||
    //   sessionToken === ''
    // )
    //   throw {
    //     messageType: 'sessionTokenError',
    //     messageText: STRINGS.sessionTokenCheck,
    //   };

    return {
      sessionToken,
      currency,
      message,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default SignupBL;
