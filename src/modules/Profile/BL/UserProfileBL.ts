import { getUserProfileApi } from "./apis";

const UserProfileBL = async (
  token: string,
  language: string,
  currency: string
) => {
  try {
    if (!token) throw new Error("Token not found");
    if (!language) throw new Error("language not found");
    if (!currency) throw new Error("currency not found");

    const userResult = await getUserProfileApi(token, language, currency);

    return userResult.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default UserProfileBL;
