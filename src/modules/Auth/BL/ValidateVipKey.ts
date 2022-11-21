import { ValidateVipKeyApi } from "./apis";
import i18n from "i18next";
import emailValidation from "./Validator";

const ValidateVipKey = async (token: string, vipKey: string, email: string) => {
  try {
    if (email === "") throw new Error(i18n.t("Please_enter_a_valid_email"));

    if (!emailValidation(email)) {
      throw new Error(i18n.t("Please_enter_a_valid_email"));
    }

    if (vipKey === "") throw new Error("Please enter your key.");

    if (vipKey.length < 9) throw new Error("Please enter your key.");

    const body = {
      key: vipKey,
      email: email,
    };
    const result = await ValidateVipKeyApi(token, body);
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default ValidateVipKey;
