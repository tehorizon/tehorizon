import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY_EXTRABOLD } from "@fonts";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  list: {
    ...marginHorizontal(16),
    paddingTop: 19,
  },
  searchbarView: {
    flexDirection: "row",
    ...marginHorizontal(16),
    marginTop: 16,
    marginBottom: 10,
  },
  searchBar: {
    ...margin(0),
    ...borderColor(design.Border_Color),
    backgroundColor: "transparent",
  },
  locationPicker: {
    flexDirection: "row",
    ...borderColor(design.Border_Color),
    ...borderWidth(1),
    ...paddingVertical(13),
    borderRadius: design.Global_Border_Radius,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 13,
    paddingRight: 10,
    maxWidth: "33%",
    marginLeft: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: PRIMARY_EXTRABOLD,
    lineHeight: 14,
  },
  downArrow: {
    width: 10,
    height: 6,
    resizeMode: "contain",
    marginLeft: 5,
  },
});
