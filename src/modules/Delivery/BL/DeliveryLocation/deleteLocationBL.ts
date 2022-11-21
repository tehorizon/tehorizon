import { decryptData } from "@network";
import { deleteNewLocationApi } from "../apis";

const addNewLocation = async (delivery_location_id) => {
  try {
    const deleteNewLocationResponse = await deleteNewLocationApi(
      delivery_location_id
    );
    console.log(
      "Delete LocationApi Api Result: sherazi",
      deleteNewLocationResponse
    );
    return decryptData(deleteNewLocationResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default addNewLocation;
