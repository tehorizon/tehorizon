import { getUserProfileApi } from "./apis";

const GetUserProfile = async ({ token, currency }) => {
  try {
    if (token === "") throw new Error("Token not found");
    if (currency === "") throw new Error("Currency not found");
    const userResult = await getUserProfileApi({ token, currency });

    return userResult.data;
  } catch (e) {
    throw e;
  }
};

export default GetUserProfile;
