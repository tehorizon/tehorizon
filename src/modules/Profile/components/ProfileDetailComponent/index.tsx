import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CustomText } from "@components";
import { design } from "rn_fast_track_uilib";
import {
  borderColor,
  borderWidth,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import Image from "@HybridComponents/Image";
import { getFlipForRTLStyle, isRTL } from "@localization";

const DetailComponent = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainView]}
      activeOpacity={1}
      onPress={onPress}
    >
      <View>
        {!label ? null : (
          <CustomText style={[styles.label, !isRTL && styles.textAlignLeft]}>
            {label}
          </CustomText>
        )}
        <View style={styles.row}>
          <CustomText style={[styles.text, !isRTL && styles.textAlignLeft]}>
            {value}
          </CustomText>
          <Image
            style={styles.icon}
            source={require("@assets/images/arrow_down.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    marginTop: 12,
    backgroundColor: design["Input_Background_Color"],
    borderRadius: design["Global_Border_Radius"],
    height: 52,
    justifyContent: "center",
    ...paddingVertical(8),
    ...paddingHorizontal(16),
    ...borderWidth(1),
    ...borderColor(design.Input_Border_Color),
  },
  text: {
    flex: 1,
    fontSize: 15,
    fontFamily: PRIMARY,
    lineHeight: 20,
    ...paddingVertical(0),
    fontWeight: "300",
    color: design["Text_Primary_Color"],
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
  icon: {
    width: 10,
    height: 6,
  },
  label: {
    fontSize: 11,
    fontFamily: PRIMARY_BOLD,
    color: design.Input_Label_Color,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textAlignLeft: {
    textAlign: "left",
  },
});

export default DetailComponent;
