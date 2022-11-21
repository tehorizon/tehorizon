import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  _ScrollView,
} from "react-native";
import APP_COLORS from "@colors";
import auth_styles from "./styles";
import i18n, { isRTL, getFlipForRTLStyle } from "@localization";
import { design } from "rn_fast_track_uilib";
import moment from "moment";
import {
  CustomText,
  WebViewModal,
  CountryPicker,
  SelectDateModal,
  BorderButton,
  SimpleRadioButton,
  RegistrationSuccessModal,
  CustomInput,
  Header,
} from "@components";
import ReCaptchaV3 from "@HybridComponents/ReCaptchaV3";
import { AuthCheckBox as CheckBox } from "@components";

import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import appConfigJSON from "@fast_track/src/AppConfig.json";
import { PRIMARY } from "@fonts";
import { ScreenTypes } from "../../../interfaces";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

let { is_signup_with_demographic } = appConfigJSON;
const isDemographics = is_signup_with_demographic;

const Register = ({
  onCloseRegistrationSuccess,
  keyValidationData,
  showRegistrationSuccessModal,
  appConfigs,
  registrationSuccessString,
  isKeyValidationEnabled,
  type,
  isPrivacyPolicyAccepted,
  isEndUserLicenceAccepted,
  showCountryModal,
  showNationalityModal,
  isDatePickerVisible,
  showWebView,
  selectedCountry,
  selectedNationality,
  dateOfBirth,
  gender,
  webviewURL,
  webViewTitle,
  phoneNumRef,
  firstNameRef,
  lastNameRef,
  emailRef,
  confirmEmailRef,
  passRef,
  confirmPasswordRef,
  navigation,
  _captchaRef,
  siteKey,
  //methods
  updateCaptchaToken,
  toggleCountryModal,
  toggleNationalityModal,
  updateGender,
  handleRegisterButton,
  handlePrivacyPolicy,
  handleEULA,
  disableWebView,
  handleSelectedCountryCallback,
  handleSelectedNationalityCallback,
  showDatePicker,
  hideDatePicker,
  handleDateChange,
  privacyPolicyPressed,
  EULPressed,
  navigateToLogin,
}: ScreenTypes.signupScreen) => {
  return (
    <SafeAreaView
      testID="Sign_up_screen"
      style={[styles.droidSafeArea, getFlipForRTLStyle()]}
    >
      <Header onPress={navigateToLogin} />

      <KeyboardAvoidingView
        style={styles.subView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView testID="scrollView">
          <View style={auth_styles.loginParent}>
            {/* dif modals t */}

            <WebViewModal
              urlString={webviewURL}
              headerString={webViewTitle}
              isVisible={showWebView}
              disableCalback={disableWebView}
            />
            <CountryPicker
              isVisible={showCountryModal}
              handleDone={handleSelectedCountryCallback}
              title={i18n.t("COUNTRY_OF_RESI_STRING")}
              isRTL={isRTL}
              i18n={i18n}
            />
            <CountryPicker
              isVisible={showNationalityModal}
              handleDone={handleSelectedNationalityCallback}
              title={i18n.t("NATIONALITY")}
              isRTL={isRTL}
              i18n={i18n}
            />

            <RegistrationSuccessModal
              isVisible={showRegistrationSuccessModal}
              dataString={registrationSuccessString}
              disable={onCloseRegistrationSuccess}
              buttonText={i18n.t("OK")}
            />
            <SelectDateModal
              isVisible={isDatePickerVisible}
              date={
                dateOfBirth
                  ? moment(
                      dateOfBirth,
                      appConfigs?.signupFields?.dob?.format || "MM/DD/YYYY"
                    ).toDate()
                  : moment(
                      "01/01/1996",
                      appConfigs?.signupFields?.dob?.format || "MM/DD/YYYY"
                    ).toDate()
              }
              handleDone={hideDatePicker}
              handleDateChange={handleDateChange}
              handleCancel={hideDatePicker}
            />
            <CustomText style={styles.registerText}>
              {i18n.t("Register")}
            </CustomText>
            {appConfigs?.show_phone_number && (
              <View style={auth_styles.numberView}>
                <CustomText style={auth_styles.countryCode}>
                  {appConfigs?.signupFields?.phone.code}
                </CustomText>
                <CustomInput
                  ref={phoneNumRef}
                  placeholder={i18n.t("PHONE_NUMBER")}
                  returnKeyType="next"
                  customStyle={auth_styles.phoneNumberInput}
                  placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                  keyboardType="numeric"
                  onSubmitEditing={() => {
                    firstNameRef?.current?.focus();
                  }}
                />
              </View>
            )}
            {isDemographics && (
              <>
                <CustomInput
                  testID="first_name"
                  placeholder={i18n.t("FIRST_NAME_STRING")}
                  returnKeyType="next"
                  placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                  autoCapitalize={
                    appConfigs?.signupFields?.firstname?.autoCapitalize ||
                    "none"
                  }
                  ref={firstNameRef}
                  customStyle={[styles.input, { marginTop: 0 }]}
                  onSubmitEditing={() => {
                    lastNameRef?.current?.focus();
                  }}
                />

                <CustomInput
                  testID="last_name"
                  placeholder={i18n.t("LAST_NAME_STRING")}
                  returnKeyType="next"
                  placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                  autoCapitalize={
                    appConfigs?.signupFields?.lastname?.autoCapitalize || "none"
                  }
                  ref={lastNameRef}
                  customStyle={[styles.input]}
                  onSubmitEditing={() => {
                    emailRef?.current?.focus();
                  }}
                />
              </>
            )}
            {isKeyValidationEnabled === true && type === "RegisterSuccess" ? (
              <CustomInput
                testID="email"
                ref={emailRef}
                value={keyValidationData?.email}
                disabled={true}
                returnKeyType="next"
                customStyle={[styles.input]}
                placeholder={i18n.t("EMAIL_STRING")}
                placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                onSubmitEditing={() => {
                  confirmEmailRef?.current
                    ? confirmEmailRef?.current?.focus()
                    : passRef?.current?.focus();
                }}
              />
            ) : (
              <CustomInput
                testID="email"
                ref={emailRef}
                returnKeyType="next"
                customStyle={[styles.input]}
                placeholder={i18n.t("EMAIL_STRING")}
                placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                onSubmitEditing={() => {
                  confirmEmailRef?.current
                    ? confirmEmailRef?.current?.focus()
                    : passRef?.current?.focus();
                }}
              />
            )}

            {appConfigs?.show_confirm_email && isDemographics && (
              <CustomInput
                placeholder={i18n.t("CONFIRM_EMAIL_STRING")}
                placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                customStyle={[styles.input]}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                ref={confirmEmailRef}
                onSubmitEditing={() => {
                  passRef?.current?.focus();
                }}
                returnKeyType="next"
              />
            )}

            <CustomInput
              testID="password"
              placeholder={i18n.t("PASSWORD_STRING")}
              isPassword
              placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              // secureTextEntry={!showPassword}
              customStyle={[styles.input]}
              ref={passRef}
              showHide={appConfigs?.showPassword}
              onSubmitEditing={() => {
                confirmPasswordRef?.current?.focus();
              }}
              returnKeyType="next"
            />

            <CustomInput
              testID="confirm_password"
              placeholder={i18n.t("CONFIRM_PASSWORD_STRING")}
              isPassword
              placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              // secureTextEntry={!showConfirmPassword}
              customStyle={[styles.input]}
              showHide={appConfigs?.showPassword}
              ref={confirmPasswordRef}
              onSubmitEditing={() => {
                confirmPasswordRef?.current?.blur();
              }}
            />

            {isDemographics && (
              <>
                <View style={auth_styles.DOBandGenderView}>
                  {appConfigs?.show_dob && (
                    <View style={auth_styles.dobView}>
                      <CustomText style={auth_styles.rowLabel}>
                        {i18n.t("Date_of_birth")}{" "}
                        <CustomText
                          style={{
                            fontSize: 10,
                            color: design.Text_Primary_Color,
                          }}
                        >
                          ({i18n.t("OPTIONAL")})
                        </CustomText>
                      </CustomText>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={showDatePicker}
                        style={[
                          auth_styles.dobField,
                          {
                            backgroundColor:
                              design.Input_Background_Color || "transparent",
                          },
                        ]}
                      >
                        <CustomText
                          placeholder={
                            appConfigs?.signupFields?.dob?.format ||
                            "MM/DD/YYYY"
                          }
                          style={[auth_styles.valueText]}
                        >
                          {dateOfBirth}
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  )}
                  {appConfigs?.show_gender && (
                    <View style={auth_styles.genderView}>
                      <CustomText
                        style={{
                          ...auth_styles.rowLabel,
                          color: design.Text_Primary_Color,
                        }}
                      >
                        {i18n.t("Gender")}{" "}
                        <CustomText
                          style={{
                            fontSize: 10,
                            color: design.Text_Primary_Color,
                          }}
                        >
                          ({i18n.t("OPTIONAL")})
                        </CustomText>
                      </CustomText>
                      <View style={auth_styles.genderRadiosView}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <SimpleRadioButton
                            isSelected={gender === "Male" ? true : false}
                            onPress={() => updateGender("Male")}
                            color={design.Text_Primary_Color}
                          />
                          <CustomText style={{ marginLeft: 10 }}>
                            {i18n.t("Male")}
                          </CustomText>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <SimpleRadioButton
                            isSelected={gender === "Female" ? true : false}
                            onPress={() => updateGender("Female")}
                            color={design.Text_Primary_Color}
                          />
                          <CustomText style={{ marginLeft: 10 }}>
                            {i18n.t("Female")}
                          </CustomText>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
                {appConfigs?.show_nationality && (
                  <View
                    style={[
                      auth_styles.selectCountryParent,
                      auth_styles.selectCountryParentDemographics,
                    ]}
                  >
                    <CustomText style={{ color: design.Text_Primary_Color }}>
                      {i18n.t("NATIONALITY")}{" "}
                      <CustomText
                        style={{
                          fontSize: 10,
                          color: design.Text_Primary_Color,
                        }}
                      >
                        ({i18n.t("OPTIONAL")})
                      </CustomText>
                    </CustomText>
                    <TouchableOpacity
                      activeOpacity={1}
                      testID="country_dropdown"
                      onPress={() => toggleNationalityModal(true)}
                      style={[
                        auth_styles.selectCountryDropdown,
                        {
                          backgroundColor: design.Input_Background_Color
                            ? design.Input_Background_Color
                            : "transparent",
                          marginTop: 0,
                          width: "62%",
                        },
                      ]}
                    >
                      <CustomText
                        style={auth_styles.selectCountryDropdownText}
                        placeholder={i18n.t("SELECT")}
                      >
                        {selectedNationality !== "" && selectedNationality}
                      </CustomText>
                      <View
                        style={auth_styles.selectCountryDropdownArrowParent}
                      >
                        <AntDesign
                          size={16}
                          style={{
                            color: "white",
                          }}
                          name="caretdown"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}

            {/* <View style={auth_styles.selectCountryParent}> */}
            {/* {isDemographics && (
                <CustomText style={{ color: design.Border_Button_Text_Color }}>
                  {i18n.t("COUNTRY_OF_RESI_STRING")}
                </CustomText>
              )} */}
            <TouchableOpacity
              activeOpacity={1}
              testID="country_of_residence"
              onPress={() => toggleCountryModal(true)}
              style={auth_styles.selectCountryDropdown}
            >
              <CustomText
                numberOfLines={2}
                style={auth_styles.selectCountryDropdownText}
                placeholder={i18n.t("COUNTRY_OF_RESI_STRING")}
              >
                {selectedCountry !== "" && selectedCountry}
              </CustomText>
              <View style={auth_styles.selectCountryDropdownArrowParent}>
                {/* <AntDesign
                  style={{
                    color: "black",
                  }}
                  name="caretdown"
                  onPress={() => {
                    //disable();
                  }}
                /> */}
                <SimpleLineIcons name="arrow-down" size={15} color="black" />
              </View>
            </TouchableOpacity>
            {/* </View> */}
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
            <View
              style={[auth_styles.checkBoxParent, auth_styles.checkBoxsView]}
            >
              <CheckBox
                testID={"registerPP"}
                checked={isPrivacyPolicyAccepted}
                onPress={privacyPolicyPressed}
              />
              <CustomText
                //  isRTL={isRTL}
                style={auth_styles.checkBoxLabelText}
              >
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
                testID={"registerEula"}
                checked={isEndUserLicenceAccepted}
                onPress={EULPressed}
              />
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
              testID="register"
              style={auth_styles.btn}
              onPress={handleRegisterButton}
              title={i18n.t("REGISTER_STRING")}
            />
            <CustomText style={[auth_styles.registerTopText]}>
              {i18n.t("ALREADY_HAVE_ACCOUNT") + " "}
              <CustomText
                testID={"sign_in"}
                style={[auth_styles.signInText]}
                onPress={navigateToLogin}
              >
                {i18n.t("SIGN_IN_STRING")}
              </CustomText>
            </CustomText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {appConfigs.is_captcha_verification && (
        <ReCaptchaV3
          ref={_captchaRef}
          captchaDomain={appConfigs.captchaDomain}
          siteKey={siteKey}
          onReceiveToken={updateCaptchaToken}
          action={"registeration"}
        />
      )}
    </SafeAreaView>
  );
};

export default Register;
