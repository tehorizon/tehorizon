import { ResendEmailApi } from "./apis";
import { ResendEmailDataType } from "./Interfaces";
import emailValidation from "./Validator";

const STRINGS = {
  tokenCheck: "Token not found",
  sessionTokenCheck: "Session Token not found",
  allCheck: "Please fill in all the required fields",
  emailCheck: "Please enter a valid email!",
  passwordCheck: "Please enter a password!",
  privacyPolicyCheckString: "Please review & accept the Privacy Policy",
  endUserLicenseAgreementCheckString:
    "Please review & accept the End User License Agreement.",
};

const ResendEmailAPI = async (data: ResendEmailDataType) => {
  try {
    if (data.token == null || data.token == "") {
      throw { messageType: "tokenError", messageText: STRINGS.tokenCheck };
    }

    if (
      data.email == null ||
      data.email == "" ||
      !emailValidation(data.email)
    ) {
      throw {
        messageType: "invalidEmailError",
        messageText: STRINGS.emailCheck,
      };
    }

    const result = await ResendEmailApi(data);

    const message = result.data.message ? result.data.message : "";

    return message;
  } catch (e) {
    throw e;
  }
};

export default ResendEmailAPI;
