import React, { PureComponent } from "react";
import { Text as RNText, TextProps } from "react-native";
import APP_COLORS from "@colors";
import { design } from "rn_fast_track_uilib";
import { PRIMARY } from "@fonts";
import { borderColor } from "@utils/genericStyles";
import { isRTL } from "@localization";
interface PROPS extends TextProps {
  placeholder?: string;
}
const Text = (props: PROPS) => {
  const { children, placeholder, style } = props;
  return (
    <RNText
      {...props}
      style={[
        styles.text,
        // isRTL && { textAlign: "right" },
        style,
        !children && { color: design["Input_Placeholder_Color"] },
        // isRTL && styles.flipStyle,
      ]}
      allowFontScaling={false}
    >
      {children ? children : placeholder}
    </RNText>
  );
};

const styles = {
  text: {
    fontFamily: PRIMARY,
    letterSpacing: 0,
    color: design["Text_Primary_Color"]
      ? design["Text_Primary_Color"]
      : APP_COLORS.TEXT,
    ...borderColor(design["Input_Border_Color"] || APP_COLORS.TEXT),
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
};

export default Text;
