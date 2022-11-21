import { design } from "rn_fast_track_uilib";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { StyleSheet } from "react-native";
import {
  borderColor,
  margin,
  marginHorizontal,
  marginVertical,
  padding,
  paddingHorizontal,
} from "@utils/genericStyles";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  indicatorStyle: {
    backgroundColor: design.Active_Tabs_Under_Line_Color,
    marginLeft: 24,
  },
  tabBarStyle: {
    backgroundColor: design.Background_Primary_Color,
    ...paddingHorizontal(24),
    elevation: 0,
    borderBottomColor: design.Border_Color,
    borderBottomWidth: 0.5,
  },
  tabLabelStyle: {
    fontSize: 15,
    fontFamily: PRIMARY_BOLD,
    lineHeight: 20,
    textTransform: "capitalize",
  },
  tabViewStyle: {
    height: "100%",
  },
  modalSearchbar: {
    ...margin(0),
    ...borderColor(design.Border_Color),
    backgroundColor: "transparent",
    marginLeft: 24,
  },
  searchBar: {
    ...margin(0),
    marginTop: 10,
    ...borderColor(design.Border_Color),
    backgroundColor: "transparent",
  },
  searchbarView: {
    flexDirection: "row",
    ...marginHorizontal(16),
    marginTop: 18,
    marginBottom: 14,
  },
  searchBoxStyle: {
    textAlign: "center",
  },
  searchIconStyle: {
    width: 20,
    height: 20,
  },
  searchModalView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  topSearchBoxStyle: {
    borderRadius: 10,
  },
  cityView: {
    flexDirection: "row",
    ...padding(10),
    borderBottomColor: design.Border_Color,
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  cityName: {
    flex: 1,
    fontFamily: PRIMARY,
    fontSize: 14,
  },
  countryDetail: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  countryName: {
    fontFamily: PRIMARY,
    fontSize: 12,
  },
  arrowImage: {
    width: 10,
    height: 6,
    marginLeft: 5,
  },
  tabStyle: { width: "auto" },
  modal: {
    ...margin(0),
  },
  modalSearchbarView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: design.Border_Color,
    borderBottomWidth: 0.5,
  },
  crossIcon: {
    width: 16,
    height: 16,
    marginLeft: 16,
    marginRight: 24,
    ...marginVertical(16),
  },
});
