import { NavigationProp, RouteProp } from "@react-navigation/core";
import { Ref } from "react";
import MapView from "react-native-maps";
import { outletItemInterface } from "../../Outlet/BL/Interfaces";
import { ReddemOfferRequest, RedeemPrams } from "./requests";
import { Coordinate, MerchantData, OffersToDisplay, Region } from "./responses";
interface outletRoute extends outletItemInterface {
  // merchant_id: number;
  // o_id: number;
  // outlet_id: number;
  // m_id: number;
  // favourite: boolean;
}
export interface screen {
  navigation: NavigationProp<any, any>;
  children?: any;
  route?: RouteProp<
    {
      params: outletRoute;
    },
    "params"
  >;
}

export interface map extends screen {
  route: RouteProp<
    {
      params: {
        name: string;
        location: { lat: number; lng: number };
        description: string;
        currentLocation: Coordinate;
      };
    },
    "params"
  >;
}

export interface Map extends map {
  name: string;
  mapRef: Ref<MapView>;
  initialRegion: Region;
  description: string;
  openGps: () => void;
  gotToMyLocation: () => void;
  goBack: () => void;
}

export interface urlScreen extends screen {
  route: RouteProp<
    {
      params: {
        name: string;
        urls: Array<string>;
        hero_images_360: { [key: string]: string };
        indexToMove?: number;
      };
    },
    "params"
  >;
}

export interface URL extends screen {
  name: string;
  urls: Array<string>;
  hero_images_360: { [key: string]: string };
  isLoadingImage: boolean;
  indexToMove: number;
  onImageLoaded: () => void;
  goBack: () => void;
}

export interface Mechant extends screen {
  webViewUrl: string;
  webViewTitle: string;
  showWebView: boolean;
  changeLocationModal: boolean;
  merchant: MerchantData;
  offer: OffersToDisplay;
  selectedOutlet: outletInterface;
  showContinueOutletModal: boolean;
  redemptionLoading: boolean;
  showRedemptionModal: boolean;
  showError: boolean;
  errorString: string;
  rulesOfUserURL: string;
  showRedemptionSuccessModal: boolean;
  showCongratulationsModal: boolean;
  redemptionResponse: Object;
  appConfig: any;
  favouriteState: boolean;
  expandAmenties: boolean;
  amenties: any;
  isDemographicVisible: boolean;
  currency: string;
  handleRedemptionSuccessDone: () => void;
  handleCongratulationsModal: (arg: boolean) => void;
  onBackButton: () => void;
  setFavourite: () => void;
  onImageClick: (index: number) => void;
  onLocationClick: () => void;
  handleContinueOutletModal: (data: OffersToDisplay) => void;
  onDeliveryButtonPress: () => void;
  onClickWebViewAndAnalytics: () => void;
  toggleAmenties: () => void;
  onMenuClick: () => void;
  onDismissDemographicModalHandler: () => void;
  disableError: () => void;
  disableWebView: () => void;
  onChangeLocationDone: (data: any) => void;
  handleChangeLocation: () => void;
  changeOutletCallback: () => void;
  continueCallback: () => void;
  handleCloseRedemptionModal: () => void;
  onRedeemOffer: (data: RedeemPrams) => {
    type: string;
    data: ReddemOfferRequest;
  };
  makeCustomAnalyticsStack: (stackData: any) => Promise<void>;
}
