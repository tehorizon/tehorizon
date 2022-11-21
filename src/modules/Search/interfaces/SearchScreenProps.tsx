import { SearchBarRef } from "@components/SeachBar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RefObject } from "react";
import { outletItemInterface } from "../../Outlet/BL/Interfaces";

export interface screen {
  navigation?: StackNavigationProp<any, any>;
  children?: any;
}

export interface SearchScreenProps extends screen {
  searchBar: RefObject<SearchBarRef>;
  isLoading: boolean;
  chipsData: Array<object>;
  outlets: Array<outletItemInterface>;
  params: any;
  favouriteList: outletItemInterface;
  onRefresh: () => void;
  onPressCancel: () => void;
  onEndReached: () => void;
  onDeleteChip: (data: any) => void;
  setPreviousSearchText: (data: string) => void;
  searchSubmitHandler: (arg?: boolean) => void;
  onOutletClickHandler: (data: any) => void;
  resetRecents: () => void;
  category: any;
  isSearched: boolean;
  recents: string[];
}
