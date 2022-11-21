import { getOutletsApi } from "./apis";
import { getDeliveryOutletsI } from "./Interfaces";

import { decryptData } from "@network";

const getDeliveryOutlets = async (data: getDeliveryOutletsI, token: string) => {
  try {
    if (data.session_token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");
    console.log("requestData====> outlet", data);
    const getDeliveryOutletsResponse = await getOutletsApi(data, token);
    console.log(
      "requestDataResponse: result outletlisting",
      await decryptData(getDeliveryOutletsResponse)
    );
    return decryptData(getDeliveryOutletsResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getDeliveryOutlets;
