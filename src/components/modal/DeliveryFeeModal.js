import React, { Component, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Text from "../Text/Text";
import MINIMUM_ORDER_ICON from "@assets/images/minimumOrderIcon.png";
import { design } from "rn_fast_track_uilib";

import { Portal } from "react-native-paper";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { margin, padding } from "@utils/genericStyles";
export default class DeliveryFeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isVisible,
      handleAddMoreItems,
      handleCancel,
      deliveryMinimumAmountMessage,
    } = this.props;

    return isVisible ? (
      <Portal>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={MINIMUM_ORDER_ICON} style={styles.iconStyle} />
            <Text style={styles.modalText}>{"Delivery fee"}</Text>
            <View style={{ width: "70%" }}>
              <Text
                style={[
                  styles.modalTextDescription,
                  {
                    fontSize: 12,
                    paddingBottom: 10,
                    paddingTop: 10,
                    fontFamily: PRIMARY,
                  },
                ]}
              >
                {deliveryMinimumAmountMessage}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.okButton}
              activeOpacity={1}
              onPress={() => {
                handleAddMoreItems();
              }}
            >
              <Text style={styles.textStyle}>{"ADD MORE ITEMS"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWithoutBackground}
              activeOpacity={1}
              onPress={() => {
                handleCancel();
              }}
            >
              <Text style={styles.textStyleButtonWithoutBackground}>
                {"Cancel"}
              </Text>
            </TouchableOpacity>
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
  iconStyle: {
    height: 40,
    width: 30,
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
    width: "90%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
  okButton: {
    height: 40,
    borderRadius: 2,
    ...padding(10),
    marginBottom: 15,
    width: "90%",
    elevation: 2,
    backgroundColor: design["Primary_Color"],
    justifyContent: "center",
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
    fontSize: 18,
    paddingTop: 15,

    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    // color: "#000000",
  },
  modalTextDescription: {
    fontFamily: PRIMARY,
    fontSize: 14,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    // color: "#000000",
  },
});

// export default App;
