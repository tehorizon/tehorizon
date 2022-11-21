import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "../Text/Text";

import i18n, { getFlipForRTLStyle } from "@localization";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { margin, padding } from "@utils/genericStyles";
import Modal from "@HybridComponents/Modal";
import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";

interface PROPS {
  outletName: string;
  isVisible: boolean;
  changeOutlet: () => void;
  continueWithCurrentOutlet: () => void;
}
const ContinueModal = (props: PROPS) => {
  const { outletName, isVisible, changeOutlet, continueWithCurrentOutlet } =
    props;

  return (
    <Modal isVisible={isVisible} style={styles.mainView}>
      <View
        style={[styles.centeredView, getFlipForRTLStyle()]}
        testID={"continue_modal"}
      >
        <View style={styles.modalView}>
          <Text style={styles.outletTitle}>{outletName}</Text>

          <Text style={styles.modalText}>
            {i18n.t(
              "Are you sure you're at this outlet? if not, choose the correct one from the locations screen"
            )}
          </Text>

          <View style={styles.buttonParent}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                changeOutlet();
              }}
              style={styles.buttonParentChildLeft}
            >
              <Text style={styles.buttonText}>{i18n.t("Change_Outlet")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={"select_continue"}
              activeOpacity={1}
              onPress={() => {
                continueWithCurrentOutlet();
              }}
              style={styles.buttonParentChildRight}
            >
              <Text style={styles.buttonText}>{i18n.t("Continue")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    ...margin(0),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: design.Background_Primary_Color,
    ...padding(5),
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: "center",

    borderRadius: 10,
    width: "85%",
  },
  outletTitle: {
    fontSize: 16,
    fontFamily: PRIMARY_BOLD,
    textAlign: "center",
    paddingTop: 20,
    color: "black",
    letterSpacing: 0,
  },
  buttonParent: {
    height: 50,
    flexDirection: "row",
    borderTopWidth: 0.5,

    width: "100%",
    justifyContent: "center",
  },
  buttonParentChildLeft: {
    borderRightWidth: 0.5,
    justifyContent: "center",
    flex: 1,
  },

  buttonParentChildRight: {
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    color: design.Text_Primary_Color,
    fontFamily: PRIMARY,
    textAlign: "center",
    lineHeight: 20,
    fontSize: 15,
  },
  modalText: {
    paddingTop: 10,
    paddingBottom: 30,
    color: "black",
    fontFamily: PRIMARY,
    textAlign: "center",
    lineHeight: 20,
    width: "98%",
    fontSize: 14,
  },
});

export default ContinueModal;
