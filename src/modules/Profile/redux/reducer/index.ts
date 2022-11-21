import { AppActionTypes } from "@redux/appReducer/app.types";
import { UserActionTypes } from "../types";

const INITIAL_STATE = {
  userInfo: null,
  token: "",
  userSessionToken: "",
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CONSUME_VALUES:
      return {
        ...state,
        ...action.dataObj,
      };
    case UserActionTypes.SET_EXPOSE_VALUES:
      return {
        ...state,
        exposeFunction: action.exposeFunction,
      };

    case UserActionTypes.SET_USER:
      return {
        ...state,
        userInfo: action.data,
      };

    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.data,
      };

    case UserActionTypes.SET_USER_VALUES:
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

export default user;
