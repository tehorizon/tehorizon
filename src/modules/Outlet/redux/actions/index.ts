import {
  outletItemInterface,
  outletResposeInterface,
} from "../../BL/Interfaces";
import { RequestTypes } from "../../interfaces";
import { Merchant, SelectedFilter } from "../../interfaces/responses";
import { OutletActionTypes } from "../types";

export const setOutletList = (OutletList) => ({
  type: OutletActionTypes.SET_OUTLET_LIST,
  OutletList,
});

export const setHomeSelectedOutlet = (outlet) => ({
  type: OutletActionTypes.SET_HOME_SELECTED_OUTLET,
  outlet,
});

export const setUserCurrentOutlet = (currentOutlet) => ({
  type: OutletActionTypes.SET_CURRENT_OUTLET,
  currentOutlet,
});

export const setOutletValues = (data) => ({
  type: OutletActionTypes.SET_OUTLET_VALUES,
  data,
});

export const setMerchantData = (merchantData: Merchant) => ({
  type: OutletActionTypes.SET_MERCHANT_DATA,
  merchantData,
});

export const setSelectedFilter = (selectedFilters: SelectedFilter) => ({
  type: OutletActionTypes.SET_SELECTED_FILTER,
  selectedFilters,
});

export const setSelectedFilterReset = () => ({
  type: OutletActionTypes.SET_SELECTED_FILTER_RESET,
});

export const setFavouriteList = (favouriteList: outletResposeInterface) => ({
  type: OutletActionTypes.SET_FAVOURITE_LIST,
  favouriteList,
});

export const setCheersValues = (data: {
  userProvidedCheersCheck: boolean;
  isUserFilledCheersCheck: boolean;
}) => ({
  type: OutletActionTypes.SET_CHEERS_VALUES,
  data,
});

export const setNotPersistedOutletList = (
  OutletList: outletResposeInterface
) => ({
  type: OutletActionTypes.SET_OUTLETNOTPERSISTED_LIST,
  OutletList,
});

export const setMapOutletList = (
  mapOutletList: Array<outletItemInterface>
) => ({
  type: OutletActionTypes.SET_OUTLETNOTPERSISTED_MAP_LIST,
  mapOutletList,
});

export const getCheersRequest = (data: RequestTypes.CheersRequest) => ({
  type: OutletActionTypes.GET_CHEERS_REQUEST,
  data,
});

export const getOutletsRequest = (data: RequestTypes.OutletRequest) => ({
  type: OutletActionTypes.GET_OUTLETS_REQUEST,
  data,
});

export const getOutletTabsRequest = (data: RequestTypes.OutletTabRequest) => ({
  type: OutletActionTypes.GET_OUTLETS_TABS_REQUEST,
  data,
});

export const getOutletMapsRequest = (data: RequestTypes.OutletMapRequest) => ({
  type: OutletActionTypes.GET_OUTLETS_MAPS_REQUEST,
  data,
});
