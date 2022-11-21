import { design } from "rn_fast_track_uilib";
import { StyleSheet } from "react-native";
import {
  borderColor,
  borderWidth,
  marginVertical,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import { SCREEN_WIDTH } from "@fast_track/src/commons/constants/constants";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  item: {
    flexDirection: "row",
    ...marginVertical(15),
    borderBottomWidth: 1,
    borderBottomColor: design.Border_Color,
    height: 145,
  },
  listContainer: {
    flex: 1,
    paddingTop: 17,
  },
  title: {
    fontSize: 15,
    // textTransform: "uppercase",
    fontFamily: PRIMARY_BOLD,
    lineHeight: 20,
    color: design.Text_Tertiary_Color,
    ...marginVertical(4),
  },
  image: {
    height: 114,
    width: SCREEN_WIDTH / 2,
  },
  btnContainer: {
    height: 29,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    ...borderWidth(1),
    ...borderColor(design.Text_Tertiary_Color),
  },
  bookedText: {
    fontFamily: PRIMARY_BOLD,
    color: design.Text_Tertiary_Color,
  },
  leftView: {
    height: "100%",
    width: SCREEN_WIDTH / 2,
    backgroundColor: design.Booking_Status_Background,
    paddingBottom: 1,
  },
  rightView: {
    backgroundColor: design.Booking_Detail_Background,
    justifyContent: "space-between",
  },
  detailsContainer: {
    ...padding(12),
  },
  cancelText: {
    alignSelf: "flex-start",
    marginLeft: 12,
    textDecorationLine: "underline",
  },
});
