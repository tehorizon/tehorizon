import { takeLatest, put } from "redux-saga/effects";
import { ActionTypes } from "../types";
import NetwrokService from "../../BL";
import {
  selectAttraction,
  setAttractions,
  setBookings,
  setLocationData,
} from "../actions";
import { ResponseTypes } from "@Attractions/interfaces";
import { setAppLoading, setErrorObject } from "@redux/appReducer/app.actions";

function* getAttractions(params: { type: string }) {
  try {
    yield put(setAppLoading(true));
    let data = yield NetwrokService.attractions();
    console.log(data);

    if (data?.data?.length > 0) {
      yield put(setAttractions(data?.data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ text: e.message, status: true }));
  }
}

function* getAttractionsDetails(params: { type: string; payload }) {
  try {
    let { postData } = params.payload;
    yield put(setAppLoading(true));
    let data = yield NetwrokService.attractionsDetails(postData);

    if (data?.data) {
      yield put(selectAttraction(data?.data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ text: e.message, status: true }));
  }
}

function* locationRequest(params: { type: string }) {
  try {
    yield put(setAppLoading(true));
    let data: { data: ResponseTypes.location } =
      yield NetwrokService.location();
    if (data?.data?.top_destinations?.length > 0) {
      // refactor destinations property to data for fullfiling section list requiremnet
      data?.data?.all_destinations?.forEach(function (data) {
        data["data"] = data["destinations"];
      });
      yield put(setLocationData(data.data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ text: e.message, status: true }));
  }
}

function* getBookingsList(params: { type: string; payload }) {
  try {
    let { postData } = params.payload;
    yield put(setAppLoading(true));
    let data = yield NetwrokService.bookings(postData);

    if (data?.data) {
      yield put(setBookings(data?.data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ text: e.message, status: true }));
  }
}

export function* AttractionsSagas() {
  yield takeLatest(ActionTypes.GET_ATTRACTION_CALL, getAttractions);
  yield takeLatest(
    ActionTypes.GET_ATTRACTION_DETAILS_CALL,
    getAttractionsDetails
  );
  yield takeLatest(ActionTypes.LOCATION_DATA_REQUEST, locationRequest);
  yield takeLatest(ActionTypes.GET_BOOKINGS_CALL, getBookingsList);
}
