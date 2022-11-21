import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import moment from "moment";
import i18n, { getFlipForRTLStyle } from "@localization";
//analytics
import {
  BorderButton,
  CustomInput,
  CustomText,
  HeaderWithBackButton,
  CountryPicker,
  CurrencyPicker,
  SelectDateModal,
} from "@components";
import styles from "./styles";
import APP_COLORS from "@colors";
import DetailComponent from "@Profile/components/ProfileDetailComponent";
import { ProfileDetails } from "@Profile/interfaces";

const ProfileDetail = ({
  selectedCountry,
  selectedNationality,
  navigation,
  appConfigs,
  user,
  firstName,
  lastName,
  dateOfBirth,
  nationalityModalVisible,
  countryModalVisible,
  mobilePhone,
  selectedCurrency,
  isDatePickerVisible,
  currencyModalVisible,
  updateCountry,
  updateCurrency,
  updateNationality,
  handleDatePickerOpen,
  setfirstName,
  setlastName,
  setmobilePhone,
  onCountryPress,
  onNationalityPress,
  onCurrencyPress,
  hideDatePicker,
  handleDateChange,
  handleCancelOnDatePicker,
  onUpdate,
  deleteAcccount,
}: ProfileDetails) => {
  return (
    <View style={[styles.mainContainer, getFlipForRTLStyle()]}>
      <HeaderWithBackButton
        title={i18n.t("Profile detail")}
        navigation={navigation}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.avoidingView}
      >
        <ScrollView
          testID="scrollView"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          <CustomInput
            label={i18n.t("FIRST_NAME_STRING")}
            returnKeyType="next"
            customStyle={styles.mT16}
            value={firstName}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            autoCapitalize={
              appConfigs?.signupFields?.firstname?.autoCapitalize || "none"
            }
            lock={user?.firstname}
            onChangeText={(text) => setfirstName(text)}
          />
          <CustomInput
            label={i18n.t("LAST_NAME_STRING")}
            value={lastName}
            customStyle={styles.mT16}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            returnKeyType="next"
            lock={user?.lastname}
            onChangeText={(text) => setlastName(text)}
          />
          <CustomInput
            label={i18n.t("EMAIL_STRING")}
            value={user.email}
            customStyle={styles.mT16}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            returnKeyType="next"
            lock
          />

          <DetailComponent
            label={i18n.t("Date_of_birth")}
            value={dateOfBirth}
            onPress={handleDatePickerOpen}
          />
          <DetailComponent
            label={i18n.t("NATIONALITY")}
            value={selectedNationality}
            onPress={onNationalityPress}
          />
          <DetailComponent
            label={i18n.t("Country_of_residence")}
            value={selectedCountry}
            onPress={onCountryPress}
          />
          <CustomInput
            label={i18n.t("PHONE_NUMBER")}
            value={mobilePhone}
            customStyle={styles.mT16}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            keyboardType="phone-pad"
            onChangeText={(text) => setmobilePhone(text)}
            returnKeyType="next"
            lock={user?.mobile_phone}
          />
          <DetailComponent
            label={i18n.t("Currency_Preference")}
            value={selectedCurrency}
            onPress={onCurrencyPress}
          />

          <BorderButton
            style={styles.btn}
            title={i18n.t("Save")}
            onPress={onUpdate}
          />
          <TouchableOpacity
            style={styles.deleteAccount}
            onPress={deleteAcccount}
          >
            <CustomText style={styles.deleteText}>
              {i18n.t("Delete Account")}
            </CustomText>
          </TouchableOpacity>
          <CustomText style={styles.deleteMsg}>
            {i18n.t("would_delete_all_your_information_with_Us")}
          </CustomText>
        </ScrollView>
      </KeyboardAvoidingView>
      <CountryPicker
        selectedCountry={
          countryModalVisible ? selectedCountry : selectedNationality
        }
        handleDone={countryModalVisible ? updateCountry : updateNationality}
        isVisible={countryModalVisible || nationalityModalVisible}
        title={
          countryModalVisible
            ? i18n.t("COUNTRY_OF_RESI_STRING")
            : i18n.t("Nationality")
        }
      />
      <CurrencyPicker
        selectedCurrency={selectedCurrency}
        handleDone={updateCurrency}
        isVisible={currencyModalVisible}
        title={i18n.t("")}
      />
      <SelectDateModal
        isVisible={isDatePickerVisible}
        date={moment(dateOfBirth, "DD/MM/YYYY").toDate()}
        handleDone={hideDatePicker}
        maxDate={moment(new Date(), "DD/MM/YYYY")
          ?.subtract(13, "years")
          ?.toDate()}
        handleDateChange={handleDateChange}
        handleCancel={handleCancelOnDatePicker}
      />
    </View>
  );
};
export default ProfileDetail;
