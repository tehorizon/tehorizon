import { AppActionTypes } from "@redux/appReducer/app.types";
import { OutletActionTypes } from "../types";

const INITIAL_STATE = {
  outlet: null,
  currentOutlet: null,
  merchantData: null,
  selectedFilters: {},
  favouriteList: null,
  userProvidedCheersCheck: false,
  isUserFilledCheersCheck: false,
};

const NOT_PERSISTED_INITIAL_STATE = {
  OutletList: [],
  mapOutletList: [],
  cheersRules: null,
  cheersCheck: false,
  cheersChecked: false,
};

const outletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OutletActionTypes.SET_HOME_SELECTED_OUTLET:
      return {
        ...state,
        outlet: action.outlet,
      };

    case OutletActionTypes.SET_MERCHANT_DATA:
      return {
        ...state,
        merchantData: action.merchantData,
      };

    case OutletActionTypes.SET_CURRENT_OUTLET:
      return {
        ...state,
        currentOutlet: action.currentOutlet,
      };

    case OutletActionTypes.SET_OUTLET_VALUES:
      return {
        ...state,
        ...action.data,
      };

    case OutletActionTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        selectedFilters: { ...action.selectedFilters },
      };

    case OutletActionTypes.SET_FAVOURITE_LIST:
      return {
        ...state,
        favouriteList: { ...action.favouriteList },
      };

    case OutletActionTypes.SET_SELECTED_FILTER_RESET:
      return {
        ...state,
        selectedFilters: INITIAL_STATE.selectedFilters,
      };

    case OutletActionTypes.SET_CHEERS_VALUES:
      return {
        ...state,
        userProvidedCheersCheck: action.data.userProvidedCheersCheck,
        isUserFilledCheersCheck: action.data.isUserFilledCheersCheck,
      };
    case AppActionTypes.LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE,
        favouriteList: state.favouriteList,
      };
    default:
      return state;
  }
};

export const outletNotPersistedReducer = (
  state = NOT_PERSISTED_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case OutletActionTypes.SET_OUTLETNOTPERSISTED_LIST:
      return {
        ...state,
        OutletList: action.OutletList,
      };

    case OutletActionTypes.SET_OUTLETNOTPERSISTED_MAP_LIST:
      return {
        ...state,
        mapOutletList: action.mapOutletList,
      };

    default:
      return state;
  }
};

export default outletReducer;
