import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";
import { PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import {
  borderColor,
  borderWidth,
  margin,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import TextLabel from "../Text/Text";
const Chips = ({
  value,
  onPress,
  chipStyle,
  type,
  selected,
  chipCloseStyle,
  valueStyleSelected,
  chipStyleSelected,
  valueStyle,
  subType,
}) => {
  const returnStyles = () => {
    if (type == "removable") {
      return selectableStyles;
    }
    return selectableStyles;
  };
  const returnRemovable = () => {
    if (type == "removable") {
      return (
        <TextLabel style={[returnStyles().chipCloseBtnTxt, chipCloseStyle]}>
          x
        </TextLabel>
      );
    }
  };
  return (
    <View
      style={
        selected
          ? [
              { flexDirection: "row" },
              returnStyles().chipSelected,
              chipStyle,
              chipStyleSelected,
            ]
          : [
              returnStyles().chip,
              {
                flexDirection: "row",
                ...borderColor(
                  subType === "success"
                    ? design.Primary_Color
                    : design.Border_Color
                ),

                // backgroundColor:
                //   subType === "success"
                //     ? "rgb(99,197,151)"
                //     : "rgb(230,116,130)",
              },
              chipStyle,
            ]
      }
    >
      <TextLabel
        style={
          selected
            ? [{ ...paddingHorizontal(5) }, valueStyle, valueStyleSelected]
            : [{ paddingLeft: 5 }, returnStyles().valueStyle, valueStyle]
        }
      >
        {value}
      </TextLabel>
      <TouchableOpacity onPress={onPress}>{returnRemovable()}</TouchableOpacity>
    </View>
  );
};

const selectableStyles = StyleSheet.create({
  chipCloseBtnTxt: {
    fontSize: 12,
    color: design.Text_Primary_Color,
    fontFamily: PRIMARY_BOLD,
    ...paddingHorizontal(6),
  },
  chip: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginRight: 6,
    ...padding(8),
    ...borderWidth(1),
    ...borderColor(design.Border_Color),
    borderRadius: 4,
  },
  valueStyle: {
    color: design.Text_Primary_Color,
    fontFamily: PRIMARY_BOLD,
    fontSize: 12,
  },
  chipSelected: {
    backgroundColor: "#2196F3",
    ...margin(5),
    ...padding(6),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Chips;
