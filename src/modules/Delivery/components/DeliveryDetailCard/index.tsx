import React from "react";
import { View, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";

import { CustomText } from "@components";
import { PRIMARY } from "@fonts";
import { paddingHorizontal, paddingVertical } from "@utils/genericStyles";

const DeliveryDetailCard = (props) => {
  //props
  const { style, customerDetails } = props;

  //style
  const { mainView, titleText, descriptionText } = Styles;

  const {
    title = "",
    customer_name = "",
    customer_address = "",
    phone_number = "",
  } = customerDetails;

  return (
    <View style={[mainView, style]}>
      <CustomText style={titleText}>{title}</CustomText>

      <CustomText style={descriptionText}>{customer_name}</CustomText>
      <CustomText style={descriptionText}>{customer_address}</CustomText>
      <CustomText style={descriptionText}>{phone_number}</CustomText>
    </View>
  );
};

const Styles = StyleSheet.create({
  mainView: {
    backgroundColor: design["Background_Secondary_Color"],
    ...paddingHorizontal(11),
    ...paddingVertical(18),
  },
  titleText: {
    fontSize: 15,
    marginBottom: 9,
  },
  descriptionText: {
    fontSize: 13,
    fontFamily: PRIMARY,
    color: design["Text_Secondary_Color"],
    lineHeight: 18,
  },
});

export default DeliveryDetailCard;
