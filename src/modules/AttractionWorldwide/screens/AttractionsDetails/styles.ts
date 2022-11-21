import { design } from "rn_fast_track_uilib";
import { StyleSheet, Dimensions } from "react-native";
import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  marginVertical,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import { isRTL } from "@localization";
import { transform } from "@babel/core";
let { width } = Dimensions.get("window");
export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  contentContainerStyle: {
    flex: 1,
  },
  topHeader: {
    width,
    height: 220,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  body: {
    flex: 1,
    ...margin(16),
    justifyContent: "space-between",
  },
  title: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 16,
  },
  detailsHead: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsText: {
    fontSize: 15,
    lineHeight: 20,
  },
  locationText: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 15,
    lineHeight: 20,
  },
  locationHead: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 15,
    lineHeight: 20,
  },
  parkHead: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 14,
    marginTop: 32,
  },
  packageView: {
    alignItems: "center",
    justifyContent: "center",
    ...borderColor(design.Border_Color),
    ...borderWidth(1),
    borderRadius: design.Global_Border_Radius,
    marginBottom: 12,
  },
  packageText: {
    ...margin(16),
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 15,
    lineHeight: 20,
  },
  selectedPackage: {
    ...borderColor(design.Primary_Color),
    ...borderWidth(2),
  },
  availabilityButton: {
    ...marginVertical(16),
  },
  backArrowView: {
    position: "absolute",
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 40,
    top: 51,
    left: 16,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  headIcon: {
    flex: 1,
    margin: 11,
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
  noMargin: {
    ...margin(0),
  },
  modal: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
    marginTop: 137,
    ...padding(16),
  },
  crossIcon: {
    width: 12,
    height: 12,
    right: 0,
    ...margin(6),
    alignSelf: "flex-end",
  },
  modalHead: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: PRIMARY_BOLD,
    textAlign: "center",
  },
  tourView: {
    ...marginVertical(15),
    borderTopWidth: 1,
    borderTopColor: design.Border_Color,
  },
  tourText: {
    marginTop: 16,
    marginBottom: 14,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: PRIMARY_BOLD,
  },
  dateView: {
    flexDirection: "row",
    borderWidth: 1,
    ...borderColor(design.Border_Color),
    backgroundColor: design.Background_Secondary_Color,
    ...paddingHorizontal(12.5),
    justifyContent: "space-between",
    alignItems: "center",
    ...paddingVertical(10),
    borderRadius: design.Global_Border_Radius,
  },
  dateSubView: {
    flexDirection: "row",
  },
  calendarIcon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  dateText: {
    fontSize: 12,
    fontFamily: PRIMARY_BOLD,
    ...marginHorizontal(8.3),
  },
  rightArrow: {
    width: 6.2,
    height: 12,
    resizeMode: "contain",
    transform: [{ scaleX: -1 }],
  },
  timeSlotsView: {
    marginTop: 1,
  },
  timeText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: PRIMARY_EXTRABOLD,
  },
  timeView: {
    borderWidth: 1,
    ...borderColor(design.Border_Color),
    backgroundColor: design.Background_Secondary_Color,
    ...paddingHorizontal(5),
    justifyContent: "center",
    alignItems: "center",
    ...paddingVertical(6),
    borderRadius: design.Global_Border_Radius,
    marginTop: 12,
    marginBottom: 3,
  },
  selectedTimeView: {
    backgroundColor: design.Primary_Color,
  },
  ticketsView: {
    marginTop: 29,
    marginBottom: 27,
  },
  ticketText: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 5,
  },
  ticketTypeView: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketTypeText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 12,
  },
  tickeAmountText: {
    fontFamily: PRIMARY_EXTRABOLD,
  },
  tickeDiscountText: {
    fontFamily: PRIMARY_EXTRABOLD,
    color: design.Text_Secondary_Color,
    textDecorationLine: "line-through",
  },
  ticketCounterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 82,
  },
  actionIconView: {
    backgroundColor: design.Background_Secondary_Color,
    borderRadius: 20,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    color: design.Primary_Color,
    fontFamily: PRIMARY_BOLD,
    fontSize: 13,
  },
  ticketNumber: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 12,
  },
  checkoutButton: {
    marginBottom: 50,
  },
});
