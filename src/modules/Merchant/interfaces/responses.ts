import { LatLng } from "@HybridComponents/MapView";
import { ColorValue } from "react-native";
export interface Coordinate {
  coords: LatLng;
}

export interface Region extends LatLng {
  latitudeDelta: number;
  longitudeDelta: number;
}
export interface RedeemResponse {}

export interface OfferDetails {
  color: ColorValue;
  image: string;
  title: string;
}

export interface VoucherDetails {
  title: string;
  image: string;
}

declare global {
  interface Window {
    initMerchant: InitDataType;
  }
}

export interface attribute {
  image_url: string;
  name: string;
  key: string;
  type: number;
  value: string;
}

export interface merchantAttributes {
  attributes: attribute[];
  section_name: string;
}
export interface merchantName {
  name: string;
}

export interface bannersInterface {
  banners: string[];
}

export interface additionalDetails {
  color: string;
  image: string;
  title: string;
}

export interface offers_to_display {
  name: string;
  voucher_type_image: string;
  additional_details: additionalDetails[];
  locationValid: boolean;
}

export interface OfferAdditionalDetails extends OfferDetails {
  color: string;
}

export interface OfferDetails {
  title: string;
  image: string;
}

export interface productOffer {
  voucher_type_image: string;
  name: string;
  additional_details: OfferAdditionalDetails[];
  voucher_details: OfferDetails[];
  outlet_ids: number[];
  redeemability: number;
  offer_id: number;
  savings_estimate: number;
  validity_date: string;
  sub_detail_label: string;
  details: string | null;

  // voucherImage: string;
  // offerName: string;
  // additionalDetails: string;
  // outletIds: number[];
  // redeamOfferStyle: string;
}

export interface RequestObjectDataType {
  path: string;
  method: string;
  headers: HeaderDataType;
  postData?: object;
}

interface HeaderDataType {
  Authorization: string;
}

export interface InitDataType {
  merchantServiceUrl: string;
  redemptionServiceUrl: string;
  mode: string;
}

export interface redemptionDataParams {
  offer_id: number;
  outlet_id: number;
  merchant_pin: number;
  product_id: number;
}

export interface AdditionalDetail {
  id: number;
  image: string;
  title: string;
  color: string;
}

export interface VoucherDetail {
  id: number;
  image: string;
  title: string;
  color: string;
}

export interface OffersToDisplay {
  categories_analytics: string;
  product_id?: string;
  offer_id: number;
  category: string;
  category_color: string;
  name: string;
  details: string;
  offer_detail: string;
  is_cheers: boolean;
  voucher_type: number;
  voucher_type_image: string;
  voucher_restriction1?: any;
  voucher_restriction2?: any;
  voucher_restrictions: string;
  savings_estimate: number;
  savings_estimate_aed: number;
  savings_estimate_local_currency: number;
  redeemability: number;
  is_topup_offer_allowed: boolean;
  is_pingable: boolean;
  is_pinged: boolean;
  is_show_smiles: boolean;
  smiles_earn_value: number;
  smiles_burn_value: number;
  dcp_license?: any;
  valid_from_date: Date;
  expiration_date: Date;
  validity_date: Date;
  outlet_ids: number[];
  item_code: string;
  is_barcode_enabled: boolean;
  is_point_based_offer: boolean;
  is_merlin_offer: boolean;
  outlet_merlin_urls: any[];
  merlin_title: string;
  message: string;
  sub_detail_label: string;
  additional_details: AdditionalDetail[];
  voucher_details: VoucherDetail[];
  voucher_rules_of_use: any[];
  offer_redemption_type: number;
  sort_order: number;
}

export interface Offer {
  product_id: string;
  purchase_product_id: number;
  section_name: string;
  product_sku: string;
  is_delivery_section: boolean;
  is_monthly_section: boolean;
  is_show_purchase_button: boolean;
  offers_to_display: OffersToDisplay[];
}
export interface MerchantData {
  id: number;
  merchant_pin: string;
  email: string;
  website: null | string;
  category: string;
  merchant_categories: string[];
  hero_small_urls: string[];
  cuisines: string[];
  has_promo_code_offers: 0 | 1;
  is_pingable: 1 | 0;
  is_for_members_only?: boolean;
  merchant_sf_id: string;
  dc_prospect_enabled: 1 | 0;
  is_tutorial: boolean;
  name: string;
  description: string;
  offer_categories: string[];
  sub_categories: string[];
  cuisine: string;
  booking_link: string;
  booking_request: string;
  logo_url: string;
  logo_small_url: string;
  logo_offer_url: string;
  logo_offer_small_url: string;
  photo_url: string;
  photo_small_url: string;
  hero_urls: string[];
  hero_small_url: string;
  pdf_url: string;
  is_opted_in_for_360_image: 0 | 1;
  p3_360_degree_image: string;
  p3_hero_image_retina: string;
  p3_hero_image_non_retina: string;
  delivery_contact_no: string;
  hero_images_360: { [key: string]: string };
  categories: string[];
  categories_analytics: string;
  digital_section: string;
  has_delivery_offers: boolean;
  merchant_attributes: merchantAttributes[];
  outlets: outletInterface[];
  offers: Offer[];
  delivery_section: {
    delivery_contact_no: string;
    delivery_tutorials_info: string[];
    menu_section: any[];
    offers_remaining: string;
  };
  customer: {
    user_id: number;
    is_demographics_updated: 0 | 1;
  };
  opening_hours: string;
}
