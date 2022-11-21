import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import { ScreenTypes } from "../../interfaces";
import i18n, { getFlipForRTLStyle } from "@localization";
import styles from "./styles";
import {
  Header,
  CustomSafeAreaView,
  CustomText,
  CustomInput,
  PhoneNumber,
  BorderButton,
} from "@components";
import BottomUpModal, { BottomUpModalRef } from "@components/BottomUpModal";
import Image from "@HybridComponents/Image";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { StackNavigationProp } from "@react-navigation/stack";
let behavior: "padding" | "height" =
  Platform.OS === "ios" ? "padding" : "height";
//component containing the view of CIFID screen
const CIFIDComponent = ({
  phoneNumRef,
  cifidRef,
  phoneNumber,
  cifid,
  alertRef,
  otpRef,
  updatePhoneNumber,
  updateCIFID,
  proceedSignup,
  navigation,
}: ScreenTypes.CIFID) => {
  return (
    <CustomSafeAreaView style={styles.mainView}>
      <Header />
      <KeyboardAvoidingView
        style={[styles.body, getFlipForRTLStyle()]}
        behavior={behavior}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <CustomText style={styles.headText}>
            {i18n.t("Enter your CIF ID & mobile number to get started")}
          </CustomText>
          <CustomInput
            ref={cifidRef}
            placeholder={i18n.t("CIF ID")}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={() => {
              phoneNumRef?.current?.focus();
            }}
            changeCallback={updateCIFID}
          />
          <PhoneNumber ref={phoneNumRef} changeCallback={updatePhoneNumber} />
          <BorderButton
            title={i18n.t("Proceed")}
            disabled={phoneNumber == "" || cifid == ""}
            style={styles.proceedButton}
            onPress={proceedSignup}
          />
          <Pressable onPress={() => alertRef?.current?.toggleVisible()}>
            <CustomText style={styles.cifidLink}>
              {i18n.t("Don’t know your CIF ID?")}
            </CustomText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
      <CifidAlert ref={alertRef} />
      <OTPSheet
        ref={otpRef}
        phoneNumber={phoneNumRef?.current?.getPhoneNumber()}
        navigation={navigation}
      />
    </CustomSafeAreaView>
  );
};

const CifidAlert = memo(
  forwardRef((props, ref: Ref<BottomUpModalRef>) => {
    const sheetRef = useRef<BottomUpModalRef>(null);

    useImperativeHandle(ref, () => ({
      toggleVisible: () => sheetRef?.current?.toggleVisible(),
    }));

    return (
      <BottomUpModal ref={sheetRef}>
        <CustomText style={styles.cifidHead}>{i18n.t("CIF ID")}</CustomText>
        <CustomText style={styles.cifidDetails}>
          {i18n.t("CIFID_Details")}
        </CustomText>
        <BorderButton
          title={i18n.t("OK")}
          style={styles.proceedButton}
          onPress={() => sheetRef?.current?.toggleVisible()}
        />
      </BottomUpModal>
    );
  })
);

const OTPSheet = memo(
  forwardRef(
    (
      {
        phoneNumber = "",
        navigation,
      }: { phoneNumber?: string; navigation: StackNavigationProp<any, any> },
      ref: Ref<BottomUpModalRef>
    ) => {
      const [otp, updateOTP] = useState("");
      const [timer, updateTimer] = useState(0);
      const [wrogOTP, updateError] = useState(false);
      const sheetRef = useRef<BottomUpModalRef>(null);
      let timeout: NodeJS.Timeout;
      useEffect(() => {
        if (timer > 0) {
          timeout = setTimeout(() => {
            updateTimer(timer - 1);
          }, 1000);
        }
      }, [timer]);

      const toggleVisible = useCallback(() => {
        timeout && clearTimeout(timeout);
        updateTimer(60);
        sheetRef?.current?.toggleVisible();
      }, [sheetRef?.current]);
      useImperativeHandle(ref, () => ({
        toggleVisible,
      }));

      const proceedToSignup = () => {
        navigation.navigate("Register");
        sheetRef?.current?.toggleVisible();
      };
      return (
        <BottomUpModal ref={sheetRef}>
          <Pressable
            testID="closeOtp"
            onPress={toggleVisible}
            style={styles.crossArrowView}
          >
            <Image
              source={require("@assets/icons/cross_black.png")}
              style={styles.crossArrow}
            />
          </Pressable>
          <CustomText style={styles.otpHeadText}>
            {i18n.t("Enter your OTP")}
          </CustomText>
          <CustomText style={styles.otpDetails}>
            {`${i18n.t(
              "We've sent you an OTP to your registered phone number"
            )} +${phoneNumber}`}
          </CustomText>
          <View style={styles.OTPMainView}>
            <CustomText style={styles.otpSubHead}>
              {i18n.t("Please enter the 4 digit code")}
            </CustomText>
            <OTPInputView
              style={{ ...styles.OTPView, ...getFlipForRTLStyle() }}
              pinCount={4}
              code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={updateOTP}
              autoFocusOnLoad
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                wrogOTP && styles.wrongOTP,
              ]}
            />
            <CustomText style={styles.otpError}>
              {wrogOTP && i18n.t("Please enter correct OTP")}
            </CustomText>
          </View>
          <BorderButton
            title={i18n.t("Proceed")}
            disabled={otp.length != 4}
            onPress={proceedToSignup}
          />
          <View style={styles.timerView}>
            <CustomText style={styles.timerText}>
              {i18n.t("You can request a new code in")}
              <CustomText style={styles.timerTextBold}>
                {` ${timer} ${i18n.t("seconds")}`}
              </CustomText>
            </CustomText>
            <Pressable disabled={timer > 0}>
              <CustomText
                style={[styles.resendText, timer > 0 && styles.disableResend]}
              >
                {i18n.t("Resend OTP")}
              </CustomText>
            </Pressable>
          </View>
        </BottomUpModal>
      );
    }
  )
);
export default CIFIDComponent;
