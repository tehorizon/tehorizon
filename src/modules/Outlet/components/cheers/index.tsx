import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import i18n, { isRTL, getFlipForRTLStyle } from "@localization";

import { CustomText, BlueButton, CustomCheckbo2 } from "@components";
import { CheerRule } from "../../interfaces/responses";
import { PRIMARY } from "@fonts";

interface PROPS {
  cheersChecked: boolean;
  cheersRules: CheerRule;
  getCheersData: () => void;
  cheersSubmit: (data: {
    cheersCheck: boolean;
    cheersChecked: boolean;
  }) => void;
}
const cheers = ({
  cheersChecked,
  cheersRules,
  getCheersData,
  cheersSubmit,
}: PROPS) => {
  const [cheersCheck, updateCheersCheck] = useState(cheersChecked || false);
  const [checked, toggleChecked] = useState(cheersChecked);

  //cDM
  useEffect(() => {
    if (!cheersRules) {
      getCheersData();
    }
  }, []);

  const onChange = (cheersCheck: boolean, checked: boolean) => {
    updateCheersCheck(cheersCheck);
    toggleChecked(checked);
  };

  return cheersRules ? (
    <View style={styles.container}>
      <Image
        source={require("@assets/images/cheers_logo.png")}
        style={{ width: 130, height: 130, ...getFlipForRTLStyle() }}
        resizeMode="contain"
      />
      <CustomText
        style={{
          fontFamily: PRIMARY,
          color: "#ff7175",
          marginTop: 0,
          marginRight: 16,
          marginBottom: 16,
          marginLeft: 16,
          ...getFlipForRTLStyle(),
        }}
      >
        {cheersRules.product_information ? cheersRules.product_information : ""}
      </CustomText>

      <View style={{ width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <CustomCheckbo2
            checked={checked && cheersCheck}
            onChange={() => onChange(true, true)}
          />
          <CustomText
            style={{
              fontFamily: PRIMARY,
              textAlign: isRTL ? "right" : "left",
              marginLeft: 10,
              marginRight: 25,
              ...getFlipForRTLStyle(),
            }}
          >
            {cheersRules.drinking_age_confirmation_message
              ? cheersRules.drinking_age_confirmation_message
              : ""}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 35,
          }}
        >
          <CustomCheckbo2
            checked={checked && !cheersCheck}
            onChange={() => onChange(false, true)}
          />
          <CustomText
            style={{
              fontFamily: PRIMARY,
              textAlign: "left",
              marginLeft: 10,
              ...getFlipForRTLStyle(),
            }}
          >
            {cheersRules.not_interested_in_cheers_offers_message
              ? cheersRules.not_interested_in_cheers_offers_message
              : ""}
          </CustomText>
        </View>

        <BlueButton
          title={i18n.t("OK")}
          backgrounColor="#ff7175"
          onPress={() => {
            cheersSubmit({
              cheersCheck,
              cheersChecked: checked,
            });
          }}
          isRTL={isRTL}
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default cheers;
