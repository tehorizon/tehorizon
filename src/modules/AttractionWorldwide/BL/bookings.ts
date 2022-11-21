import { bookingsListAPI } from "./apis";

const bookings = async () => {
  try {
    let response = await bookingsListAPI();
    console.log("Bookings Api Result: ", response);
    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default bookings;
