import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: design.Background_Primary_Color,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
});

export default styles;
