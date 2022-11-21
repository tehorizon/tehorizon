import { orderStatusesApi } from "./apis";
import { orderStatusDataType } from "./Interfaces";

import { decryptData } from "@network";

const orderStatuses = async (data: orderStatusDataType) => {
  try {
    if (data.session_token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");
    console.log("requestData====> outlet", data);
    const orderStatusesResponse = await orderStatusesApi(data);
    console.log(
      "requestDataResponse: result orderStatusesApiResponse",
      await decryptData(orderStatusesResponse)
    );
    return decryptData(orderStatusesResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default orderStatuses;
