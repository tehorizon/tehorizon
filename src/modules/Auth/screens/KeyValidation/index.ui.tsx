import React from "react";
import { View } from "react-native";

import i18n, { getFlipForRTLStyle } from "@localization";

import KeyValidationMessage from "./components/keyValidationMessage";
import { ScreenTypes } from "@Auth/interfaces";
import styles from "./styles";
import {
  CustomSafeAreaView,
  CompanyHeaderLogo,
  BlueButton,
  CustomText,
  CustomInput,
} from "@components";
import { PRIMARY } from "@fonts";
import { borderColor, borderWidth } from "@utils/genericStyles";

const WIDTH = "70%";

//component containing the view of login screen
const KeyValidationScreen = (props: ScreenTypes.KeyValidation) => {
  let {
    email,
    appConfig,
    keyInput1,
    emailInputRef,
    keyInputValue1,
    keyInput2,
    keyInputValue2,
    keyInput3,
    keyInputValue3,
    // methods
    setEmail,
    onChangeInput1,
    onChangeKeyInput2,
    onChangeKeyInput3,
    handleSubmit,
    onSignup,
    onEmailSubmit,
    onKeyInput1Submit,
  } = props;
  return (
    <CustomSafeAreaView>
      <View style={styles.parentView}>
        <View style={styles.companyLogo}>
          <CompanyHeaderLogo getFlipForRTLStyle={getFlipForRTLStyle} />
        </View>

        {appConfig?.keyValidationMessage ? (
          <View style={{ width: WIDTH, paddingTop: 10 }}>
            <KeyValidationMessage
              message={appConfig?.keyValidationMessage[0]}
            />
          </View>
        ) : null}

        <View style={{ width: WIDTH, marginTop: 15 }}>
          <CustomText
            style={{ fontFamily: PRIMARY, fontSize: 15 }}
            onPress={() => {
              //this.showForgotPasswordModal();
            }}
          >
            {i18n.t("Enter your email address:")}{" "}
          </CustomText>

          <CustomInput
            customStyle={{
              width: "100%",
              ...borderColor("grey"),
              ...borderWidth(1),
              paddingStart: 10,
              paddingEnd: 10,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder={i18n.t("Email Address")}
            onSubmitEditing={onEmailSubmit}
            ref={emailInputRef}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {appConfig?.keyValidationMessage ? (
          <View style={{ width: WIDTH, paddingTop: 10 }}>
            <KeyValidationMessage
              message={appConfig?.keyValidationMessage[1]}
            />
          </View>
        ) : null}

        <View
          style={{
            width: WIDTH,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <CustomInput
            customStyle={styles.keyInput}
            maxLength={3}
            ref={keyInput1}
            value={keyInputValue1}
            onChangeText={onChangeInput1}
            onSubmitEditing={onKeyInput1Submit}
          />
          <CustomInput
            customStyle={styles.keyInput}
            maxLength={3}
            ref={keyInput2}
            value={keyInputValue2}
            onChangeText={onChangeKeyInput2}
          />
          <CustomInput
            customStyle={styles.keyInput}
            maxLength={3}
            ref={keyInput3}
            value={keyInputValue3}
            onChangeText={onChangeKeyInput3}
          />
        </View>

        <View style={{ width: WIDTH, height: 55, marginTop: 25 }}>
          <BlueButton
            testID={"login"}
            onPress={handleSubmit}
            title={i18n.t("Submit")}
            height={45}
          />
        </View>
        <CustomText
          testID={"forgot_password"}
          style={{
            fontFamily: PRIMARY,
            fontSize: 15,
            textDecorationLine: "underline",
            lineHeight: 20,
            color: "rgb(16, 110, 181)",
          }}
          onPress={onSignup}
        >
          {i18n.t("EXISTING_USER_SIGN_IN")}{" "}
        </CustomText>
      </View>
    </CustomSafeAreaView>
  );
};

export default KeyValidationScreen;
