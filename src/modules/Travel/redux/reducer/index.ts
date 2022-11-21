import { AppActionTypes } from "@redux/appReducer/app.types";
import { TravelActionTypes } from "../types";

const INITIAL_STATE = {
  countries: [],
};

const travelReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TravelActionTypes.SET_COUNTRIES_LIST:
      return {
        ...state,
        countries: [...action.data],
      };
    case AppActionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default travelReducer;
