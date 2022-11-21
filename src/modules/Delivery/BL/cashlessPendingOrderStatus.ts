import { decryptData } from "@network";
import { getPendingOrderStatus } from "./apis";

const cashlessPendingOrderStatus = async () => {
  try {
    const getPendingOrderStatusResponse = await getPendingOrderStatus();
    console.log(
      "getPendingOrderStatusResponse: ",
      getPendingOrderStatusResponse
    );
    return decryptData(getPendingOrderStatusResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default cashlessPendingOrderStatus;
