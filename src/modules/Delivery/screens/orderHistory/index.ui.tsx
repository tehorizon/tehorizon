import { ScreenTypes } from "../../interfaces";
import React from "react";
import { View } from "react-native";
import i18n from "@localization";
import styles from "./styles";
//Components
import EmptyOrder from "@delivery/components/EmptyOrder";
import OrderAccordionList from "@delivery/components/OrderAccordionList";
import { HeaderWithBackButton } from "@components";

const OrderHistory = ({
  orderHistory,
  isLoadingData,
  showHeader,
}: ScreenTypes.orderHistory) => {
  return (
    <View style={styles.mainContainer}>
      {showHeader === true ? (
        <HeaderWithBackButton title={i18n.t("Order_History")} />
      ) : null}

      {isLoadingData ? (
        <EmptyOrder />
      ) : orderHistory?.data ? (
        <OrderAccordionList orderHistory={orderHistory.data} />
      ) : (
        <EmptyOrder />
      )}
    </View>
  );
};

export default OrderHistory;
