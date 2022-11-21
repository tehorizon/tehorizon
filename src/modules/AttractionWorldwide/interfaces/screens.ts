import { StackNavigationProp } from "@react-navigation/stack";
import { Route, SceneRendererProps } from "react-native-tab-view";
import { ReactNode } from "react";

export interface screen {
  navigation: StackNavigationProp<any, any>;
  children?: any;
}

export interface popularLocation {
  topDestinations: Array<City>;
  updateLocation: (city: City) => void;
}

export interface location extends screen {
  index: number;
  changeIndex: (arg1: number) => void;
  routes: Route[];
  renderScene: (props: SceneRendererProps & { route: Route }) => ReactNode;
  searchModal: boolean;
  toggleSearchModal: (searchModal: boolean) => void;
  cities: Array<City>;
  filterCities: (value: string) => void;
  updateLocation: (city: City) => void;
}

export interface City {
  id: number;
  destination_id_viator: number;
  destination_id_ego: number;
  country_id: number;
  cab_service: string;
  has_alcohol: boolean;
  latitude: number;
  longitude: number;
  name: string;
  iata_code: string;
  iso_code: string;
  country: string;
  top_destination_sort_order: number;
  is_top_destination: boolean;
  image_url: string;
  has_ego_offers: boolean;
  dayplan_items_limit: number;
  package_download_url: string;
  is_gcc: number;
  restriction_msg: string;
  flag_image: string;
  home_location_image: string;
  booking_activity_code: string;
  entertainer_logo: string;
}

export interface Destination extends City {
  cities: Array<City>;
}

export interface allLocations {
  allDestinations: Array<{
    title: string;
    data: Array<Destination>;
  }>;
}

export interface destinations extends screen {
  cities: Array<City>;
  updateLocation: (city: City) => void;
}

export interface attractions extends screen {}

export interface attractionsDetails extends screen {}

export interface bookings extends screen {
  bookings: Array<any>;
  onRefresh: () => void;
}
