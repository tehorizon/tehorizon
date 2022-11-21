import { decryptData } from "@network";
import { getOutletDetailApi } from "./apis";
import { getDeliveryOutletsI } from "./Interfaces";

const getDeliveryOutletDetail = async (data: any, token: string) => {
  try {
    if (data.session_token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");

    const getDeliveryOutletsResponse = await getOutletDetailApi(data, token);
    console.log(
      "getDeliveryDetailResponse Api Result: ",
      getDeliveryOutletsResponse
    );
    return decryptData(getDeliveryOutletsResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getDeliveryOutletDetail;
