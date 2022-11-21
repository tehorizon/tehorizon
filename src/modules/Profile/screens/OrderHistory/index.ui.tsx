import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";
import { design } from "rn_fast_track_uilib";
//Components
import EmptyOrder from "../../components/EmptyOrder";
import OrderAccordionList from "../../components/OrderAccordionList";
import { EmptyComponent, HeaderWithBackButton } from "@components";

export default function OrderHistoryUI({
  showHeader,
  orderHistory,
  isLoadingData,
  navigation,
}: any) {
  const { mainContainer } = Styles;

  return (
    <View style={[mainContainer, getFlipForRTLStyle()]}>
      {showHeader === true ? (
        <HeaderWithBackButton
          title={i18n.t("Order_History")}
          navigation={navigation}
        />
      ) : null}

      {isLoadingData ? (
        <EmptyComponent
          isRTL={false}
          title={i18n.t("Total_Redemptions")}
          image={require("@assets/images/order_history_empty.png")}
          bodyText={i18n.t("Check_back_savings")}
        />
      ) : orderHistory?.data ? (
        <OrderAccordionList orderHistory={orderHistory.data} />
      ) : (
        <EmptyComponent
          isRTL={false}
          title={i18n.t("Total_Redemptions")}
          image={require("@assets/images/order_history_empty.png")}
          bodyText={i18n.t("Check_back_savings")}
        />
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"]
      ? design["Background_Primary_Color"]
      : "white",
  },
});
