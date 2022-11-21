import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import i18n from "@localization";
import { design } from "rn_fast_track_uilib";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";

export default function ErrorModal(props) {
  const { dataString, isVisible, hide } = props;
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={100}
      animationOutTiming={100}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            style={styles.iconStyle}
            name="md-close-circle"
            size={35}
            color="#000"
            onPress={() => {
              hide();
            }}
          />
          <Text style={styles.modalText}>{dataString}</Text>
          <TouchableOpacity
            style={styles.okButton}
            activeOpacity={1}
            onPress={() => {
              hide();
            }}
          >
            <Text style={styles.textStyle}>{i18n.t("OK")}</Text>
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
    marginTop: 22,
  },
  modalView: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "98%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
  okButton: {
    height: 45,
    borderRadius: 2,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: "95%",
    elevation: 2,
    backgroundColor: design.Primary_Color,
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
  },
  modalText: {
    fontFamily: PRIMARY,
    fontSize: 16,
    paddingStart: 15,
    paddingEnd: 15,
    paddingTop: 15,
    paddingBottom: 15,
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    color: "#000000",
  },
  iconStyle: {
    color: "red",
  },
});
