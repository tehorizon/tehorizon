import { Dimensions, StyleSheet } from "react-native";
import APP_COLORS from "@colors";
import { design } from "rn_fast_track_uilib";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  marginVertical,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
let { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"] || "white",
  },
  subView: {
    flex: 1,
    ...marginHorizontal(24),
  },
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
    fontFamily: PRIMARY_BOLD,
  },
  numberView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: width - 50,
  },
  countryCode: {
    fontSize: 14,
    backgroundColor: design["Input_Background_Color"],
    fontFamily: PRIMARY_BOLD,
    width: 57,
    height: 35,
    textAlign: "center",
    paddingTop: 10,
  },
  phoneNumberInput: {
    width: width - 91,
  },
  inputField_MT10: {
    fontSize: 14,
    height: 38,
    fontFamily: PRIMARY_BOLD,
  },
  checkBoxsView: {
    marginTop: 20,
  },
  checkBoxParent: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "flex-start",
    alignItems: "center",
    width: width - 50,
  },
  checkBoxElement: {
    ...margin(0),
    marginLeft: 0,
    ...padding(0),
    marginRight: 14,
    backgroundColor: design["Checkbox_BG_Color"],
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
    width: width - 50,
    marginTop: 10,
    height: 35,
    ...borderColor("#efefef"),
  },
  signinDiffrently: {
    width: width - 50,
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  passwordFieldWithToggle: {
    height: 35,
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
    width: width - 50,
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
    height: 52,
    width: width - 48,
    backgroundColor: "white",
    alignItems: "center",
    ...borderColor(design.Border_Color),
    ...borderWidth(1),
  },

  selectCountryDropdownText: {
    flex: 1,
    fontSize: 14,
    fontFamily: PRIMARY,
    marginLeft: 10,
    marginRight: 10,
  },
  selectCountryDropdownArrowParent: {
    // height: 35,
    // width: 28,
    // backgroundColor: design["Primary_Color"],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    // borderBottomRightRadius: 5,
    // borderTopRightRadius: 5,
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
    width: width - 50,
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
  contentContainerStyle: {
    alignSelf: "center",
  },
  btn: {
    marginTop: 30,
  },

  formContainer: {
    backgroundColor: design.Primary_Color,
    ...paddingHorizontal(10),
    ...paddingVertical(20),
    marginTop: 50,
  },
  input: {
    width: width - 50,
  },
  registerTopText: {
    fontSize: 13,
    color: design.Text_Primary_Color,
    marginTop: 16,
    lineHeight: 18,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 50,
  },
  height: {
    height: height,
  },
  width: {
    width: width,
  },
  registerText: {
    marginTop: 47,
    color: design.Text_Primary_Color,
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 24,
    fontFamily: PRIMARY_BOLD,
    width: "100%",
  },
  signInText: {
    color: design.Secondary_Color,
    fontFamily: PRIMARY_EXTRABOLD,
    textDecorationLine: "underline",
  },
});