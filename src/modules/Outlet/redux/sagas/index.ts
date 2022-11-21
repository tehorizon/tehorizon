// import { RequestTypes, ResponseTypes } from "../../interfaces";

import { put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  logoutSuccess,
  setAppLoading,
  setErrorObject,
} from "@redux/appReducer/app.actions";
import { RequestTypes, ResponseTypes } from "@Outlet/interfaces";
import { OutletActionTypes } from "../types";
import OutletBL from "@Outlet/BL/";
import {
  outletItemInterface,
  outletResposeInterface,
  Routes,
  tabsInterface,
} from "../../BL/Interfaces";
import { setMapOutletList } from "../actions";
import { Route } from "react-native-tab-view";

function* getCheersRequest(params: {
  type: string;
  data: RequestTypes.CheersRequest;
}) {
  let {
    postData,
    token,
    isUserFilledCheersCheck,
    updateCheersRules = () => {},
  } = params.data;
  try {
    if (isUserFilledCheersCheck === true) {
      return;
    }

    yield put(setAppLoading(true));

    const result: ResponseTypes.CheersResult = yield OutletBL.getCheersData(
      token || "",
      postData
    );
    const cheersRules =
      result?.cheersRules.length > 0 ? result.cheersRules[0] : null;
    updateCheersRules(cheersRules);
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* getOutletTabsRequest(params: {
  type: string;
  data: RequestTypes.OutletTabRequest;
}) {
  let { postData, token, updateTabs = () => {} } = params.data;
  try {
    yield put(setAppLoading(true));

    const tabData: tabsInterface = yield OutletBL.getTabs(token, postData);
    if (tabData.tabs.length === 0) throw new Error("Tabs couldn't found");
    let routes: Routes[] = [];
    tabData?.tabs?.map((item) => {
      routes.push({
        key: item.uid,
        title: item.name,
        testID: item.uid,
        payload: item,
      });
    });
    yield updateTabs(routes);
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* getOutletsRequest(params: {
  type: string;
  data: RequestTypes.OutletRequest;
}) {
  let {
    postData,
    selectedFilter,
    token,
    location,
    updateOutletList = () => {},
  } = params.data;
  try {
    if (postData?.offset == 0) {
      yield put(setAppLoading(true));
    }

    if (selectedFilter?.show_new_offers) {
      postData["show_new_offers"] = selectedFilter?.show_new_offers;
    }

    if (selectedFilter?.cuisine_filter?.length > 0) {
      postData["cuisine_filter"] = selectedFilter?.cuisine_filter;
    }

    if (selectedFilter?.sub_category_filter?.length > 0) {
      postData["sub_category_filter"] = selectedFilter?.sub_category_filter;
    }

    if (selectedFilter?.filters_selected_for_no?.length > 0) {
      let selected_for_no_array = selectedFilter.filters_selected_for_no.map(
        (element: string) => element.toLowerCase().replace(/\s/g, "_")
      );
      postData["filters_selected_for_no"] = selected_for_no_array;
    }
    if (selectedFilter?.filters_selected_for_yes?.length > 0) {
      let selected_for_yes_array = selectedFilter.filters_selected_for_yes.map(
        (element: string) => element.toLowerCase().replace(/\s/g, "_")
      );
      postData["filters_selected_for_yes"] = selected_for_yes_array;
    }

    if (location === undefined || location === null) {
      location = { id: 0, name: null };
    }

    const outlets: outletResposeInterface = yield OutletBL.getOutlets(
      token,
      postData
    );
    updateOutletList(outlets?.outlets);

    // setOutletsToState(outlets?.outlets, data);

    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* getOutletMapsRequest(params: {
  type: string;
  data: RequestTypes.OutletMapRequest;
}) {
  let { postData, selectedFilter, token, updateMapOutletList } = params.data;
  try {
    if (selectedFilter?.show_new_offers) {
      postData["show_new_offers"] = selectedFilter?.show_new_offers;
    }

    if (selectedFilter?.cuisine_filter?.length > 0) {
      postData["cuisine_filter"] = selectedFilter?.cuisine_filter;
    }

    if (selectedFilter?.sub_category_filter.length > 0) {
      postData["sub_category_filter"] = selectedFilter?.sub_category_filter;
    }

    if (selectedFilter?.filters_selected_for_no?.length > 0) {
      let selected_for_no_array = selectedFilter.filters_selected_for_no.map(
        (element: string) => element.toLowerCase().replace(/\s/g, "_")
      );
      postData["filters_selected_for_no"] = selected_for_no_array;
    }
    if (selectedFilter?.filters_selected_for_yes?.length > 0) {
      let selected_for_yes_array = selectedFilter.filters_selected_for_yes.map(
        (element: string) => element.toLowerCase().replace(/\s/g, "_")
      );
      postData["filters_selected_for_yes"] = selected_for_yes_array;
    }
    const outlets: outletResposeInterface = yield OutletBL.getOutletsMaps(
      token,
      postData
    );

    const mapOutlets: Array<outletItemInterface> = [...outlets.outlets];
    console.log(postData, outlets, "outLets Data Map");

    yield put(setMapOutletList(mapOutlets));
    yield updateMapOutletList(mapOutlets);
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

export function* OutletSagas() {
  yield takeEvery(OutletActionTypes.GET_CHEERS_REQUEST, getCheersRequest);
  yield takeLatest(
    OutletActionTypes.GET_OUTLETS_TABS_REQUEST,
    getOutletTabsRequest
  );
  yield takeEvery(OutletActionTypes.GET_OUTLETS_REQUEST, getOutletsRequest);
  yield takeEvery(
    OutletActionTypes.GET_OUTLETS_MAPS_REQUEST,
    getOutletMapsRequest
  );
}
