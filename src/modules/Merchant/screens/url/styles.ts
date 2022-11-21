import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@commons/constants/constants";
import { borderColor, borderWidth, margin } from "@utils/genericStyles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "black",
  },
  subView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    alignContent: "center",
  },
  containerStyle: {
    width: SCREEN_WIDTH,
    height: 200,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    ...margin(3),
    ...borderWidth(0.8),
    ...borderColor("white"),
  },
  activeDot: {
    backgroundColor: "white",
    width: 8,
    height: 8,
    borderRadius: 4,
    ...margin(3),
  },
  panoramaView: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "black",
  },
  image: {
    width: SCREEN_WIDTH,
    height: "100%",
  },
  carousel: {
    width: SCREEN_WIDTH,
    height: "100%",
  },
  dimenssions: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  activityIndicator: {
    position: "absolute",
    alignContent: "center",
    ...margin(20),
    right: 0,
    left: 0,
  },
});

export default styles;
