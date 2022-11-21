import {
  attribute,
  MerchantData,
} from "@fast_track/src/modules/Merchant/interfaces/responses";
import { Route } from "react-native-tab-view";
import { Filter, Tab } from "../../interfaces/responses";

export interface RequestObjectDataType {
  path: string;
  method: string;
  headers: HeaderDataType;
  postData?: object;
}

interface HeaderDataType {
  Authorization: string;
}

//tabs interfaces
export interface tabsParams {
  category: string;
  location_id: number;
  language: string;
}

interface tabsParamDataType {
  [name: string]: string;
}
export interface tabsInterface {
  limit: number;
  tabs: Tab[];
}

export interface Routes extends Route {
  payload: Tab;
}

//chears interfaces
export interface cheersParams {
  location_id: number;
  language: string;
}
export interface cheersRule {
  cheers_logo_url: string;
  product_information: string;
  drinking_age_confirmation_message: string;
  not_interested_in_cheers_offers_message: string;
  error_message_to_select_an_option: string;
}

export interface cheersInterface {
  cheersRules: cheersRule[];
}

// outlet Interfaces

export interface selectedFilter {
  newOffer: boolean;
  selectedType: string;
  selectedCuisine: [];
  selectedAmenities: {};
}

export interface outletAttributesInterface extends attribute {}
export interface outletItemInterface {
  id: number;
  sfId: string;
  name: string;
  email: string;
  lat: number;
  lng: number;
  human_location: string;
  neighborhood: string;
  mall: string;
  hotel: string;
  tripadvisor_id: string;
  distance: number;
  description: string;
  merchant_name: string;
  merchant: MerchantData;
  fuzzy_relevance: number;
  product_id: number[];
  product_sku: string[];
  top_offer_redeemability: number;
  top_offer_type: number;
  is_redeemable: boolean;
  is_purchased: boolean;
  is_monthly: boolean;
  is_new: boolean;
  is_cheers: boolean;
  is_delivery: boolean;
  is_more_sa: boolean;
  is_point_based_offer: number;
  locked_image_url: string;
  categories: string[];
  sub_categories: string[];
  merchant_categories: string[];
  merchant_categories_analytics: string;
  attributes: attribute[];
}

export interface mapOutletItemInterface {
  latitude: number;
  longitude: number;
  merchant_id: number;
  outlet_id: number;
  merchantName: string;
  merchantLogo: string;
  humanLocation: string;
  favourite: boolean;
  distance: number;
}

export interface outletResposeInterface {
  is_fuzzy_search_results: boolean;
  is_fuzzy_server_down: boolean;
  limit: number;
  total_records: number;
  search_results: any[];
  featured_merchants: any[];
  outlets: outletItemInterface[];
}

export interface tabParamsInterface {
  // [key: string]: string | boolean;
  redeemability: string;
  is_cheers: boolean;
}
// export interface outletParams {
//   is_checked: boolean;
//   user_inclued_cheers: boolean;
//   location_id: number;
//   category: string;
//   ofset: number;
//   lat: number;
//   lng: number;
//   show_new_offers: boolean;
//   sub_category_filter: string;
//   cuisine_filter: string;
//   filters_selected_for_yes: Array<string>;
//   filters_selected_for_no: Array<string>;
//   language: string;
//   tabsParams: tabParamsInterface;
// }

export interface outletParams {
  location_id?: number;
  category: string;
  offset?: number;
  user_include_cheers?: boolean;
  lat?: number;
  lng?: number;
  show_new_offers?: boolean;
  sub_category_filter?: string;
  cuisine_filter?: Array<Filter>;
  filters_selected_for_yes?: Array<string>;
  filters_selected_for_no?: Array<string>;
  tabsParams?: tabParamsInterface;
  limit?: number;
  token?: string;
  radius?: number;
}

export interface outletParamsMaps {
  location_id: number;
  category: string;
  user_include_cheers: boolean;
  radius: number;
  lat: number;
  lng: number;
  language: string;
  show_new_offers?: boolean;
  sub_category_filter?: string;
  cuisine_filter?: Array<Filter>;
  filters_selected_for_yes?: Array<string>;
  filters_selected_for_no?: Array<string>;
  tabsParams?: tabParamsInterface;
}

export interface outletSearchApiParams {
  location_id: number;
  category: string;
  query: string;
  query_type: string;
  ofset: number;
  user_inclued_cheers: boolean;
  sub_category_filter: string;
  cuisine_filter: string;
  language: string;
  filters_selected_for_yes: Array<string>;
  filters_selected_for_no: Array<string>;
}

interface MapOutletDataType {
  latitude: number;
  longitude: number;
  merchant_id: number;
  outlet_id: number;
  merchantName: string;
  merchantLogo: string;
  humanLocation: string;
  favourite: boolean;
  distance: number;
}

export interface outletMapsResposeInterface {
  outlets: MapOutletDataType[];
}
