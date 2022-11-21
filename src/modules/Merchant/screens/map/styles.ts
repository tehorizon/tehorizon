import { padding } from "@utils/genericStyles";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design["Background_Tertiary"],
  },
  markerView: {
    width: 200,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  pinView: {
    position: "absolute",
    bottom: 50,
    right: 10,
    height: 25,
    width: 25,
  },
  locationIcon: {
    ...padding(10),
    height: "100%",
    width: "100%",
  },
  mapView: {
    flex: 1,
    height: 500,
    width: 500,
    // justifyContent: "center",
    // alignItems: "center"
  },
  subMarkerView: {
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: { fontSize: 18, fontWeight: "bold" },
  mapText: { fontWeight: "bold", paddingTop: 10 },
});

export default styles;
