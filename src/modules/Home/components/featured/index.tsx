import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CustomText } from "@components";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import {
  marginVertical,
  paddingHorizontal,
} from "@fast_track/src/utils/genericStyles";
import Image from "@HybridComponents/Image";
import i18n from "@localization";
const { width } = Dimensions.get("window");

const Featured = React.memo((props: any) => {
  const {
    featured_sections,
    onOfferClickHandler,
    title,
    showAll,
    testID = "featured",
  } = props;

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        testID={testID}
        onPress={() => onOfferClickHandler(item)}
        activeOpacity={1}
      >
        <View>
          <Image
            resizeMode="cover"
            source={{
              uri: item.image,
            }}
            style={styles.tile}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
          >
            {item.title !== "" && (
              <CustomText
                style={{
                  fontSize: 14,
                  color: `${
                    item.tile_bottom_banner_color
                      ? item.tile_bottom_banner_color
                      : "#000000"
                  }`,
                }}
              >
                {item.title}
              </CustomText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.carousel,
        {
          backgroundColor: featured_sections?.section_bg_color
            ? `#${featured_sections?.section_bg_color}`
            : design["Background_Primary_Color"],
        },
      ]}
    >
      <View style={styles.headerView}>
        <CustomText
          style={[
            styles.offersText,
            {
              color: featured_sections?.section_title_color
                ? `#${featured_sections?.section_title_color}`
                : design["Text_Primary_Color"],
            },
          ]}
        >
          {title}
        </CustomText>
        {showAll && (
          <CustomText style={styles.showAllText} onPress={showAll}>
            {i18n.t("Show all")}
          </CustomText>
        )}
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 55}
        decelerationRate="fast"
        bounces={false}
        data={featured_sections.tiles}
        renderItem={_renderItem}
      />
    </View>
  );
});
export default Featured;

const styles = StyleSheet.create({
  carousel: {
    height: 245,
    overflow: "hidden",
    ...paddingHorizontal(16),
  },
  offersText: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...marginVertical(16),
  },
  showAllText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: PRIMARY_BOLD,
    textAlign: "center",
    color: design["Link_Color"],
    textDecorationLine: "underline",
  },
  tile: {
    height: 143,
    width: width - 55,
    marginRight: 5,
  },
});
