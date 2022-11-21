import { ActionTypes } from "../types";

const INITIAL_STATE = {
  merchant: {},
  selectedOutletIndex: 0,
  selectedOffer: {},
};

const merchantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_MERCHANT_VALUES:
      return {
        ...state,
        merchant: action.data,
      };

    case ActionTypes.SET_SELECTED_OUTLET:
      return {
        ...state,
        selectedOutletIndex: action.index,
      };

    case ActionTypes.SET_SELECTED_OFFER:
      return {
        ...state,
        selectedOffer: action.data,
      };
    case ActionTypes.RESET_MERCHANT:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    case ActionTypes.SET_FAV:
      return {
        ...state,
        favourite: action.data,
      };
    default:
      return state;
  }
};

export default merchantReducer;
