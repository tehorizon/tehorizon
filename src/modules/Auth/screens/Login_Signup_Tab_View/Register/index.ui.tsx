import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import APP_COLORS from "@colors";
import auth_styles from "./styles";
import i18n, { isRTL } from "@localization";
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
} from "@components";
import { AuthCheckBox as CheckBox } from "@components";

import { AntDesign } from "@expo/vector-icons";
import appConfigJSON from "@fast_track/src/AppConfig.json";
import { PRIMARY } from "@fonts";
import { ScreenTypes } from "../../../interfaces";
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
  showPassword,
  showConfirmPassword,
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
  //methods
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
}: ScreenTypes.signupScreen) => {
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
      <ScrollView style={{ flex: 1 }}>
        <View
          style={[
            {
              ...auth_styles.loginParent,
              backgroundColor: design.Background_Primary_Color
                ? design.Background_Primary_Color
                : "gray",
            },
            { alignItems: "center" },
          ]}
        >
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
                placeholder={i18n.t("FIRST_NAME_STRING")}
                returnKeyType="next"
                placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                autoCapitalize={
                  appConfigs?.signupFields?.firstname?.autoCapitalize || "none"
                }
                ref={firstNameRef}
                onSubmitEditing={() => {
                  lastNameRef?.current?.focus();
                }}
              />

              <CustomInput
                placeholder={i18n.t("LAST_NAME_STRING")}
                returnKeyType="next"
                placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                autoCapitalize={
                  appConfigs?.signupFields?.lastname?.autoCapitalize || "none"
                }
                ref={lastNameRef}
                onSubmitEditing={() => {
                  emailRef?.current?.focus();
                }}
              />
            </>
          )}
          {isKeyValidationEnabled === true && type === "RegisterSuccess" ? (
            <CustomInput
              ref={emailRef}
              value={keyValidationData?.email}
              disabled={true}
              returnKeyType="next"
              placeholder={i18n.t("EMAIL_STRING")}
              placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              onSubmitEditing={() => {
                isDemographics
                  ? confirmEmailRef?.current?.focus()
                  : passRef?.current?.focus();
              }}
            />
          ) : (
            <CustomInput
              ref={emailRef}
              returnKeyType="next"
              placeholder={i18n.t("EMAIL_STRING")}
              placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              onSubmitEditing={() => {
                isDemographics
                  ? confirmEmailRef?.current?.focus()
                  : passRef?.current?.focus();
              }}
            />
          )}

          {appConfigs?.show_confirm_email && isDemographics && (
            <CustomInput
              placeholder={i18n.t("CONFIRM_EMAIL_STRING")}
              placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
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
            placeholder={i18n.t("PASSWORD_STRING")}
            isPassword
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            // secureTextEntry={!showPassword}
            ref={passRef}
            showHide={appConfigs?.showPassword}
            onSubmitEditing={() => {
              confirmPasswordRef?.current?.focus();
            }}
            returnKeyType="next"
          />

          <CustomInput
            placeholder={i18n.t("CONFIRM_PASSWORD_STRING")}
            isPassword
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            // secureTextEntry={!showConfirmPassword}
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
                          backgroundColor: design.Input_Background_Color
                            ? design.Input_Background_Color
                            : "transparent",
                        },
                      ]}
                    >
                      <CustomText
                        placeholder={
                          appConfigs?.signupFields?.dob?.format || "MM/DD/YYYY"
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
                        style={{ flexDirection: "row", alignItems: "center" }}
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
                        style={{ flexDirection: "row", alignItems: "center" }}
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
                    <View style={auth_styles.selectCountryDropdownArrowParent}>
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

          <View style={auth_styles.selectCountryParent}>
            {isDemographics && (
              <CustomText style={{ color: design.Text_Primary_Color }}>
                {i18n.t("COUNTRY_OF_RESI_STRING")}
              </CustomText>
            )}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => toggleCountryModal(true)}
              style={[
                auth_styles.selectCountryDropdown,
                {
                  backgroundColor: design.Input_Background_Color
                    ? design.Input_Background_Color
                    : "transparent",
                  width: isDemographics ? "58%" : "100%",
                },
              ]}
            >
              <CustomText
                numberOfLines={2}
                style={auth_styles.selectCountryDropdownText}
                placeholder={i18n.t(
                  isDemographics ? "SELECT" : "COUNTRY_OF_RESI_STRING"
                )}
              >
                {selectedCountry !== "" && selectedCountry}
              </CustomText>
              <View style={auth_styles.selectCountryDropdownArrowParent}>
                <AntDesign
                  style={{
                    color: "white",
                  }}
                  name="caretdown"
                  onPress={() => {
                    //disable();
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
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
              checked={isPrivacyPolicyAccepted}
              onPress={privacyPolicyPressed}
            />
            <CustomText
              //  isRTL={isRTL}
              style={auth_styles.checkBoxLabelText}
            >
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
            <CheckBox checked={isEndUserLicenceAccepted} onPress={EULPressed} />
            <CustomText style={auth_styles.checkBoxLabelText}>
              {" "}
              {i18n.t("ACCEPT_STRING")}
            </CustomText>
            <CustomText onPress={handleEULA} style={auth_styles.hyperLinkText}>
              {i18n.t("EULG_STRING")}
            </CustomText>
          </View>
          <BorderButton
            style={auth_styles.register}
            onPress={handleRegisterButton}
            title={i18n.t("REGISTER_STRING")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
