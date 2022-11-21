import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "@redux/root-reducer";

const OutletHeader = React.forwardRef(
  ({ onPressBack, onPressRightButton, mode, hasGms, travelLocation }, ref) => {
    let LocationList = useAppSelector(
      (state) => state.locationReducer?.LocationList
    );
    let locationIndex = useAppSelector(
      (state) => state.locationReducer?.locationIndex
    );
    let location =
      LocationList?.length > 0 && locationIndex >= 0
        ? LocationList[locationIndex]
        : null;

    const category = useAppSelector(
      (state) => state.homeReducer?.category ?? ""
    );

    return (
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            right: 0,
            left: 0,
          }}
        >
          <CustomText
            localize
            style={{
              textAlign: "center",
              color: design["Header_Title_Primary_Color"],
            }}
            testID={"outletHeading"}
          >
            {category.display_name}
          </CustomText>
          <CustomText
            localize
            style={{
              fontSize: 11,
              textAlign: "center",
              color: design["Header_Title_Primary_Color"],
            }}
          >
            {travelLocation?.name || location?.name || "Abu Dubai"}
          </CustomText>
        </View>

        <View style={{ position: "absolute", left: 15 }}>
          <TouchableOpacity
            testID="backButton"
            onPress={onPressBack}
            style={{
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 15,
              paddingLeft: 5,
            }}
          >
            <View>
              <AntDesign
                name="caretleft"
                size={14}
                color={design["Header_Icon_Color"]}
                onPress={onPressBack}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ position: "absolute", right: 10 }}>
          <TouchableOpacity
            onPress={onPressRightButton}
            style={{
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 5,
              paddingLeft: 5,
            }}
            testID={"outletMode"}
          >
            <View style={{ paddingBottom: 15 }}>
              {hasGms && (
                <CustomText
                  localize
                  style={{ fontSize: 14 }}
                  testID={"outletModeText"}
                >
                  {mode === "List" ? "Map" : "List"}
                </CustomText>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 50,
    justifyContent: "center", //Centered vertically

    backgroundColor: design["Header_Background_Primary_Color"]
      ? design["Header_Background_Primary_Color"]
      : "transparent",
  },
});

export default OutletHeader;
