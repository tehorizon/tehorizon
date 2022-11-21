import { put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../types";
import { pushQuery, searchOutletSuccess } from "../actions";
import OutletSearchBL from "../../BL";
import { SearchParamType } from "../../interfaces/requests";
import { setAppLoading, setErrorObject } from "@redux/appReducer/app.actions";
import appboy from "@HybridComponents/AppBoy";
import { outletResposeInterface } from "@fast_track/src/modules/Outlet/BL/Interfaces";
import { store } from "@redux/store";
const { onSearchEvent } = appboy;

function* outletSearchRequest(action: {
  type: string;
  payload: SearchParamType;
}) {
  try {
    let {
      postData,
      makeCustomAnalyticsStack,
      params,
      refresh,
      callback,
      outlets = [],
    } = action.payload;

    if (refresh) {
      yield put(setAppLoading(true));
    }
    makeCustomAnalyticsStack();

    const result: outletResposeInterface = yield OutletSearchBL.searchOutlet(
      postData
    );

    onSearchEvent({
      lastSearch: params?.query,
      timeStamp: Date.now(),
    });

    if (result?.outlets?.length > 0) {
      yield put(
        searchOutletSuccess(
          postData?.params?.offset > 0
            ? [...outlets, ...result.outlets]
            : result.outlets
        )
      );
      let recents = [...store.getState()?.searchReducer?.recents];
      if (
        !recents?.includes(postData?.params?.query) &&
        postData?.params?.query != ""
      ) {
        recents.unshift(postData?.params?.query);
        yield put(pushQuery(recents));
      }
    } else {
      yield put(searchOutletSuccess([]));
    }

    callback && callback();
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

export function* SearchSagas() {
  yield takeLatest(ActionTypes.SEARCH_OUTLET, outletSearchRequest);
}
