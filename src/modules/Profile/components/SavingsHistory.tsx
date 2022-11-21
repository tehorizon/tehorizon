import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

import TopTabProfile from "./TopTabProfile/index";
import GraphHistory from "./saving_history_graph";

import i18n, { isRTL, getFlipForRTLStyle } from "@localization";
// import { Port as port } from "./port";

import { design } from "rn_fast_track_uilib";

import { CustomText, HistoryEmpty } from "@components";
import { PRIMARY_EXTRABOLD } from "@fonts";

export default function SavingsHistory(props) {
  const [activeTab, setactiveTab] = useState(props.data.activeTab);

  useEffect(() => {
    setactiveTab(props.data.activeTab);
  }, [props.data.activeTab]);

  // onChangeTab = (activeTab) => {
  //   if (activeTab === 0) {
  //     let data = {
  //       name: 'Savings Breakdown',
  //       action: 'select_savings_monthly',
  //     };
  //     this.props.CallBacks.pushAnalytics(data);
  //   } else if (activeTab === 1) {
  //     let data = {
  //       name: 'Savings Breakdown',
  //       action: 'select_savings_yearly',
  //     };
  //     this.props.CallBacks.pushAnalytics(data);
  //   }
  //   this.setState({ activeTab });
  // };

  const onChangeTab = (activeTab) => {
    props.CallBacks.changeTab(activeTab);
  };

  const hideErrorPopup = () => {
    props.CallBacks.onError({ error: false, message: "" });
  };

  const { loadingOverlayActive, error, errorText } = props.data;
  const { onBack } = props.CallBacks;

  if (
    props.data.savings === 0 ||
    props.data.savings === null ||
    props.data.savings === undefined
  ) {
    return (
      <HistoryEmpty
        isRTL={false}
        i18n={i18n}
        title={props.data.title}
        currency={props.data.currency}
        savings={props.data.savings}
        getFlipForRTLStyle={getFlipForRTLStyle}
      />
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: design.Background_Secondary_Color
            ? design.Background_Secondary_Color
            : "#FFFFFF",
          ...getFlipForRTLStyle(),
        }}
      >
        <View>
          <CustomText
            style={{
              fontSize: 14,
              textAlign: "center",
              marginBottom: 12,
              marginTop: 5,
              ...getFlipForRTLStyle(),
            }}
          >
            {/*May <TextLabel>{i18n.t("SAVINGS")}</TextLabel>*/}
            {props.data.title}
          </CustomText>
          <CustomText
            style={{
              fontWeight: "600",
              fontSize: 17,
              marginBottom: 15,
              textAlign: "center",
              fontFamily: PRIMARY_EXTRABOLD,
              ...getFlipForRTLStyle(),
            }}
          >
            {props.data.currency} {props.data.savings}
          </CustomText>

          <View style={{ marginStart: 15, marginEnd: 15 }}>
            <TopTabProfile activeTab={activeTab} onChangeTab={onChangeTab} />
            <GraphHistory {...props} activeTab={activeTab} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 4,
    backgroundColor: "red",
  },
});
