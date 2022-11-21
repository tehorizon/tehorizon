import React, { Component } from "react";
import { Alert, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import Text from "../Text/Text";
import { Portal } from "react-native-paper";
import i18n from "@localization";
import BorderButton from "../Buttons/BorderButton";
import { design } from "rn_fast_track_uilib";
import { PRIMARY } from "@fonts";
import { padding } from "@utils/genericStyles";

const sureImg = require("@assets/images/sure.png");

export default class ResetPasswordModal extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataString, isVisible, hide, resetPassword } = this.props;
    return isVisible ? (
      <Portal>
        <View testID={"resetConfirmationModal"} style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.sureImg} source={sureImg} />
            <Text style={styles.sureText}>
              {i18n.t("Are_you_sure_you_want_to_reset_your_password")}
            </Text>

            <BorderButton
              testID="resetYes"
              onPress={() => resetPassword()}
              style={styles.button}
              title={i18n.t("Yes")}
              textStyle={{ color: design["Text_Tertiary_Color"] }}
            />

            <BorderButton
              testID="resetNo"
              onPress={() => hide()}
              style={styles.button}
              textStyle={{ color: design["Text_Tertiary_Color"] }}
              title={i18n.t("No")}
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
  modalView: {
    backgroundColor: design["Background_Secondary_Color"],
    ...padding(10),
    alignItems: "center",
    width: "90%",
    borderRadius: 4,
  },
  sureImg: {
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
