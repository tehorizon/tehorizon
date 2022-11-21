import {
  borderColor,
  borderWidth,
  marginHorizontal,
} from "@utils/genericStyles";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
const { height } = Dimensions.get("window");
const ParallaxHeight = height * 0.45;
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: -100,
  },
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color || "white",
  },
  parallexBackgroundImage: {
    width: "100%",
    height: ParallaxHeight,
  },
  rectangle: {
    flex: 1,
    width: "100%",
    height: 88,
    opacity: 0.9,
    backgroundColor: "rgb(169,169,169)",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  category: {
    marginTop: 16,
    marginBottom: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    ...marginHorizontal(11),
  },
  offers: {
    width: "100%",
    height: 37,
    backgroundColor: "#7F526E",
    justifyContent: "center",
    alignItems: "center",
  },
  offersText: {
    color: "#ffffff",
  },
  doneBtnWrapper: {
    backgroundColor: design.Header_Background_Secondary_color,
    height: 45,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  doneBtn: {
    height: 30,
    width: 60,
    ...borderWidth(1),
    ...borderColor(design.Header_Title_Secondary_Color),
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  savedWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  subView: {
    backgroundColor: design.Background_Primary_Color,
    flex: 1,
  },
});
