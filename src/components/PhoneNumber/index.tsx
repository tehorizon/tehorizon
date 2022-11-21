import {
  borderColor,
  borderWidth,
  marginHorizontal,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import i18n, { isRTL } from "@localization";
import i18next from "i18next";
import CustomInput, { CustomInputProps, InputRef } from "../Input";
import { PRIMARY, PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import CountryPicker from "@components/CountryPicker";

interface PhoneNumberProps extends CustomInputProps {}
export interface PhoneNumberRef {
  getPhoneNumber: () => string;
  focus: () => void;
  blur: () => void;
}
const PhoneNumber = forwardRef(
  (props: PhoneNumberProps, ref: Ref<PhoneNumberRef>) => {
    const [countryCode, updateCountryCode] = useState("966");

    const phoneNumRef = useRef<InputRef>();

    useImperativeHandle(ref, () => ({
      getPhoneNumber: () => `${countryCode}${phoneNumRef?.current?.getValue()}`,
      focus: () => phoneNumRef?.current?.focus(),
      blur: () => phoneNumRef?.current?.blur(),
    }));

    return (
      <View style={styles.phoneNumberView}>
        <CountryPicker
          disable={false}
          animationType={"slide"}
          countryFlagStyle={styles.countryFlagContainer}
          searchBarPlaceHolder={i18n.t("Search")}
          hideCountryFlag={false}
          hideCountryCode={false}
          language={i18next.language}
          countryCode={countryCode}
          selectedValue={updateCountryCode}
          {...props}
        />
        <CustomInput
          placeholder={i18n.t("cfid_placholder")}
          returnKeyType="done"
          keyboardType="numeric"
          {...props}
          ref={phoneNumRef}
          customStyle={styles.phoneNumber}
        />
      </View>
    );
  }
);

export default PhoneNumber;
const styles = StyleSheet.create({
  countryFlagContainer: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
  phoneNumber: {
    flex: 1,
    marginTop: 0,
    marginLeft: 8,
    borderRadius: design.Global_Border_Radius,
  },
  phoneNumberView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 24,
  },
});
