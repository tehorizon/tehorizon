import React, { Component, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import LOADING_GIF from "../../images/loading_icon.gif";
import Modal from "react-native-modal";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
export default function ErrorModal(props) {
  const { isVisible } = props;
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationInTiming={10}
      animationOutTiming={10}
    >
      <View style={styles.centeredView}>
        <Image
          style={{
            height: 65,
            width: 65,
            borderRadius: 10,
          }}
          source={LOADING_GIF}
        />
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

// export default App;
