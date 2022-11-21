import { invokeApi, Urls } from "@network";
import AppConfig from "@fast_track/src/AppConfig.json";
import attractionData from "./responses/attractions.json";
import locationData from "./responses/location.json";
import attractionDetailsData from "./responses/attractionDetails.json";
import bookingsListData from "./responses/bookings.json";

export const locationAPI = () => {
  // if (AppConfig.mode === "test") {
  return locationData;
  // }
  // let requestObj: NetworkTypes.RequestObjectDataType = {
  //   path: `${Urls.attractionWorldwide}`,
  //   method: 'GET',
  // };
  // return invokeApi(requestObj);
};

export const attractionAPI = () => {
  // if (AppConfig.mode === "test") {
  return attractionData;
  // }
  // let requestObj: NetworkTypes.RequestObjectDataType = {
  //   path: `${Urls.attractionWorldwide}`,
  //   method: 'GET',
  // };
  // return invokeApi(requestObj);
};

export const attractionDetailsAPI = () => {
  // if (AppConfig.mode === "test") {
  return attractionDetailsData;
  // }
  // let requestObj: NetworkTypes.RequestObjectDataType = {
  //   path: `${Urls.attractionWorldwide}`,
  //   method: 'GET',
  // };
  // return invokeApi(requestObj);
};

export const bookingsListAPI = () => {
  // if (AppConfig.mode === "test") {
  return bookingsListData;
  // }
  // let requestObj: NetworkTypes.RequestObjectDataType = {
  //   path: `${Urls.attractionWorldwide}`,
  //   method: 'GET',
  // };
  // return invokeApi(requestObj);
};
