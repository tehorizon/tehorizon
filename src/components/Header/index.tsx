import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, ViewStyle } from "react-native";
import { design, logoImage } from "rn_fast_track_uilib";
import i18n from "@localization";
import { useNavigation } from "@react-navigation/core";
import CustomText from "../Text/Text";
import Image from "@HybridComponents/Image";
import {
  marginHorizontal,
  paddingVertical,
} from "@fast_track/src/utils/genericStyles";
import { AntDesign } from "@expo/vector-icons";

interface PROPS {
  skipModeCallback?: () => void | undefined;
  hideBack?: boolean;
  showSkip?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}
const Header = ({
  skipModeCallback,
  style = {},
  hideBack = false,
  onPress,
}: PROPS) => {
  let navigation = useNavigation();
  return (
    <View style={[styles.mainView, style]}>
      <View style={styles.leftView}>
        {skipModeCallback && (
          <TouchableOpacity
            testID="skipMode"
            activeOpacity={1}
            onPress={skipModeCallback}
          >
            <CustomText style={styles.skipText}>{i18n.t("Skip")}</CustomText>
          </TouchableOpacity>
        )}
        {!hideBack && navigation?.canGoBack() && (
          <TouchableOpacity
            testID="goBack"
            onPress={onPress || navigation.goBack}
          >
            <Image
              source={require("@assets/icons/cross_black.png")}
              style={styles.crossArrow}
            />
          </TouchableOpacity>
        )}
      </View>
      <Image
        style={styles.headerImage}
        source={logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    backgroundColor: design.Background_Primary_Color,
    justifyContent: "space-between",
    ...marginHorizontal(15),
  },
  row: {
    flexDirection: "row",
  },
  headerImage: {
    width: 184.5,
    height: 49,
  },
  skipText: {
    color: design.Link_Color,
    textDecorationLine: "underline",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 5,
  },
  crossArrow: {
    width: 16,
    height: 16,
    tintColor: design["Text_Primary_Color"],
    marginBottom: 9,
  },
  backArrow: {
    width: 10,
    height: 20,
    resizeMode: "contain",
  },
  leftView: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Header;
