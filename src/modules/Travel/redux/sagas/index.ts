import { takeLatest, put } from "redux-saga/effects";
import { TravelActionTypes } from "../types";
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
import TravelBL from "../../BL";
import { setCountryList } from "../actions";

function* countryListRequest(params: {
  type: string;
  data: locationListRequestParams;
}) {
  let { postData } = params.data;
  try {
    // yield put(setAppLoading(true));
    const result = yield TravelBL.countryListApi(postData);
    yield put(setCountryList(result));
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

export function* TravelSagas() {
  yield takeLatest(TravelActionTypes.GET_COUNTRIES_LIST, countryListRequest);
}
