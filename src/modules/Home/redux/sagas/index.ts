import { takeLatest, put } from "redux-saga/effects";
import { HomeActionTypes } from "../types";
import {
  HomeRequestParams,
  locationListRequestParams,
  homeSection,
  homeResult,
  layoutRequest,
} from "../../interfaces";
import {
  logoutSuccess,
  setAppLoading,
  setAppValues,
  setErrorObject,
} from "@redux/appReducer/app.actions";
import HomeBL from "@Home/BL";
import {
  setHomeCategoryList,
  setHomeSections,
  setNearestTiles,
} from "@Home/redux/actions";
import { setLocationValues } from "@redux/location/location.actions";
import axios from "axios";
import PORT from "@fast_track/port.json";
import { outletResposeInterface } from "@Outlet/BL/Interfaces";
import OutletBL from "@Outlet/BL";
import CategoryData from "@Home/defaults/CategoryData";
function* homeRequest(params: { type: string; data: HomeRequestParams }) {
  let { postData, checkDemographic = () => {} } = params.data;
  try {
    yield put(setAppLoading(true));
    let homeResult: homeResult = yield HomeBL.homeSections(postData);
    // const homeResult = null;
    if (homeResult === null || homeResult === undefined) {
      throw Error("Something went wrong with home sections");
    }
    yield put(setHomeSections(homeResult));
    let homeCategoryObj: homeSection = homeResult?.homeSections?.find(
      (item: homeSection) => item?.section_identifier === "categories"
    );
    if (homeCategoryObj) {
      yield put(setHomeCategoryList(homeCategoryObj.tiles));
    }
    yield put(setAppLoading(false));
    checkDemographic();
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* locationListRequest(params: {
  type: string;
  data: locationListRequestParams;
}) {
  let { postData } = params.data;
  try {
    // yield put(setAppLoading(true));
    const { token } = postData;
    const result: any = yield HomeBL.getLocationList(token);
    yield put(
      setLocationValues({
        LocationList: result.locationList,
        LocationListVersion: result.version,
      })
    );
    // yield put(setAppLoading(false));
  } catch (e) {
    console.log({ locationListRequestError: e });
    let parsedError = JSON.parse(e?.message);
    if (parsedError?.status === 403 || parsedError?.status === 401) {
      // yield put(setAppLoading(false));
      yield put(logoutSuccess());
    } else {
      yield put(
        setAppValues({
          isLoading: false,
          errorObject: { status: true, message: parsedError?.error },
        })
      );
    }
    // yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* updateLayoutRequest(params: { type: string; data: layoutRequest }) {
  let { postData } = params.data;
  try {
    yield put(setAppLoading(true));
    let response: object = yield axios({
      url: `/?port=${PORT.layout}/setupLayout`,
      // url: `/setupLayout`, // local
      method: "GET",
      params: postData,
    });

    console.log(response);

    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* homeNearestRequest(params: {
  type: string;
  data: HomeRequestParams;
}) {
  let { token = "", location_id, lat, lng } = params.data;
  try {
    // get nearest 5 outlests
    const nearest: outletResposeInterface = yield OutletBL.getOutlets(token, {
      location_id,
      category: CategoryData.FoodAndDrink.api_name,
      offset: 0,
      user_include_cheers: false,
      lat,
      lng,
      limit: 5,
    });
    if (nearest?.outlets?.length > 0) {
      yield put(setNearestTiles(nearest.outlets));
    }
  } catch (e) {
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}
export function* HomeSagas() {
  yield takeLatest(HomeActionTypes.HOME_REQUEST, homeRequest);
  yield takeLatest(HomeActionTypes.HOME_NEAREST_REQUEST, homeNearestRequest);
  yield takeLatest(HomeActionTypes.LOCATION_LIST_REQUEST, locationListRequest);
  yield takeLatest(HomeActionTypes.UPDATE_LAYOUT, updateLayoutRequest);
}
