import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import {
  borderColor,
  borderWidth,
  paddingHorizontal,
} from "@utils/genericStyles";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  listing: {
    flex: 1,
    height: "100%",
    backgroundColor: design.Background_Primary_Color,
    // position: "absolute",
  },
  pH16: {
    flex: 1,
    ...paddingHorizontal(16),
  },
});

export default styles;
