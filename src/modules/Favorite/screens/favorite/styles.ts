import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import { borderColor, borderWidth } from "@utils/genericStyles";

const styles = StyleSheet.create({
  doneBtnWrapper: {
    backgroundColor: design.Header_Background_Secondary_color,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  doneBtn: {
    height: 30,
    width: 68,
    ...borderColor(design.Header_Title_Secondary_Color),
    ...borderWidth(1),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
