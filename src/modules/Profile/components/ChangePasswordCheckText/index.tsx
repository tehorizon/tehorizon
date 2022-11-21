import React from "react";
import { StyleSheet, View } from "react-native";
import { getFlipForRTLStyle } from "@localization";
import Image from "@HybridComponents/Image";
import { CustomText } from "@components";
const checke = require("@assets/images/filter_tick_icon.png");
const checkedImage = require("@assets/images/tick_icon.png");

const CheckText = ({ style = {}, text = "", checked = false }) => {
  return (
    <View style={[styles.mainView, style]}>
      <Image
        source={checked ? checkedImage : checke}
        style={[styles.check, getFlipForRTLStyle()]}
        resizeMode={"contain"}
      />
      <CustomText style={styles.text}>{text}</CustomText>
    </View>
  );
};
export default CheckText;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  check: {
    width: 12.4,
    height: 13,
    marginRight: 6.58,
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
  },
});
