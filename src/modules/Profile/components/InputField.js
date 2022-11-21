import React, { useRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import i18n, { isRTL } from "@localization";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";

export default function TextInput(props) {
  const _field = useRef();

  const focus = () => {
    _field.focus?.();
  };

  const blur = () => {
    _field.blur?.();
  };

  let { placeholder, placeholderTextColor = design.Input_Placeholder_Color } =
    props;
  placeholder = placeholder && i18n.t(placeholder);
  return (
    <RNTextInput
      {...props}
      ref={_field}
      autoCorrect={false}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize={props.autoCapitalize || "none"}
      returnKeyType={props.returnKeyType || "next"}
      style={[styles.textInput, isRTL && { textAlign: "right" }, props.style]}
    />
  );
}

const styles = {
  textInput: {
    width: "100%",
    height: 30,
    fontWeight: "300",
    color: "black",
    fontFamily: PRIMARY_BOLD,
  },
};
