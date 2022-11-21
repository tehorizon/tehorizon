import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import TopTabProfile from "@Profile/components/TopTabProfile";
import GraphHistory from "@Profile/components/saving_history_graph";
import i18n, { getFlipForRTLStyle } from "@localization";
import { design } from "rn_fast_track_uilib";
import { HeaderWithBackButton, CustomText, EmptyComponent } from "@components";
import { PRIMARY_EXTRABOLD } from "@fonts";
import styles from "./styles";

export default function SavingHistoryUI({
  showHeader,
  monthlySaving,
  currUser,
  title,
  navigation,
  currency,
  savings,
  activeTab,
  onChangeTab,
  graphData,
}: any) {
  if (
    monthlySaving === null ||
    monthlySaving === undefined ||
    monthlySaving?.lifeTimeSaving === 0
  ) {
    return (
      <View style={[styles.mainView, getFlipForRTLStyle()]}>
        {showHeader ? (
          <HeaderWithBackButton
            title={i18n.t("Savings_History")}
            navigation={navigation}
          />
        ) : null}
        <EmptyComponent
          isRTL={false}
          currency={currUser.currency}
          title={i18n.t("Total_Savings")}
          image={require("@assets/images/total_saving_empty.png")}
          bodyText={i18n.t("Check_back_savings")}
        />
      </View>
    );
  }

  return (
    <View style={[styles.mainView, getFlipForRTLStyle()]}>
      {showHeader ? (
        <HeaderWithBackButton
          title={i18n.t("Savings_History")}
          navigation={navigation}
        />
      ) : null}

      <View style={styles.body}>
        <CustomText style={styles.titleText}>
          {/*May <TextLabel>{i18n.t("SAVINGS")}</TextLabel>*/}
          {title}
        </CustomText>
        <CustomText style={styles.currencyText}>
          {currency} {savings}
        </CustomText>

        <View style={styles.tabs}>
          <TopTabProfile activeTab={activeTab} onChangeTab={onChangeTab} />
          <GraphHistory {...graphData} activeTab={activeTab} />
        </View>
      </View>
    </View>
  );
}
