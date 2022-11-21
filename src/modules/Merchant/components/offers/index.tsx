import React, { useState } from "react";
import { View, StyleSheet, I18nManager } from "react-native";

import { OfferToDisplay } from "../../port";

//local imports
import RenderOffer from "./renderOffer";

import { design } from "rn_fast_track_uilib";

import { CustomText } from "@components";
import I18n from "@localization";
import { PRIMARY_EXTRABOLD } from "@fonts";

interface propsInterface {
  onOfferSelected: (data: any) => void;
  offers: any;
}

interface onSelectOfferReturnType {
  selectedOffer: OfferToDisplay;
  product_id: number;
}

const offers = (props: propsInterface) => {
  const [show, setShow] = useState(false);
  const { offers, onOfferSelected } = props;

  return (
    <View>
      <CustomText isRTL={I18nManager.isRTL} style={styles.offersTitle}>
        {I18n.t("OFFERS_CONTAINED_IN_PRODUCT")}
      </CustomText>
      {offers.map((offer: any, index: number) => {
        return (
          <RenderOffer
            key={index}
            offer={offer}
            onSelectOffer={onOfferSelected}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 10,
    justifyContent: "center",
  },
  offersTitle: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 10,
    color: design["Text_Primary_Color"],
    paddingStart: 10,
  },
});

export default offers;
