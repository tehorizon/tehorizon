import { ActionTypes } from "../types";

const initialState = {
  selectedLocation: {},
  all_destinations: [],
  is_show_all_cities: false,
  is_show_search: false,
  top_destinations: [],
  attractions: [],
  selectedAttraction: {},
  bookings: [],
};

const attractionsReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ActionTypes.SET_LOCATION_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case ActionTypes.SET_ATTRACTION:
      return {
        ...state,
        attractions: action.payload,
      };
    case ActionTypes.SELECT_ATTRACTION:
      return {
        ...state,
        selectedAttraction: action.payload,
      };
    case ActionTypes.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };

    case "LOGOUT_SUCCESS":
      return initialState;
    default:
      return state;
  }
};

export default attractionsReducer;
