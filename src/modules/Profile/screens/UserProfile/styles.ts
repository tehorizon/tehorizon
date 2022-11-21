import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  paddingVertical,
  paddingHorizontal,
  padding,
} from "@utils/genericStyles";
import { PRIMARY_BOLD, PRIMARY } from "@fonts";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"] || "white",
  },
  flex1: {
    flex: 1,
  },
  box: {
    ...padding(16),
    marginBottom: 4,
    backgroundColor: design.Background_Secondary_Color
      ? design.Background_Secondary_Color
      : "#FFFFFF",
  },
  details: {
    fontWeight: "normal",
    fontSize: 15,
    fontFamily: PRIMARY,
    color: design.Text_Primary_Color,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
  },
  breakdown: {
    fontSize: 20,
    paddingBottom: 20,
    fontFamily: PRIMARY,
  },
  saving: {
    fontSize: 20,
    color: design.Text_Primary_Color,
    fontFamily: PRIMARY,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
  },
  savingSub: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...paddingVertical(20),
    ...paddingHorizontal(0),
  },
  currencyText: {
    fontSize: 18,
    color: design.Secondary_Color,
  },
  userSaving: {
    fontSize: 26,
    color: design.Secondary_Color,
    marginLeft: 5,
    fontFamily: PRIMARY_BOLD,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
  },
  savingBreakdown: {
    textDecorationLine: "underline",
    textDecorationColor: design.Link_Color,
    paddingBottom: 3,
    color: design.Link_Color,
    fontFamily: PRIMARY_BOLD,
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
  },
});
