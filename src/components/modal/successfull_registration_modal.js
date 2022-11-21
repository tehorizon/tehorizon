import React, { Component, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text/Text";
import { Ionicons } from "@expo/vector-icons";
import BorderButton from "../Buttons/BorderButton";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";
import { margin, padding } from "@utils/genericStyles";

export default class RegistrationSuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataString, isVisible, disable, i18n, isRTL, buttonText } =
      this.props;
    return isVisible ? (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              backgroundColor: "white",
              position: "absolute",
              height: 20,
              width: 20,
              top: 18,
            }}
          />
          <Ionicons
            style={styles.iconStyle}
            name="md-close-circle"
            size={35}
            onPress={() => {
              disable();
            }}
          />
          <Text style={styles.modalText}>{dataString}</Text>

          <BorderButton
            style={styles.okButton}
            activeOpacity={1}
            onPress={() => {
              disable();
            }}
            title={buttonText}
            textStyle={styles.textStyle}
          />
        </View>
      </View>
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
  modalView: {
    ...margin(20),
    // backgroundColor: APP_COLORS.CONTINUE_MODAL_BACKGROUND,
    ...padding(10),
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
    height: 45,
    borderRadius: 50,
    ...padding(10),
    width: "95%",
    elevation: 2,
    backgroundColor: design["Primary_Color"],
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
    fontSize: 18,
    color: design["Text_Primary_Color"],
  },
  modalText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 14,
    ...padding(15),
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
  },
  iconStyle: {
    color: "red",
  },
});

// export default App;
