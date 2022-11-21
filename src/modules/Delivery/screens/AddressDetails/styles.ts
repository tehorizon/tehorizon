import {
  borderColor,
  borderWidth,
  marginHorizontal,
  marginVertical,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { StyleSheet, Dimensions } from "react-native";
import { design } from "rn_fast_track_uilib";
let { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  contentConatinerStyle: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputsView: {
    ...marginVertical(8),
  },
  input: {
    fontSize: 15,
    backgroundColor: design.Background_Secondary_Color,
    paddingTop: 16.1,
    paddingBottom: 14.6,
    ...paddingHorizontal(15.7),
    fontFamily: PRIMARY,
  },
  headText: {
    fontSize: 15,
    letterSpacing: 0,
    ...marginHorizontal(16),
    color: design.Text_Primary_Color,
    ...marginVertical(8),
    fontFamily: PRIMARY_BOLD,
  },
  addressText: {
    fontSize: 15,
    backgroundColor: design.Background_Secondary_Color,
    color: design.Text_Primary_Color,
    ...padding(16),
    ...marginVertical(8),
    fontFamily: PRIMARY,
  },
  locationView: {
    ...marginVertical(15),
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 15,
  },
  suggestionView: {
    flexDirection: "row",
    ...marginVertical(12),
    ...marginHorizontal(7.5),
  },
  itemView: {
    minWidth: 79,
    ...paddingHorizontal(5),
    minHeight: 20,
    ...paddingVertical(3),
    backgroundColor: design.Background_Secondary_Color,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  itemText: {
    fontSize: 13,
    letterSpacing: 0,
    color: design.Text_Secondary_Color,
    fontFamily: PRIMARY,
    ...marginHorizontal(7.5),
  },
  selectedItemView: {
    backgroundColor: design.Text_Secondary_Color,
    opacity: 0.6,
  },
  selectedItem: {
    color: design.Background_Secondary_Color,
  },
  mainModalView: {
    width: width - 40,
    backgroundColor: design.Background_Secondary_Color,
    alignItems: "center",
    justifyContent: "center",
    ...paddingVertical(15),
  },
  modalHeadText: {
    fontSize: 20,
    color: design.Text_Primary_Color,
    fontFamily: PRIMARY,
  },
  modalText: {
    fontSize: 16,
    color: design.Text_Primary_Color,
    fontFamily: PRIMARY,
    ...marginVertical(10),
  },
  modalInput: {
    fontSize: 16,
    color: design.Text_Primary_Color,
    fontFamily: PRIMARY,
    ...paddingVertical(12),
    ...paddingHorizontal(8),
    width: width - 60,
    ...borderColor(design.Input_Border_Color),
    ...borderWidth(1),
  },
  cancelText: {
    fontSize: 18,
    color: design.Primary_Color,
    fontFamily: PRIMARY,
  },
  doneButtonStyle: {
    width: width - 80,
    height: 40,
    ...marginVertical(15),
    ...paddingVertical(8),
  },
  pushNewLocationButton: {
    width: width - 26,
    alignSelf: "center",
  },
});

export default styles;
