import React, { memo } from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  ColorValue,
  TextStyle,
} from "react-native";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";
import CustomText from "../Text/Text";
import Image from "@HybridComponents/Image";
import { isRTL } from "@localization";
import { attribute } from "@Merchant/interfaces/responses";
interface PROPS extends ViewProps {
  array: attribute[];
  index: string;
  color?: ColorValue;
  textStyle?: TextStyle;
}
const Cuisine = memo((props: PROPS) => {
  let { array = [], index = "", color = "", textStyle } = props;

  return (
    <View {...props} style={styles.mainView}>
      {array?.map((item: any, i: number) => {
        return (
          <View key={i} style={[styles.subView]}>
            {item.type == "image" ? (
              <Image source={{ uri: item[index] || "" }} style={styles.image} />
            ) : (
              <CustomText
                style={[styles.text, color != "" && { color }, textStyle]}
              >
                {`${i > 0 && !isRTL ? " \u2022 " : isRTL ? " " : ""}${
                  item[index]
                }${i > 0 && isRTL ? " \u2022 " : ""}`}
              </CustomText>
            )}
          </View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexWrap: "wrap",
    marginVertical: 8,
    flexDirection: "row",
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: design.Text_Primary_Color,
    fontSize: 11,
    lineHeight: 13,
    fontFamily: PRIMARY_BOLD,
    textTransform: "capitalize",
  },
  image: {
    width: 19.6,
    height: 19.6,
    marginRight: 5.4,
  },
});
export default Cuisine;
