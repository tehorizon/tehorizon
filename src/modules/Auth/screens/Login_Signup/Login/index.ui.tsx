import React from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { design, secondryLogo } from "rn_fast_track_uilib";
import auth_styles from "./styles";
import ForgetPasswordModal from "../components/ForgetPassword";
import i18n, { getFlipForRTLStyle } from "@localization";
import { AuthCheckBox as CheckBox } from "@components";
import globalStyles from "../styles";

import {
  Header,
  CustomText,
  WebViewModal,
  BorderButton,
  ResendEmailModal,
  CustomInput,
  AlreadyLoggedInModal,
  ResetPasswordSuccessModal,
} from "@components";
import ReCaptchaV3 from "@HybridComponents/ReCaptchaV3";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { ScreenTypes } from "../../../interfaces";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Image from "@HybridComponents/Image";

const Login = ({
  isPrivacyPolicyAccepted,
  isEndUserLicenceAccepted,
  showWebView,
  webviewURL,
  webViewTitle,
  appConfigs,
  keyValidationData,
  errorText,
  showResendEmailPopup,
  resendEmail,
  isKeyValidationEnabled,
  onResendEmailContinue,
  type,
  emailRef,
  passRef,
  forgetRef,
  showDoneMessage,
  doneMessage,
  alreadyLoginData,
  navigation,
  _captchaRef,
  siteKey,
  //methods
  updateCaptchaToken,
  handlePrivacyPolicy,
  handleEULA,
  handleLoginButton,
  privacyPolicyPressed,
  endUserLicensePressed,
  onResendEmailPressed,
  closeForgotPasswordModal,
  showForgotPasswordModal,
  disableWebView,
  onForgotPasswordPressed,
  hideResetModal,
  handleSkipMode,
  changedMindCallback,
  handleForceLogin,
}: ScreenTypes.loginScreen) => {
  return (
    <SafeAreaView style={globalStyles.droidSafeArea} testID="loginScreen">
      <ResetPasswordSuccessModal
        isVisible={showDoneMessage}
        dataString={doneMessage}
        hide={hideResetModal}
      />

      <Header skipModeCallback={appConfigs.skipMode && handleSkipMode} />

      <AlreadyLoggedInModal
        alreadyLoginData={alreadyLoginData}
        disable={changedMindCallback}
        forceLogin={handleForceLogin}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1, ...getFlipForRTLStyle() }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={auth_styles.loginParent}>
            <WebViewModal
              urlString={webviewURL}
              headerString={webViewTitle}
              isVisible={showWebView}
              disableCalback={disableWebView}
            />
            <ResendEmailModal
              isVisible={showResendEmailPopup}
              resendEmailData={resendEmail}
              handleContinue={onResendEmailContinue}
              handleResendEmail={onResendEmailPressed}
            />
            {isKeyValidationEnabled === true && type === "LoginSuccess" ? (
              <View style={{ width: "90%" }}>
                <CustomText
                  style={{
                    fontSize: 14,
                    fontFamily: PRIMARY_BOLD,
                  }}
                >
                  Hi,
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 14,
                    fontFamily: PRIMARY_BOLD,
                    paddingTop: 10,
                    paddingBottom: 5,
                    color: "grey",
                  }}
                >
                  {keyValidationData?.email}
                </CustomText>
              </View>
            ) : null}

            <View style={[auth_styles.loginMessage]}>
              <CustomText style={styles.signInText}>
                {i18n.t("Welcome")}
              </CustomText>
              <CustomText style={styles.savingtext}>
                {i18n.t("Sign in and get back into saving")}.
              </CustomText>
            </View>
            <View style={styles.formContainer}>
              {isKeyValidationEnabled === true &&
              type === "LoginSuccess" ? null : (
                <CustomInput
                  testID={"loginEmail"}
                  keyboardType={"email-address"}
                  placeholder={
                    appConfigs?.autoCapitalize == "characters"
                      ? i18n.t("EMAIL_STRING")?.toUpperCase()
                      : i18n.t("EMAIL_STRING")
                  }
                  placeholderTextColor={design.Input_Placeholder_Color}
                  autoCapitalize="none"
                  customStyle={[styles.input, { marginTop: 0 }]}
                  ref={emailRef}
                  onSubmitEditing={() => {
                    passRef?.current?.focus();
                  }}
                />
              )}

              <CustomInput
                testID={"loginPassword"}
                placeholder={
                  appConfigs?.autoCapitalize == "characters"
                    ? i18n.t("PASSWORD_STRING")?.toUpperCase()
                    : i18n.t("PASSWORD_STRING")
                }
                placeholderTextColor={design.Input_Placeholder_Color}
                isPassword
                customStyle={styles.input}
                showHide={appConfigs?.showPassword}
                secureTextEntry={true}
                ref={passRef}
              />

              {isKeyValidationEnabled === true ? (
                <View style={auth_styles.signinDiffrently}>
                  <CustomText
                    style={{
                      alignItems: "flex-start",
                      fontFamily: PRIMARY,
                      fontSize: 13,
                      textDecorationLine: "underline",
                      lineHeight: 20,
                      color: "rgb(16, 110, 181)",
                      marginTop: 10,
                    }}
                    onPress={() => {
                      navigation.navigate("KeyValidation");
                    }}
                  >
                    {i18n.t("Sign in as different user")}{" "}
                  </CustomText>
                </View>
              ) : null}
            </View>
            <View style={[auth_styles.checkBoxParent]}>
              <CheckBox
                testID={"loginPP"}
                checked={isPrivacyPolicyAccepted}
                onPress={privacyPolicyPressed}
              />
              <CustomText style={auth_styles.checkBoxLabelText}>
                {i18n.t("ACCEPT_STRING")}
              </CustomText>
              <CustomText
                onPress={handlePrivacyPolicy}
                style={auth_styles.hyperLinkText}
              >
                {i18n.t("PP_STRING")}
              </CustomText>
            </View>
            <View
              style={[auth_styles.checkBoxParent, auth_styles.checkBoxsView]}
            >
              <CheckBox
                testID={"loginEula"}
                checked={isEndUserLicenceAccepted}
                onPress={endUserLicensePressed}
              ></CheckBox>
              <CustomText style={auth_styles.checkBoxLabelText}>
                {i18n.t("ACCEPT_STRING")}
              </CustomText>
              <CustomText
                onPress={handleEULA}
                style={auth_styles.hyperLinkText}
              >
                {i18n.t("EULG_STRING")}
              </CustomText>
            </View>
            <BorderButton
              style={styles.btn}
              testID={"login"}
              onPress={handleLoginButton}
              title={i18n.t("SIGN_IN_STRING")}
            />
            <TouchableOpacity
              testID={"forgotPassword"}
              onPress={showForgotPasswordModal}
            >
              <CustomText style={auth_styles.forgetPassStyle}>
                {i18n.t("FORGOT_PASS_STRING")}
              </CustomText>
            </TouchableOpacity>
            <View style={styles.sigupTextView}>
              <CustomText style={[auth_styles.registerTopText]}>
                {i18n.t("DONT_HAVE_ACCOUNT")}
              </CustomText>
              <TouchableOpacity
                testID={"moveToSignup"}
                onPress={() => navigation.navigate("CIFID")}
              >
                <CustomText style={[auth_styles.signUpText]}>
                  {i18n.t("SIGN_UP")}
                </CustomText>
              </TouchableOpacity>
            </View>
            {appConfigs?.secondaryLogo && (
              <Image
                style={styles.logo}
                source={secondryLogo}
                resizeMode="contain"
              />
            )}

            {appConfigs?.tagLine != "" && (
              <CustomText style={[auth_styles.bottomText]}>
                {appConfigs.tagLine}
              </CustomText>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ForgetPasswordModal
        ref={forgetRef}
        dataString={errorText}
        disable={closeForgotPasswordModal}
        submitEmail={onForgotPasswordPressed}
      />
      {appConfigs.is_captcha_verification && (
        <ReCaptchaV3
          ref={_captchaRef}
          captchaDomain={appConfigs.captchaDomain}
          siteKey={siteKey}
          onReceiveToken={updateCaptchaToken}
          action={"login"}
        />
      )}
    </SafeAreaView>
  );
};

export default Login;
