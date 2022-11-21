import { LatLng } from "@HybridComponents/MapView";
import { outletItemInterface, tabParamsInterface } from "../BL/Interfaces";

export interface MarkerItem extends LatLng {
  favourite?: boolean;
  merchant_id?: number;
  outlet_id?: number;
  merchantLogo?: string;
  merchantName?: string;
  humanLocation?: string;
}
export interface Merchant {
  favourite: boolean;
  merchant_id: number;
  outlet_id: number;
}

export interface Chips {
  type?: string;
  title?:
    | string
    | Array<{
        name: string;
        flag: string;
      }>;
  value?: boolean | string;
  key?: string;
}

export interface Filter {
  name?: string;
  flag?: string;
  key?: string;
  uid?: string;
  image_url?: string;
}
export interface FilterArray {
  selectionType_1?: string;
  selectionType_2?: Array<Filter>;
  selectionType_3?: { [key: string]: Filter };
  selectionType_4?: boolean;
}

export type SelectedFilter = {
  [key: string]: FilterArray;
} | null;

export interface Pin {
  coords: {
    lat: number;
    lng: number;
  };
  radius?: number;
}

export type ChipsArray = Array<Chips> | undefined;

export interface TabOutlets {
  [key: string]: Array<outletItemInterface>;
}

export interface TabData {
  limit: 60;
  tabs: Array<Tab>;
}
export interface Tab {
  name: string;
  params: tabParamsInterface;
  uid: string;
}

export type CheerRule = {
  product_information?: string;
  drinking_age_confirmation_message?: string;
  not_interested_in_cheers_offers_message?: string;
} | null;

export interface CheersResult {
  cheersRules: Array<CheerRule>;
}
