import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  paddingHorizontal,
} from "@utils/genericStyles";
import { PRIMARY_BOLD } from "@fonts";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"] || "white",
  },
  profileDetails: {
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: "center",
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 65,
    ...borderColor("white"),
    ...borderWidth(2),
    resizeMode: "cover",
    backgroundColor: "lightgrey",
  },
  nameText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 16,
    marginTop: 15,
  },
  emailText: {
    marginTop: 6,
    marginBottom: 6,
  },
  editAccountButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    width: 155,
    height: 36,
    ...borderWidth(1),
    ...borderColor(design["Primary_Color"]),
  },
  preferenceSection: {
    backgroundColor: design["Background_Secondary_Color"] || "#FAFAFA",
    ...paddingHorizontal(16),
    paddingTop: 15,
    marginBottom: 8,
  },
  headingText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 16,
    color: design["Text_Primary_Color"],
  },
  preferenceOption: {
    flexDirection: "row",
    paddingTop: 11,
    paddingBottom: 11,
    alignItems: "center",
  },
  preferenceOptionTitle: {
    flex: 1,
    color: design["Text_Primary_Color"],
  },
  dangerousColor: {
    color: "red",
  },
  signoutButton: {
    height: 34,
    // backgroundColor: design["Primary_Color"],
    ...borderWidth(1),
    ...borderColor(design.Text_Primary_Color),
    ...margin(16),
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleSwitch: {
    height: 31,
    width: 51,
    marginRight: 3,
  },
});
