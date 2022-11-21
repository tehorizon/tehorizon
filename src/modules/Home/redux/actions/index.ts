import { HomeActionTypes } from "../types";
import {
  HomeRequestParams,
  locationListRequestParams,
  categoryTile,
  layoutRequest,
  homeResult,
} from "../../interfaces";
import { outletItemInterface, outletParams } from "@Outlet/BL/Interfaces";
export const setHomeCategory = (category: categoryTile) => ({
  type: HomeActionTypes.SET_HOME_CATEGORY,
  category: category,
});

export const setHomeCategoryList = (category: Array<categoryTile>) => ({
  type: HomeActionTypes.SET_HOME_CATEGORY_LIST,
  category: category,
});

export const homeRequest = (data: HomeRequestParams) => ({
  type: HomeActionTypes.HOME_REQUEST,
  data,
});

export const locationListRequest = (data: locationListRequestParams) => ({
  type: HomeActionTypes.LOCATION_LIST_REQUEST,
  data,
});

export const updateLayoutRequest = (data: layoutRequest) => ({
  type: HomeActionTypes.UPDATE_LAYOUT,
  data,
});

export const setHomeSections = (homeSection: homeResult) => ({
  type: HomeActionTypes.SET_HOME_SECTION,
  homeSection,
});

export const setNearestTiles = (nearest: outletItemInterface[]) => ({
  type: HomeActionTypes.SET_NEAREST_TILES,
  nearest,
});

export const homeNearestRequest = (data: outletParams) => ({
  type: HomeActionTypes.HOME_NEAREST_REQUEST,
  data,
});

export const setAnalyticsFlag = (log_analytics: boolean) => ({
  type: HomeActionTypes.SET_ANALYTICS_FLAG,
  log_analytics,
});
