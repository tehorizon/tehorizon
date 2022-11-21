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
  avoidingView: {
    flex: 1,
    ...marginHorizontal(24),
  },
  mT16: {
    marginTop: 16,
  },
  btn: {
    marginTop: 24,
  },
  deleteAccount: {
    marginTop: 16,
    marginBottom: 12,
    alignSelf: "center",
  },
  deleteText: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: design.Primary_Color,
  },
  deleteMsg: {
    fontSize: 14,
  },
  scrollView: {
    ...paddingVertical(20),
  },
});
