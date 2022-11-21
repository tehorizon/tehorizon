import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";
import { getFlipForRTLStyle } from "@localization";
import { paddingVertical } from "@utils/genericStyles";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: design["Header_Background_Primary_Color"],
    ...getFlipForRTLStyle(),
  },
  mainView: {
    flex: 1,
    backgroundColor: design["Background_Secondary_Color"],
  },
  searchResultText: {
    marginTop: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8FA",
    // borderTopColor: "#D1D1D1",
    borderTopWidth: 1,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
    ...paddingVertical(5),
  },
});
export default styles;
