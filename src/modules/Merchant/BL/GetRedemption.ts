import { RedeemPrams } from "../interfaces/requests";
import { redemption } from "./apis/redemption-api";

interface params {
  offer_id: number;
  outlet_id: number;
  merchant_pin: number;
  platform: string;
  transaction_id: string;
  product_id: number;
  currency: string;
  language: string;
}

interface redemptionResponse {
  coupon: string;
  redemption_code: string;
  smiles_earned: number;
}

const GetRedemption = async (token: string, data: RedeemPrams) => {
  try {
    const currentDate = new Date();
    // const transactionID =
    //   "Last Sync: " +
    //   currentDate.getDate() +
    //   "/" +
    //   (currentDate.getMonth() + 1) +
    //   "/" +
    //   currentDate.getFullYear() +
    //   " @ " +
    //   currentDate.getHours() +
    //   ":" +
    //   currentDate.getMinutes() +
    //   ":" +
    //   currentDate.getSeconds();

    if (token === "") throw new Error("Token not found");
    if (data.language === "") throw new Error("language not found");
    if (data.currency === "") throw new Error("currency not found");

    const redemptionData = await redemption(token, data);
    const resData = redemptionData.data.referenceNo;
    return {
      coupon: resData.coupon ? resData.coupon : "",
      redemption_code: resData.redemption_code ? resData.redemption_code : "",
      smiles_earned: resData.smiles_earned ? resData.smiles_earned : "",
    };
  } catch (e) {
    throw e;
  }
};

export default GetRedemption;
