import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: design["Background_Primary_Color"]
        ? design["Background_Primary_Color"]
        : "white",
    },
  });

  export default styles;