import { homeSection } from "@Home/interfaces";

export interface RequestObjectDataType {
  path: string;
  method: string;
  headers: HeaderDataType;
  postData?: object;
  queryParams?: object;
  errorHandler?: Function;
  appendCommonParams?: Boolean;
}

interface HeaderDataType {
  Authorization: string;
}

export interface HomeAPIdataType {
  token: string;
  locationID: number;
  currency: string;
}

export interface HomeSectionsDataType {
  sectionIdentifier: string;
  data: Array<mainCover | category | featured | popular>;
}

export interface mainCover {
  tileIdentifier?: string;
  tiles: Array<messagingTile> & Array<savingsTile>;
}

interface messagingTile {
  messages: Array<string>;
  mainTopImage?: string;
  main_top_image?: Array<string>;
  main_top_text_color?: string;
  main_top_color: string;
}

interface savingsTile {
  messages: Array<string>;
  savingThisYear?: number;
  offersUsed?: number;
  savings: savings;
  main_top_color: string;
}

interface savings {
  external_savings?: number;
  gems_savings?: number;
  offers_used?: number;
  savings_this_year?: number;
  savings_this_year_aed?: number;
  savings_this_year_label?: string;
  total_points?: number;
}

export interface category {
  display_name: string;
  api_name: string;
  image: string;
  analytics_category_name: string;
  category_id: number;
  map_pin_url: string;
}

export interface featured {
  deepLink: string;
  image: string;
  title: string;
  entity_id: number;
}
export interface popular {
  deepLink: string;
  image: string;
}

export interface advertise {
  deepLink: string;
  image: string;
  logo: string;
  message: string;
}

export interface categorySection {
  deepLink: string;
  image: string;
  title: string;
}

export interface locationDataType {
  id: number;
  name: string;
  flag: string;
  lat: number;
  lng: number;
}

export interface homeCategory {
  testID: string;
  title: string | undefined;
  key: string;
  categories_section: homeSection;
  navigation: any;
  onCategoryClickHandler: (arg: any) => Promise<void>;
}
