import { cashlessOrderHistoryDetailsApi } from "./apis";
import { cashlessOrderHistoryDataType } from "./Interfaces";

import { decryptData } from "@network";

const cashlessOrderHistory = async (data: cashlessOrderHistoryDataType) => {
  try {
    if (data.session_token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");
    console.log("requestData====> cashlessOrderHistoryDetailsApi", data);
    const cashlessOrderHistoryResponse = await cashlessOrderHistoryDetailsApi(
      data
    );
    console.log(
      "requestDataResponse: cashlessOrderHistoryDetailsApi",
      await decryptData(cashlessOrderHistoryResponse)
    );
    return decryptData(cashlessOrderHistoryResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default cashlessOrderHistory;
