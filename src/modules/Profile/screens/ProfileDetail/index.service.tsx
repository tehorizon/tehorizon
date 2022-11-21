import { useState } from "react";
import { userDefaultObj } from "@utils/commons";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { useAppSelector } from "@redux/root-reducer";
import moment from "moment";
import appConfigs from "@fast_track/src/AppConfig.json";
import { Platform } from "react-native";
import {
  accountInfoRequest,
  deleteAccountRequest,
  getProfileRequest,
  updateProfileRequest,
} from "@Profile/redux/actions";
import { ProfileDetails } from "@Profile/interfaces";
//analytics
import { makeStackMongo } from "@utils/horizonAnalytics";

const DetailsService = ({ children, navigation }: any) => {
  const route = useRoute();
  //redux states
  const user = useAppSelector(
    (state) => state.userReducer.userInfo || userDefaultObj
  );
  const token = useAppSelector((state) => state.userReducer.token);
  const deviceInfo = useAppSelector((state) => state.appReducer.deviceInfo);

  //states
  const [selectedCountry, setselectedCountry] = useState(
    user?.country_of_residence
  );
  const [selectedNationality, setselectedNationality] = useState(
    user?.nationality
  );

  const [firstName, setfirstName] = useState(user?.firstname);
  const [lastName, setlastName] = useState(user?.lastname);
  const [countryModalVisible, setcountryModalVisible] = useState(false);
  const [nationalityModalVisible, setnationalityModalVisible] = useState(false);
  const [mobilePhone, setmobilePhone] = useState(user?.mobile_phone);
  const [selectedCurrency, setselectedCurrency] = useState(user?.currency);
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [currencyModalVisible, setcurrencyModalVisible] = useState(false);
  const [isUpdateAble, setisUpdateAble] = useState(false);
  const [dateOfBirth, setdateOfBirth] = useState(
    user.date_of_birth === ""
      ? moment().format("DD/MM/YYYY")
      : user.date_of_birth
  );

  //Actions
  const dispatch = useDispatch();
  const onAccountInfoRequest = (data: any) =>
    dispatch(accountInfoRequest(data));
  const onDeleteAccountRequest = (data: any) =>
    dispatch(deleteAccountRequest(data));
  const onUpdateProfileRequest = (data: any) =>
    dispatch(updateProfileRequest(data));
  const onGetProfileRequest = (data: any) => dispatch(getProfileRequest(data));

  //saga calls
  const getProfile = () => {
    onGetProfileRequest({
      postData: {
        token: token,
        currency: user?.currency || appConfigs.defaultCurrency,
        language: deviceInfo.language,
      },
    });
  };

  const updateCountry = (country) => {
    console.log(country, "country");

    country != "" && setselectedCountry(country);
    setcountryModalVisible(false);
    // setisUpdateAble(true);
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

  const hideDatePicker = (newDate: string) => {
    if (Platform.OS != "android") {
      setdateOfBirth(
        moment(newDate, "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD/MM/YYYY")
      );
      setisDatePickerVisible(false);
      setisUpdateAble(true);
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

  const onCountryPress = () => {
    makeAnalyticsStack("My Information", "select_country");
    setcountryModalVisible(true);
  };

  const onNationalityPress = () => {
    makeAnalyticsStack("My Information", "select_nationality");
    setnationalityModalVisible(true);
  };

  const onCurrencyPress = () => {
    makeAnalyticsStack("My Information", "select_currency");
    setcurrencyModalVisible(true);
  };

  const deleteAcccount = () => {
    const postData = {
      token,
    };
    onAccountInfoRequest({
      postData,
      deleteAccountCall: () => onDeleteAccountRequest({ postData }),
    });
  };

  const onUpdate = async () => {
    makeAnalyticsStack("My Information", "click_update");
    let postData: object = {
      token,
      firstname: firstName,
      lastname: lastName,
      country_of_residence: selectedCountry,
      currency: selectedCurrency,
      mobile_phone: mobilePhone,
      nationality: selectedNationality,
      language: deviceInfo.language,
    };
    const selectedDate = dateOfBirth;
    const todayDate = moment().format("DD/MM/YYYY");
    if (selectedDate !== todayDate) {
      postData = {
        ...postData,
        date_of_birth: moment(dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD"),
      };
    }
    onUpdateProfileRequest({
      postData,
      showLoading: true,
      navigation,
      callBack: () => getProfile(),
    });
  };

  return children({
    selectedCountry,
    selectedNationality,
    user,
    nationalityModalVisible,
    countryModalVisible,
    firstName,
    lastName,
    mobilePhone,
    selectedCurrency,
    isDatePickerVisible,
    currencyModalVisible,
    appConfigs,
    dateOfBirth,
    navigation,
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
  } as ProfileDetails);
};

export default DetailsService;
