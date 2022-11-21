import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Text from "../Text/Text";
import { Ionicons } from "@expo/vector-icons";
import BorderButton from "../Buttons/BorderButton";
import { design } from "rn_fast_track_uilib";
import {
  borderColor,
  borderWidth,
  margin,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { getFlipForRTLStyle } from "@localization";
import Modal from "@HybridComponents/Modal";

interface PROPS {
  dataString: string;
  isVisible: boolean;
  disable: () => void;
  callBack?: () => void;
  buttonText: string;
}

const ErrorModal = ({
  dataString,
  isVisible,
  disable = () => {},
  callBack,
  buttonText,
}: PROPS) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      <View
        style={[styles.centeredView, getFlipForRTLStyle()]}
        testID={"error_modal_view"}
      >
        <View style={styles.modalView}>
          <Ionicons
            style={styles.iconStyle}
            name="md-close-circle"
            size={35}
            color="#000"
            onPress={disable}
          />
          <Text style={styles.modalText} testID={"error_modal_text"}>
            {dataString}
          </Text>

          <BorderButton
            testID="handle_ok"
            onPress={() => {
              disable();
              callBack && callBack();
            }}
            activeOpacity={1}
            style={styles.okButton}
            title={buttonText}
            textTestID="error_text"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    ...margin(20),
    backgroundColor: design["Background_Secondary_Color"],
    ...paddingHorizontal(10),
    ...paddingVertical(20),
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
    height: 35,
    borderRadius: 2,
    width: "70%",
    elevation: 2,
    ...borderWidth(1),
    ...borderColor(design["Primary_Color"]),
    justifyContent: "center",
  },
  textStyle: {
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
    ...padding(15),
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    // color: "#000000",
  },
  iconStyle: {
    color: design.Error_Color,
  },
});

// export default App;
