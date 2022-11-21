import { attractionAPI } from "./apis";

const attraction = async () => {
  try {
    let attractionResponse = await attractionAPI();
    console.log("attractionResponse Api Result: ", attractionResponse);
    return attractionResponse;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default attraction;
