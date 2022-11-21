import { borderColor, borderWidth } from "@utils/genericStyles";
import React from "react";
import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import BouncyCheckbox from "@HybridComponents/Checkbox";

const CheckBox = ({
  testID,
  size = 24,
  checked,
  onPress,
  style,
  fillColor,
  unfillColor,
  disableBuiltInState,
}: any) => {
  return (
    <BouncyCheckbox
      testID={testID}
      size={size}
      isChecked={checked}
      fillColor={fillColor || design.Checkbox_Check_Color}
      unfillColor={unfillColor || design.Checkbox_Uncheck_Color}
      iconStyle={styles.iconStyle}
      innerIconStyle={[
        styles.innerIconStyle,
        checked && styles.checkedCheckbox,
      ]}
      style={[styles.checkBox, style]}
      onPress={onPress}
      disableBuiltInState={disableBuiltInState}
    />
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  innerIconStyle: {
    ...borderWidth(1),
    borderRadius: design.Global_Border_Radius,
    ...borderColor(design.Border_Color),
  },
  checkedCheckbox: {
    ...borderColor(design.Checkbox_Check_Color),
  },
  iconStyle: {
    borderRadius: design.Global_Border_Radius,
  },
  checkBox: {
    marginRight: -4,
  },
});
