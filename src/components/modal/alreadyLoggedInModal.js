import React, { Component, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Text from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import { Portal } from "react-native-paper";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { margin, padding, paddingHorizontal } from "@utils/genericStyles";
import BorderButton from "@components/Buttons/BorderButton";
import { getFlipForRTLStyle } from "@localization";
export default class AlreadLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { disable, forceLogin, alreadyLoginData = {} } = this.props;

    let {
      image,
      title,
      message,
      alreadyLoginShow,
      yes_button_title,
      no_button_title,
    } = alreadyLoginData;
    return alreadyLoginShow ? (
      <Portal>
        <View
          testID="alreadyLoginModal"
          style={[styles.centeredView, getFlipForRTLStyle()]}
        >
          <View style={styles.modalView}>
            <Image
              source={{
                uri:
                  image ||
                  "https://s3.amazonaws.com/entertainer-app-assets/icons/family/lock_icon.png",
              }}
              style={styles.iconStyle}
              resizeMode="contain"
            />
            <Text style={styles.headText}>
              {title || "You'll be signed out elsewhere!"}
            </Text>
            <Text style={styles.modalText}>
              {message ||
                "By logging in, your account will be logged out of another device."}
            </Text>
            <BorderButton
              testID="forceLogin"
              onPress={forceLogin}
              activeOpacity={1}
              style={styles.okButton}
              theme="secondary"
              title={yes_button_title || "LOGIN WITH THIS DEVICE"}
            />
            <TouchableOpacity
              style={styles.button2}
              activeOpacity={1}
              onPress={disable}
            >
              <Text style={styles.button2Text}>
                {no_button_title || "I've changed my mind"}
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
  headText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 16,
    paddingTop: 10,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
  },
  button2: {
    height: 45,

    ...padding(10),
    width: "95%",

    justifyContent: "center",
  },
  button2Text: {
    color: design["Secondary_Color"],
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    fontStyle: "normal",
    letterSpacing: 0,
  },
  modalView: {
    ...margin(20),
    backgroundColor: "white",
    ...padding(10),
    ...paddingHorizontal(15),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "80%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
  okButton: {
    height: 45,
    borderRadius: 2,
    ...padding(10),
    elevation: 2,
    justifyContent: "center",
    opacity: 0.8,
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
    paddingTop: 15,
    paddingBottom: 15,
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    // color: "#000000",
  },
  iconStyle: {
    height: 30,
    width: 30,
    tintColor: design.Secondary_Color,
  },
});

// export default App;
