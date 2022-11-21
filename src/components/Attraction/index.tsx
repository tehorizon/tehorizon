import React, { Ref, useImperativeHandle } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import colors from "@colors";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import { getDistance } from "@utils/functions";
import { CustomText as Text } from "@components";
import Image from "@HybridComponents/Image";
import {
  borderColor,
  borderWidth,
  marginHorizontal,
  marginVertical,
} from "@utils/genericStyles";
import { design } from "rn_fast_track_uilib";

export interface AttractionRef {}

interface PROPS {
  item: any;
  containerStyle?: Object | Array<Object>;
  onPress: () => void;
  currency: string;
}

const Attraction = React.forwardRef(
  (
    { item, containerStyle, onPress, currency = "AED" }: PROPS,
    ref: Ref<AttractionRef>
  ) => {
    let {
      price_off_text,
      image_url,
      image,
      instant_confirmation_icon,
      name = "",
      price,
      rr_price,
      distance_in_meter,
      title,
      is_special_offer = false,
      special_offer_label_bg_color,
      special_offer_label_text,
      display_name,
    } = item;

    useImperativeHandle(ref, () => ({}));

    return (
      <Pressable
        style={[styles.popularMainContainer, containerStyle]}
        onPress={onPress}
      >
        {/* changing http to https as iOS dont allow insecure calls */}
        <View style={styles.popularActivities}>
          <Image
            source={{
              uri: (image_url || image || "").replace("http://", "https://"),
            }}
            style={styles.popularActivitiesImage}
          />
          <Text style={styles.distanceText}>{`${getDistance(
            distance_in_meter
          )}`}</Text>
          {is_special_offer && (
            <View style={styles.specialOfferView}>
              <View
                style={[
                  styles.specialOffer,
                  { backgroundColor: `#${special_offer_label_bg_color}` },
                ]}
              >
                <Text style={styles.specialOfferText}>
                  {special_offer_label_text}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.subView}>
          <Text style={styles.detailText} adjustsFontSizeToFit>
            {name || title || display_name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.crossText}>{`${currency} ${
              rr_price || 0
            }`}</Text>
            <Text style={styles.actualPrice}>{`${currency} ${
              price || 0
            }`}</Text>
            <Text style={styles.upto}>{price_off_text || ""}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  popularMainContainer: {
    borderRadius: 8,
    marginBottom: 16,
    ...borderWidth(1),
    ...borderColor(design.Border_Color),
    overflow: "hidden",
  },
  popularActivities: {
    backgroundColor: design.DISABLED_COLOR,
    resizeMode: "cover",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  popularActivitiesImage: {
    backgroundColor: design.DISABLED_COLOR,
    resizeMode: "cover",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  distanceText: {
    position: "absolute",
    bottom: 8,
    right: 16,
    color: design.Text_Tertiary_Color,
    fontSize: 12,
  },
  crossText: {
    fontSize: 14,
    color: design.Text_Secondary_Color,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textAlign: "right",
  },
  actualPrice: {
    fontSize: 24,
    textAlign: "right",
    fontFamily: PRIMARY_EXTRABOLD,
  },
  upto: {
    fontSize: 14,
    color: design.Link_Color,
    textAlign: "right",
  },
  priceContainer: {
    alignItems: "flex-start",
    ...marginVertical(16),
  },
  detailText: {
    fontSize: 17,
    lineHeight: 20,
    flexWrap: "wrap",
    fontFamily: PRIMARY_BOLD,
  },
  pricingView: {
    flexDirection: "row",
    alignItems: "center",
  },
  instantSign: {
    width: 14,
    height: 21,
    marginRight: 10,
    resizeMode: "contain",
  },
  specialOfferView: {
    flexWrap: "wrap",
    position: "absolute",
    top: 16,
    left: 16,
  },
  specialOffer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  specialOfferText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 12,
    color: colors.WHITE,
  },
  subView: {
    flex: 1,
    justifyContent: "space-between",
    ...marginHorizontal(16),
    ...marginVertical(10),
  },
});

export default Attraction;
