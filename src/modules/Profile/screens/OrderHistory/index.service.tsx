import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as RNLocalize from "react-native-localize";
import { getCashlessOrderHistoryRequest } from "@delivery/redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function OrderHistoryService({ children, ...props }: any) {
  const { showHeader = true } = props;
  const [orderHistory, setOrderHistory] = useState([]);
  //Navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let isLoadingData = useSelector((state) => state.appReducer.isLoading);
  let cashlessOrderHistory = useSelector(
    (state) => state.deliveryDetailReducer?.cashlessOrderHistory
  );

  const getCashlessOrderhistory = (data) =>
    dispatch(getCashlessOrderHistoryRequest(data));

  useEffect(() => {
    getCashlessOrderhistory({
      is_last_mile_enabled: "true",
      is_new_order_status_flow: "true",
      time_zone: RNLocalize.getTimeZone(),
    });
  }, []);

  useEffect(() => {
    if (!isLoadingData && cashlessOrderHistory && cashlessOrderHistory.data) {
      console.log("cashlessOrderHistory", cashlessOrderHistory.data);
      setOrderHistory(cashlessOrderHistory);
    }
  }, [isLoadingData]);

  return children({
    showHeader,
    orderHistory,
    isLoadingData,
    navigation,
  });
}
