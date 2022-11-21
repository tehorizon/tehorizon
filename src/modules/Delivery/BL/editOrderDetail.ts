import { editOrderDetailsApi } from "./apis";
import { editOrderDetailsDataType } from "./Interfaces";

import { decryptData } from "@network";

const orderStatusDetails = async (data: editOrderDetailsDataType) => {
  try {
    if (data.session_token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");
    console.log("requestData====> outlet", data);
    const orderStatusDetailsResponse = await editOrderDetailsApi(data);
    console.log(
      "requestDataResponse: result orderStatusDetailsResponse",
      await decryptData(orderStatusDetailsResponse)
    );
    return decryptData(orderStatusDetailsResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default orderStatusDetails;
