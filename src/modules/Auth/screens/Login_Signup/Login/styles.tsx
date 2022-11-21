import { StyleSheet, Dimensions } from "react-native";
import APP_COLORS from "@colors";
import { design } from "rn_fast_track_uilib";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  padding,
  paddingHorizontal,
  paddingVertical,
  marginVertical,
} from "@utils/genericStyles";
import colors from "@colors";
let { width } = Dimensions.get("window");
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
    width: width - 24,
    backgroundColor: "#ffffff",
    elevation: 1,
    ...borderColor("#efefef"),
    ...borderWidth(0),
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 16,
    fontFamily: PRIMARY_BOLD,
  },
  signinDiffrently: {
    width: width - 24,
    justifyContent: "flex-start",
    marginLeft: 10,
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
  checkBoxsView: {
    marginTop: 14,
  },
  checkBoxParent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: width - 50,
    marginTop: 24,
  },
  checkBoxElement: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 7,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: design["Checkbox_BG_Color"],
    borderWidth: 3,
    borderColor: design["Checkbox_BG_Color"],
  },

  checkBoxLabelText: {
    fontSize: 13,
    lineHeight: 18,
    color: design.Text_Primary_Color,
  },

  hyperLinkText: {
    marginStart: 5,
    fontSize: 13,
    lineHeight: 20,
    color: design.Link_Color,
  },

  forgetPassStyle: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: PRIMARY_BOLD,
    color: design["Link_Color"],
    width: "100%",
    textDecorationLine: "underline",
    marginTop: 16,
  },

  passwordFieldWithToggleParent: {
    flexDirection: "row",
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
    alignItems: "center",
  },
  loginMessage: {
    width: width - 50,
    marginBottom: 16,
    marginTop: 54,
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
  signInText: {
    color: design.Text_Primary_Color,
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
  },
  savingtext: {
    color: design.Text_Primary_Color,
    fontSize: 15,
    marginTop: 16,
    lineHeight: 25,
    fontFamily: PRIMARY,
  },
  line: {
    backgroundColor: design.Text_Primary_Color,
    height: 1,
    width: (width - 120) / 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sigupTextView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  formContainer: {
    backgroundColor: design.Background_Primary_Color,
    ...paddingHorizontal(10),
    // ...paddingVertical(20),
  },
  input: {
    width: width - 50,
  },
  registerTopText: {
    fontSize: 13,
    color: design["Text_Primary_Color"],
    alignSelf: "center",
    lineHeight: 18,
    ...marginHorizontal(5),
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 33,
  },
  btn: {
    width: width - 50,
    marginTop: 29,
  },
  signUpText: {
    fontSize: 13,
    color: design.Secondary_Color,
    lineHeight: 18,
  },
  bottomText: {
    marginTop: 33,
    fontSize: 15,
    fontFamily: PRIMARY_EXTRABOLD,
    alignSelf: "center",
  },
});
