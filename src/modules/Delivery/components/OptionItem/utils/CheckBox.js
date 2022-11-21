import { borderWidth } from "@utils/genericStyles";
import React from "react";
import { View } from "react-native";

const CheckBox = ({ size, isFill, color, isCircle }) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        backgroundColor: isFill ? color : "white",
        borderRadius: isCircle ? 9 : 0,
        ...borderWidth(1),
        borderColor: color,
      }}
    />
  );
};

export default CheckBox;
