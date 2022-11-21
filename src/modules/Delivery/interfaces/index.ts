import * as ScreenTypes from "./screens";
import { NavigationProp } from "@react-navigation/core";

export interface cartItem {
  productId: string | number;
  isCustomisable: boolean | string;
  count: number;
  voucherId: string;
  name: string;
  itemSubtotalPrice: string | number;
  selectedOptions: any;
  price: string | number;
  deleteAll?: boolean;
}

export interface basketItem {
  data: cartItem;
}

export interface onRemoveBasketItem {
  productId: string | number;
  deleteAll: boolean;
}

export interface basketValues {
  totalCount: number;
  totalPrice: number;
  merchantId: string;
  outletId: string;
  isEmpty: boolean;
  outletName: string;
  merchantName: string;
  products: cartItem;
}

interface locationTag {
  tag_id: string;
  tag_label: string;
  tag_name: string;
  allow_custom_name: boolean;
}

export interface locationObj {
  delivery_location_id: string;
  title: string;
  home_office_address: string;
  street: string;
  area_city: string;
  special_instructions: string;
  latitude: number;
  longitude: number;
  auto_select_range?: number;
  tag_id: string;
  tag?: locationTag;
}

export interface deliveryDetails {
  location_tags: Array<locationTag>;
  delivery_locations: Array<locationObj>;
  selectedDeliverToLocation: object;
}
export interface locationRequestData {
  postData: locationObj;
  navigation: NavigationProp<any, any>;
  itemIndex: number;
  saveLocation: boolean;
}
export interface deletLocationRequest {
  delivery_location_id: string;
  itemIndex: number;
}

export interface outletDetailsRequest {
  outlet_id: string;
  merchant_id: string;
  language: string;
  session_token: string;
  __lat: number;
  __lng: number;
  currency: string;
  location_id: string;
  user_id: string;
  customer_id: string;
  app_version: string;
  __platform: string;
  platform: string;
  device_os: string;
  company: string;
  wlcompany: string;
  __device_id: string;
  __i: string;
  lat: number;
  lng: number;
  delivery_lat: number;
  category: string;
  cashless_delivery: boolean | string;
  is_last_mile_enabled: boolean;
  is_new_order_status_flow: boolean | string;
  show_monthly_product: boolean | string;
}
export interface orderStatusDetails {
  is_last_mile_enabled: boolean | string;
  is_new_order_status_flow: boolean | string;
  order_id?: any;
  time_zone?: string;
}
export interface orderValidation {
  order_id: string;
  outlet_id: string;
  merchant_id?: any;
}

export { ScreenTypes };

export interface ModalProps {
  isModalVisible: boolean;
  hideModalVisible: (arg?: string) => void;
  currentValue: string;
}
