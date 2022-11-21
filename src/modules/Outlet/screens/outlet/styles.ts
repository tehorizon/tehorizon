import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import {
  borderColor,
  borderWidth,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { paddingHorizontal } from "@utils/genericStyles";
import { isRTL } from "@localization";
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Header_Background_Primary_Color || "#FFFFFF",
  },
  conatiner: {
    backgroundColor: design.Background_Primary_Color,
    flex: 1,
  },
  doneBtnWrapper: {
    backgroundColor: design.Filter_Header_BG_COLOR,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  doneBtn: {
    height: 30,
    width: 68,
    ...borderColor(design.Header_Title_Secondary_Color),
    ...borderWidth(1),
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    textAlign: isRTL ? "right" : "left",
    ...paddingHorizontal(16),
    fontFamily: PRIMARY,
    color: "rgb(0, 0, 0)",
  },
  tabbar: {
    backgroundColor: design["Header_Background_Primary_Color"],
    marginLeft: 16,
  },
  indicatorStyle: {
    backgroundColor: design["Active_Tabs_Under_Line_Color"],
  },
  buttonText: { color: design.Header_Title_Secondary_Color },
  marginRight15: { marginRight: 15 },
  marginLeft15: { marginLeft: 15 },
  tabLabelStyle: {
    fontSize: 15,
    fontFamily: PRIMARY_BOLD,
  },

  headerView: {
    flexDirection: "row",
    alignItems: "center",
    ...paddingHorizontal(16),
    ...paddingVertical(24),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: design["Background_Secondary_Color"],
  },
  arrow: {
    width: 16.88,
    height: 15.75,
  },
  title: {
    fontSize: 20,
    fontFamily: PRIMARY_BOLD,
    color: design["Header_Title_Primary_Color"],
    marginLeft: 12,
  },
  mapIcon: { width: 18.9, height: 18 },
});

export default styles;
