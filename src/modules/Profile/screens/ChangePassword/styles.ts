import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
} from "@utils/genericStyles";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"] || "white",
  },
  avoidingView: {
    ...paddingHorizontal(24),
    paddingTop: 12,
  },
  headingText: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 20,
    lineHeight: 24,
    color: design["Text_Primary_Color"],
    marginTop: 12,
  },
  btn: {
    marginTop: 24,
  },
  check: {
    width: 12,
    height: 6,
    marginRight: 6.58,
    tintColor: "red",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
  },
  mt24: {
    marginTop: 24,
  },
});
