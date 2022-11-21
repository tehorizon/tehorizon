import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";

import { design } from "rn_fast_track_uilib";
import { Ionicons } from "@expo/vector-icons";
import Modal from "@HybridComponents/Modal";

import { BorderButton, CustomText } from "@components";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import {
  marginVertical,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import I18n from "@localization";

const width = Dimensions.get("window").width;

interface PROPS {
  isVisible: boolean;
  selectedOffer: Object;
  closeModal: (arg: boolean) => void;
  currency: string;
}
const ContinueModal = (props: PROPS) => {
  const { selectedOffer, isVisible, closeModal, currency = "USD" } = props;
  return (
    <Modal isVisible={isVisible} useNativeDriver>
      <View style={[styles.cmParent, getFlipForRTLStyle()]}>
        <CustomText style={styles.text}>
          {i18n.t("Congratulations!")}
        </CustomText>
        <View style={styles.borderLine} />
        <View style={styles.footerView}>
          <CustomText style={styles.savedText}>
            {i18n.t("You’ve just saved")}
          </CustomText>
          <CustomText style={styles.amount}>
            {currency} {selectedOffer?.savings_estimate || 0}
          </CustomText>
        </View>
        <BorderButton title={I18n.t("Close")} onPress={closeModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: PRIMARY,
  },
  modalStyle: {
    display: "flex",
    justifyContent: "center",
  },
  cmParent: {
    width: width - 32,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: design.Background_Secondary_Color,
    ...paddingHorizontal(29),
    ...paddingVertical(32),
    borderRadius: 8,
  },
  text: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 20,
    lineHeight: 25,
  },
  borderLine: {
    width: "100%",
    height: 1,
    backgroundColor: design.Border_Color,
    ...marginVertical(24),
  },
  footerView: {
    alignItems: "center",
    marginBottom: 16,
  },
  savedtext: {
    fontSize: 17,
    lineHeight: 22,
  },
  amount: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 17,
    lineHeight: 22,
    color: design.Primary_Color,
    ...marginVertical(5),
  },
  cmHeader: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  logoParent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: 60,
    width: 60,
  },
  offerFeaturesParetnt: {
    height: 100,
    backgroundColor: "#efefef",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  outletName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "#2a2a2a",
  },

  cmOutletsCount: {
    alignItems: "center",
    flexDirection: "row",
    height: 35,
    backgroundColor: "grey",
    justifyContent: "center",
  },
  cmOutletsCountText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: "white",
    paddingStart: 10,
  },

  doneButton: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    paddingEnd: 10,
  },
  listItemSelected: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    color: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
    paddingStart: 15,
    backgroundColor: "rgb(237, 237, 237)",
  },
  listItem: {
    flexDirection: "row",
    height: 65,
    color: "grey",
    alignItems: "center",
    paddingStart: 15,
    borderBottomWidth: 0.7,
  },
  listItemText: {
    color: "grey",
    flex: 1,
    fontFamily: PRIMARY_BOLD,
  },
  distanceText: {
    color: "grey",
    paddingEnd: 20,
    fontFamily: PRIMARY_BOLD,
  },

  cmFooterParent: {
    backgroundColor: "#f2f1f1",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  eightPointBurst: {},
  eightPointBurst20: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    transform: [{ rotate: "20deg" }],
  },
  eightPointBurst155: {
    width: 20,
    height: 20,
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    left: 0,
    transform: [{ rotate: "155deg" }],
  },
});

export default ContinueModal;
