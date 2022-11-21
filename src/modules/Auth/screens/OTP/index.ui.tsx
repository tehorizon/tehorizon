import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ScreenTypes } from "../../interfaces";
import { design } from "rn_fast_track_uilib";
import i18n, { getFlipForRTLStyle } from "@localization";
import styles from "./styles";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import moment from "moment";

import { Header, CustomSafeAreaView, CustomText } from "@components";

//component containing the view of OTP screen
const OTPComponent = ({
  onCodeFilled,
  countdown,
  isResending,
}: ScreenTypes.OTP) => {
  return (
    <CustomSafeAreaView style={[styles.mainView, getFlipForRTLStyle()]}>
      <Header />
      <View style={styles.body}>
        <CustomText style={styles.headText}>{i18n.t("ENTER_PIN")}</CustomText>
        <OTPInputView
          style={styles.OTPView}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          onCodeFilled={onCodeFilled}
        />
        <CustomText style={styles.resendText}>{`${i18n.t(
          "RESENDING_IN"
        )} ${moment.utc(countdown * 1000).format("mm:ss")}`}</CustomText>
        <View style={styles.noPinView}>
          {isResending ? (
            <ActivityIndicator
              style={styles.activityIndicator}
              color={design["Link_Color"]}
            />
          ) : (
            <CustomText style={styles.pinText}>{i18n.t("NO_PIN")}</CustomText>
          )}
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default OTPComponent;
