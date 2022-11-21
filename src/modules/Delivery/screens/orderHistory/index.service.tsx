import { ScreenTypes } from "../../interfaces";
import { useState, useEffect } from "react";
import * as RNLocalize from "react-native-localize";
import { getCashlessOrderHistoryRequest } from "@delivery/redux/actions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/root-reducer";

const OrderHistory = ({ children, navigation, route }: ScreenTypes.screen) => {
  //props
  //   const { showHeader = true } = props;
  const showHeader = true;
  //State
  const [orderHistory, setOrderHistory] = useState([]);

  const dispatch = useDispatch();
  let isLoadingData = useAppSelector((state) => state.appReducer?.isLoading);
  let cashlessOrderHistory = useAppSelector(
    (state) => state?.deliveryDetailReducer?.cashlessOrderHistory
  );

  const getCashlessOrderhistory = (data: any) =>
    dispatch(getCashlessOrderHistoryRequest(data));

  useEffect(() => {
    getCashlessOrderhistory({
      is_last_mile_enabled: "true",
      is_new_order_status_flow: "true",
      time_zone: RNLocalize.getTimeZone(),
    });
  }, []);

  useEffect(() => {
    if (!isLoadingData && cashlessOrderHistory && cashlessOrderHistory?.data) {
      console.log("cashlessOrderHistory", cashlessOrderHistory?.data);
      setOrderHistory(cashlessOrderHistory);
    }
  }, [isLoadingData]);

  return children({
    orderHistory,
    isLoadingData,
    showHeader,
    navigation,
  } as ScreenTypes.orderHistory);
};
export default OrderHistory;
