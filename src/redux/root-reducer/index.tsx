import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import appReducer from "../appReducer/app.reducer";
import locationReducer from "../location/location.reducer";
import { RootState } from "../store";
import {
  Delivery,
  Travel,
  AttractionWorldWide,
} from "@fast_track/src/Modules.json";

import deliveryDetailReducer from "@delivery/redux/reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "@Auth/redux/reducer";
import outletReducer, {
  outletNotPersistedReducer,
} from "@Outlet/redux/reducer";
import homeReducer from "@Home/redux/reducer";
import merchantReducer from "@Merchant/redux/reducer";
import userReducer from "@Profile/redux/reducer";
import travelReducer from "@Travel/redux/reducer";
import attractionsReducer from "@Attractions/redux/reducer";

import searchReducer from "@Search/redux/reducer";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "userReducer",
    "homeReducer",
    "locationReducer",
    "outletReducer",
    "travelReducer",
    "searchReducer",
  ],
};

const rootReducer = combineReducers({
  appReducer,
  userReducer,
  homeReducer,
  locationReducer,
  outletReducer,
  merchantReducer,
  outletNotPersistedReducer,
  authReducer,
  searchReducer,
  // only add these reducers if they are required
  ...(Delivery.isActive ? { deliveryDetailReducer } : {}),
  ...(Travel.isActive ? { travelReducer } : {}),
  ...(AttractionWorldWide.isActive ? { attractionsReducer } : {}),
});

export default persistReducer(persistConfig, rootReducer);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // use it instead of useSelector across app
