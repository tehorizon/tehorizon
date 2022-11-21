import { StyleSheet, Dimensions, Platform } from "react-native";
import { design } from "rn_fast_track_uilib";
let { width } = Dimensions.get("window");
import DeviceInfo from "react-native-device-info";
import { PRIMARY } from "@fonts";
import {
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";

const isIphoneWithNotch = () => Platform.OS == "ios" && DeviceInfo.hasNotch();

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerFixed: {
    left: "50%",
    marginLeft: -19.75,
    marginTop: isIphoneWithNotch() ? -2.5 : -15,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 50,
    width: 39.5,
  },
  addressView: {
    position: "absolute",
    backgroundColor: design.Background_Secondary_Color,
    width: width - 32,
    alignSelf: "center",
    ...paddingHorizontal(5),
    flexDirection: "row",
    alignItems: "center",
    top: 103,
  },
  bullet: {
    width: 7,
    height: 7,
    backgroundColor: "black",
    ...marginHorizontal(8),
  },
  addressText: {
    flex: 1,
    fontSize: 15,
    fontFamily: PRIMARY,
    color: design.Text_Secondary_Color,
    ...marginVertical(16),
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: width - 26,
    alignSelf: "center",
  },
  googleInputView: {
    position: "absolute",
    top: 18,
    height: "100%",
    width: "100%",
    backgroundColor: design.Background_Primary_Color,
  },
  searchInputMainView: {
    width: "100%",
  },
  searchInputSubView: {
    flexDirection: "row",
    backgroundColor: design.Background_Secondary_Color,
    alignItems: "center",
    paddingRight: 8,
    paddingBottom: 8,
    borderBottomColor: "rgb(178,178,178)",
    borderBottomWidth: 0.2,
  },
  searchInputView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    ...paddingHorizontal(8),
    ...marginHorizontal(8),
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    ...paddingVertical(8),
    fontSize: 18,
    ...marginHorizontal(5),
    fontFamily: PRIMARY,
    color: design.Text_Primary_Color,
  },
  cancelText: {
    fontSize: 17,
    lineHeight: 22,
    color: "#006fb9",
    fontFamily: PRIMARY,
  },
  rowStyle: {
    backgroundColor: design.Background_Primary_Color,
  },
  manualView: {
    flexDirection: "row",
    alignItems: "center",
    ...paddingHorizontal(10),
    // borderTopColor: "rgb(178,178,178)",
    borderTopWidth: 0.2,
  },
  manualText: {
    ...paddingVertical(10),
    color: design.Text_Primary_Color,
    fontSize: 15,
    fontFamily: PRIMARY,
    marginLeft: 10,
  },
  pinView: {
    position: "absolute",
    bottom: 80,
    right: 14,
  },
  locationIcon: {
    width: 40,
    height: 40,
  },
  poweredBy: {
    backgroundColor: "transparent",
  },
});

export default styles;
