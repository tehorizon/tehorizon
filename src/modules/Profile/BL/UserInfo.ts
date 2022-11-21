import { deleteUserInfoApi } from "./apis";

const DeleteUserInfoBL = async (token: string) => {
  try {
    if (token === "") throw new Error("Token not found");

    const response = await deleteUserInfoApi(token);

    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default DeleteUserInfoBL;
