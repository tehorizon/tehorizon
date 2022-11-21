import { PRIMARY_EXTRABOLD } from "@fonts";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  body: {
    flex: 1,
    paddingTop: 10,
  },
  titleText: {
    fontSize: 14,
    marginBottom: 12,
    marginTop: 5,
    alignSelf: "center",
  },
  currencyText: {
    fontWeight: "600",
    fontSize: 17,
    marginBottom: 15,
    fontFamily: PRIMARY_EXTRABOLD,
    alignSelf: "center",
  },
  tabs: {
    flex: 1,
    marginStart: 15,
    marginEnd: 15,
  },
});
