import React, { Component } from "react";
import { Alert, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import moment from "moment";

import { design } from "rn_fast_track_uilib";
import i18n from "@localization";
import Modal from "react-native-modal";
import { EvilIcons } from "@expo/vector-icons";
import { CustomText } from "@components";
export default function RedemptionHistoryDetails(props) {
  const { redemption, isVisible, closeModal } = props;
  const dateFormatter = (date) => {
    let validDate = moment(date, "DD/MM/YYYY - HH:mm").format(
      "YYYY-MM-DD HH:mm"
    );
    return moment(moment.utc(validDate).toDate())
      .local()
      .format("DD/MM/YYYY - HH:mm");
  };
  if (redemption === null) return <View />;
  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <View style={{ alignItems: "flex-end" }}>
            <EvilIcons onPress={closeModal} size={26} name="close" />
          </View>
          <Image style={styles.logoImg} source={{ uri: redemption.logo }} />
          <View style={styles.detailsView}>
            <View style={styles.detailsRow}>
              <CustomText style={{ flex: 0.35, color: design.Primary_Color }}>
                {i18n.t("reference")}:
              </CustomText>
              <CustomText style={{ flex: 0.65 }}>{redemption.code}</CustomText>
            </View>
            <View style={styles.detailsRow}>
              <CustomText style={{ flex: 0.35, color: design.Primary_Color }}>
                {i18n.t("merchant")}:
              </CustomText>
              <CustomText style={{ flex: 0.65 }}>
                {redemption.merchantName}
              </CustomText>
            </View>
            <View style={styles.detailsRow}>
              <CustomText style={{ flex: 0.35, color: design.Primary_Color }}>
                {i18n.t("Outlet")}:
              </CustomText>
              <CustomText style={{ flex: 0.65 }}>
                {redemption.outletName}
              </CustomText>
            </View>
            <View style={styles.detailsRow}>
              <CustomText style={{ flex: 0.35, color: design.Primary_Color }}>
                {i18n.t("remeedes")}:
              </CustomText>
              <CustomText style={{ flex: 0.65 }}>
                {dateFormatter(redemption.date)}
              </CustomText>
            </View>
            <View style={styles.detailsRow}>
              <CustomText style={{ flex: 0.35, color: design.Primary_Color }}>
                {i18n.t("SAVINGS")}:
              </CustomText>
              <CustomText style={{ flex: 0.65 }}>
                {redemption.savings}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingStart: 15,
    paddingEnd: 15,
    paddingTop: 15,
    width: "85%",
    paddingBottom: 40,
  },
  logoImg: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    backgroundColor: "white",
    opacity: 0.8,
  },
  detailsView: {
    marginTop: 25,
  },
  detailsRow: {
    flexDirection: "row",
    marginTop: 15,
  },
});
