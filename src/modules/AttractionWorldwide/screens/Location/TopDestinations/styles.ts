import { SCREEN_WIDTH } from "@commons/constants/constants";
import { PRIMARY } from "@fonts";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
  itemView: {
    marginHorizontal: 1.3,
    width: (SCREEN_WIDTH - 9) / 2,
    height: 135,
    marginBottom: 3,
  },
  bgImage: {
    marginHorizontal: 1.3,
    width: (SCREEN_WIDTH - 9) / 2,
    height: 135,
    resizeMode: "cover",
    marginBottom: 3,
    position: "absolute",
  },
  flagView: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
  countryName: {
    fontFamily: PRIMARY,
    fontSize: 14,
    color: "white",
  },
  flagIcon: {
    width: 28,
    height: 16,
    resizeMode: "contain",
  },
});
