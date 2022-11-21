import {
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  itemView: {
    ...padding(15),
    borderBottomColor: "rgb(178,178,178)",
    borderBottomWidth: 0.2,
    backgroundColor: design.Background_Secondary_Color,
  },
  itemTitle: {
    fontFamily: PRIMARY_BOLD,
    color: design.Text_Primary_Color,
    fontSize: 15,
  },
  itemDetails: {
    fontSize: 13,
    color: design.Text_Secondary_Color,
    fontFamily: PRIMARY,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    ...padding(16),
    backgroundColor: design.Background_Secondary_Color,
    borderBottomColor: "rgb(178,178,178)",
    borderBottomWidth: 0.2,
  },
  headerText: {
    fontSize: 15,
    color: design.Text_Lite_Color,
    fontFamily: PRIMARY,
    marginTop: 5,
    marginLeft: 14,
  },
  marginBottom10: {
    marginBottom: 5,
  },
  mainHeadView: {
    backgroundColor: design.Background_Primary_Color,
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: design["Primary_Color"],
  },
  swipeable: {
    backgroundColor: design.Background_Secondary_Color,
  },
  editButton: {
    height: "100%",
    backgroundColor: "#007aff",
    justifyContent: "center",
    ...paddingHorizontal(16),
  },
  deleteButton: {
    height: "100%",
    backgroundColor: "#fb3a2f",
    justifyContent: "center",
    ...paddingHorizontal(16),
  },
  swipeText: {
    fontFamily: PRIMARY_BOLD,
    color: "white",
    fontSize: 14,
  },
  mainModalView: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubView: {
    backgroundColor: design.Background_Secondary_Color,
    alignItems: "center",
    justifyContent: "center",
    ...paddingVertical(15),
    ...paddingHorizontal(10),
    borderRadius: 10,
  },
  successImage: {
    width: 35,
    height: 35,
  },
  tagline: {
    fontFamily: PRIMARY,
    color: design.Text_Secondary_Color,
    fontSize: 16,
    ...paddingVertical(10),
    textAlign: "center",
    lineHeight: 20,
  },
  popupButton: {
    width: 250,
    backgroundColor: design["Primary_Color"],
    alignItems: "center",
    justifyContent: "center",
    ...paddingVertical(10),
    marginTop: 10,
    borderRadius: 5,
  },
  popupButtonText: {
    color: design["Text_Tertiary_Color"],
    fontSize: 14,
  },
});

export default styles;
