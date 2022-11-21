// Imports: Dependencies
import { all, fork } from "redux-saga/effects";
import {
  Delivery,
  Travel,
  AttractionWorldWide,
} from "@fast_track/src/Modules.json";

// Imports: Redux Sagas
import { AuthSagas } from "@Auth/redux/sagas";
import { OutletSagas } from "@Outlet/redux/sagas";
import { HomeSagas } from "@Home/redux/sagas";
import { MerchantSagas } from "@Merchant/redux/sagas";
import { ProfileSagas } from "@Profile/redux/sagas";
import { SearchSagas } from "@Search/redux/sagas";
import { deliverySagas } from "@delivery/redux/sagas";
import { TravelSagas } from "@Travel/redux/sagas";
import { AttractionsSagas } from "@Attractions/redux/sagas";
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([fork(AuthSagas)]);
  yield all([fork(OutletSagas)]);
  yield all([fork(HomeSagas)]);
  yield all([fork(MerchantSagas)]);
  yield all([fork(ProfileSagas)]);
  yield all([fork(SearchSagas)]);
  // only add these sagas if they are required
  if (Delivery.isActive) {
    yield all([fork(deliverySagas)]);
  }
  if (Travel.isActive) {
    yield all([fork(TravelSagas)]);
  }
  if (AttractionWorldWide.isActive) {
    yield all([fork(AttractionsSagas)]);
  }
}
