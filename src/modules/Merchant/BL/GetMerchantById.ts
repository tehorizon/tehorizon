import { merchantById } from "./apis/merchant-api";

const GetMerchantById = async (token: string, merchant_id: number) => {
  try {
    const merchant = await merchantById(token, merchant_id);

    return merchant;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default GetMerchantById;
