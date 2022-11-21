import { PRIMARY_BOLD } from "@fonts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { design } from "rn_fast_track_uilib";

const PriceWithExpiry = ({
  price,
  expiry,
  style = {},
  textStyles = {},
}: any) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyles]}>{price}</Text>
      <Text style={[styles.text, textStyles]}>{expiry}</Text>
    </View>
  );
};

export default PriceWithExpiry;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: { flex: 0 },
  text: {
    fontSize: 15,
    lineHeight: 20,
    color: design["Text_Lite_Color"],
    fontFamily: PRIMARY_BOLD,
  },
});
