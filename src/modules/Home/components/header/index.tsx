import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { design } from "rn_fast_track_uilib";
import { CustomText } from "@components";
import i18n, { getFlipForRTLStyle } from "@localization";
import { paddingHorizontal, paddingVertical } from "@utils/genericStyles";
import { homeHeader } from "@Home/interfaces";
import { PRIMARY, PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
const { width } = Dimensions.get("window");

const Header = ({
  isShowScreenIntro,
  selectedLocation,
  userInfo,
  skipMode,
  onOpenLocation,
  onSearchPress,
  onNotificationPress,
}: homeHeader) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <View style={styles.leftComponent}>
          <View style={styles.nameView}>
            <CustomText numberOfLines={1} style={styles.locationText}>
              {`${i18n.t("Hi")} ${
                skipMode ? i18n.t("Guest") : userInfo?.firstname
              } `}
            </CustomText>
          </View>
          {!skipMode && (
            <View style={styles.amountContainer}>
              <CustomText
                style={styles.savedText}
                testID="selectedLocationText"
              >
                {i18n.t("You've_saved")}
              </CustomText>
              <CustomText
                style={styles.amountText}
                testID="selectedLocationText"
              >
                {`${userInfo?.savings || "0"} ${userInfo?.currency || "AED"}`}
              </CustomText>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={onOpenLocation}
          style={styles.locationContainer}
          testID="selectedLocationButton"
        >
          <CustomText style={styles.locationText} testID="selectedLocationText">
            {selectedLocation?.name ?? i18n.t("select_a_location")}
          </CustomText>
          <Image
            source={require("@assets/images/arrow_down.png")}
            style={styles.arrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightComponent}>
        <TouchableOpacity style={styles.iconContainer} onPress={onSearchPress}>
          <Image
            source={require("@assets/images/search_btn.png")}
            style={[styles.search, getFlipForRTLStyle()]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={onNotificationPress}
        >
          <Image
            source={require("@assets/images/notification-icon.png")}
            style={[styles.notification, getFlipForRTLStyle()]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    ...paddingHorizontal(10),
    paddingTop: 5,
    backgroundColor: design.Header_Background_Primary_Color || "white",
    paddingBottom: 17,
  },
  leftView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftComponent: {
    flexDirection: "row",
  },
  nameView: {
    borderRightWidth: 0.25,
    borderColor: design.Border_Color,
    justifyContent: "center",
    ...paddingVertical(6),
  },
  centerComponent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightComponent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    paddingLeft: 8,
    borderRightWidth: 0.25,
    borderColor: design.Border_Color,
  },
  locationText: {
    marginRight: 5,
    fontSize: 13,
    fontFamily: PRIMARY,
  },
  arrow: {
    height: 4,
    width: 8,
  },
  search: {
    height: 18,
    width: 18,
  },
  notification: {
    height: 20,
    width: 15,
  },
  amountContainer: {
    paddingLeft: 8,
  },
  savedText: {
    fontSize: 10,
  },
  amountText: {
    fontSize: 17,
    fontFamily: PRIMARY_BOLD,
    color: design.Secondary_Color,
  },
});
