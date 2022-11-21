import React, { useState } from "react";
import Header from "../../components/Header";
import RedemptionsHistory from "../RedemptionHistory";
import SavingsHistory from "../SavingHistory";
import i18n, { getFlipForRTLStyle } from "@localization";

import { design } from "rn_fast_track_uilib";
import { CustomSafeAreaView, HeaderWithBackButton } from "@components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PRIMARY_EXTRABOLD } from "@fonts";
import { View } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function SavingBreakdownUI({
  navigation,
  makeCustomAnalyticsStack,
}: any) {
  return (
    <View testID="savingBreakdownScreen" style={styles.mainContainer}>
      <HeaderWithBackButton
        title={i18n.t("Savings_Breakdown")}
        navigation={navigation}
        customStyle={{ borderBottomWidth: 0 }}
      />
      <Tab.Navigator
        tabBarOptions={{
          allowFontScaling: false,
          inactiveTintColor: design.Tabs_Title_InActive_Color,
          activeTintColor: design.Tabs_Title_Active_Color,
          style: {
            backgroundColor: design.Header_Background_Primary_Color,
            marginTop: 0,
            marginBottom: 0,
            height: 40,
          },
          indicatorStyle: {
            height: 3,
            backgroundColor: design.Active_Tabs_Under_Line_Color,
          },
          labelStyle: {
            fontFamily: PRIMARY_EXTRABOLD,
            lineHeight: 16,
            ...getFlipForRTLStyle(),
          },
        }}
      >
        <Tab.Screen
          name="SavingsHistory"
          component={SavingsHistory}
          initialParams={{
            header: false,
          }}
          options={{
            title: i18n.t("SAVINGS"),
          }}
          listeners={({ navigation, route }: any) => ({
            tabPress: (e: any) => {
              e.preventDefault();
              const stackData = {
                current_screen: "Savings Breakdown",
                action: "select_savings",
                category_id: "",
                categories: "",
                categories_analytics: "",
                location_id: 0,
                changeSequenceNumber: false,
              };
              makeCustomAnalyticsStack(stackData);
              navigation.navigate("SavingsHistory");
            },
          })}
        />
        <Tab.Screen
          name="RedemptionsHistory"
          // component={() => <RedemptionsHistory header={false} />}
          component={RedemptionsHistory}
          initialParams={{
            header: false,
          }}
          options={{ title: i18n.t("REDEMPTIONS") }}
          listeners={({ navigation, route }: any) => ({
            tabPress: (e: any) => {
              e.preventDefault();
              const stackData = {
                current_screen: "Savings Breakdown",
                action: "select_redemptions",
                category_id: "",
                categories: "",
                categories_analytics: "",
                location_id: 0,
                changeSequenceNumber: false,
              };
              makeCustomAnalyticsStack(stackData);
              navigation.navigate("RedemptionsHistory");
            },
          })}
        />
      </Tab.Navigator>
    </View>
  );
}
const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: design.Header_Background_Primary_Color
      ? design.Header_Background_Primary_Color
      : "white",
  },
  redemptionMonthView: {
    flexDirection: "row",
    backgroundColor: "rgb(50, 192, 168)",
    height: 35,
    alignItems: "center",
    paddingStart: 12,
    paddingEnd: 12,
  },
  redemptionDetailsItem: {
    flexDirection: "row",
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  redemptionDetailsView: {
    flex: 1,
    paddingLeft: 10,
  },
};
