import { forgotPasswordApi } from "./apis";
import { ForgotPasswordDataType } from "./Interfaces";

const ForgotPasswordBL = async (data: ForgotPasswordDataType) => {
  try {
    const forgotResult = await forgotPasswordApi(data);
    console.log({ forgotResult });

    const message = forgotResult.data.message ? forgotResult.data.message : "";

    return message;
  } catch (e) {
    throw e;
  }
};

export default ForgotPasswordBL;
