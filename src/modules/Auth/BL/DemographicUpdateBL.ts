import { updateDemographicApi, getUserProfileApi } from "./apis";
import { DemographicsDataType } from "./Interfaces";
import i18n from "i18next";

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

const UpdateDemographicBL = async (data: DemographicsDataType) => {
  try {
    const { token, nationality, date_of_birth, gender, currency } = data;

    if (token == null || token == "") {
      throw { messageType: "tokenError", messageText: STRINGS.tokenCheck };
    }

    if (
      nationality == null ||
      nationality == "" ||
      date_of_birth == null ||
      date_of_birth == "" ||
      gender == null ||
      gender == ""
    ) {
      throw { messageType: "emptyFields", messageText: STRINGS.allCheck };
    }

    await updateDemographicApi(data);
    let params = {
      token: token,
      currency: currency,
    };
    const userResult = await getUserProfileApi({ ...params });
    return userResult.data;
  } catch (e) {
    throw e;
  }
};

export default UpdateDemographicBL;
