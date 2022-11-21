import React, { memo } from "react";
import { ColorValue, View, StyleSheet, ViewProps } from "react-native";
import { borderColor } from "@utils/genericStyles";
import { design } from "rn_fast_track_uilib";

interface PROPS extends ViewProps {
  color?: ColorValue;
  borderStyle?: "solid" | "dotted" | "dashed";
  horizontal?: boolean;
}
const Partition = memo((props: PROPS) => {
  let {
    color = design.Border_Color,
    borderStyle = "dashed",
    horizontal = false,
  } = props;

  return (
    <View
      {...props}
      style={[
        styles.mainView,
        props.style,
        {
          ...borderColor(color),
          borderStyle,
        },
        horizontal
          ? {
              width: "100%",
            }
          : {
              height: "100%",
            },
      ]}
    />
  );
});

const styles = StyleSheet.create({
  mainView: {
    borderWidth: 0.5,
    opacity: 0.8,
  },
});
export default Partition;
