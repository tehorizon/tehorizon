import React, { Component, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Text from "../Text/Text";
import { design } from "rn_fast_track_uilib";

import BASKET_ICON from "@assets/images/basketIcon.png";
import { Portal } from "react-native-paper";
import BorderButton from "../Buttons/BorderButton";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import {
  borderWidth,
  margin,
  padding,
  paddingHorizontal,
} from "@utils/genericStyles";
import I18n from "@localization";
export default class ErrorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      dataString,
      isVisible,
      handleCancel,
      i18n,
      isRTL,
      buttonText,
      handleNewOrder,
    } = this.props;
    return isVisible ? (
      <Portal>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={BASKET_ICON} style={styles.logoStyle} />
            <Text style={styles.modalText}>{I18n.t("Clear_Cart")}</Text>

            <Text style={styles.modalTextDescription}>
              {I18n.t("already_contain_items")}
            </Text>

            <BorderButton
              style={styles.okButton}
              activeOpacity={1}
              onPress={() => {
                handleNewOrder();
              }}
              title={I18n.t("NEW_ORDER")}
              textStyle={styles.textStyle}
            />
            <BorderButton
              style={styles.buttonWithoutBackground}
              activeOpacity={1}
              onPress={() => {
                handleCancel();
              }}
              theme="white"
              title={I18n.t("Cancel")}
              textStyle={styles.textStyleButtonWithoutBackground}
            />
          </View>
        </View>
      </Portal>
    ) : null;
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    ...StyleSheet.absoluteFillObject,
  },
  logoStyle: {
    height: 40,
    width: 24,
    tintColor: design["Primary_Color"],
  },
  modalView: {
    ...margin(20),
    backgroundColor: design["Background_Secondary_Color"],
    ...padding(10),
    paddingTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "90%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
  okButton: {
    width: "95%",
  },
  buttonWithoutBackground: {
    ...padding(10),
    width: "auto",
    ...borderWidth(0),
    marginBottom: 5,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    fontStyle: "normal",
    letterSpacing: 0,
    color: design["Text_Tertiary_Color"],
  },
  textStyleButtonWithoutBackground: {
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    fontStyle: "normal",
    letterSpacing: 0,
    color: design["Primary_Color"],
  },
  modalText: {
    fontFamily: PRIMARY,
    fontSize: 16,
    marginTop: 15,
    // lineHeight: 16.6,
    textAlign: "center",
    color: design["Text_Primary_Color"],
  },
  modalTextDescription: {
    fontFamily: PRIMARY,
    fontSize: 13,
    paddingTop: 5,
    ...paddingHorizontal(20),
    paddingBottom: 15,
    lineHeight: 20,
    textAlign: "center",
    color: design["Text_Lite_Color"],
  },
  iconStyle: {
    color: "red",
  },
});

// export default App;
