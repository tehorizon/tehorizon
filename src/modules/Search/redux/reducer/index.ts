import { AppActionTypes } from "@redux/appReducer/app.types";
import * as Actions from "../types";

const initialState = {
  outlets: [],
  recents: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.SEARCH_OUTLET_SUCCESS:
      return { ...state, outlets: payload };
    case Actions.RESET_SEARCH:
      return initialState;
    case Actions.SEARCH_ADD_RECENT_QUERY:
      return {
        ...state,
        recents: payload,
      };
    case AppActionTypes.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
