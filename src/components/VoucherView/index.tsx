import React, { memo, ReactElement } from "react";
import {
  ColorValue,
  View,
  StyleSheet,
  ViewStyle,
  ViewProps,
} from "react-native";
import { borderColor, borderWidth } from "@utils/genericStyles";
import { design } from "rn_fast_track_uilib";
import LinearGradient from "@HybridComponents/LinearGradient";

interface PROPS extends ViewProps {
  color?: ColorValue;
  children?: ReactElement | ReactElement[];
  gradient?: boolean;
  gradientColors?: string[];
}
const VoucherView = memo((props: PROPS) => {
  let {
    color = design.Primary_Color,
    children,
    style,
    gradient = false,
    gradientColors = ["#484848", "#737373", "#484848"],
  } = props;
  let border: ViewStyle = {
    ...borderColor(color),
  };

  return gradient ? (
    <LinearGradient
      colors={gradientColors}
      start={{ x: -0.5, y: 1 }}
      end={{ x: 1, y: 2 }}
      {...props}
      style={[styles.gradientView, style]}
    >
      <View style={[styles.innerGradientView, border]}>{children}</View>
      <View style={[styles.leftCircle, styles.noBorder]} />
      <View style={[styles.rightCircle, styles.noBorder]} />
    </LinearGradient>
  ) : (
    <View {...props} style={[styles.mainView, style]}>
      <View style={[styles.innerView, border]}>{children}</View>
      <View style={[styles.leftCircle, border]} />
      <View style={[styles.rightCircle, border]} />
    </View>
  );
});

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: design.Background_Primary_Color,
  },
  leftCircle: {
    position: "absolute",
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 20,
    ...borderWidth(1.5),
    backgroundColor: design.Background_Primary_Color,
  },
  rightCircle: {
    position: "absolute",
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 20,
    alignSelf: "center",
    ...borderWidth(1.5),
    backgroundColor: design.Background_Primary_Color,
  },
  innerView: {
    width: "100%",
    borderRadius: 10,
    ...borderWidth(1.5),
  },
  gradientView: {
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  noBorder: {
    ...borderWidth(0),
  },
  innerGradientView: {},
});
export default VoucherView;
