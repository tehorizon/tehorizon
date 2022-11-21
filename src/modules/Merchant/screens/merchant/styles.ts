import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import {
  borderColor,
  borderWidth,
  marginHorizontal,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  merchantView: {
    ...paddingHorizontal(16),
  },
  scrollView: { flex: 1, height: 200 },
  deliverOffer: {
    ...marginHorizontal(10),
    marginBottom: 15,
    ...paddingVertical(10),
    alignItems: "center",
    ...borderWidth(2),
    ...borderColor(design.Primary_Color),
  },
  deliveryText: { color: design.Primary_Color },
  outletDetails: {
    fontFamily: PRIMARY,
    fontSize: 15,
    lineHeight: 20,
    color: design["Text_Primary_Color"],
  },
  text2: {
    // ...paddingHorizontal(10),
    paddingTop: 3,
    fontFamily: PRIMARY,
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0,
    color: design["Text_Primary_Color"],
  },
  text3: {
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    fontFamily: PRIMARY,
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0,
    color: design["Text_Primary_Color"],
  },
  outletDetailHead: {
    paddingTop: 4,
    paddingBottom: 12,
    fontFamily: PRIMARY_BOLD,
    fontSize: 17,
    lineHeight: 22,
    color: design["Text_Primary_Color"],
  },
  moreIcon: {
    marginEnd: 20,
    alignItems: "flex-end",
  },
  sectionName: {
    ...paddingVertical(12),
    fontFamily: PRIMARY_BOLD,
    fontSize: 17,
    lineHeight: 22,
    color: design["Text_Primary_Color"],
  },
  amenitiesView: {
    marginRight: -5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenitiesList: {
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 10,
    alignItems: "center",
    width: "25%",
  },
  amenitiesIcon: {
    height: 35,
    width: 35,
    tintColor: design.Amenities_Icon_Color,
  },
  amenitiesSmallerIcon: {
    height: 25,
    width: 25,
    tintColor: design.Amenities_Icon_Color,
  },
  amenitiesTitle: {
    fontSize: 10,
    fontFamily: PRIMARY,
    textAlign: "center",
  },
  webView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...padding(5),
  },
  webName: {
    flex: 1,
    fontFamily: PRIMARY,
    fontSize: 14,
    textDecorationLine: "underline",
    ...paddingHorizontal(10),
    color: design.Amenities_Icon_Color,
  },
  moreAmenities: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  moreAmenitiesIcon: {
    paddingEnd: 20,
  },
  row: {
    flexDirection: "row",
  },
  merchantAttributes: {
    flexDirection: "column",
    backgroundColor: "white",
    ...paddingHorizontal(16),
  },
  noWrap: {
    flexWrap: "nowrap",
  },
  offerView: {
    backgroundColor: design["Background_Primary_Color"],
    marginBottom: 15,
  },
});

export default styles;
