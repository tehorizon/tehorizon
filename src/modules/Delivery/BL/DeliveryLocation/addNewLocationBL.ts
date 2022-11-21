import { decryptData } from "@network";
import { addNewLocationApi } from "../apis";
import { addLocationDataType } from "../Interfaces";

const addNewLocation = async (data: addLocationDataType) => {
  try {
    const addNewLocationResponse = await addNewLocationApi(data);
    console.log("Add New LocationApi Api Result", addNewLocationResponse);
    return decryptData(addNewLocationResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default addNewLocation;
