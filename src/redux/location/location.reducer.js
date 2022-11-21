import { AppActionTypes } from "@redux/appReducer/app.types";
import { LocationActionTypes } from "./location.types";

const INITIAL_STATE = {
  LocationList: null,
  locationIndex: -1,
  currentLocation: {
    coords: {
      latitude: 0,
      longitude: 0,
    },
  },
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LocationActionTypes.SET_LOCATION_LIST:
      return {
        ...state,
        LocationList: action.LocationList,
      };

    case LocationActionTypes.SET__HOME_SELECTED_LOCATION:
      return {
        ...state,
        locationIndex: action.index,
      };

    case LocationActionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation,
      };

    case LocationActionTypes.SET_LOCATION_VALUES:
      return {
        ...state,
        ...action.data,
      };
    case AppActionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default locationReducer;
