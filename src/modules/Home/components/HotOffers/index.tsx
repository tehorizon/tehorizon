import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { BorderButton, CustomText } from "@components";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import {
  marginVertical,
  paddingHorizontal,
} from "@fast_track/src/utils/genericStyles";
import Image from "@HybridComponents/Image";
import i18n from "@localization";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SCREEN_WIDTH } from "@fast_track/src/commons/constants/constants";
let OFFERS_WIDTH = (SCREEN_WIDTH - 56) / 4;
const HotOffers = React.memo((props: any) => {
  const [isAll, toggleAll] = useState(false);

  const {
    featured_sections,
    onOfferClickHandler,
    title,
    testID = "hot_offers",
  } = props;

  const _renderItem = (item) => {
    return (
      <TouchableOpacity
        testID={testID}
        onPress={() => onOfferClickHandler(item)}
        activeOpacity={1}
        style={styles.offers}
        key={item.id}
      >
        <Image
          resizeMode="cover"
          source={{
            uri: item.image,
          }}
          style={styles.offerImage}
        />
        {item?.title != 0 && (
          <CustomText
            style={[
              styles.offerTitle,
              {
                color: `${
                  item.tile_bottom_banner_color
                    ? item.tile_bottom_banner_color
                    : "#000000"
                }`,
              },
            ]}
          >
            {item.title}
          </CustomText>
        )}
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

      <View style={styles.offersView}>
        {featured_sections?.tiles
          ?.slice(0, isAll ? featured_sections?.tiles?.length : 4)
          ?.map(_renderItem)}
      </View>
      {featured_sections?.tiles?.length > 4 && (
        <BorderButton
          onPress={() => toggleAll(!isAll)}
          title={i18n.t("Show all")}
          theme="white"
          upArrow={isAll}
          downArrow={!isAll}
          style={styles.showAll}
        />
      )}
    </View>
  );
});
export default HotOffers;

const styles = StyleSheet.create({
  carousel: {
    overflow: "hidden",
    ...paddingHorizontal(16),
  },
  offersText: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
    ...marginVertical(16),
  },
  offers: {
    width: OFFERS_WIDTH,
  },
  offersView: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  showAll: {
    borderRadius: 4,
  },
  offerTitle: {
    fontSize: 12,
    lineHeight: 14,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: PRIMARY_BOLD,
  },
  offerImage: {
    height: OFFERS_WIDTH,
    width: OFFERS_WIDTH,
    borderRadius: 4,
    marginBottom: 8.2,
  },
});
