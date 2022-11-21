import React, { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";
import i18n, { isRTL } from "@localization";
import { userDefaultObj } from "@utils/commons";

//analytics
import { makeStackMongo } from "@utils/horizonAnalytics";
import { useDispatch } from "react-redux";
import {
  setAppLoading,
  setErrorObject,
  setAppValues,
  logoutSuccess,
} from "@redux/appReducer/app.actions";
import UserProfileBL from "../../BL";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  getProfileRequest,
  logoutRequest,
  forgotPasswordRequest,
  deleteAccountRequest,
  accountInfoRequest,
  updateProfileRequest,
} from "@Profile/redux/actions";
import { useAppSelector } from "@redux/root-reducer";
import UILayout from "./layout.json";
import { updateLayoutRequest } from "@Home/redux/actions";
import * as StoreReview from "expo-store-review";
import {
  helpAndChatURL,
  rulesOfUserURL,
  ppURL,
  eulaURL,
  hotelRuleOfuse,
  subscriptionAvialable,
  chat,
  cashless,
} from "@fast_track/src/AppConfig.json";

const PreferenceService = ({ children }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //redux states
  const appConfigs = useAppSelector((state) => state.appReducer.AppConfigs);
  const instructions = useAppSelector(
    (state) => state.appReducer?.AppConfigs?.instructions_list
  );
  const deviceInfo = useAppSelector((state) => state.appReducer.deviceInfo);
  const token = useAppSelector((state) => state.userReducer.token);
  const user = useAppSelector(
    (state) => state.userReducer.userInfo || userDefaultObj
  );
  const homeCategoryList = useAppSelector(
    (state) => state.homeReducer?.categoryList
  );
  const route = useRoute();

  //loacl states
  const [layout, updateLayout] = useState(UILayout);
  const [isEditAccountVisible, setisEditAccountVisible] = useState(false);
  const [showIntro, setshowIntro] = useState(false);
  const [showInstructionsView, setShowInstructionsView] = useState(false);
  const [isResetPasswordModalVisible, setisResetPasswordModalVisible] =
    useState(false);
  const [isResetSuccessModalVisible, setisResetSuccessModalVisible] =
    useState(false);
  const [doneMessage, setdoneMessage] = useState("");
  const [travel_key, setTravel_key] = useState(false);
  const [showWebView, setshowWebView] = useState(false);
  const [webviewURL, setwebviewURL] = useState("");
  const [webViewTitle, setwebViewTitle] = useState("");
  const [pushNotification, setpushNotifications] = useState(
    user.push_notifications && true
  );

  //actions
  const onGetProfileRequest = (data: any) => dispatch(getProfileRequest(data));
  const onLogoutRequest = (data: any) => dispatch(logoutRequest(data));
  const onSetAppLoading = (loading: Boolean) =>
    dispatch(setAppLoading(loading));
  const onForgotPasswordRequest = (data: any) =>
    dispatch(forgotPasswordRequest(data));
  const logout = () => dispatch(logoutSuccess());
  const onSetAppValues = (data: any) => dispatch(setAppValues(data));
  const onSetErrorObject = (error: any) => dispatch(setErrorObject(error));
  const onDeleteAccountRequest = (data: any) =>
    dispatch(deleteAccountRequest(data));
  const onAccountInfoRequest = (data: any) =>
    dispatch(accountInfoRequest(data));
  const onUpdateProfileRequest = (data: any) =>
    dispatch(updateProfileRequest(data));

  //cDm
  useEffect(() => {
    try {
      const language = isRTL ? "ar" : "en";
      let queryParams = "?language=" + language;
      if (!appConfigs.is_live_chat_enabled) {
        queryParams = queryParams + "&no_chat=true";
      }
      let travelAvailable = false;
      homeCategoryList.map((category) => {
        if (category.api_name === "Travel") {
          travelAvailable = true;
        }
      });
      setTravel_key(travelAvailable);
    } catch (e) {
      onSetErrorObject({ status: true, message: e.message });
    }
  }, []);

  // backhadler
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (showWebView) {
          disableWebView();
          return true;
        } else if (isResetPasswordModalVisible) {
          setisResetPasswordModalVisible(false);
          return true;
        } else {
          onSetAppLoading(false);
          navigation.goBack();
          return true;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [showWebView, isResetPasswordModalVisible])
  );

  useEffect(() => {
    let type = route?.params?.type;
    switch (type) {
      case "help":
        openHelp();
        break;
      case "tutorial":
        showInstructions();
        break;
      case "ruleofuse":
        openRuleOfUse();
        break;
      case "eula":
        openUserLicense();
        break;
      case "rateapp":
        rateApp();
        break;
      case "myinformation":
        editProfile();
        break;
      default:
      // nothing to handle
    }
  }, [route?.params?.type]);

  //SagaCalls
  const getProfile = (data: Object) => {
    onGetProfileRequest({
      postData: {
        token: token,
        currency: data.currency || appConfigs.defaultCurrency,
        language: deviceInfo.language,
      },
    });
  };

  const onUpdateLayoutRequest = () =>
    dispatch(
      updateLayoutRequest({
        postData: {
          data: JSON.stringify(layout),
          path: "./src/modules/Profile/screens/UserPreferences/layout.json",
        },
      })
    );
  const onLogout = () =>
    onLogoutRequest({
      postData: {
        token,
      },
    });

  const resetPassword = () => {
    setisResetPasswordModalVisible(false);
    onForgotPasswordRequest({
      postData: {
        token,
        email: user.email,
        language: deviceInfo.language,
      },
      setIsResetSuccessModalVisible: setisResetSuccessModalVisible,
      setDoneMessage: setdoneMessage,
    });
  };

  const onUpdateHandler = async (data: any) => {
    try {
      onSetAppLoading(true);
      makeAnalyticsStack("My Information", "click_update");
      await UserProfileBL.updateProfile({
        token,
        ...data,
      });

      await getProfile(data);
      return true;
    } catch (error) {
      let parsedError = JSON.parse(error.message);
      if (parsedError.status === 403 || parsedError.status === 401) {
        onSetAppLoading(false);
        logout();
      } else {
        onSetAppValues({
          isLoading: false,
          errorObject: { status: true, message: parsedError.error },
        });
      }
      return false;
    }
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

  const onClickWebView = (url: string, title: string) => {
    setshowWebView(true);
    setwebViewTitle(title);
    setwebviewURL(url);
  };

  const openHelp = () => {
    makeAnalyticsStack("Preferences", "select_help");
    let title = i18n.t(`Help${chat ? " & Live Chat" : ""}`);
    onClickWebView(helpAndChatURL, title);
  };

  const openRuleOfUse = () => {
    makeAnalyticsStack("Account", "select_rules_of_use");
    let title = i18n.t("Rules of Use");
    onClickWebView(rulesOfUserURL, title);
  };

  const disableWebView = () => {
    setshowWebView(false);
  };

  const showInstructions = async () => {
    makeAnalyticsStack("Account", "select_instructions");
    setShowInstructionsView(true);
  };

  const openHotelRule = () => {
    makeAnalyticsStack("Account", "select_hotel_rules_of_use");

    let title = i18n.t("Hotel Rule of Use");
    onClickWebView(hotelRuleOfuse, title);
  };

  const openPrivacyPolicy = () => {
    let title = i18n.t("Privacy Policy");
    onClickWebView(ppURL, title);
  };

  const openUserLicense = () => {
    makeAnalyticsStack("Account", "select_user_agreement");
    let title = i18n.t("End User License Agreement");
    onClickWebView(eulaURL, title);
  };

  const hideInstructionsView = () => {
    setShowInstructionsView(!showInstructionsView);
  };

  const hideEditAccountModal = () => {
    makeAnalyticsStack("My Information", "click_cancel");
    setisEditAccountVisible(false);
  };

  const showResetPasswordModal = () => {
    makeAnalyticsStack("Preferences", "click_reset_password");
    // setisResetPasswordModalVisible(true);
    navigation.navigate("ChangePassword");
  };

  const hideResetPasswordModal = () => {
    setisResetPasswordModalVisible(false);
  };

  const onPressActionSheetHandler = (index: number) => {
    switch (index) {
      case 0:
        onLogout();
        break;
      case 1:
        break;
    }
  };

  const subscriptionPress = () => {
    navigation.navigate("Subscription");
  };

  const rateApp = async () => {
    try {
      const isAvailableAsync = await StoreReview.isAvailableAsync();
      if (isAvailableAsync) {
        makeAnalyticsStack("Rate Card", "click_rate");
        StoreReview.requestReview();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editProfile = useCallback(() => {
    makeAnalyticsStack("Account", "select_my_information");
    navigation.navigate("ProfileDetail");
    // setisEditAccountVisible(true);
  }, []);
  const { email, profile_image } = user || userDefaultObj;

  const deleteAcccount = () => {
    const postData = {
      token,
    };
    onAccountInfoRequest({
      postData,
      deleteAccountCall: () => onDeleteAccountRequest({ postData }),
    });
  };

  const onChangeNotificationValue = (value: boolean) => {
    makeAnalyticsStack("My Information", "click_receive_notification");
    const postData = {
      token,
      push_notifications: value ? 1 : 0,
      country_of_residence: user.country_of_residence,
      currency: user.currency,
      language: deviceInfo.language,
    };
    onUpdateProfileRequest({
      postData,
      callBack: () => getProfile({ postData }),
    });
    setpushNotifications(value);
  };

  return children({
    data: {
      instructions,
      showInstructionsView,
      profile_image,
      email,
      navigation,
      rulesOfUserURL,
      travel_key,
      eulaURL,
      helpAndChatURL,
      ppURL,
      appConfigs,
      user,
      userDefaultObj,
      doneMessage,
      isResetSuccessModalVisible,
      webviewURL,
      webViewTitle,
      showWebView,
      isEditAccountVisible,
      isResetPasswordModalVisible,
      layout,
      subscriptionAvialable,
      chat,
      cashless,
      showIntro,
      pushNotification,
    },
    callbacks: {
      setshowIntro,
      hideInstructionsView,
      makeAnalyticsStack,
      editProfile,
      showResetPasswordModal,
      subscriptionPress,
      openHelp,
      showInstructions,
      openRuleOfUse,
      openHotelRule,
      openUserLicense,
      openPrivacyPolicy,
      onUpdateHandler,
      hideEditAccountModal,
      resetPassword,
      hideResetPasswordModal,
      setisResetSuccessModalVisible,
      disableWebView,
      onPressActionSheetHandler,
      updateLayout,
      onUpdateLayoutRequest,
      rateApp,
      deleteAcccount,
      onChangeNotificationValue,
    },
  });
};

export default PreferenceService;
