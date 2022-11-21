import { orderStatusDetailsApi } from "./apis";
import { orderDetailsDataType } from "./Interfaces";

import { decryptData } from "@network";

const orderStatusDetails = async (data: orderDetailsDataType) => {
  try {
    if (data.session_token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");
    console.log("requestData====> outlet", data);
    const orderStatusDetailsResponse = await orderStatusDetailsApi(data);
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
