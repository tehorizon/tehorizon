import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import CustomText from "../Text/Text";
import { PRIMARY } from "@fonts";
import {
  marginHorizontal,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import BorderButton from "../Buttons/BorderButton";
import { Portal } from "react-native-paper";
import { design } from "rn_fast_track_uilib";
import i18n, { getFlipForRTLStyle, isRTL } from "@localization";

let { width, height } = Dimensions.get("window");

interface PROPS {
  visible: boolean;
  onPress: Function;
}

const Intro = ({ visible, onPress }: PROPS) => {
  return visible ? (
    <Portal>
      <View
        style={[styles.overlay, getFlipForRTLStyle()]}
        testID="homeScreenLocationPicker"
      >
        <SafeAreaView style={styles.mainView}>
          <View style={styles.subView}>
            <View style={styles.locationContainer}>
              <CustomText style={styles.locationText}>
                {i18n.t("select_a_location")}
              </CustomText>
              <Image
                source={require("@assets/images/arrow_down.png")}
                style={styles.arrow}
                resizeMode="contain"
              />
            </View>
            <Image
              source={require("@assets/images/loc-reference-arrow.png")}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </View>
          <CustomText
            style={styles.selectedText}
            testID="locationSelectionText"
          >
            {i18n.t("SELECT_LOCATION")}
          </CustomText>

          <View style={styles.button}>
            <BorderButton
              onPress={onPress}
              title={i18n.t("GOT_IT")}
              testID={"gotLocationButton"}
            />
          </View>
        </SafeAreaView>
      </View>
    </Portal>
  ) : null;
};
export default Intro;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    ...paddingHorizontal(12),
    ...paddingVertical(5),
    borderRadius: 5,
    borderColor: design.Border_Color,
    backgroundColor: "white",
    marginTop: 5,
  },
  locationText: {
    marginRight: 5,
    fontSize: 13,
    fontFamily: PRIMARY,
  },
  arrow: {
    height: 4,
    width: 8,
  },
  subView: {
    width: "100%",
    top: StatusBar.currentHeight,
    alignItems: "flex-end",
    right: 70,
  },
  mainView: {
    width,
    height,
    justifyContent: "space-between",
  },
  arrowIcon: {
    height: 46,
    width: 46,
    marginTop: 10,
    transform: [{ scaleX: -1 }],
    marginRight: 50,
  },
  selectedText: {
    color: "#ffbf00",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 20,
    textAlign: "center",
    fontFamily: PRIMARY,
    ...marginHorizontal(20),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    ...marginHorizontal(20),
  },
});
