import { cancelOrderAPI } from "./apis";
import { orderStatusDataType } from "./Interfaces";

import { decryptData } from "@network";

const orderStatuses = async (data: orderStatusDataType) => {
  try {
    if (data.session_token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");
    console.log("requestData====> cancelOrder", data);
    const orderStatusesResponse = await cancelOrderAPI(data);
    console.log(
      "requestDataResponse: result cancelOrderAPIresponse",
      await decryptData(orderStatusesResponse)
    );
    return decryptData(orderStatusesResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default orderStatuses;
