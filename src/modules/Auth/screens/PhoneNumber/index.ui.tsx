import React from "react";
import { View } from "react-native";
import { ScreenTypes } from "../../interfaces";
import { design } from "rn_fast_track_uilib";
import i18n, { getFlipForRTLStyle } from "@localization";
import styles from "./styles";

import {
  Header,
  CustomSafeAreaView,
  CustomText,
  CustomInput,
  BorderButton,
} from "@components";

//component containing the view of phoneNumber screen
const PhoneNumberComponent = (props: ScreenTypes.phoneNumber) => {
  let { phoneNumRef, appConfigs, validatePhoneNumber } = props;
  return (
    <CustomSafeAreaView style={[styles.mainView, getFlipForRTLStyle()]}>
      <Header />
      <View style={styles.body}>
        <CustomText style={styles.headText}>
          {i18n.t("PLEASE_ADD_PHONE")}{" "}
        </CustomText>
        <View style={styles.numberView}>
          <CustomText style={styles.countryCode}>
            {appConfigs?.signupFields?.phone.code}
          </CustomText>
          <CustomInput
            ref={phoneNumRef}
            placeholder={
              appConfigs?.signupFields?.phone?.autoCapitalize == "characters"
                ? i18n.t("PHONE_NUMBER")?.toUpperCase()
                : i18n.t("PHONE_NUMBER")
            }
            returnKeyType="next"
            customStyle={styles.phoneNumberInput}
            placeholderTextColor={design.COLOR_TEXT_PLACEHOLDER}
            keyboardType="numeric"
            autoCapitalize={
              appConfigs?.signupFields?.firstname?.autoCapitalize || "none"
            }
          />
        </View>
        <BorderButton
          onPress={validatePhoneNumber}
          title={i18n.t("ADD_PHONE_NUMBER")}
          style={styles.addPhoneNumber}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default PhoneNumberComponent;
