import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import {
  borderColor,
  borderWidth,
  padding,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY } from "@fonts";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
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
  tabbar: {
    backgroundColor: design["Header_Background_Primary_Color"],
  },
  indicatorStyle: {
    backgroundColor: design["Active_Tabs_Under_Line_Color"],
  },
  listing: {
    flex: 1,
    // height: "100%",
    // backgroundColor: design.Background_Primary_Color,
    // position: "absolute",
  },
  sectionHeader: {
    backgroundColor: design.TRAVEL_LOCATIONS_SECTION_HEADER_COLOR,
    ...padding(5),
    color: design.TRAVEL_LOCATIONS_SECTION_HEADER_TITLE_COLOR,
    fontSize: 16,
    // fontFamily: PRIMARY,
  },
  item: {
    flexDirection: "row",
    marginLeft: 15,
    ...padding(5),
    ...paddingVertical(10),
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: design.Border_Color,
  },
  itemSubView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: PRIMARY,
  },
  flag: {
    width: 25,
    height: 25,
    marginRight: 8.5,
    resizeMode: "cover",
  },
});

export default styles;
