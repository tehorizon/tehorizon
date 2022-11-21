import { NavigationProp } from "@react-navigation/core";
import { outletItemInterface } from "../../Outlet/BL/Interfaces";
import { CallBacks } from "./requests";

export interface screen {
  navigation?: NavigationProp<any, any>;
  children?: any;
}

export interface Favorite extends screen {
  favourite: {
    [key: string]: outletItemInterface;
  };
  onfavouriteClick: CallBacks;
}
