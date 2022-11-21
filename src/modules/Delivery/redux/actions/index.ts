import { ActionTypes } from "../types";
import {
  basketItem,
  onRemoveBasketItem,
  basketValues,
  deliveryDetails,
  locationObj,
  locationRequestData,
  deletLocationRequest,
  outletDetailsRequest,
  orderStatusDetails,
  orderValidation,
} from "../../interfaces";
import { SelectedOutlet } from "../../../Merchant/interfaces/responses";

export const setBasketItem = (data: basketItem) => ({
  type: ActionTypes.SET_BASKET_ITEM,
  data: data,
});

export const removeBasketItem = (data: onRemoveBasketItem) => ({
  type: ActionTypes.REMOVE_BASKET_ITEM,
  data: data,
});

export const removeBasketItemByIndex = (data: number) => ({
  type: ActionTypes.REMOVE_BASKET_ITEM_BY_INDEX,
  data: data,
});

export const setBasketValues = (data: basketValues) => ({
  type: ActionTypes.SET_BASKET_VALUES,
  data: data,
});

export const setDeliveryDetails = (deliveryDetails: deliveryDetails) => ({
  type: ActionTypes.SET_DELIVERY_DETAILS,
  deliveryDetails,
});

export const setDeliveryLocation = (delivery_locations: locationObj[]) => ({
  type: ActionTypes.SET_DELIVERY_LOCATION_LIST,
  delivery_locations,
});

export const deliveryDetailsRequest = () => ({
  type: ActionTypes.DELIVERY_DETAILS_REQUEST,
});

export const pushNewLocation = (location: locationObj) => ({
  type: ActionTypes.PUSH_NEW_LOCATION,
  location,
});

export const addOrUpdateLocationRequest = (data: locationRequestData) => ({
  type: ActionTypes.ADD_OR_UPDATE_NEW_LOCATION_REQUEST,
  data,
});

export const getOutletListingRequest = (data: any) => ({
  type: ActionTypes.GET_OUTLET_LISTING_REQUEST,
  data,
});

export const cancelOutletListingRequest = (data: null) => ({
  type: ActionTypes.CANCEL_OUTLET_LISTING_REQUEST,
  data,
});

export const setOutletListingData = (data: any) => ({
  type: ActionTypes.SET_OUTLET_LISTING,
  data,
});

export const getSearchOutletListingRequest = (data: any) => ({
  type: ActionTypes.GET_SEARCH_OUTLET_LISTING_REQUEST,
  data,
});

export const setSearchOutletListingData = (data: any) => ({
  type: ActionTypes.SET_SEARCH_OUTLET_LISTING,
  data,
});

export const cancelSearchOutletListingRequest = (data: null) => ({
  type: ActionTypes.CANCEL_SEARCH_OUTLET_LISTING_REQUEST,
  data,
});

export const deleteLocationRequest = (data: deletLocationRequest) => ({
  type: ActionTypes.DELETE_LOCATION_REQUEST,
  data,
});

export const getPendingOrderStatusRequest = (data: any) => ({
  type: ActionTypes.GET_PENDING_ORDER_STATUS,
  data,
});
export const setPendingOrderStatusRequest = (data: any) => ({
  type: ActionTypes.SET_PENDING_ORDER_STATUS,
  data,
});

export const setDeliveredLocation = (selectedDeliverToLocation: any) => ({
  type: ActionTypes.SET_DELIVERED_LOCATION,
  selectedDeliverToLocation,
});

//outletDetails actions
export const setSelectedOutlet = (data: SelectedOutlet) => ({
  type: ActionTypes.SET_SELECTED_OUTLET,
  data,
});
export const getOutletDetailsRequest = (data: outletDetailsRequest) => ({
  type: ActionTypes.GET_OUTLET_DETAIL_REQUEST,
  data,
});

export const setOutletDetail = (data: any) => ({
  type: ActionTypes.SET_OUTLET_DETAIL,
  data,
});

export const setOutletDetailMenuTabs = (data: any) => ({
  type: ActionTypes.SET_OUTLET_DETAIL_MENU_TABS,
  data,
});

export const setMenuActiveTab = (data: number) => ({
  type: ActionTypes.SET_MENU_ACTIVE_TAB,
  data,
});

export const setMenuProducts = (data: any) => ({
  type: ActionTypes.SET_MENU_PRODUCT_LIST,
  data,
});

export const setIsAbleToDeliver = (data: boolean) => ({
  type: ActionTypes.SET_IS_ABLE_TO_DELIVER,
  data,
});

// export const setDeliveryInfo = (data) => ({
// 	type: ActionTypes.SET_DELIVERY_INFO,
// 	data
// });

export const getOrderStatusDetailsRequest = (data: orderStatusDetails) => ({
  type: ActionTypes.GET_ORDER_STATUS_DETAILS,
  data,
});
export const setOrderStatusDetailsRequest = (data: any) => ({
  type: ActionTypes.SET_ORDER_STATUS_DETAILS,
  data,
});

export const getOrderStatusesRequest = (data: orderStatusDetails) => ({
  type: ActionTypes.GET_ORDER_STATUSES,
  data,
});
export const setOrderStatusesRequest = (data: any) => ({
  type: ActionTypes.SET_ORDER_STATUSES,
  data,
});

export const getCashlessOrderHistoryRequest = (data: orderStatusDetails) => ({
  type: ActionTypes.GET_CASHLESS_ORDER_HISTORY,
  data,
});
export const setCashlessOrderHistoryRequest = (data: any) => ({
  type: ActionTypes.SET_CASHLESS_ORDER_HISTORY,
  data,
});

export const resetDataAfterSuccessfullyOrder = (data: any) => ({
  type: ActionTypes.RESET_DATA_AFTER_SUCCESS_ORDER,
  data,
});

export const cancelOrderRequest = (data: orderStatusDetails) => ({
  type: ActionTypes.CANCEL_ORDER_REQUEST,
  data,
});

export const setCancelOrder = (data: any) => ({
  type: ActionTypes.SET_CANCEL_ORDER,
  data,
});

export const clearCancelOrderData = () => ({
  type: ActionTypes.CLEAR_CANCEL_ORDER_DATA,
});

export const setDeliveryOrderDetails = () => ({
  type: ActionTypes.SET_DELIVERY_ORDER_DETAILS,
});

export const editOrderRequest = (data: any) => ({
  type: ActionTypes.GET_EDIT_ORDER_DETAILS,
  data,
});

export const setEditOrderRequest = (data: null | any) => ({
  type: ActionTypes.SET_EDIT_ORDER_DETAILS,
  data,
});

export const reOrderValidationRequest = (data: orderValidation) => ({
  type: ActionTypes.GET_REORDER_VALIDATION_REQUEST,
  data,
});

export const setReOrderValidationRequest = (data: null | any) => ({
  type: ActionTypes.SET_REORDER_VALIDATION_REQUEST,
  data,
});

export const setReOrderBasket = (data: any) => ({
  type: ActionTypes.SET_REORDER_BASKET,
  data,
});

export const setDeliveryHomeLoader = (data: boolean) => ({
  type: ActionTypes.SET_DELIVERY_HOME_LOADER,
  data,
});

export const setDeliverySearchLoader = (data: boolean) => ({
  type: ActionTypes.SET_DELIVERY_SEARCH_LOADER,
  data,
});

export const clearOutletDetailsData = () => ({
  type: ActionTypes.CLEAR_OUTLET_DETAILS_DATA,
});
