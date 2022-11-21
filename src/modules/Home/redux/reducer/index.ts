import { AppActionTypes } from "@redux/appReducer/app.types";
import { HomeActionTypes } from "../types";

const INITIAL_STATE = {
  category: [],
  categoryList: [],
  mainCover: [],
  homeSections: [],
  nearestOffers: [],
  upgrade: {
    show_upgrade_button: undefined,
    upgrade_button_background_color: undefined,
    upgrade_button_title: undefined,
    upgrade_button_title_color: undefined,
  },
  log_analytics: false,
};

const homeReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case HomeActionTypes.SET_HOME_SECTION:
      return {
        ...state,
        ...action.homeSection,
      };

    case HomeActionTypes.SET_HOME_CATEGORY:
      return {
        ...state,
        category: action.category,
      };

    case HomeActionTypes.SET_HOME_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.category,
      };

    case HomeActionTypes.SET_HOME_MAIN_COVER:
      return {
        ...state,
        mainCover: action.mainCover,
      };

    case HomeActionTypes.SET_HOME_VALUES:
      return {
        ...state,
        ...action.data,
      };
    case HomeActionTypes.SET_NEAREST_TILES:
      return {
        ...state,
        nearestOffers: action.nearest,
      };
    case HomeActionTypes.SET_ANALYTICS_FLAG:
      return {
        ...state,
        log_analytics: action.log_analytics,
      };
    case AppActionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default homeReducer;
