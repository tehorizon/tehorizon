import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
  BackHandler,
} from "react-native";
import moment from "moment";
import InputField from "./InputField";
import CurrencyPicker from "./SelectCurrencyModal";
import i18n, {
  changeLanguage,
  withTransation,
  getFlipForRTLStyle,
  isRTL,
} from "@localization";
import { design } from "rn_fast_track_uilib";
//analytics
import { makeStackMongo } from "@utils/horizonAnalytics";
import { CustomText, CountryPicker, SelectDateModal } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import { PRIMARY_BOLD } from "@fonts";

function EditAccountModal(props) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [countryModalVisible, setcountryModalVisible] = useState(false);
  const [nationalityModalVisible, setnationalityModalVisible] = useState(false);
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [currencyModalVisible, setcurrencyModalVisible] = useState(false);
  const [dateOfBirth, setdateOfBirth] = useState(
    props.user.date_of_birth === ""
      ? moment().format("DD/MM/YYYY")
      : props.user.date_of_birth
  );
  const [dateOfBirthUpdated, setdateOfBirthUpdated] = useState(false);
  const [selectedCountry, setselectedCountry] = useState(
    props.user.country_of_residence
  );
  const [selectedNationality, setselectedNationality] = useState(
    props.user.nationality
  );
  const [push_notifications, setpush_notifications] = useState(
    props.user.push_notifications
  );
  const [mobilePhone, setmobilePhone] = useState(props.user.mobile_phone);
  const [selectedCurrency, setselectedCurrency] = useState(props.user.currency);
  const [isEnglishLanguage, setisEnglishLanguage] = useState(
    i18n.language === "en" ? true : false
  );
  const [isUpdateAble, setisUpdateAble] = useState(false);
  const [isUpdateStarted, setisUpdateStarted] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    if (!isUpdateStarted) {
      setisUpdateAble(false);
      props.hideEdit();
    }
    return true;
  };

  useEffect(() => {
    const {
      date_of_birth,
      country_of_residence,
      nationality,
      push_notifications,
      mobile_phone,
      currency,
      firstname,
      lastname,
    } = props.user;

    setdateOfBirth(
      date_of_birth === ""
        ? props.user.date_of_birth === ""
          ? moment().format("DD/MM/YYYY")
          : props.user.date_of_birth
        : date_of_birth
    );
    setselectedCountry(country_of_residence);
    setselectedNationality(nationality);
    setpush_notifications(push_notifications === 1 ? true : false);
    setmobilePhone(mobile_phone);
    setselectedCurrency(currency);
    setfirstName(firstname);
    setlastName(lastname);
  }, [props]);

  const updateCountry = (country) => {
    country != "" && setselectedCountry(country);
    setcountryModalVisible(false);
    setisUpdateAble(true);
  };

  const updateCurrency = (currency) => {
    setselectedCurrency(currency);
    setcurrencyModalVisible(false);
    setisUpdateAble(true);
  };

  const updateNationality = (country) => {
    country != "" && setselectedNationality(country);
    setnationalityModalVisible(false);
    setisUpdateAble(true);
  };

  const handleDatePickerOpen = () => {
    setisDatePickerVisible(true);
  };

  const makeCustomAnalyticsStack = async (stackData) => {
    await makeStackMongo(stackData);
  };

  const makeAnalyticsStack = async (
    screenName = "",
    action = "",
    category_id = "",
    categories = "",
    categories_analytics = "",
    location_id = 0,
    changeSequenceNumber = false
  ) => {
    const stackData = {
      current_screen: screenName,
      action: action,
      category_id: category_id,
      categories: categories,
      categories_analytics: categories_analytics,
      location_id: location_id,
      changeSequenceNumber: changeSequenceNumber,
    };
    await makeStackMongo(stackData);
  };

  const hideDatePicker = (newDate: string) => {
    if (Platform.OS === "ios") {
      setdateOfBirth(
        moment(newDate, "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD/MM/YYYY")
      );
      setisDatePickerVisible(false);
      setisUpdateAble(true);
      setdateOfBirthUpdated(true);
    }
  };

  const handleDateChange = (event: any, value: string) => {
    if (event.type === "set" && value !== undefined) {
      setisDatePickerVisible(false);
      setdateOfBirth(
        moment(value, "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD/MM/YYYY")
      );
      setisUpdateAble(true);
    } else {
      setisDatePickerVisible(false);
    }
  };

  const handleCancelOnDatePicker = () => {
    setisDatePickerVisible(false);
  };

  const onUpdate = async () => {
    setisUpdateStarted(true);
    let updateData: object = {
      firstname: firstName,
      lastname: lastName,
      country_of_residence: selectedCountry,
      currency: selectedCurrency,
      mobile_phone: mobilePhone,
      push_notifications: push_notifications,
      nationality: selectedNationality,
    };
    const selectedDate = dateOfBirth;
    const todayDate = moment().format("DD/MM/YYYY");
    if (selectedDate !== todayDate) {
      updateData = {
        ...updateData,
        dateOfBirth: moment(dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD"),
      };
    }
    const resp = await props.onUpdate(updateData);

    setisUpdateStarted(false);

    if (resp) {
      setisUpdateAble(false);
      props.hideEdit();
    }
  };

  const headerLeftComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setisUpdateAble(false);
          setisDatePickerVisible(false);
          props.hideEdit();
        }}
      >
        <CustomText style={{ color: design["Header_Title_Primary_Color"] }}>
          {i18n.t("Cancel")}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const headerCenterComponent = () => {
    return (
      <CustomText
        style={{ fontSize: 18, color: design["Header_Title_Primary_Color"] }}
      >
        {i18n.t("My Information")}
      </CustomText>
    );
  };

  const headerRightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (isUpdateAble === true) {
            onUpdate();
          }
        }}
        disabled={isUpdateAble === true ? false : true}
      >
        <CustomText
          style={{
            color: isUpdateAble ? design["Header_Title_Primary_Color"] : "grey",
          }}
        >
          {i18n.t("Update")}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const onChangeLanguge = () => {
    changeLanguage(isEnglishLanguage ? "ar" : "en");
    setisEnglishLanguage(!isEnglishLanguage);
  };

  const { isVisible, user } = props;
  const { email } = user;
  return isVisible ? (
    <View style={styles.modalStyle}>
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
      <View
        style={{
          height: "100%",
        }}
      >
        <Header
          containerStyle={{
            borderBottomColor: design.Active_Tabs_Under_Line_Color,
            borderBottomWidth: 2,
          }}
          backgroundColor={
            design["Header_Background_Primary_Color"]
              ? design["Header_Background_Primary_Color"]
              : "white"
          }
          leftComponent={headerLeftComponent()}
          centerComponent={headerCenterComponent()}
          rightComponent={headerRightComponent()}
        />
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={[getFlipForRTLStyle()]}
        >
          {props?.user?.firstname == "" ? (
            <View style={[styles.infoRow]}>
              <CustomText style={styles.rowLabel}>
                {i18n.t("FIRST_NAME_STRING")}
              </CustomText>
              <InputField
                onChangeText={(v) => {
                  setfirstName(v);
                  setisUpdateAble(true);
                }}
                value={firstName}
                placeholder={i18n.t("FIRST_NAME_STRING")}
                style={{
                  ...styles.valueText,
                  height: 40,
                  color: design["Text_Primary_Color"],
                }}
              />
            </View>
          ) : (
            <View style={[styles.infoRow]}>
              <CustomText style={[styles.rowLabel]}>
                {i18n.t("FIRST_NAME_STRING")}
              </CustomText>
              <CustomText style={[styles.valueText]}>{firstName}</CustomText>
              <Ionicons
                name="lock-closed"
                size={20}
                style={{ marginLeft: 10 }}
                color={design["Text_Secondary_Color"]}
              />
            </View>
          )}

          {props?.user?.lastName == "" ? (
            <View style={styles.infoRow}>
              <CustomText style={styles.rowLabel}>
                {i18n.t("LAST_NAME_STRING")}
              </CustomText>
              <InputField
                onChangeText={(v) => {
                  setlastName(v);
                  setisUpdateAble(true);
                }}
                value={lastName}
                placeholder={i18n.t("LAST_NAME_STRING")}
                style={{
                  ...styles.valueText,
                  height: 40,
                  color: design["Text_Primary_Color"],
                }}
              />
            </View>
          ) : (
            <View style={styles.infoRow}>
              <CustomText style={styles.rowLabel}>
                {i18n.t("LAST_NAME_STRING")}
              </CustomText>
              <CustomText style={[styles.valueText]}>{lastName}</CustomText>
              <Ionicons
                name="lock-closed"
                size={20}
                style={{ marginLeft: 10 }}
                color={design["Text_Secondary_Color"]}
              />
            </View>
          )}

          <View style={styles.infoRow}>
            <CustomText style={styles.rowLabel}>{i18n.t("Email")}</CustomText>
            <CustomText
              style={[styles.valueText]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {email}
            </CustomText>
            <Ionicons
              name="lock-closed"
              size={20}
              style={{ marginLeft: 10 }}
              color={design["Text_Secondary_Color"]}
            />
          </View>

          <View style={styles.infoRow}>
            <CustomText style={styles.rowLabel}>
              {i18n.t("Date_of_birth")}
            </CustomText>
            <CustomText
              onPress={handleDatePickerOpen}
              placeholder={i18n.t("DD/MM/YYYY")}
              style={[styles.valueText]}
            >
              {dateOfBirth === moment().format("DD/MM/YYYY") ? "" : dateOfBirth}
            </CustomText>
          </View>
          <View style={styles.infoRow}>
            <CustomText style={styles.rowLabel}>
              {i18n.t("Nationality")}
            </CustomText>
            <CustomText
              placeholder="Choose your nationality"
              style={[styles.valueText]}
              onPress={() => {
                setnationalityModalVisible(true);
              }}
            >
              {selectedNationality}
            </CustomText>
          </View>

          <View style={styles.infoRow}>
            <CustomText style={styles.rowLabel}>
              {i18n.t("Country_of_residence")}
            </CustomText>
            <CustomText
              placeholder="Country"
              onPress={() => {
                makeAnalyticsStack("My Information", "select_country");
                setcountryModalVisible(true);
              }}
              style={[styles.valueText]}
            >
              {selectedCountry}
            </CustomText>
          </View>
          <View style={styles.infoRow}>
            <CustomText style={styles.rowLabel}>
              {i18n.t("Mobile_number")}
            </CustomText>
            <InputField
              keyboardType="number-pad"
              onChangeText={(v) => {
                setmobilePhone(v);
                setisUpdateAble(true);
              }}
              value={mobilePhone}
              placeholder={i18n.t("Mobile Number")}
              style={{
                ...styles.valueText,
                height: 40,
                color: design["Text_Primary_Color"],
              }}
            />
          </View>
          <View style={styles.infoRow}>
            <CustomText style={styles.rowLabel}>
              {i18n.t("Currency_Preference")}
            </CustomText>
            <CustomText
              placeholder="Currency"
              onPress={() => {
                makeAnalyticsStack("My Information", "select_currency");
                setcurrencyModalVisible(true);
              }}
              style={[styles.valueText]}
            >
              {selectedCurrency}
            </CustomText>
          </View>
          <View style={styles.infoRow}>
            <CustomText style={{ ...styles.rowLabel, flex: 1 }}>
              {i18n.t("Receive_Push_Notifications")}
            </CustomText>
            <Switch
              value={push_notifications}
              onValueChange={(v) => {
                makeAnalyticsStack(
                  "My Information",
                  "click_receive_notification"
                );
                setpush_notifications(v);
                setisUpdateAble(true);
              }}
            />
          </View>
        </ScrollView>
      </View>
      <CountryPicker
        selectedCountry={selectedCountry}
        handleDone={updateCountry}
        isVisible={countryModalVisible}
        title={i18n.t("COUNTRY_OF_RESI_STRING")}
        i18n={i18n}
        isRTL={isRTL}
      />
      <CountryPicker
        selectedCountry={selectedNationality}
        handleDone={updateNationality}
        isVisible={nationalityModalVisible}
        title={i18n.t("Nationality")}
        i18n={i18n}
        isRTL={isRTL}
      />
      <CurrencyPicker
        selectedCurrency={selectedCurrency}
        handleDone={updateCurrency}
        isVisible={currencyModalVisible}
      />
    </View>
  ) : null;
}
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    marginStart: 0,
    marginEnd: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: design["Background_Secondary_Color"],
    zIndex: 99999,
    ...StyleSheet.absoluteFillObject,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingLeft: 11,
    paddingRight: 11,
    height: 43,
    borderBottomColor: "rgb(230, 230, 230)",
  },
  rowLabel: {
    flex: 0.4,
    fontFamily: PRIMARY_BOLD,
    color: design["Text_Secondary_Color"],
  },
  valueText: {
    flex: 0.6,
    textAlign: "right",
  },
});

export default withTransation(EditAccountModal);
