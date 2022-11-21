import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import { paddingHorizontal, paddingVertical } from "@utils/genericStyles";
import { PRIMARY_BOLD } from "@fast_track/src/commons/fonts";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  item: {
    ...paddingHorizontal(24),
    ...paddingVertical(15),
    borderBottomWidth: 1,
    borderBottomColor: design.Border_Color,
  },
  title: {
    fontSize: 13,
    textTransform: "uppercase",
    fontFamily: PRIMARY_BOLD,
    lineHeight: 18,
  },
});
