import { OutletFilter } from "@components";
import { BottomSheetRef } from "@components/BottomSheet";
import { ParamListBase, RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RefObject } from "react";
import { ScaledSize } from "react-native";
import { Route } from "react-native-tab-view";
import { outletItemInterface, outletResposeInterface } from "../BL/Interfaces";
import { MAP_REF } from "../components/map";
import { Category, DeviceInfo } from "./requests";
import {
  CheerRule,
  ChipsArray,
  Merchant,
  Pin,
  SelectedFilter,
  Tab,
} from "./responses";
export interface screen {
  navigation?: StackNavigationProp<any, any>;
  children?: any;
}

export interface OutletTab extends screen {
  mode: string;
  mapRendered: boolean;
  activeTabLocal: number;
  outletList: Array<outletItemInterface>;
  activeTabUid?: string;
  userProvidedCheersCheck: boolean;
  isUserFilledCheersCheck: boolean;
  cheersRules: CheerRule;
  favouriteList: outletItemInterface;
  mapRef: React.RefObject<MAP_REF>;
  getCheersDataHelper: () => void;
  getOutletsDataHelper: (arg?: boolean) => void;
  onOutletClick: (data: outletItemInterface) => void;
  cheersSubmit: (data: {
    cheersCheck: 0 | 1 | boolean;
    cheersChecked: 0 | 1 | boolean;
  }) => void;
  tab: string;
}

export interface OutletTabProps extends screen {
  mode: string;
  mapRendered: boolean;
  activeTab: Tab | {};
  activeTabLocal: number;
  route: RouteProp<ParamListBase, string>;
  forceRefresh: boolean;
  travelLocation?: {};
  tab: string;
}
export interface OutletScreen extends screen {
  mode: string;
  mapRendered: boolean;
  deviceInfo: DeviceInfo;
  activeTab: number;
  routes: Route[];
  route: RouteProp<ParamListBase, string>;
  bottomSheetRef: RefObject<BottomSheetRef>;
  category: Category;
  chipsData: Array<Object>;
  layout: ScaledSize;
  forceRefresh: boolean;
  backHandler: () => void;
  onSetSelectedFilter: (arg: any) => void;
  onSetSelectedFilters: (arg: any) => void;
  onPressRightButton: () => void;
  updateActiveTab: React.Dispatch<React.SetStateAction<number>>;
  onDoneHanlder: () => Promise<void>;
  onClearHandler: () => void;
  onClickFilter: () => void;
  onDeleteChip: (data: {}, index: number) => void;
  onSearchCLickHandler: () => Promise<void>;
  travelLocation?: {};
}
