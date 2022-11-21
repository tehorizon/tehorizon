import { deleteUserApi } from "./apis";

const DeleteUserBL = async (token: string) => {
  try {
    if (token === "") throw new Error("Token not found");

    const response = await deleteUserApi(token);

    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default DeleteUserBL;
