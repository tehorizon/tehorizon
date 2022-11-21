import React from "react";
import { StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import {
  borderColor,
  borderWidth,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY_BOLD } from "@fonts";
import { CustomText } from "@components";
import Image from "@fast_track/src/HybridComponents/Image";
import I18n, { getFlipForRTLStyle, isRTL } from "@localization";
import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";

type themeTypes = "primary" | "secondry";

const FilterHeader = ({
  theme = "primary",
  onDoneHanlder,
  onClearHandler,
}: {
  theme: themeTypes;
  onDoneHanlder: () => void;
  onClearHandler: () => void;
}) => {
  if (theme == "primary") {
    return (
      <View style={[styles.headerView, getFlipForRTLStyle()]}>
        <Pressable testID="filterBackButton" onPress={onDoneHanlder}>
          <Image
            source={require("@assets/images/arrow_back.png")}
            style={styles.arrow}
            resizeMode="contain"
          />
        </Pressable>
        <CustomText style={styles.title}>{I18n.t("Filters")}</CustomText>
      </View>
    );
  }
  return (
    <View style={[styles.doneBtnWrapper, getFlipForRTLStyle()]}>
      <TouchableOpacity onPress={onClearHandler} activeOpacity={1}>
        <View style={[styles.doneBtn, styles.marginLeft15]}>
          <CustomText style={styles.buttonText}>{I18n.t("CLEAR")}</CustomText>
        </View>
      </TouchableOpacity>

      <CustomText style={styles.buttonText}>{I18n.t("FILTERS")}</CustomText>

      <TouchableOpacity onPress={onDoneHanlder}>
        <View style={[styles.doneBtn, styles.marginRight15]}>
          <CustomText style={styles.buttonText}>{I18n.t("DONE")}</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    ...paddingHorizontal(16),
    ...paddingVertical(24),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: design["Background_Secondary_Color"],
  },
  arrow: {
    width: 16.88,
    height: 15.75,
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
  title: {
    fontSize: 20,
    fontFamily: PRIMARY_BOLD,
    color: design["Header_Title_Primary_Color"],
    marginLeft: 12,
  },
  doneBtnWrapper: {
    backgroundColor: design.Filter_Header_BG_COLOR,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  doneBtn: {
    height: 30,
    width: 68,
    ...borderColor(design.Header_Title_Secondary_Color),
    ...borderWidth(1),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: design.Header_Title_Secondary_Color },
  marginRight15: { marginRight: 15 },
  marginLeft15: { marginLeft: 15 },
});
