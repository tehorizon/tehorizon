import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import search_icon from "@assets/images/search_icon.png";
import filters_image from "@assets/images/filters-image.png";
import { Badge } from "react-native-elements";
import { design } from "rn_fast_track_uilib";
import {
  borderColor,
  borderWidth,
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
} from "@utils/genericStyles";
import { CustomText } from "@components";
import I18n, { getFlipForRTLStyle } from "@localization";

const SearchBar = ({ onClickFilter, onSearchPress, badge, testID }: any) => {
  return (
    <View style={[styles.filterInputWrapper]}>
      <TouchableOpacity
        testID={testID}
        style={styles.search}
        onPress={onSearchPress}
      >
        <Image source={search_icon} style={styles.searchIcon} />
        <CustomText>{I18n.t("Search by name, places & more…")}</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClickFilter}>
        <View style={[styles.filterWrapper, getFlipForRTLStyle()]}>
          <Image source={filters_image} style={styles.filter} />
          {badge !== 0 && (
            <View style={styles.badge}>
              <Badge value={badge} status="error" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  filterInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...paddingHorizontal(16),
    ...marginVertical(24),
  },
  search: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    ...borderWidth(1),
    ...borderColor(design.Border_Color),
    borderRadius: 4,
  },
  filterWrapper: {
    height: 40,
    minWidth: 40,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 13,
    height: 13,
    tintColor: design.Search_Icon_Background,
    alignSelf: "center",
    ...marginHorizontal(11.2),
  },
  filter: {
    width: 26,
    height: 24,
  },
  badge: { bottom: 4, left: 4, position: "absolute" },
});
