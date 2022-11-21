import React from "react";
import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import { design } from "rn_fast_track_uilib";
import auth_styles from "./styles";
import ForgetPasswordModal from "../components/ForgetPassword";
import i18n from "@localization";
import { AuthCheckBox as CheckBox } from "@components";

import {
  CustomText,
  WebViewModal,
  BorderButton,
  ResendEmailModal,
  CustomInput,
} from "@components";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { ScreenTypes } from "../../../interfaces";

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
  loginMessage,
  isKeyValidationEnabled,
  onResendEmailContinue,
  type,
  emailRef,
  passRef,
  forgetRef,
  navigation,
  //methods
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
}: ScreenTypes.loginScreen) => {
  const _renderLoginMessage = (
    loginMessage: Array<{ options: Object; text: string }>
  ) => {
    const message = loginMessage.map((message, index) => {
      return (
        <CustomText
          key={index}
          style={{
            ...message.options,
            fontSize: 18,
            fontFamily: PRIMARY_BOLD,
          }}
        >
          {message.text + " "}
        </CustomText>
      );
    });

    return (
      <>
        <CustomText>{message}</CustomText>
      </>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: design.Background_Primary_Color
          ? design.Background_Primary_Color
          : "gray",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
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

          {loginMessage?.length > 0 && (
            <View style={auth_styles.loginMessage}>
              {_renderLoginMessage(loginMessage)}
            </View>
          )}
          {isKeyValidationEnabled === true && type === "LoginSuccess" ? null : (
            <CustomInput
              testID={"email"}
              keyboardType={"email-address"}
              placeholder={
                appConfigs?.autoCapitalize == "characters"
                  ? i18n.t("EMAIL_STRING")?.toUpperCase()
                  : i18n.t("EMAIL_STRING")
              }
              placeholderTextColor={design.Input_Placeholder_Color}
              autoCapitalize="none"
              ref={emailRef}
              onSubmitEditing={() => {
                passRef?.current?.focus();
              }}
            />
          )}

          <CustomInput
            testID={"password"}
            placeholder={
              appConfigs?.autoCapitalize == "characters"
                ? i18n.t("PASSWORD_STRING")?.toUpperCase()
                : i18n.t("PASSWORD_STRING")
            }
            placeholderTextColor={design.Input_Placeholder_Color}
            isPassword
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

          <View style={[auth_styles.checkBoxParent, auth_styles.checkBoxsView]}>
            <CheckBox
              testID={"privacy_policy"}
              checked={isPrivacyPolicyAccepted}
              onPress={privacyPolicyPressed}
            />
            <CustomText style={auth_styles.checkBoxLabelText}>
              {" "}
              {i18n.t("ACCEPT_STRING")}
            </CustomText>
            <CustomText
              onPress={handlePrivacyPolicy}
              style={auth_styles.hyperLinkText}
            >
              {i18n.t("PP_STRING")}
            </CustomText>
          </View>
          <View style={auth_styles.checkBoxParent}>
            <CheckBox
              testID={"eula"}
              checked={isEndUserLicenceAccepted}
              onPress={endUserLicensePressed}
            />
            <CustomText style={auth_styles.checkBoxLabelText}>
              {" "}
              {i18n.t("ACCEPT_STRING")}
            </CustomText>
            <CustomText onPress={handleEULA} style={auth_styles.hyperLinkText}>
              {i18n.t("EULG_STRING")}
            </CustomText>
          </View>
          <BorderButton
            style={{ width: "75%", marginTop: 29 }}
            testID={"login"}
            onPress={handleLoginButton}
            title={i18n.t("SIGN_IN_STRING")}
            height={45}
          />
          <CustomText
            testID={"forgot_password"}
            style={auth_styles.forgetPassStyle}
            onPress={showForgotPasswordModal}
          >
            {i18n.t("FORGOT_PASS_STRING")}{" "}
          </CustomText>
        </View>
        <ForgetPasswordModal
          ref={forgetRef}
          dataString={errorText}
          disable={closeForgotPasswordModal}
          submitEmail={onForgotPasswordPressed}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
