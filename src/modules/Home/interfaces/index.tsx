import { BottomSheetRef } from "@fast_track/src/components/BottomSheet";
import { mainCover } from "@Home/BL/Interfaces";
import LocationList from "@Home/components/locations";
import { NavigationProp, ParamListBase } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { Animated } from "react-native";

export interface common {
  navigation: NavigationProp<
    ParamListBase,
    string,
    Readonly<{
      key: string;
      index: number;
      routeNames: string[];
      history?: unknown[] | undefined;
      routes: any[];
      type: string;
      stale: false;
    }>,
    {},
    {}
  >;
}

export interface HomeScreenProps extends common {
  selectedLocation: homeLocation;
  isLoadedData: boolean;
  homeSections: Array<homeSection>;
  user: user;
  offset: Animated.Value;
  upgradeSection: upgrade;
  AppConfigs: appConfig;
  isLoading: boolean;
  isShowScreenIntro: boolean;
  isOpenLocationModal: boolean;
  isOpenLocationPermissionModal: boolean;
  locationListRef: MutableRefObject<LocationList>;
  bottomSheetRef: RefObject<BottomSheetRef>;
  selectedLocationList: Array<homeLocation>;
  locationGranted: boolean;
  skipMode: boolean;
  checkGeoLocation: () => Promise<void>;
  onOpenLocation: () => Promise<void>;
  onSearchClickHandler: () => void;
  handleUpgrade: () => void;
  onCategoryClickHandler: (category: any) => Promise<void>;
  onFeaturedTileClickHandler: (featured: any) => void;
  onChangeLocation: (id: any) => void;
  onDoneHanlder: (location: any) => void;
  onOkayPressHandler: () => void;
  handleLocationPermissionApproval: (isAllow: boolean) => void;
  setHomeSections: Dispatch<SetStateAction<homeSection[]>>;
  onUpdateLayoutRequest: () => {
    type: string;
    data: layoutRequest;
  };
  onCloseLocationModal: () => void;
  showNearest: () => Promise<any>;
  showFD: () => Promise<any>;
  showAL: () => Promise<any>;
  gotoNearestOutletDetails: () => Promise<any>;
}

export interface HomeRequestParams {
  token: string;
  postData: {
    token: string;
    currency: string;
    locationID: number;
  };
  location_id: number;
  lat: number;
  lng: number;
  checkDemographic: () => void;
}

export interface locationListRequestParams {
  postData: {
    token: string;
  };
}

export interface layoutRequest {
  postData: {
    data: string;
    path: string;
  };
}

export interface mainCoverTile {
  order_id: number;
  image: string;
  message: string;
  deep_link: string;
  link_type: string;
  messages?: Array<string>;
  is_deep_link: boolean;
  is_active: number;
  description: string;
  is_external_link: number;
  section_identifier: string;
  title: string;
  logo_url: string;
  tile_bottom_banner_color: string;
  main_top_image: Array<string>;
  identifier: string;
  main_top_text_color: string;
  id: number;
  logo: string;
  image_url: string;
  tile_id: number;
  synsodyne_code: string;
  location_id: number;
  main_top_color: string;
  savings: {
    savings_this_year_label: string;
    savings_this_year_aed: number;
    offers_used: number;
    external_savings: number;
    savings_this_year: number;
  };
}

export interface categoryTile {
  image: string;
  featured_merchant_icon_url: string;
  title_color: string;
  display_name: string;
  is_free: boolean;
  map_pin_invalid_url: string;
  tile_id: number;
  api_name: string;
  analytics_category_name: string;
  category_color: string;
  banner_image: string;
  map_pin_url: string;
  category_id: number;
}

export interface featureTile {
  order_id: number;
  image: string;
  id: number;
  message: string;
  deep_link: string;
  link_type: string;
  tile_bottom_banner_color: string;
  is_active: number;
  is_deep_link: boolean;
  logo: string;
  description: string;
  image_url: string;
  tile_id: number;
  section_identifier: string;
  title: string;
  logo_url: string;
  location_id: number;
  is_external_link: number;
}

export interface homeSection {
  order_id: number;
  section_bg_color: string;
  section_height: number;
  user_group: number;
  identifier: string;
  is_active: number;
  section_width: number;
  id: number;
  tiles: Array<mainCoverTile> | Array<categoryTile> | Array<featureTile>;
  section_identifier: string;
  title: string;
  section_title_color: string;
  location_id: number;
  company: string;
}

export type upgrade = null | {
  show_upgrade_button?: boolean;
  upgrade_button_background_color?: string;
  upgrade_button_title?: string;
  upgrade_button_title_color?: string;
};

export interface homeResult {
  homeSections: Array<homeSection>;
  upgrade: upgrade;
}

interface homeLocation {
  flag: number;
  id: number | string;
  lat: number;
  lng: number;
  name: string;
}

interface user {
  userId: number;
  firstname: string;
  lastname: string;
  country_of_residence: string;
  currency: string;
  is_demographics_updated: number;
  email: string;
  gender: string;
  mobile_phone: string;
  nationality: string;
  profile_image: string;
  push_notifications: number;
  savings: number;
  date_of_birth: string;
}
export interface homeHeader {
  isShowScreenIntro: boolean;
  selectedLocation: homeLocation;
  userInfo: user;
  skipMode: boolean;
  onOpenLocation: () => Promise<void>;
  onSearchPress: () => void;
  onNotificationPress: () => void;
}

export interface mainCoverSection {
  testID?: string;
  offset: any;
  key?: string;
  mainCover_section: mainCover;
  userData?: user;
  upgradeSection: upgradeSection | null;
  appConfig: any;
  handleUpgrade: () => void;
}

interface upgradeSection {
  show_upgrade_button?: undefined | boolean;
  upgrade_button_background_color?: undefined | string;
  upgrade_button_title?: undefined | string;
  upgrade_button_title_color?: undefined | string;
}

interface appConfig {
  appVerison: string;
  companyName: string;
  company: string;
  env: string;
  mode: string;
  is_captcha_verification: boolean;
  is_signup_with_demographic: boolean;
  activeAuthTab: string;
  defaultCurrency: string;
  loginMessage: Array<Object>;
  autoCapitalize: string;
  largeOutlet: boolean;
  showHomeSectionsNames: boolean;
  showLocationsListHeader: boolean;
  showPassword: boolean;
  subscriptionAvialable: boolean;
  chat: boolean;
  cashless: boolean;
  show_phone_number: boolean;
  show_confirm_email: boolean;
  show_dob: boolean;
  show_gender: boolean;
  show_nationality: boolean;
  secondaryLogo: boolean;
  signupFields: {
    firstname: { show: boolean; autoCapitalize: string };
    lastname: { show: boolean; autoCapitalize: string };
    email: { show: boolean; autoCapitalize: string };
    confirmEmail: { show: boolean; autoCapitalize: string };
    password: {
      show: boolean;
      autoCapitalize: string;
    };
    confirmPassword: {
      show: boolean;
      autoCapitalize: string;
    };
    phone: {
      show: boolean;
      code: string;
      regex: string;
      autoCapitalize: string;
    };
    dob: { show: boolean; format: string };
    gender: { show: boolean };
    nationality: { show: boolean };
    residence: { show: boolean };
  };
  demographics_form_cancelable: boolean;
  helpAndChatURL: string;
  rulesOfUserURL: string;
  hotelRuleOfuse: string;
  ppURL: string;
  eulaURL: string;
  homeModuleConfig: Object;
  isKeyValidationEnabled: boolean;
  keyValidationGenericErrorMessage: string;
  keyValidationMessage: Array<Object>;
  sslPinningEnable: boolean;
  sslKeys: Array<string>;
  showIntro: boolean;
  DragnDropLayout: boolean;
  AppboyEndPoint: string;
  tagLine: string;
  captchaDomain: string;
  disableAnalytics: boolean;
  skipMode: boolean;
}
