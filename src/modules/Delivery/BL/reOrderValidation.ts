import { validateReorderAPI } from "./apis";
import { reOrderValidationDataType } from "./Interfaces";

import { decryptData } from "@network";

const reOrderValidation = async (data: reOrderValidationDataType) => {
  try {
    if (data.session_token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");
    console.log("requestData====> outlet", data);
    const validateReorderResponse = await validateReorderAPI(data);
    console.log(
      "requestDataResponse: result orderStatusDetailsResponse",
      await decryptData(validateReorderResponse)
    );
    return decryptData(validateReorderResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default reOrderValidation;
