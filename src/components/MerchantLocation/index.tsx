import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text/Text";
import I18n from "@localization";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { MerchantData, outletInterface } from "@Merchant/interfaces/responses";
import Cuisine from "../Cuisines";

interface propsInterface {
  selectedOutlet: outletInterface;
  merchant: MerchantData;
  handleChangeLocation: () => void;
}
const changeLocation = (props: propsInterface) => {
  const { selectedOutlet, handleChangeLocation, merchant } = props;
  // console.log({ merchant });

  const cuisines: {
    value: string;
    type?: string;
  }[] = useMemo(() => {
    let cuisine =
      merchant?.cuisines && merchant?.cuisines?.length > 0
        ? [...merchant?.cuisines]
        : [];
    if (cuisine?.length > 3) {
      cuisine = cuisine?.splice(0, 3);
    }

    let associativeCusine = [];
    for (let i = 0; i < cuisine?.length; i++) {
      associativeCusine.push({ value: cuisine[i] });
    }
    return associativeCusine;
  }, [merchant?.cuisines]);
  console.log({ merchant });

  return (
    <View style={styles.parent}>
      <View style={styles.locationView}>
        <Text style={styles.locationText}>{merchant?.name || ""}</Text>
        <Text style={styles.locationDetails}>{selectedOutlet?.name || ""}</Text>
        <Cuisine
          array={cuisines}
          index="value"
          textStyle={styles.cuisineText}
        />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleChangeLocation()}
      >
        <Text style={styles.otherLocationText}>{I18n.t("Other_Location")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 14,
  },
  locationText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 4,
  },
  locationView: {
    flex: 1,
  },
  locationDetails: {
    fontFamily: PRIMARY,
    fontSize: 13,
    lineHeight: 18,
  },
  otherLocationText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 12,
    lineHeight: 14,
    textDecorationLine: "underline",
    marginTop: 8,
  },
  cuisineText: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export default changeLocation;
