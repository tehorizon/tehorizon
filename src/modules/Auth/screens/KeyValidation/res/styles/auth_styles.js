import { StyleSheet } from "react-native";
import APP_COLORS from "../colors";
import { design } from "rn_fast_track_uilib";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import {
  borderColor,
  borderWidth,
  margin,
  padding,
  paddingHorizontal,
} from "@utils/genericStyles";
export default StyleSheet.create({
  p10: {
    ...padding(10),
    backgroundColor: design["Input_Background_Color"],
  },

  tabBarLabelStyle: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
  },

  inputField_MT16: {
    fontSize: 14,
    height: 38,
    width: "90%",
    backgroundColor: "#ffffff",
    elevation: 1,
    ...borderColor("#efefef"),
    ...borderWidth(0),
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 16,
    fontFamily: PRIMARY_BOLD,
  },

  inputField_MT10: {
    fontSize: 14,
    height: 38,
    width: "90%",
    backgroundColor: "#ffffff",
    elevation: 1,
    ...borderColor("#efefef"),
    ...borderWidth(0),
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 10,
    fontFamily: PRIMARY_BOLD,
  },

  checkBoxParent: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
  },
  checkBoxElement: {
    ...margin(0),
    ...padding(0),
  },

  checkBoxLabelText: {
    marginStart: -10,
    fontFamily: PRIMARY_BOLD,
    fontSize: 13,
    lineHeight: 20,
  },

  hyperLinkText: {
    marginStart: 5,
    fontFamily: PRIMARY_BOLD,
    fontSize: 13,
    lineHeight: 20,
    textDecorationLine: "underline",
    color: design["Link_Color"],
  },

  forgetPassStyle: {
    fontSize: 12,
    color: design["Link_Color"],
    width: "100%",
    textAlign: "center",
    textDecorationLine: "underline",
    textAlignVertical: "center",
    ...padding(15),
    fontFamily: PRIMARY_BOLD,
    lineHeight: 20,
  },

  passwordFieldWithToggleParent: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    width: "90%",
    marginTop: 10,
    height: 35,

    backgroundColor: "white",
    ...borderColor("#efefef"),
  },
  passwordFieldWithToggle: {
    fontSize: 14,
    height: 35,
    width: "83%",
    backgroundColor: "white",
    ...borderColor("#efefef"),
    ...borderWidth(0),
    ...paddingHorizontal(10),
    fontFamily: PRIMARY_BOLD,
  },

  toggleToolTipText: {
    fontSize: 12,
    fontFamily: PRIMARY_BOLD,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    lineHeight: 20,
    textDecorationColor: design["Primary_Color"],
    color: design["Primary_Color"],
  },

  button: {
    marginTop: 30,
    height: 54,
    width: "70%",
    ...borderColor(APP_COLORS.COLOR_BUTTON),
    ...borderWidth(1),
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    backgroundColor: APP_COLORS.COLOR_BUTTON,
  },

  selectCountryParent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  selectCountryText: {
    flex: 1,
    fontFamily: PRIMARY_BOLD,
    fontSize: 14,
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#000000",
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 10,
  },
  selectCountryDropdown: {
    flexDirection: "row",
    height: 35,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },

  selectCountryDropdownText: {
    flex: 1,
    fontSize: 14,
    fontFamily: PRIMARY,
    ...paddingHorizontal(10),
  },
  selectCountryDropdownArrowParent: {
    height: 35,
    width: 35,
    backgroundColor: design["Primary_Color"],
    alignItems: "center",
    justifyContent: "center",
  },
  corStyle: {
    color: "#000000",
    fontSize: 14,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 12,
    width: "60%",
  },
  selectCorStyle: {
    color: "#000000",
    fontSize: 14,
    backgroundColor: "#ffffff",
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: "center",
    height: 40,
    marginLeft: 10,
  },
  selectArrowStyle: {
    tintColor: "#999999",
    height: 20,
    width: 20,
    resizeMode: "center",
    paddingStart: 10,
    paddingEnd: 10,
    ...margin(10),
  },
  selectViewStyle: {
    backgroundColor: "#ffffff",
    height: 40,
    width: "40%",
    flex: 1,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  //loginScreen Parent StyleSheet
  loginParent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: design["Background_Secondary_Color"]
      ? design["Background_Secondary_Color"]
      : "#f3f3f3",
  },
  areYouready: {
    fontSize: 14,
    paddingTop: 27,
    paddingLeft: 27,
    paddingRight: 16,
    textAlign: "justify",
    fontFamily: PRIMARY_BOLD,
    lineHeight: 18,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: PRIMARY_BOLD,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },

  // Regiser with Demographics component styles //

  DOBandGenderView: {
    flexDirection: "row",
    width: "90%",
    marginTop: 15,
    // backgroundColor: 'red'
  },
  dobView: {
    flex: 0.5,
    // backgroundColor: 'red',
  },
  dobField: {
    height: 35,
    width: "75%",
    backgroundColor: "white",
    justifyContent: "center",
    ...paddingHorizontal(10),
    marginTop: 5,
  },
  genderView: {
    flex: 0.5,
  },
  genderRadiosView: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
    // backgroundColor: 'red',
  },
});
