import { paddingHorizontal, paddingVertical } from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  sectionList: {
    paddingTop: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: design.Border_Color,
    borderBottomWidth: 0.5,
    alignItems: "center",
    ...paddingVertical(16),
  },
  title: {
    fontSize: 12,
    fontFamily: PRIMARY,
    textTransform: "capitalize",
    marginLeft: 19,
    marginRight: 10,
  },
  headerText: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    letterSpacing: 0,
    color: design.Text_Tertiary_Color,
  },
  headerView: {
    backgroundColor: design.Primary_Color,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    overflow: "hidden",
    marginLeft: 19,
    marginTop: 18,
    marginBottom: 8,
  },
  arrow: {
    width: 6,
    height: 10,
    marginRight: 30,
  },
  alphaList: {
    height: "85%",
    position: "absolute",
    right: 0,
    justifyContent: "space-between",
    top: "5%",
  },
  alphaText: {
    fontSize: 10,
    ...paddingHorizontal(11),
    ...paddingVertical(5),
    fontFamily: PRIMARY,
    textAlign: "center",
  },
});
