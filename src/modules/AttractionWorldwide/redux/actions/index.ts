import { ResponseTypes } from "../../interfaces";
import { City } from "../../interfaces/screens";
import { ActionTypes } from "../types";

export const locationRequest = () => ({
  type: ActionTypes.LOCATION_DATA_REQUEST,
});

export const setLocationData = (payload: ResponseTypes.location) => ({
  type: ActionTypes.SET_LOCATION_DATA,
  payload,
});

export const selectLocation = (payload: City) => ({
  type: ActionTypes.SELECT_LOCATION,
  payload,
});

export const getAttractions = (payload) => ({
  type: ActionTypes.GET_ATTRACTION_CALL,
  payload,
});

export const setAttractions = (payload) => ({
  type: ActionTypes.SET_ATTRACTION,
  payload,
});

export const getAttractionsDetails = (payload) => ({
  type: ActionTypes.GET_ATTRACTION_DETAILS_CALL,
  payload,
});

export const selectAttraction = (payload) => ({
  type: ActionTypes.SELECT_ATTRACTION,
  payload,
});

export const getBookings = (payload) => ({
  type: ActionTypes.GET_BOOKINGS_CALL,
  payload,
});

export const setBookings = (payload) => ({
  type: ActionTypes.SET_BOOKINGS,
  payload,
});
