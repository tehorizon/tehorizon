import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@commons/fonts";
import { marginHorizontal } from "@utils/genericStyles";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Secondary_Color,
  },
  subView: {
    shadowOpacity: 0.1,
    shadowRadius: 15,
    backgroundColor: design.Background_Primary_Color,
    zIndex: 20,
    elevation: 2,
  },
  recentView: {
    flex: 1,
    ...marginHorizontal(16),
  },
  recentHeadView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  recentText: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: PRIMARY_EXTRABOLD,
  },
  clearText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: PRIMARY_BOLD,
    color: design.Link_Color,
  },
  recentItemView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomColor: design.Border_Color,
    borderBottomWidth: 1,
  },
  loadIcon: {
    width: 13.3,
    height: 13.3,
    resizeMode: "contain",
  },
  recentItemText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: PRIMARY_BOLD,
    ...marginHorizontal(8),
  },
});
