import { marginHorizontal } from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_LITE } from "@fonts";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  heading: {
    width: "100%",
    fontSize: 28,
    fontFamily: PRIMARY_BOLD,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    lineHeight: 21,
    fontSize: 16,
    letterSpacing: -0.32,
    fontFamily: PRIMARY,
    color: design.Text_Secondary_Color,
  },
  pointText: {
    lineHeight: 21,
    fontSize: 16,
    letterSpacing: -0.32,
    fontFamily: PRIMARY_LITE,
    color: design.Text_Secondary_Color,
    ...marginHorizontal(11),
  },
  priceText: {
    alignSelf: "center",
    lineHeight: 20,
    fontSize: 15,
    color: design.Primary_Color,
    fontFamily: PRIMARY_BOLD,
    marginBottom: 4,
    letterSpacing: 1,
  },
  trailText: {
    color: design.Text_Secondary_Color,
    fontFamily: PRIMARY_LITE,
  },
  subscriptionButton: {
    width: 282,
    height: 54,
    marginTop: 14,
    alignSelf: "center",
  },
  bulletPointView: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
});
