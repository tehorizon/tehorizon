import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

import { design } from "rn_fast_track_uilib";

import { CustomText, Partition } from "@components";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import {
  marginHorizontal,
  marginVertical,
  padding,
  paddingVertical,
} from "@utils/genericStyles";
import VoucherView from "@components/VoucherView";
import { getColor } from "@utils/functions";
import I18n, { getFlipForRTLStyle } from "@localization";
import Cuisine from "@fast_track/src/components/Cuisines";
import { Offer, OffersToDisplay } from "../../interfaces/responses";
import { Redeemability } from "@commons/constants/constants";

interface RenderOfferProps {
  offer: Offer;
  onSelectOffer: (offer: OffersToDisplay) => void;
}

const RenderOffer = (props: RenderOfferProps) => {
  const { product_id, section_name, offers_to_display } = props.offer;
  const { onSelectOffer } = props;

  return (
    <View style={styles.mainView}>
      <CustomText style={styles.headText}>{section_name}</CustomText>
      {offers_to_display.map((offer, index: number) => (
        <VoucherView
          style={styles.voucherView}
          color={
            offer?.redeemability == Redeemability.REUSABLE
              ? styles.reusabelImage.tintColor
              : getColor(offer?.category_color)
          }
          gradient={
            offer?.redeemability == Redeemability.NON_REDEEMABLE ||
            offer?.redeemability == Redeemability.REDEEMED
          }
          gradientColors={
            offer?.redeemability == Redeemability.NON_REDEEMABLE
              ? ["#F1F1F1", "#E3E3E3"]
              : undefined
          }
        >
          <>
            <Pressable
              testID={"select_merchant_offer_item"}
              key={index}
              disabled={
                offer.redeemability == Redeemability.NON_REDEEMABLE ||
                offer.redeemability == Redeemability.REDEEMED
              }
              onPress={() =>
                onSelectOffer({ ...offer, product_id: product_id })
              }
              style={[
                styles.offerView,
                offer.redeemability == Redeemability.REDEEMED &&
                  styles.disableView,
              ]}
            >
              <Image
                style={[
                  styles.offerImage,
                  getFlipForRTLStyle(),
                  { tintColor: getColor(offer?.category_color) },
                  offer.redeemability == Redeemability.REDEEMED &&
                    styles.redeemedImage,
                  offer.redeemability == Redeemability.NON_REDEEMABLE &&
                    styles.nonredeemedImage,
                  offer?.redeemability == Redeemability.REUSABLE &&
                    styles.reusabelImage,
                ]}
                source={{
                  uri: offer.voucher_type_image,
                }}
              />
              <Partition
                color={
                  offer.redeemability == Redeemability.REDEEMED
                    ? styles.redeemedText.color
                    : offer.redeemability == Redeemability.NON_REDEEMABLE
                    ? styles.nonredeemedText.color
                    : getColor(offer?.category_color)
                }
              />
              <View style={styles.offerDetailsView}>
                <CustomText
                  style={[
                    styles.offerTitle,
                    offer.redeemability == Redeemability.REDEEMED &&
                      styles.redeemedText,
                    offer.redeemability == Redeemability.NON_REDEEMABLE &&
                      styles.nonredeemedText,
                  ]}
                >
                  {offer.name}
                </CustomText>
                <Cuisine
                  array={offer?.additional_details}
                  index="title"
                  color={
                    offer.redeemability == Redeemability.REDEEMED
                      ? styles.redeemedText.color
                      : offer.redeemability == Redeemability.NON_REDEEMABLE
                      ? styles.nonredeemedText.color
                      : undefined
                  }
                />
                <CustomText
                  style={[
                    styles.validText,
                    offer.redeemability == Redeemability.NON_REDEEMABLE &&
                      styles.nonredeemedText,
                  ]}
                >
                  {offer.redeemability == Redeemability.REDEEMED
                    ? ""
                    : `${I18n.t("Valid")} ${new Date(
                        offer?.validity_date
                      ).toLocaleDateString("en-GB", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`}
                </CustomText>
              </View>
            </Pressable>
            {offer.redeemability == Redeemability.REDEEMED && (
              <View style={styles.usedView}>
                <CustomText style={styles.alreadyUsedText}>
                  {I18n.t("Used already")}
                </CustomText>
              </View>
            )}
            {offer.redeemability == Redeemability.REUSABLE && (
              <View style={styles.reusedView}>
                <CustomText style={styles.reUsedText}>
                  {I18n.t("Reusable")}
                </CustomText>
              </View>
            )}
          </>
        </VoucherView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    marginBottom: 5,
    color: design["Text_Primary_Color"],
  },
  voucherView: {
    ...marginVertical(10),
  },
  offerView: {
    flexDirection: "row",
    alignItems: "center",
    ...marginHorizontal(10.5),
  },
  disableView: {
    opacity: 0.4,
  },
  offerImage: {
    height: 46,
    width: 46,
    marginLeft: 10.5,
    marginRight: 13,
    ...paddingVertical(12),
  },
  offerDetailsView: { ...padding(12), flex: 1 },
  offerTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: PRIMARY_BOLD,
  },
  validText: {
    color: design.Text_Primary_Color,
    fontSize: 11,
    lineHeight: 13,
    fontFamily: PRIMARY_BOLD,
  },
  redeemedImage: { tintColor: "white" },
  reusabelImage: { tintColor: "#F58423" },
  nonredeemedImage: { tintColor: "#A3A2A2" },
  redeemedText: { color: "white" },
  nonredeemedText: { color: "#A3A2A2" },
  usedView: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "black",
    borderRadius: 10,
  },
  alreadyUsedText: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 10,
    lineHeight: 12,
    color: "white",
    ...marginVertical(4),
    ...marginHorizontal(8),
  },
  reusedView: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FCF1DD",
    borderRadius: 10,
  },
  reUsedText: {
    color: "#F58423",
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 10,
    lineHeight: 12,
    ...marginVertical(4),
    ...marginHorizontal(8),
  },
});

export default RenderOffer;
