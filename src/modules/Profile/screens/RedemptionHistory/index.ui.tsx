import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";
import RedemptionHistoryDetails from "../../components/RedemptionHistoryDetails";
import { design } from "rn_fast_track_uilib";
import {
  CustomText,
  EmptyComponent,
  HeaderWithBackButton,
  RedemptionEmpty,
} from "@components";
import { AntDesign } from "@expo/vector-icons";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";

export default function RedemptionHistoryUI({
  header,
  data,
  navigation,
  setredemption,
  setdetailsModalVisible,
  collapseMonth,
  redemption,
  detailsModalVisible,
  closeDetailsModal,
  onCLickRedemptionItem,
}: any) {
  const renderRedemptionListItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onCLickRedemptionItem(item)}
        style={styles.redemptionDetailsItem}
      >
        <Image
          style={{
            width: 45,
            height: 45,
            resizeMode: "contain",
            ...getFlipForRTLStyle(),
          }}
          source={{ uri: item.logo }}
        />
        <View style={styles.redemptionDetailsView}>
          <CustomText style={{ fontFamily: PRIMARY_BOLD, fontSize: 16 }}>
            {item.merchantName}
          </CustomText>
          <CustomText style={{ marginTop: 2 }}>{item.outletName}</CustomText>
          <CustomText
            style={{ color: design.Text_Secondary_Color, marginTop: 5 }}
          >
            {item.category}
          </CustomText>
        </View>
        <AntDesign
          name="caretright"
          color={design.Text_Secondary_Color}
          size={16}
        />
      </TouchableOpacity>
    );
  };

  const renderMonthsList = ({ item, index }) => {
    return (
      <View style={styles.redemptionsListViewItem}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => collapseMonth(index)}
          style={{
            flexDirection: "row",
            backgroundColor: !item.collapsed
              ? design.Secondary_Color
              : "#909090",
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
            renderItem={renderRedemptionListItem}
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

  let showHeader = false;
  if (header === undefined) {
    showHeader = true;
  } else {
    showHeader = false;
  }
  return (
    <View style={[styles.mainContainer, getFlipForRTLStyle()]}>
      {showHeader === true ? (
        <HeaderWithBackButton
          title={i18n.t("Redemption_History")}
          navigation={navigation}
        />
      ) : null}
      {data.totalNumberOfRedemption === 0 ||
      data.totalNumberOfRedemption === "" ||
      data.totalNumberOfRedemption === null ? (
        <EmptyComponent
          isRTL={false}
          title={i18n.t("Total_Redemptions")}
          image={require("@assets/images/total_redemption_empty.png")}
          bodyText={i18n.t("Check_back_savings")}
        />
      ) : (
        <>
          <View
            style={{
              alignItems: "center",
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <CustomText>
              <CustomText>{i18n.t("TOTAL_OFFERS_REDEEMED")}</CustomText>{" "}
              {data.currentYear}
            </CustomText>
            <CustomText
              style={{ fontFamily: PRIMARY_EXTRABOLD, marginTop: 15 }}
            >
              {data.totalNumberOfRedemption || "0"}
            </CustomText>
          </View>
          <FlatList
            data={data.monthWiseRedemmptions}
            renderItem={renderMonthsList}
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
        </>
      )}
    </View>
  );
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color
      ? design.Background_Primary_Color
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
