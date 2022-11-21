import {
  borderColor,
  borderWidth,
  marginHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { StyleSheet, Dimensions } from "react-native";
import { design } from "rn_fast_track_uilib";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  outletListContainer: {
    flex: 1,
  },
  box: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
    width: windowWidth,
  },
  imageContainer: {
    width: 55,
    height: 55,
    borderRadius: 27,
    ...borderWidth(1),
    ...borderColor("white"),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "center",
  },
  crossIcon: {
    height: 20,
    width: 10,
    tintColor: "white",
    marginRight: 5,
    resizeMode: "contain",
    marginLeft: 10,
  },
  behind: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  emptyList: {
    alignItems: "center",
    paddingTop: 5,
  },
  footer: {
    ...paddingVertical(20),
  },
});

export default styles;
