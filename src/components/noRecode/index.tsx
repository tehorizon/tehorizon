import React, { Component } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import CustomText from "../Text/Text";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAppLoading } from "@redux/appReducer/app.selectors";
import i18n, { getFlipForRTLStyle } from "@localization";
import { marginVertical, paddingHorizontal } from "@utils/genericStyles";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import Image from "@HybridComponents/Image";

interface PROPS {
  isLoading?: boolean;
  topText?: string;
  bottomText?: string;
  icon?: ImageSourcePropType;
}
const NoRecord = ({ isLoading, topText, bottomText, icon }: PROPS) => {
  return !isLoading ? (
    <View style={styles.container}>
      <CustomText style={styles.noResultText}>{topText || ""}</CustomText>
      <Image
        source={icon || require("@assets/images/outlet-empty.png")}
        style={styles.img}
        resizeMode="contain"
      />
      <CustomText style={styles.noResultText}>
        {bottomText || i18n.t("It_bit_empty_here")}
      </CustomText>
      {/* <CustomText style={styles.filterMsg}>
        {i18n.t("Consider_broadening_your_filters")}
      </CustomText> */}
    </View>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectAppLoading,
});

export default connect(mapStateToProps, null)(NoRecord);

const styles = StyleSheet.create({
  container: {
    ...paddingHorizontal(20),
    // ...paddingVertical(20),
    // backgroundColor: "orange",
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    height: 97,
  },
  noResultText: {
    ...marginVertical(27),
    fontSize: 17,
    fontFamily: PRIMARY_EXTRABOLD,
    textAlign: "center",
    maxWidth: 225,
  },
  filteerMsg: {
    fontSize: 18,
    fontFamily: PRIMARY_BOLD,
    textAlign: "center",
    ...getFlipForRTLStyle(),
  },
});
