import React from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Text from "./Text";
import i18n from "i18next";
import { design } from "rn_fast_track_uilib";
import { PRIMARY } from "@fonts";

const doneImg = require("../images/done.png");

export default function ResetSuccessModal(props) {
  const { dataString, isVisible, hide } = props;
  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <View testID="resetLinkSentModal" style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.doneImg} source={doneImg} />
          <Text style={styles.sureText}>
            {i18n.t("Password_reset_link_sent_to_your_email_address")}
          </Text>
          <TouchableOpacity
            testID="resetLinkSentOkButton"
            onPress={() => hide()}
            style={styles.button}
          >
            <Text style={{ color: "white" }}>{i18n.t("Ok")}</Text>
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
  doneImg: {
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
