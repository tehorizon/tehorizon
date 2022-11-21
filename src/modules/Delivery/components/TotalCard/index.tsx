import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { design } from "rn_fast_track_uilib";

import { CustomText } from "@components";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import { marginHorizontal, paddingVertical } from "@utils/genericStyles";

const TotalCard = (props) => {
  //props
  const { style, orderDetail } = props;

  //style
  const { mainView, row, titleText, totalSubTitleText } = Styles;

  const {
    order_value_title = "",
    order_sub_total_value = "",
    order_percentage_value = "",
    order_percentage_sub_title_img = "",
    order_percentage_sub_title = "",
    order_percentage_sub_title_color = design["Text_Primary_Color"],
    order_sub_total_value_after_discount = "",
    order_percentage_title = "",
    order_percentage_value_color = design["Text_Primary_Color"],
    order_delivery_title = "",
    order_delivery_fee = "",
    order_total = "",
    order_total_sub_title = "",
  } = orderDetail;

  return (
    <View style={[mainView, style]}>
      <View style={row}>
        <CustomText style={titleText}>{order_value_title}</CustomText>

        <CustomText>{order_sub_total_value}</CustomText>
      </View>

      <View style={row}>
        <CustomText
          style={{ ...titleText, color: "#" + order_percentage_value_color }}
        >
          {order_percentage_title}
        </CustomText>

        <View>
          <CustomText
            style={{
              ...titleText,
              color: "#" + order_percentage_value_color,
              fontFamily: PRIMARY,
            }}
          >
            {order_percentage_value}
          </CustomText>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: order_percentage_sub_title_img }}
              style={{ width: 18, height: 18, ...marginHorizontal(3) }}
            />
            <CustomText
              style={{
                ...titleText,
                color: "#" + order_percentage_sub_title_color,
              }}
            >
              {order_percentage_sub_title}
            </CustomText>
          </View>
        </View>
      </View>

      <View style={row}>
        <View />

        <CustomText style={{ ...titleText, fontFamily: PRIMARY_EXTRABOLD }}>
          <CustomText
            style={{
              ...titleText,
              color: design["Text_Secondary_Color"],
              fontSize: 12,
            }}
          >
            {"Subtotal  "}
          </CustomText>
          {order_sub_total_value_after_discount}
        </CustomText>
      </View>

      <View style={row}>
        <CustomText style={titleText}>{order_delivery_title}</CustomText>

        <CustomText style={{ ...titleText, fontFamily: PRIMARY_EXTRABOLD }}>
          {order_delivery_fee}
        </CustomText>
      </View>

      <View style={row}>
        <View />

        <View>
          <CustomText
            style={{
              ...titleText,
              fontFamily: PRIMARY_EXTRABOLD,
              fontSize: 19,
            }}
          >
            <CustomText
              style={{
                ...titleText,
                color: design["Text_Secondary_Color"],
                fontSize: 12,
              }}
            >
              {"Total  "}
            </CustomText>
            {order_total}
          </CustomText>
          <CustomText style={{ ...totalSubTitleText }}>
            {order_total_sub_title}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  mainView: {
    backgroundColor: design["Background_Secondary_Color"],
    ...paddingVertical(10),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...paddingVertical(10),
    paddingLeft: 7.5,
    paddingRight: 12.5,
    borderBottomWidth: 1,
    borderBottomColor: design["Background_Primary_Color"],
  },
  titleText: {
    fontSize: 13,
    fontFamily: PRIMARY_BOLD,
    color: design["Text_Primary_Color"],
  },
  totalSubTitleText: {
    fontFamily: PRIMARY,
    color: design["Text_Secondary_Color"],
    fontSize: 10,
    textAlign: "right",
  },
});

export default TotalCard;
