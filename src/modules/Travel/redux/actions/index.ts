import { TravelActionTypes } from "../types";

const getCountryListRequest = (data: any) => ({
  type: TravelActionTypes.GET_COUNTRIES_LIST,
  data,
});

const setCountryList = (data: any) => ({
  type: TravelActionTypes.SET_COUNTRIES_LIST,
  data,
});

export { getCountryListRequest, setCountryList };
