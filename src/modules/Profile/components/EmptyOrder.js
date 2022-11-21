import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { design } from "rn_fast_track_uilib";
import i18n from "@localization";

//Images
import BasketIcon from "../images/BasketIcon/basketIcon.png";

import { CustomText } from "@components";

const EmptyOrder = (props) => {
  //props
  const {} = props;

  //Style
  const { mainView, noOrderText } = Styles;

  return (
    <View style={mainView}>
      <Image resizeMode="contain" style={{ height: 110 }} source={BasketIcon} />
      <CustomText style={noOrderText}>{i18n.t("No_Order_Text")}</CustomText>
    </View>
  );
};

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: design["Background_Primary_Color"],
  },
  noOrderText: {
    fontSize: 18,
    color: design["Text_Secondary_Color"],
  },
});

export default EmptyOrder;
