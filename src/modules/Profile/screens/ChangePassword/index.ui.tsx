import React from "react";
import { View, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";
//analytics
import {
  BorderButton,
  CustomInput,
  CustomText,
  HeaderWithBackButton,
} from "@components";
import styles from "./styles";
import APP_COLORS from "@colors";
import { changePassword } from "@Profile/interfaces";
import CheckText from "@Profile/components/ChangePasswordCheckText";

const ChangePassword = ({
  user,
  currentPass,
  newPass,
  confirmPass,
  isUpperCaseLetter,
  isLowerCaseLetter,
  isContainNumber,
  navigation,
  setCurrentPass,
  setNewPass,
  setConfirmPass,
}: changePassword) => {
  return (
    <View style={[styles.mainContainer, getFlipForRTLStyle()]}>
      <HeaderWithBackButton
        title={i18n.t("Change Password")}
        navigation={navigation}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.avoidingView}
      >
        <ScrollView testID="scrollView">
          <CustomText style={styles.headingText}>
            {i18n.t("Current")}
          </CustomText>
          <CustomInput
            placeholder={i18n.t("Your current password")}
            onChangeText={(text) => setCurrentPass(text)}
            value={currentPass}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            returnKeyType="next"
            showHide
            isPassword
          />
          <CustomText style={styles.headingText}>{i18n.t("New")}</CustomText>
          <CustomInput
            placeholder={i18n.t("Your new password")}
            value={newPass}
            onChangeText={(text) => setNewPass(text)}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            returnKeyType="next"
            showHide
            isPassword
          />
          <CustomText style={styles.headingText}>
            {i18n.t("Confirm password")}
          </CustomText>
          <CustomInput
            placeholder={i18n.t("Confirm new password")}
            value={confirmPass}
            onChangeText={(text) => setConfirmPass(text)}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            returnKeyType="next"
            showHide
            isPassword
          />
          <CheckText
            style={styles.mt24}
            text={i18n.t("Minimum  6 digitis")}
            checked={newPass.length > 5}
          />

          <CheckText
            text={i18n.t("At least 1  uppar case letters ( A  - Z)")}
            checked={isUpperCaseLetter}
          />
          <CheckText
            text={i18n.t("At least 1  Lower case letters ( A  - Z)")}
            checked={isLowerCaseLetter}
          />
          <CheckText
            text={i18n.t("At least 1  number ( 0- 9)")}
            checked={isContainNumber}
          />

          <BorderButton
            style={styles.btn}
            title={i18n.t("Save")}
            disabled
            onPress={() => null}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default ChangePassword;
