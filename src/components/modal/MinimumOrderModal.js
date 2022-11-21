import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import Text from "../Text/Text";
import MINIMUM_ORDER_ICON from "@assets/images/minimumOrderIcon.png";
import { design } from "rn_fast_track_uilib";

import { Portal } from "react-native-paper";
import BorderButton from "../Buttons/BorderButton";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { margin, padding, paddingVertical } from "@utils/genericStyles";
import I18n from "@localization";
export default class MinimumOrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isVisible,
      totalPrice,
      outletCurrency,
      minimumOrderAmount,
      handleOkay,
    } = this.props;

    return isVisible ? (
      <Portal>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={MINIMUM_ORDER_ICON} style={styles.iconStyle} />
            <Text style={styles.modalText}>{I18n.t("Minimum_order")}</Text>
            <View style={{ width: "50%" }}>
              <Text
                style={[
                  styles.modalTextDescription,
                  {
                    fontSize: 12,
                    paddingBottom: 10,
                    fontFamily: PRIMARY,
                  },
                ]}
              >
                {I18n.t("require_minimum_order")}
              </Text>
              <Text
                style={[
                  styles.modalTextDescription,
                  {
                    fontSize: 12,
                    paddingBottom: 10,
                    fontFamily: PRIMARY,
                  },
                ]}
              >
                {`${outletCurrency} ${minimumOrderAmount}\nafter discount`}
              </Text>
              <Text
                style={[
                  styles.modalTextDescription,
                  {
                    fontSize: 12,
                    paddingBottom: 10,
                    fontFamily: PRIMARY,
                  },
                ]}
              >
                {`Add item(s) worth \n ${outletCurrency} ${
                  minimumOrderAmount - totalPrice
                } to complete your order.`}
              </Text>
            </View>

            <BorderButton
              style={styles.okButton}
              activeOpacity={1}
              onPress={() => {
                handleOkay();
              }}
              textStyle={styles.textStyle}
              title="OK"
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
  iconStyle: {
    height: 40,
    width: 30,
    tintColor: design.Primary_Color,
  },
  modalView: {
    ...margin(20),
    backgroundColor: design["Background_Secondary_Color"],
    ...padding(30),
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
    width: "90%",
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
