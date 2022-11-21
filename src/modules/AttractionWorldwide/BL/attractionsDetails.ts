import { attractionDetailsAPI } from "./apis";

const attraction = async () => {
  try {
    let attractionResponse = await attractionDetailsAPI();
    console.log("attractionDetaillsResponse Api Result: ", attractionResponse);
    return attractionResponse;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default attraction;
