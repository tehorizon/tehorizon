import React, { Component } from "react";
import { Alert, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import Text from "../Text/Text";
import { Portal } from "react-native-paper";
import i18n from "@localization";
import BorderButton from "../Buttons/BorderButton";
import { design } from "rn_fast_track_uilib";
import { PRIMARY } from "@fonts";
import { margin, padding } from "@utils/genericStyles";

const doneImg = require("@assets/images/done.png");

export default class ResetSuccessModal extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataString, isVisible, hide } = this.props;
    return isVisible ? (
      <Portal>
        <View style={styles.centeredView} testID="resetEmailSuccessModal">
          <View style={styles.modalView}>
            <Image style={styles.doneImg} source={doneImg} />
            <Text style={styles.sureText}>{dataString}</Text>

            <BorderButton
              testID="resetSuccessDone"
              onPress={hide}
              style={styles.button}
              textStyle={{ color: design["Text_Tertiary_Color"] }}
              title={i18n.t("Ok")}
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
    backgroundColor: "rgba(0, 0, 0,0.5)",
    ...StyleSheet.absoluteFillObject,
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
  doneImg: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  sureText: {
    textAlign: "center",
    marginTop: 18,
    color: design["Text_Primary_Color"],
    fontFamily: PRIMARY,
  },
  button: {
    marginTop: 12,
    height: 36,
    borderRadius: 2,
    width: "100%",
    backgroundColor: design["Primary_Color"],
    justifyContent: "center",
    alignItems: "center",
  },
});
