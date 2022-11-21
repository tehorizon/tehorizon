import { borderColor, borderWidth } from "@utils/genericStyles";
import { PRIMARY_BOLD } from "@fonts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { design } from "rn_fast_track_uilib";

const SubscriptionButton = ({
  text,
  onPress,
  style = {},
  textStyle = {},
}: any) => {
  return (
    <View style={[styles.container, style]}>
      <Text onPress={onPress} style={[styles.text, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

export default SubscriptionButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    ...borderWidth(0.5),
    ...borderColor(design["Border_Color"]),
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: PRIMARY_BOLD,
  },
});
