import { takeLatest, put } from "redux-saga/effects";
import { ActionTypes } from "../types";
import Delivery from "@delivery/BL";
import { store } from "@redux/store";
import I18n from "@localization";
import { useSelector } from "react-redux";
import {
  setDeliveryDetails,
  pushNewLocation,
  setOutletListingData,
  setPendingOrderStatusRequest,
  setOutletDetail,
  setOutletDetailMenuTabs,
  setMenuProducts,
  setIsAbleToDeliver,
  setOrderStatusDetailsRequest,
  setOrderStatusesRequest,
  setCashlessOrderHistoryRequest,
  setCancelOrder,
  setEditOrderRequest,
  setReOrderValidationRequest,
  setSearchOutletListingData,
  // setDeliveryHomeLoader,
  setDeliverySearchLoader,
  cancelOutletListingRequest,
  cancelSearchOutletListingRequest,
  setDeliveryLocation,
  setDeliveredLocation,
} from "../actions";
import { setAppLoading, setErrorObject } from "@redux/appReducer/app.actions";
import {
  Delivery_Locations,
  Location_Details,
} from "@delivery/interfaces/responses";
import {
  fetchTabsFromData,
  fetchMenuProductsList,
} from "@delivery/helpers/outletDetailHelpers";

import { checkIsDeliveryInRegion } from "@delivery/helpers/LocationHelpers";
import { locationObj } from "../../interfaces";

function* deliveryDetailsRequest() {
  try {
    yield put(setAppLoading(true));
    let data: Delivery_Locations = yield Delivery.deliveryLocation();
    if (data?.data) {
      yield put(setDeliveryDetails(data.data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* getPendingOrderStatusRequestSaga(params) {
  try {
    console.log(params.data, "paramsData");
    // yield put(setAppLoading(true));

    let data = yield Delivery.cashlessPendingOrderStatus(params.data);
    if (data) {
      yield put(setPendingOrderStatusRequest(data));
    }
    // yield put(setAppLoading(false));
  } catch (e) {
    // yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* getOutletListingRequest(params: any) {
  try {
    console.log(params.data, "paramsData");
    const { data, token, extraData, updateOutletList } = params.data;
    if (!extraData?.isLoadMore) {
      yield put(setAppLoading(true));
    }

    let responseData = yield Delivery.getDeliveryOutlets(data, token);

    if (responseData?.data) {
      // yield put(setOutletListingData(responseData.data, extraData));
      updateOutletList(responseData.data.outlets);
    }
    yield put(setAppLoading(false));
    yield put(cancelOutletListingRequest(null));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(cancelOutletListingRequest(null));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

// export function* outletListingSaga() {
//   while (true) {
//     const call = yield take(ActionTypes.GET_OUTLET_LISTING_REQUEST);
//     if (call) {
//       console.log("1234 call");
//       const bgS = yield fork(getOutletListingRequest, call);
//       const cancelCall = yield take(
//         ActionTypes.CANCEL_OUTLET_LISTING_REQUEST
//       );
//       if (cancelCall) {
//         yield cancel(bgS);
//         yield put(setAppLoading(false));
//       }
//     }
//   }
// }

function* getSearchOutletListingRequest(params: any) {
  try {
    console.log(params.data, "paramsData");
    yield put(setDeliverySearchLoader(true));

    let data = yield Delivery.getDeliveryOutlets(params.data.data);
    if (data?.data) {
      console.log("getSearchOutletListingRequest: ", data.data);
      yield put(setSearchOutletListingData(data.data, params.data.extraData));
    }
    yield put(setDeliverySearchLoader(false));
    yield put(cancelSearchOutletListingRequest(null));
  } catch (e) {
    yield put(setDeliverySearchLoader(false));
    yield put(cancelSearchOutletListingRequest(null));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

// export function* outletSearchListingSaga() {
//   while (true) {
//     const call = yield take(
//       ActionTypes.GET_SEARCH_OUTLET_LISTING_REQUEST
//     );
//     if (call) {
//       const bgS = yield fork(getSearchOutletListingRequest, call);
//       const cancelCall = yield take(
//         ActionTypes.CANCEL_SEARCH_OUTLET_LISTING_REQUEST
//       );
//       if (cancelCall) {
//         yield cancel(bgS);
//         yield put(setDeliverySearchLoader(false));
//       }
//     }
//   }
// }

function* orderStatusDetailsRequest(params: any) {
  try {
    console.log(params.data, "paramsData");
    yield put(setAppLoading(true));

    let data = yield Delivery.orderStatusDetails(params.data);
    if (data?.data) {
      yield put(setOrderStatusDetailsRequest(data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* editOrderRequest(params) {
  try {
    console.log(params.data, "paramsData");
    yield put(setAppLoading(true));

    let data = yield Delivery.editOrderDetails(params.data);
    if (data?.data) {
      yield put(setEditOrderRequest(data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* reOrderValidationRequest(params) {
  try {
    console.log(params.data, "paramsData");
    yield put(setAppLoading(true));

    let data = yield Delivery.reOrderValidation(params.data);
    if (data?.data) {
      yield put(setReOrderValidationRequest(data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* orderStatusesRequest(params) {
  try {
    console.log(params.data, "cancel paramsData");
    let data = yield Delivery.orderStatuses(params.data);
    if (data?.data) {
      yield put(setOrderStatusesRequest(data));
    }
  } catch (e) {
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* addOrUpdateLocationRequest(params) {
  try {
    yield put(setAppLoading(true));
    let { navigation, postData, itemIndex, saveLocation = false } = params.data;

    if (postData.special_instructions == "" || postData.address) {
      throw Error(I18n.t("Please fill in all the required fields"));
    } else if (saveLocation && postData.title == "") {
      throw Error(I18n.t("Please Select Location Tag"));
    }

    let data: Location_Details = null;
    if (saveLocation) {
      // if itemIndex has positive value means we need to update location
      // delivery_location_id not available for local item means saving local item to server
      data =
        itemIndex < 0 || (saveLocation && !postData.delivery_location_id)
          ? yield Delivery.addNewLocation(postData)
          : yield Delivery.updateLocation(postData);
    }

    // eiter data came from server or saveLocation is false - means saving location locally
    if (data?.data || !saveLocation) {
      let locationOBJ: locationObj = {
        delivery_location_id: postData.delivery_location_id,
        title: postData.title || postData.home_office_address,
        home_office_address: postData.home_office_address,
        street: "",
        area_city: postData.area_city,
        special_instructions: postData.special_instructions,
        latitude: postData.latitude,
        longitude: postData.longitude,
        auto_select_range: 1000,
      };

      if (saveLocation) {
        // adding tag info
        (locationOBJ.delivery_location_id = data?.data?.id),
          (locationOBJ.tag = {
            tag_id: data?.data?.tag_id || "",
            tag_label: data?.data?.title || "",
            tag_name: data?.data?.title || "",
            allow_custom_name:
              data?.data?.title != "Work" && data?.data?.title != "Home",
          });
      }

      yield put(setDeliveredLocation(locationOBJ));
      // if (itemIndex < 0) {
      //   yield put(pushNewLocation(locationOBJ));
      // } else {
      //   let deliveryLocations = [
      //     ...(store.getState()?.deliveryDetailReducer?.deliveryDetails
      //       ?.delivery_locations || []),
      //   ];
      //   deliveryLocations[itemIndex] = locationOBJ;
      //   yield put(setDeliveryLocation(deliveryLocations));
      // }
      navigation.navigate("Delivery");
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* removeLocation(itemIndex) {
  let deliveryLocations = [
    ...(store.getState()?.deliveryDetailReducer?.deliveryDetails
      ?.delivery_locations || []),
  ];
  deliveryLocations?.splice(itemIndex, 1); // remove item
  yield put(setDeliveryLocation(deliveryLocations));
}

function* deleteLocationRequest(params) {
  try {
    yield put(setAppLoading(true));
    let { delivery_location_id, itemIndex } = params.data;

    if (!delivery_location_id) {
      // local item
      yield removeLocation(itemIndex);
    } else {
      let data: { success: boolean } = yield Delivery.deleteLocation(
        delivery_location_id
      );
      if (data?.success) {
        yield removeLocation(itemIndex);
      }
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* getOutletDetailRequest(params: { type: string; data: any }) {
  try {
    let { postData, token } = params.data;
    yield put(setAppLoading(true));
    let response = yield Delivery.getDeliveryOutletDetail(postData, token);
    if (response?.data) {
      const outletDetail = response.data;
      yield put(
        setOutletDetailMenuTabs(fetchTabsFromData(outletDetail?.menus))
      );

      yield put(setMenuProducts(fetchMenuProductsList(0, outletDetail?.menus)));

      yield put(setOutletDetail(outletDetail));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* setMenuActiveTabSaga(params) {
  try {
    const outletDetail = useSelector(
      (state) => state.deliveryDetailReducer?.deliveryDetails.outletDetail
    );

    yield put(
      setMenuProducts(fetchMenuProductsList(params.data, outletDetail?.menus))
    );
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* setIsAbleToDeliverSaga(params) {
  try {
    const selectedDeliverToLocation = params.selectedDeliverToLocation;
    const outletDetail = useSelector(
      (state) => state.deliveryDetailReducer?.deliveryDetails.outletDetail
    );
    const deliveryInfo = useSelector(
      (state) => state.deliveryDetailReducer?.deliveryOutletDetail.deliveryInfo
    );

    if (outletDetail) {
      //TODO: add local lat lng
      const currentLocation = {
        latitude: selectedDeliverToLocation
          ? selectedDeliverToLocation.latitude
          : 0,
        longitude: selectedDeliverToLocation
          ? selectedDeliverToLocation.longitude
          : 0,
      };

      const deliveryRegions = outletDetail?.delivery_regions;
      const deliveryRegion = outletDetail?.delivery_region;

      const isInDeliveryRegion = checkIsDeliveryInRegion(
        currentLocation,
        deliveryRegion,
        deliveryRegions,
        deliveryInfo
      );

      console.log(
        isInDeliveryRegion,
        currentLocation,
        deliveryRegion,
        deliveryRegions,
        deliveryInfo,
        "in setIsAbleToDeliverSaga"
      );

      const isOpen = outletDetail.is_open;
      // const isLastMileDelivery = outlet.outletInfo.isLastMile;
      // const lastMileDeliveryMessage = outlet.outletInfo.lastMileDeliveryMessage;

      let check = false;
      if (!isOpen) {
        check = true;
      } else if (!isInDeliveryRegion) {
        check = true;
      }
      yield put(setIsAbleToDeliver(check));
    }
  } catch (e) {
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* cashlessOrderHistoryRequest(params) {
  try {
    yield put(setAppLoading(true));
    console.log(params.data, "paramsData");
    let data = yield Delivery.cashlessOrderHistory(params.data);
    if (data?.data) {
      yield put(setCashlessOrderHistoryRequest(data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

function* cancelOrder(params) {
  try {
    yield put(setAppLoading(true));
    console.log("cancelOrder request object saga");
    let data = yield Delivery.cancelOrderBL(params.data);
    if (data?.data) {
      yield put(setCancelOrder(data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(setErrorObject({ status: true, message: e.message }));
  }
}

export function* deliverySagas() {
  yield takeLatest(
    ActionTypes.DELIVERY_DETAILS_REQUEST,
    deliveryDetailsRequest
  );
  yield takeLatest(
    ActionTypes.ADD_OR_UPDATE_NEW_LOCATION_REQUEST,
    addOrUpdateLocationRequest
  );
  yield takeLatest(ActionTypes.DELETE_LOCATION_REQUEST, deleteLocationRequest);
  yield takeLatest(
    ActionTypes.GET_OUTLET_LISTING_REQUEST,
    getOutletListingRequest
  );
  yield takeLatest(
    ActionTypes.GET_SEARCH_OUTLET_LISTING_REQUEST,
    getSearchOutletListingRequest
  );
  yield takeLatest(
    ActionTypes.GET_PENDING_ORDER_STATUS,
    getPendingOrderStatusRequestSaga
  );
  yield takeLatest(
    ActionTypes.GET_OUTLET_DETAIL_REQUEST,
    getOutletDetailRequest
  );
  yield takeLatest(ActionTypes.SET_MENU_ACTIVE_TAB, setMenuActiveTabSaga);
  // yield takeLatest(ActionTypes.SET_DELIVERED_LOCATION, setIsAbleToDeliverSaga);
  yield takeLatest(
    ActionTypes.GET_REORDER_VALIDATION_REQUEST,
    reOrderValidationRequest
  );
  yield takeLatest(
    ActionTypes.GET_ORDER_STATUS_DETAILS,
    orderStatusDetailsRequest
  );
  yield takeLatest(ActionTypes.GET_ORDER_STATUSES, orderStatusesRequest);
  yield takeLatest(ActionTypes.GET_EDIT_ORDER_DETAILS, editOrderRequest);
  yield takeLatest(
    ActionTypes.GET_CASHLESS_ORDER_HISTORY,
    cashlessOrderHistoryRequest
  );
  yield takeLatest(ActionTypes.CANCEL_ORDER_REQUEST, cancelOrder);
}
