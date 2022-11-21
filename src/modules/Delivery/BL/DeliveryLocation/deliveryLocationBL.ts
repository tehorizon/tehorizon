import { decryptData } from "@network";
import { deliveryLocationApi } from "../apis";

const deliveryLocation = async () => {
  try {
    const deliveryLocationResponse = await deliveryLocationApi();
    console.log("Delivery-Location Api Result", deliveryLocationResponse);
    return decryptData(deliveryLocationResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default deliveryLocation;
