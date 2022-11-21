import { outletItemInterface } from "../../Outlet/BL/Interfaces";
import { outletSearchApiParams } from "../Interfaces";

export interface SearchPostData {
  token: string;
  params: outletSearchApiParams;
  favouriteList: object;
}
export interface SearchParamType {
  postData: SearchPostData;
  callback: Function;
  refresh: boolean;
  params: {
    query: string;
  };
  makeCustomAnalyticsStack: () => void;
  outlets: outletItemInterface[];
  favouriteList: Object;
  token: string;
}
