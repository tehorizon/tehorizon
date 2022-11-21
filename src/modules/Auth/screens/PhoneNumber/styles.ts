import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "@colors";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";
import { marginVertical } from "@utils/genericStyles";
let { width } = Dimensions.get("window");

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design["Header_Background_Primary_Color"]
      ? design["Header_Background_Primary_Color"]
      : colors.COLOR_WHITE,
  },
  body: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
    alignItems: "center",
    paddingTop: 13,
    paddingRight: 12,
    paddingLeft: 12,
  },
  numberView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: width - 24,
  },
  countryCode: {
    fontSize: 14,
    backgroundColor: design["Input_Background_Color"],
    fontFamily: PRIMARY_BOLD,
    width: 57,
    height: 35,
    textAlign: "center",
    paddingTop: 10,
  },
  phoneNumberInput: {
    width: width - 91,
  },
  headText: {
    width: "100%",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: PRIMARY_BOLD,
    ...marginVertical(9),
  },
  addPhoneNumber: { width: 282, marginTop: 56, height: 54 },
});
