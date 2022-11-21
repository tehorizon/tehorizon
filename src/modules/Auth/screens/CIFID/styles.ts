import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@commons/fonts";
import {
  borderColor,
  marginHorizontal,
  marginVertical,
  padding,
} from "@utils/genericStyles";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color || "white",
  },
  body: {
    flex: 1,
    ...marginHorizontal(24),
  },
  headText: {
    marginTop: 53,
    color: design.Text_Primary_Color,
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 24,
    fontFamily: PRIMARY_BOLD,
  },
  proceedButton: {
    ...marginVertical(24),
  },
  cifidLink: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: PRIMARY_BOLD,
    color: design["Link_Color"],
    textDecorationLine: "underline",
  },
  cifidHead: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
    marginTop: 24,
  },
  cifidDetails: {
    fontSize: 15,
    lineHeight: 20,
    ...marginVertical(16),
  },
  crossArrowView: {
    alignSelf: "flex-end",
    ...padding(14),
    marginRight: -14,
  },
  crossArrow: {
    height: 14,
    width: 14,
  },
  otpHeadText: {
    fontSize: 20,
    fontFamily: PRIMARY_BOLD,
    lineHeight: 25,
    marginBottom: 8,
  },
  otpDetails: {
    fontSize: 15,
    lineHeight: 20,
  },
  OTPMainView: {
    marginTop: 24,
  },
  otpSubHead: {
    fontSize: 15,
    lineHeight: 20,
    color: design.Text_Secondary_Color,
  },
  OTPView: {
    width: "100%",
    height: 48,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  underlineStyleBase: {
    color: design["Text_Primary_Color"],
    width: 59,
    height: 48,
    fontSize: 17,
    lineHeight: 20,
    fontFamily: PRIMARY_BOLD,
    borderRadius: design.Global_Border_Radius,
    ...borderColor(design["Border_Color"]),
  },
  wrongOTP: {
    ...borderColor(design["Error_Color"]),
  },
  timerView: {
    ...marginVertical(8),
  },
  timerText: {
    fontSize: 15,
    lineHeight: 20,
  },
  timerTextBold: {
    fontFamily: PRIMARY_BOLD,
  },
  resendText: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    lineHeight: 21,
    color: design.Link_Color,
    textDecorationLine: "underline",
  },
  disableResend: {
    color: design.DISABLED_COLOR,
    opacity: 0.5,
  },
  otpError: {
    marginBottom: 12,
    color: design.Error_Color,
  },
});
