import { decryptData } from "@network";
import { updateLocationApi } from "../apis";
import { updateLocationDataType } from "../Interfaces";

const updateLocation = async (data: updateLocationDataType) => {
  try {
    const updateLocationApiResponse = await updateLocationApi(data);
    console.log("Update LocationApi Api Result: ", updateLocationApiResponse);
    return decryptData(updateLocationApiResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default updateLocation;
