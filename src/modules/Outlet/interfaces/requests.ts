import { StackNavigationProp } from "@react-navigation/stack";
import { PlatformOSType } from "react-native";
import { locationDataType } from "@Home/BL/Interfaces";
import {
  cheersParams,
  outletParams,
  outletItemInterface,
  tabsParams,
  outletParamsMaps,
  Routes,
} from "../BL/Interfaces";
import { CheerRule, FilterArray } from "./responses";

export interface common {
  navigation?: StackNavigationProp<any, any>;
  showLoading?: Function | undefined;
}
export interface RefreshData {
  refresh: boolean;
  more: boolean;
}
export interface OutletRequest extends common {
  postData: outletParams;
  selectedFilter: FilterArray;
  token: string;
  location: locationDataType;
  updateOutletList: (outlets: Array<outletItemInterface>) => void;
}
export interface CheersRequest extends common {
  postData: cheersParams;
  token?: string;
  isUserFilledCheersCheck: boolean;
  updateCheersRules: (arg: CheerRule) => void;
}

export interface OutletTabRequest extends common {
  postData: tabsParams;
  token: string;
  updateTabs: (arg: Array<Routes>) => void;
}

export interface OutletMapRequest extends common {
  postData: outletParamsMaps;
  token: string;
  selectedFilter: FilterArray;
}
export type DeviceInfo = {
  company: string;
  app_version: string;
  buildNumber: number;
  device_uid: string;
  device_key: string;
  device_brand: string;
  device_model: string;
  device_os: PlatformOSType;
  __device_id: string;
  language: string;
  wlcompany: string;
  hasGms: boolean;
};

export interface Category {
  api_name: string;
  display_name: string;
  image: string;
  analytics_category_name: string;
  category_id: number;
  map_pin_url: string;
}
