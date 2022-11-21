import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "@colors";
import { design } from "rn_fast_track_uilib";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"] || "white",
  },
  height: {
    height: height,
  },
  width: {
    width: width,
  },
});
