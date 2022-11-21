import { locationAPI } from "./apis";

const location = async () => {
  try {
    let locationResponse = await locationAPI();
    console.log("locationResponse Api Result: ", locationResponse);
    return locationResponse;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default location;
