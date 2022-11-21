import { paddingVertical } from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";

const OptionHeader = ({ title = "", sub_title = "" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {sub_title ? <Text style={styles.sub_title}>{sub_title}</Text> : null}
    </View>
  );
};
export default OptionHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 8.7,
    marginLeft: 15,
  },
  title: {
    fontSize: 13,
    fontFamily: PRIMARY_BOLD,
    lineHeight: 13.9,
  },
  sub_title: {
    fontSize: 12,
    fontFamily: PRIMARY,
    color: design["Text_Lite_Color"],
    marginTop: 6,
  },
});
