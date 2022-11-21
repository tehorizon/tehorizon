import { Platform, StyleSheet } from "react-native";
import colors from "@colors";
import { design } from "rn_fast_track_uilib";

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: design["Header_Background_Primary_Color"]
      ? design["Header_Background_Primary_Color"]
      : colors.COLOR_WHITE,
  },
});
