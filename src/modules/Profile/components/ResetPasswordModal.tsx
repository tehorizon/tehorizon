import React, { Component } from "react";
import { Alert, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Text from "./Text";
import i18n from "i18next";
import { design } from "rn_fast_track_uilib";
import { PRIMARY } from "@fonts";

const sureImg = require("../images/sure.png");

export default function ResetPasswordModal(props) {
  const { dataString, isVisible, hide, resetPassword } = props;
  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.sureImg} source={sureImg} />
          <Text style={styles.sureText}>
            {i18n.t("Are_you_sure_you_want_to_reset_your_password")}
          </Text>
          <TouchableOpacity
            onPress={() => resetPassword()}
            style={styles.button}
          >
            <Text style={{ color: "white" }}>{i18n.t("Yes")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => hide()} style={styles.button}>
            <Text style={{ color: "white" }}>{i18n.t("No")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    color: design.Text_Lite_Color,
    fontFamily: PRIMARY,
  },
  button: {
    marginTop: 12,
    height: 36,
    borderRadius: 2,
    width: "100%",
    backgroundColor: design.Primary_Color,
    justifyContent: "center",
    alignItems: "center",
  },
});
