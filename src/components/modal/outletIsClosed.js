import React, { Component, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Text from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import OUTLET_CLOSED from "@assets/images/outletClosedIcon.png";
import { Portal } from "react-native-paper";
import BorderButton from "../Buttons/BorderButton";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import {
  borderWidth,
  margin,
  padding,
  paddingHorizontal,
} from "@utils/genericStyles";

export default class SelectDeliveryLocationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isVisible, handleOkay } = this.props;
    return isVisible ? (
      <Portal>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={OUTLET_CLOSED} style={styles.logoStyle} />
            <Text style={styles.modalText}>{"Outlet is close"}</Text>
            <Text style={styles.modalTextDescription}>
              {"The restaurant is currently not \naccepting orders right now."}
            </Text>
            <Text style={styles.modalTextDescription}>
              {"Why not check out other great restaurants near you?"}
            </Text>
            <BorderButton
              style={styles.okButton}
              activeOpacity={1}
              onPress={() => {
                handleOkay(true);
              }}
              title="SHOW ME"
              textStyle={styles.textStyle}
            />
            <BorderButton
              style={styles.closeButton}
              theme={"white"}
              activeOpacity={1}
              onPress={() => {
                handleOkay();
              }}
              title="Close"
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
    marginTop: 20,
    marginBottom: 10,
    height: 42,
    width: 60,
    tintColor: design["Primary_Color"],
  },
  modalView: {
    ...margin(20),
    backgroundColor: design["Background_Secondary_Color"],
    ...padding(10),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "85%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
  okButton: {
    height: 45,
    borderRadius: 2,
    ...padding(10),
    width: "95%",
    elevation: 2,
    backgroundColor: design["Primary_Color"],
    justifyContent: "center",
    // marginBottom: 10,
    marginTop: 10,
  },
  closeButton: {
    height: 45,
    width: "auto",
    ...padding(10),
    ...borderWidth(0),
    // marginBottom: 20,
    // borderRadius: 2,
    // borderWidth: 0,
    // elevation: 2,
    // backgroundColor: design["Background_Secondary_Color"],
    // justifyContent: "center",
    // borderColor: design["Background_Secondary_Color"],
    // marginTop: 10,
  },
  buttonWithoutBackground: {
    height: 45,
    borderRadius: 2,
    ...padding(10),
    width: "95%",
    elevation: 2,
    justifyContent: "center",
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
    paddingTop: 15,

    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    color: design["Text_Primary_Color"],
  },
  modalTextDescription: {
    width: "60%",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 15,
    // ...paddingHorizontal(20),
    fontFamily: PRIMARY,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: design["Text_Primary_Color"],
  },
});

// export default App;
