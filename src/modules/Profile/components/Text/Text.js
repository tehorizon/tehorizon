import { PRIMARY_BOLD } from "@fonts";
import React, { PureComponent } from "react";
import { Text as RNText } from "react-native";
import { design } from "rn_fast_track_uilib";

function Text(props) {
  let { children, placeholder, isRTL, style } = props;
  return (
    <RNText
      {...props}
      allowFontScaling={false}
      style={[
        styles.text,
        style,
        !children && { color: design.Text_Lite_Color },
        isRTL && styles.flipStyle,
      ]}
    >
      {children ? children : placeholder}
    </RNText>
  );
}

export default React.memo(Text);

const styles = {
  text: {
    color: "#2a2a2a",
    fontFamily: PRIMARY_BOLD,
    letterSpacing: 0,
    textAlign: "center",
    fontSize: 16,
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
};
