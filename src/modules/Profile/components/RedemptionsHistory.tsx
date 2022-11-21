import React, { useState } from "react";
import {
  View,
  FlatList,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import i18n from "@localization";
import RedemptionHistoryDetails from "../screens/SavingBreakdown/screen/components/RedemptionHistoryDetails";

import { design } from "rn_fast_track_uilib";
import { AntDesign } from "@expo/vector-icons";

import { CustomText, RedemptionEmpty } from "@components";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";

// import {Port} from '../screen/port';

export default function RedemptionsHistory(props) {
  const [redemption, setredemption] = useState(null);
  const [detailsModalVisible, setdetailsModalVisible] = useState(false);

  const collapseMonth = (index) => {
    props.CallBacks.onExpand(index);
  };

  const hideErrorModal = () => {
    props.CallBacks.onError({
      error: false,
      message: "",
    });
  };

  const closeDetailsModal = () => {
    setdetailsModalVisible(false);
  };

  const renderRedemptionListItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setredemption(item);
          setdetailsModalVisible(true);
        }}
        style={styles.redemptionDetailsItem}
      >
        <Image
          style={{ width: 45, height: 45, resizeMode: "contain" }}
          source={{ uri: item.logo }}
        />
        <View style={styles.redemptionDetailsView}>
          <CustomText style={{ fontFamily: PRIMARY_BOLD, fontSize: 16 }}>
            {item.merchantName}
          </CustomText>
          <CustomText style={{ marginTop: 2 }}>{item.outletName}</CustomText>
          <CustomText style={{ color: design.Text_Lite_Color, marginTop: 5 }}>
            {item.category}
          </CustomText>
        </View>
        <AntDesign name="caretright" color={"rgb(200, 200, 200)"} size={16} />
      </TouchableOpacity>
    );
  };

  const renderMonthsList = (item, index) => {
    return (
      <View style={styles.redemptionsListViewItem}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => collapseMonth(index)}
          style={{
            flexDirection: "row",
            backgroundColor: !item.collapsed ? "rgb(50, 192, 168)" : "#909090",
            height: 35,
            alignItems: "center",
            paddingStart: 12,
            paddingEnd: 12,
          }}
        >
          <CustomText style={{ color: "white", flex: 0.5 }}>
            {item.month}
          </CustomText>
          <CustomText style={{ color: "white", flex: 0.5, textAlign: "right" }}>
            {i18n.t("Total")}: {item.redemptionCount}{" "}
            {item.collapsed ? "+" : "-"}
          </CustomText>
        </TouchableOpacity>
        {!item.collapsed && (
          <FlatList
            data={item.redemptions}
            renderItem={({ item }) => renderRedemptionListItem(item)}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: 1, backgroundColor: "rgb(230, 230, 230)" }}
              />
            )}
          />
        )}
      </View>
    );
  };

  const data = props.data.redemptionHistory;
  const { error, errorText, loadingOverlayActive } = props.data;

  if (
    data.totalNumberOfRedemption === 0 ||
    data.totalNumberOfRedemption === ""
  ) {
    return <RedemptionEmpty isRTL={false} i18n={i18n} />;
  } else {
    return (
      <View style={styles.mainContainer}>
        <View
          style={{
            alignItems: "center",
            paddingBottom: 15,
            paddingTop: 15,
          }}
        >
          <CustomText>
            <CustomText>{i18n.t("TOTAL_OFFERS_REDEEMED")}</CustomText>{" "}
            {data.currentYear}
          </CustomText>
          <CustomText style={{ fontFamily: PRIMARY_EXTRABOLD, marginTop: 15 }}>
            {data.totalNumberOfRedemption || "0"}
          </CustomText>
        </View>
        <FlatList
          data={data.monthWiseRedemmptions}
          renderItem={({ item, index }) => renderMonthsList(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, backgroundColor: "rgb(230, 230, 230)" }}
            />
          )}
        />
        <RedemptionHistoryDetails
          redemption={redemption}
          isVisible={detailsModalVisible}
          closeModal={closeDetailsModal}
        />
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: design.Background_Secondary_Color
      ? design.Background_Secondary_Color
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
