import { borderColor, borderWidth } from "@utils/genericStyles";
import { StyleSheet } from "react-native";
const WIDTH = "70%";

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  companyLogo: {
    height: 70,
    width: WIDTH,
  },

  keyInput: {
    backgroundColor: "#ffffff",
    width: "30%",
    ...borderColor("grey"),
    ...borderWidth(1),
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 5,
    borderRadius: 5,
  },
});

export default styles;
