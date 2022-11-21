import { borderColor, borderWidth } from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { design } from "rn_fast_track_uilib";

const CompanyInfo = ({
  image,
  companyName,
  subscriptionTitle,
  renewalDate,
  style = {},
}: any) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{companyName}</Text>
        <Text style={styles.lightText}>{subscriptionTitle}</Text>
        <Text style={styles.lightText}>{renewalDate}</Text>
      </View>
    </View>
  );
};

export default CompanyInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingStart: 16,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    ...borderColor(design["Border_Color"]),
    ...borderWidth(0.5),
  },
  image: {
    height: 66,
    width: 66,
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
    marginStart: 8,
    paddingTop: 6,
  },
  boldText: {
    fontSize: 15,
    lineHeight: 18,
    fontFamily: PRIMARY_BOLD,
  },
  lightText: {
    fontSize: 13,
    color: design["Text_Lite_Color"],
    lineHeight: 18,
    fontFamily: PRIMARY,
  },
});
