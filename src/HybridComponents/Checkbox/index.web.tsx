import {
  borderWidth,
  margin,
  padding,
  paddingVertical,
} from "@utils/genericStyles";
import React from "react";
import { StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

const CheckBoxwWeb = (props: { isChecked: boolean; fillColor: string }) => {
  let { isChecked, fillColor } = props;
  return (
    <CheckBox
      checkedColor={fillColor}
      checked={isChecked}
      containerStyle={styles.checkbox}
      {...props}
    />
  );
};
export default CheckBoxwWeb;

const styles = StyleSheet.create({
  checkbox: {
    paddingLeft: 0,
    paddingRight: 5,
    ...margin(0),
    ...paddingVertical(-15),
  },
});
