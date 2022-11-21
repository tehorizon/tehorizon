import { RefObject } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/core";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { locationObj } from ".";
import { Route } from "react-native-tab-view";
import { ScaledSize } from "react-native";

export interface screen {
  navigation: NavigationProp<any, any>;
  children?: any;
  route?: RouteProp<any, any>;
}

export interface home extends screen {
  pan: any;
  isVisible: boolean;
  isLoadingData: boolean;
  isLocationChanged: boolean;
  SelectedDeliverToLocation: locationObj;
  selectedList: any;
  cuisines: any;
  outletListing: any;
  searchText: string;
  options: any;
  isFetching: boolean;
  navigation: NavigationProp<any, any>;
  refreshOutletListing: (
    cuisines: any,
    isLocationhange: boolean,
    isLoadMore: boolean,
    outletListing?: any
  ) => void;
  refreshList: (arg: any, arg2: any) => void;
  selectedCuisines: (arg: any) => void;
  setSelectedList: (arg: any) => void;
  setCuisines: (arg: any) => void;
  setIsVisible: (arg: boolean) => void;
  setSearchText: (str: string) => void;
  onBack: () => void;
  loadMoreOutlets: () => void;
  onRefresh: () => void;
}

export interface chooseLocationMap extends screen {
  swipeout: any;
  isModalVisible: boolean;
  deliveryDetails: any;
  currentOpenSwipe: number;
  navigation: NavigationProp<any, any>;

  gotoAddLocationScreen: () => void;
  onSwipeOpen: (arg: number) => void;
  selectLocation: (arg: any) => void;
  removeLocation: () => void;
  rightButtons: (arg: number) => void;
  setModalVisibility: (arg: boolean) => void;
}

export interface addNewLocation extends screen {
  map: any;
  region: any;
  address: string;
  googleInputVisibility: boolean;
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
  GOOGLE_API_KEY: string;
  onRegionChange: (arg: any) => void;
  showGoogleInput: () => void;
  hideGoogleInput: () => void;
  moveToLocation: (arg: boolean) => void;
  onRegionChangeComplete: (arg: any) => void;
  onPressLocation: (
    data: GooglePlaceData,
    details?: GooglePlaceDetail | null
  ) => void;
}

export interface locationDetails extends screen {
  address: string;
  specialInstructions: string;
  saveLocation: boolean;
  selectedTag?: TAG;
  area_city: string;
  isModalVisible: boolean;
  deliveryDetails: any;
  navigation: NavigationProp<any, any>;

  updateTagID: (arg: any) => void;
  hideModalVisible: (arg?: string) => void;
  pushNewLocation: () => void;
  updateAddress: (arg: string) => void;
  updateSI: (arg: string) => void;
  toggleSaveLocation: (arg: boolean) => void;
}

export interface allFilters {
  navigation: NavigationProp<any, any>;
}

export interface BasketView {
  source: {
    body: string;
    method: string;
    headers: {
      "Content-Type": string;
    };
    uri: string;
  };
  showProgress: boolean;
  originWhitelist: string[];
  onLoadEnd: (arg: any) => void;
  navigationStateChange: (arg: any) => void;
}

export interface deliverySearch {
  searchText: string;
  searchedFlag: boolean;
  loader: boolean;
  cuisineList: any;
  searchedOutlets: boolean;
  navigation: NavigationProp<any, any>;
  setSearchText: (arg: string) => void;
  updateCuisineList: (arg: any) => void;
  onPressCancel: () => void;
  searchHandler: () => void;
}

export interface orderHistory {
  orderHistory: any;
  isLoadingData: boolean;
  showHeader: boolean;
  navigation: NavigationProp<any, any>;
  onBackHandler: () => void;
}

export interface orderStatus {
  orderRef: any;
  showEditableButton: boolean;
  showCancelModal: boolean;
  showCancelSuccessModal: boolean;
  isLoadingData: boolean;
  selectedOrderStatusDetails: any;
  selectedOrderStatuses: any;
  navigation: NavigationProp<any, any>;
  setShowCancelModal: (arg: boolean) => void;
  cancelOrder: (arg: any) => void;
  onEditOrderPress: () => void;
  onHide: () => void;
  onCancel: () => void;
}

export interface DeliveryOutletDetail {
  selectedOutlet: any;
  merchant: any;
  tabs: any;
  menuActiveTab: any;
  menuProductsList: any;
  currentLocation: any;
  favouriteState: boolean;
  orderID: string;
  basketIsEmpty: boolean;
  navigation: NavigationProp<any, any>;
  routes: Route[];
  route: RouteProp<ParamListBase, string>;
  activeTab: number;
  layout: ScaledSize;
  onSetMerchantData: (arg: any) => void;
  onClickFavourite: () => void;
  onChangeTab: (arg: number, arg2: any) => void;
  updateActiveTab: (arg: number) => void;
  viewDineInOffers: () => void;
  onImageClick: () => void;
}

export interface TAG {
  allow_custom_name: boolean;
  image_url: string;
  tag_id: number;
  tag_label: string;
  tag_name: string;
}
