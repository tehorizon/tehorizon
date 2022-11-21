export interface RequestObjectDataType {
  path: string;
  method: string;
  headers: HeaderDataType;
  postData?: object | string;
  queryParams?: object;
  errorHandler?: Function;
}

interface HeaderDataType {
  Authorization: string;
  "Content-Type"?: string;
}

interface common {
  app_version: string;
  language: string;
  build_no: string;
  platform: string;
  company: string;
  wlcompany: string;
  currency: string;
  user_id: number;
  session_token: string;
  location_id: number;
  __sid?: number;
}

export interface locationDataType extends common {}

export interface addLocationDataType extends common {
  special_instructions: string;
  area_city: string;
  latitude: string;
  title: string;
  home_office_address: string;
  tag_id: string;
  longitude: string;
}

export interface updateLocationDataType extends addLocationDataType {
  delivery_location_id: string;
}

export interface deleteLocationDataType extends common {
  delivery_location_id: string;
}

export interface getDeliveryOutletsI extends common {
  special_instructions?: string;
  area_city: string;
  latitude: number;
  language: string;
  title: string;
  home_office_address: string;
  tag_id: number;
  longitude: number;
  __lat: string;
  __lng: string;
  customer_id: string;
  __platform: string;
  device_os: string;
  __device_id: string;
  __i: number;
  sort: string;
  lat: string;
  lng: string;
  category: string;
  limit: number;
  offset: number;
  cashless_delivery_enabled: string;
  company_code: string;
  is_last_mile_enabled: string;
}

export interface orderStatusDataType extends common {
  is_last_mile_enabled: string;
  is_new_order_status_flow: string;
  order_id: number;
  time_zone: string;
}

export interface orderDetailsDataType extends common {
  is_last_mile_enabled: string;
  is_new_order_status_flow: string;
  order_id: number;
}

export interface editOrderDetailsDataType extends common {
  order_id: string;
}

export interface reOrderValidationDataType extends common {
  order_id: string;
  outlet_id: string;
  merchant_id: string;
}

export interface cashlessOrderHistoryDataType extends common {
  is_last_mile_enabled: string;
  is_new_order_status_flow: string;
  time_zone: string;
}

export interface pendingOrderStatusType extends common {}
