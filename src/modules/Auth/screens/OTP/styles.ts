import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "@colors";
import { design } from "rn_fast_track_uilib";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import {
  borderColor,
  marginHorizontal,
  marginVertical,
} from "@utils/genericStyles";
let { width } = Dimensions.get("window");

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design["Header_Background_Primary_Color"]
      ? design["Header_Background_Primary_Color"]
      : colors.COLOR_WHITE,
  },
  body: {
    flex: 1,
    paddingTop: 13,
    paddingLeft: 12,
    paddingRight: 12,
  },
  headText: {
    width: "70%",
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
    ...marginVertical(9),
    color: design["Text_Primary_Color"],
  },

  underlineStyleBase: {
    color: design["Text_Primary_Color"],
    width: 48,
    height: 48,
    fontSize: 20,
    ...borderColor(design["Input_Border_Color"]),
  },
  underlineStyleError: {
    ...borderColor(design["Error_Color"]),
  },
  OTPView: {
    width: 228,
    height: 48,
    alignSelf: "flex-start",
    marginTop: 24,
    marginBottom: 8,
  },
  resendText: {
    color: design["Input_Border_Color"],
    fontSize: 11,
    letterSpacing: 0.5,
    fontFamily: PRIMARY,
  },
  pinText: {
    color: design["Link_Color"],
    fontSize: 14,
    fontFamily: PRIMARY,
    textDecorationLine: "underline",
  },
  noPinView: {
    marginTop: 24,
  },
  activityIndicator: {
    ...marginHorizontal(24),
    alignSelf: "flex-start",
  },
});
