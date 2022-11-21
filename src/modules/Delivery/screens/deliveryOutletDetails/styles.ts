import { Platform, StyleSheet } from "react-native";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import {
  borderColor,
  margin,
  marginHorizontal,
  padding,
  paddingVertical,
} from "@utils/genericStyles";
import { design } from "rn_fast_track_uilib";
import colors from "@colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: design["Header_Background_Primary_Color"]
      ? design["Header_Background_Primary_Color"]
      : "transparent",
  },
  mainView: {
    flex: 1,
    // ...getFlipForRTLStyle(),
    backgroundColor: design["Background_Secondary_Color"],
  },
  scrollView: {
    flex: 1,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: PRIMARY,
  },
  modalStyle: {
    ...margin(0),
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  cmParent: {
    flex: 1,
    backgroundColor: design["Background_Secondary_Color"],
  },
  cmHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cmCloseButton: {
    paddingEnd: 10,
    paddingTop: 3,
    paddingBottom: 0,
  },
  logoParent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: 80,
    width: 80,
  },
  offerFeaturesParetnt: {
    ...paddingVertical(5),
    flexDirection: "row",
    backgroundColor: design["Background_Primary_Color"],
  },
  offerContentStyle: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  outletName: {
    marginTop: 10,
    fontFamily: PRIMARY,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "rgb(79,153,210)",
  },

  outletDetail: {
    marginTop: 10,
    fontFamily: PRIMARY,
    fontSize: 16,
    textAlign: "center",
    color: "rgb(79,153,210)",
  },

  cmOutletsCount: {
    alignItems: "center",
    flexDirection: "row",
    height: 35,
    backgroundColor: "grey",
    justifyContent: "center",
  },
  cmOutletsCountText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: "white",
    paddingStart: 10,
  },

  doneButton: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    paddingEnd: 10,
  },
  listItemSelected: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    color: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
    paddingStart: 15,
    backgroundColor: "rgb(237, 237, 237)",
  },
  listItem: {
    flexDirection: "row",
    height: 65,
    color: "grey",
    alignItems: "center",
    paddingStart: 15,
    borderBottomWidth: 0.7,
  },
  listItemText: {
    color: "grey",
    flex: 1,
    fontFamily: PRIMARY_BOLD,
  },
  distanceText: {
    color: "grey",
    paddingEnd: 20,
    fontFamily: PRIMARY_BOLD,
  },

  cmFooterParent: {
    backgroundColor: "#f2f1f1",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  eightPointBurst: {},
  eightPointBurst20: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    transform: [{ rotate: "20deg" }],
  },
  eightPointBurst155: {
    width: 20,
    height: 20,
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    left: 0,
    transform: [{ rotate: "155deg" }],
  },
  backgroundWhite: {
    backgroundColor: "white",
  },
  row: {
    flexDirection: "column",
    alignItems: "center",
  },
  offerText: {
    fontSize: 10,
    letterSpacing: 0,
    color: design["Text_Lite_Color"],
    textAlign: "center",
    ...marginHorizontal(5),
  },
  offerValue: {
    fontSize: 11,
    fontStyle: "normal",
    letterSpacing: 0,
    color: design["Text_Lite_Color"],
  },
  tabbar: {
    backgroundColor: design["Header_Background_Primary_Color"],
    borderBottomWidth: 2,
    borderBottomColor: design["Border_Color"],
  },
  indicatorStyle: {
    backgroundColor: design["Active_Tabs_Under_Line_Color"],
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    letterSpacing: 0,
    ...borderColor(design["Input_Border_Color"] || colors.TEXT),
  },
  tabbarTextView: {
    ...marginHorizontal(5),
    ...padding(5),
    paddingTop: 20,
    fontSize: 14,
  },
  tabbarText: {
    fontSize: 14,
    fontFamily: PRIMARY,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: design["Active_Tabs_Under_Line_Color"],
  },
  offerView: {
    backgroundColor: design["Background_Primary_Color"],
    marginBottom: 15,
  },
});

export default styles;
