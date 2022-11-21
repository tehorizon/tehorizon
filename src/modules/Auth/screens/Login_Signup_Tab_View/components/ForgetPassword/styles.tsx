import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import { PRIMARY_BOLD } from "@fonts";
import { borderColor, padding } from "@utils/genericStyles";

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  modalView: {
    // ...margin(20),
    backgroundColor: "rgba(50,50,50,0.9)",
    ...padding(5),
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: "center",
    borderRadius: 5,
    width: "80%",
  },
  bottomButton: {
    width: "100%",
    borderTopWidth: 0.4,
    ...borderColor("grey"),
    marginTop: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "rgb(79,153,210)",
    textAlign: "center",
  },
  modalText: {
    paddingTop: 20,
    paddingBottom: 30,
    color: design.Text_Tertiary_Color,
    fontFamily: PRIMARY_BOLD,
    textAlign: "center",
    lineHeight: 17,
    width: "90%",
    fontSize: 14,
  },
  iconStyle: {
    position: "absolute",
    right: 5,
    top: 2,
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
});

export default styles;
