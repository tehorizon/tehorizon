import { locationListApi } from "./apis";
import { locationDataType } from "./Interfaces";
import allFlags from "../defaults/flag";

const getLocationList = async (token: string) => {
  try {
    if (token === "" || !token) throw new Error("Token not found");
    // if (language === "" || !language) throw new Error("Language not found");

    const locationListResult = await locationListApi(token);

    let version = 0;
    let locationList: Array<locationDataType> = [];

    if (locationListResult) {
      version = locationListResult.version ? locationListResult.version : 0;

      const dataLength = locationListResult.data.locations.length;
      for (let i = 0; i < dataLength; i++) {
        const location = locationListResult.data.locations[i];
        locationList.push({
          flag: allFlags[location.flag] ? allFlags[location.flag] : "",
          id: location.id ? location.id : 0,
          lat: location.lat ? location.lat : 0,
          lng: location.lng ? location.lng : 0,
          name: location.name ? location.name : "",
        });
      }
    }

    return {
      version,
      locationList,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getLocationList;
