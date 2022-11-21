import { updateUserApi } from "./apis";
import { UserUpdateDataType } from "./Interfaces";

const UpdateUserProfile = async (data: UserUpdateDataType) => {
  try {
    if (!data.token) throw new Error("Token not found");
    if (!data.currency) throw new Error("currency not found");
    if (!data.country_of_residence)
      throw new Error(`country Of Residence not found`);
    if (!data.language) throw new Error("language not found");

    const updateResult = await updateUserApi(data);
    const message = updateResult.message ? updateResult.message : "";
    return message;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

export default UpdateUserProfile;
