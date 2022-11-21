import { marginVertical, paddingVertical } from "@utils/genericStyles";
import { PRIMARY } from "@fonts";
import React, { FC } from "react";
import { TouchableOpacity, Dimensions, Text, StyleSheet } from "react-native";

let { width } = Dimensions.get("window");
interface PROPS {
  onPress: () => void;
  title: string;
  style?: Object;
  titleStyle?: Object;
}

const Button: FC<PROPS> = ({
  onPress = () => {},
  title,
  style,
  titleStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={1}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(235, 141, 66)",
    width: width - 26,
    alignSelf: "center",
    ...marginVertical(15),
    ...paddingVertical(12),
  },
  title: {
    fontSize: 18,
    fontFamily: PRIMARY,
    color: "white",
  },
});
