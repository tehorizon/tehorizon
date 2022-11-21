import React, { PureComponent } from "react";
import APP_COLORS from "@colors";
import { Text as RNText } from "react-native";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";

export default class Text extends PureComponent {
  render() {
    let { children, placeholder, isRTL, style } = this.props;
    return (
      <RNText
        {...this.props}
        allowFontScaling={false}
        style={[
          styles.text,
          style,
          !children && { color: APP_COLORS.LIGHT_GREY },
          isRTL && styles.flipStyle,
        ]}
      >
        {children ? children : placeholder}
      </RNText>
    );
  }
}

const styles = {
  text: {
    color: design["Text_Primary_Color"] || APP_COLORS.TEXT,
    fontFamily: PRIMARY_BOLD,
    letterSpacing: 0,
    textAlign: "center",
    fontSize: 16,
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
};
