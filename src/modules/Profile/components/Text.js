import { PRIMARY_BOLD } from "@fonts";
import React from "react";
import { Text as RNText } from "react-native";
import { design } from "rn_fast_track_uilib";

export default function Text(props) {
  let { children, placeholder, isRTL } = props;
  return (
    <RNText
      {...props}
      allowFontScaling={false}
      style={[
        styles.text,
        isRTL && { textAlign: "right" },
        props.style,
        !children && { color: design.Text_Lite_Color },
        isRTL && styles.flipStyle,
      ]}
    >
      {children ? children : placeholder}
    </RNText>
  );
}

const styles = {
  text: {
    color: APP_COLORS.TEXT,
    fontFamily: PRIMARY_BOLD,
    letterSpacing: 0,
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
};
