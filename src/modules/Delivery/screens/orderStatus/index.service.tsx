import { orderStatusDetails, ScreenTypes } from "@delivery/interfaces";
import { useEffect, useState } from "react";
import * as RNLocalize from "react-native-localize";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@redux/root-reducer";
import {
  getOrderStatusDetailsRequest,
  getOrderStatusesRequest,
  cancelOrderRequest,
  clearCancelOrderData,
  resetDataAfterSuccessfullyOrder,
  setDeliveryOrderDetails,
  editOrderRequest,
  setEditOrderRequest,
} from "@delivery/redux/actions";

import { selectAppLoading } from "@redux/appReducer/app.selectors.js";

let stopStatusRefreshCall = false;

const OrderStatus = ({ children, navigation, route }: ScreenTypes.screen) => {
  //route params
  const {
    orderRef,
    editable = false,
    editOrderTimerValue = 0,
    goBack = false,
  } = route?.params;
  console.log("route.params: ", route?.params);

  //state
  //statusRefreshFlag is for order status refresh recursive call
  const [statusRefreshFlag, setStatusRefreshFlag] = useState(true);
  const [showEditableButton, setShowEditableButton] = useState(editable);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);
  console.log("route.params: showEditableButton", showEditableButton);

  //Redux
  const dispatch = useDispatch();
  const selectedOrderStatusDetails = useAppSelector(
    (state) => state.deliveryDetailReducer?.orderStatusDetails
  );
  const selectedOrderStatuses = useAppSelector(
    (state) => state.deliveryDetailReducer?.orderStatuses
  );
  const cancelOrderResponse = useAppSelector(
    (state) => state.deliveryDetailReducer?.cancelOrderResponse
  );
  const editOrderDetails = useAppSelector(
    (state) => state.deliveryDetailReducer?.editOrderDetails
  );
  let isLoadingData = useSelector(selectAppLoading);

  // saga calls
  const getOrderStatusDetails = (data: orderStatusDetails) =>
    dispatch(getOrderStatusDetailsRequest(data));
  const getOrderStatuses = (data: orderStatusDetails) =>
    dispatch(getOrderStatusesRequest(data));
  const cancelOrder = (data: orderStatusDetails) =>
    dispatch(cancelOrderRequest(data));
  const editOrder = (data: any) => dispatch(editOrderRequest(data));

  useEffect(() => {
    dispatch(resetDataAfterSuccessfullyOrder({}));
  }, []);

  useEffect(() => {
    getOrderStatusDetails({
      is_last_mile_enabled: "true",
      is_new_order_status_flow: "true",
      order_id: orderRef,
    });
    getOrderStatuses({
      is_last_mile_enabled: "true",
      is_new_order_status_flow: "true",
      order_id: orderRef,
      time_zone: RNLocalize.getTimeZone(),
    });

    stopStatusRefreshCall = false;

    if (showEditableButton) {
      setTimeout(() => {
        setShowEditableButton(false);
      }, editOrderTimerValue * 1000);
    }
  }, []);

  useEffect(() => {
    if (
      selectedOrderStatusDetails?.data &&
      selectedOrderStatuses?.data &&
      statusRefreshFlag
    ) {
      updateOrderStatus();
      setStatusRefreshFlag(false);
    }
  }, [selectedOrderStatusDetails, selectedOrderStatuses]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      stopStatusRefreshCall = true;
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (cancelOrderResponse.data) {
      setShowCancelSuccessModal(true);
      stopStatusRefreshCall = true;
      // navigation.navigate("DeliveryHome");
      // dispatch(clearCancelOrderData())
    }
  }, [cancelOrderResponse]);

  useEffect(() => {
    if (editOrderDetails) {
      dispatch(setDeliveryOrderDetails());
      navigation.navigate("DeliveryOutletDetail", { orderID: orderRef });
      dispatch(setEditOrderRequest(null));
    }
  }, [editOrderDetails]);

  const updateOrderStatus = () => {
    const length = selectedOrderStatuses?.data?.order_statuses.length;

    if (
      stopStatusRefreshCall ||
      selectedOrderStatuses?.data?.is_order_rejected ||
      selectedOrderStatuses?.data?.order_statuses[length - 1].is_selected
    ) {
      return;
    } else {
      const timeIntervalInMS =
        selectedOrderStatusDetails?.data?.order_status_refresh_interval * 1000;

      setTimeout(() => {
        if (!stopStatusRefreshCall) {
          getOrderStatuses({
            is_last_mile_enabled: "true",
            is_new_order_status_flow: "true",
            order_id: route?.params?.orderRef,
            time_zone: RNLocalize.getTimeZone(),
          });
        }

        updateOrderStatus();
      }, timeIntervalInMS);
    }
  };

  const onEditOrderPress = () => {
    const data = {
      order_id: orderRef,
    };
    editOrder(data);
    // dispatch(setDeliveryOrderDetails())
    // navigation.navigate("DeliveryOutletDetail");
  };

  const onHide = () => {
    setShowCancelSuccessModal(false);
    navigation.navigate("DeliveryHome");
    dispatch(clearCancelOrderData());
  };

  const onCancel = () => {
    setShowCancelModal(false);
    const data = {
      is_last_mile_enabled: "true",
      is_new_order_status_flow: "true",
      order_id: orderRef,
      time_zone: RNLocalize.getTimeZone(),
    };
    console.log("cancelOrder request object:  oncancel", data);
    cancelOrder(data);
  };

  return children({
    orderRef,
    showEditableButton,
    showCancelModal,
    showCancelSuccessModal,
    isLoadingData,
    selectedOrderStatusDetails,
    selectedOrderStatuses,
    navigation,
    //methods
    setShowCancelModal,
    cancelOrder,
    onEditOrderPress,
    onHide,
    onCancel,
  } as ScreenTypes.orderStatus);
};

export default OrderStatus;
