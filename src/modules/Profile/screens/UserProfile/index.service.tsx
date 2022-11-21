import React, { useEffect, useState } from "react";
import { StyleSheet, BackHandler } from "react-native";
//analytics
import { makeStackMongo } from "@utils/horizonAnalytics";
//redux implementation
import { useDispatch } from "react-redux";
import {
  setAppLoading,
  setErrorObject,
  setSkipMode,
} from "@redux/appReducer/app.actions";
import {
  getProfileRequest,
  uploadProfileImageRequest,
} from "@Profile/redux/actions";

import { userDefaultObj } from "@utils/commons";
import { useNavigation } from "@react-navigation/native";
import { AppActionTypes } from "@redux/appReducer/app.types";
import { useAppSelector } from "@redux/root-reducer";
import UILayout from "./layout.json";
import { updateLayoutRequest } from "@Home/redux/actions";

const ProfileService = ({ children }: any) => {
  const [layout, updateLayout] = useState(UILayout);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //selector
  const appConfigs = useAppSelector((state) => state.appReducer?.AppConfigs);
  const skipMode = useAppSelector((state) => state.appReducer?.skipMode);
  const deviceInfo = useAppSelector((state) => state.appReducer?.deviceInfo);
  const token = useAppSelector((state) => state.userReducer?.token);
  const user = useAppSelector(
    (state) => state.userReducer.userInfo || userDefaultObj
  );

  let LocationList = useAppSelector(
    (state) => state.locationReducer?.LocationList
  );
  let locationIndex = useAppSelector(
    (state) => state.locationReducer?.locationIndex
  );
  let location =
    LocationList?.length > 0 && locationIndex >= 0
      ? LocationList[locationIndex]
      : { id: 1 };
  const onSetAppLoading = (loading: Boolean) =>
    dispatch(setAppLoading(loading));
  const onSetSkipMode = (value: Boolean) => dispatch(setSkipMode(value));
  const onGetProfileRequest = (data: any) => dispatch(getProfileRequest(data));
  const onUploadProfileImageRequest = (data: any) =>
    dispatch(uploadProfileImageRequest(data));
  const onSetErrorObject = (error: any) => dispatch(setErrorObject(error));

  const onUpdateLayoutRequest = () =>
    dispatch(
      updateLayoutRequest({
        postData: {
          data: JSON.stringify(layout),
          path: "./src/modules/Profile/screens/UserProfile/layout.json",
        },
      })
    );

  //useEffect
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      if (skipMode) {
        onSetAppLoading(true);
        setTimeout(() => {
          onSetSkipMode(false);
          onSetAppLoading(false);
        }, 500);
      }
    });
    try {
      makeAnalyticsStack(
        "My Profile",
        "open",
        "",
        "",
        "",
        location ? location.id : 1,
        true
      );
    } catch (e) {
      onSetAppLoading(false);
      onSetErrorObject({ status: true, message: e.message });
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      subscribe();
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  //SagaCalls
  const refreshProfile = () => {
    makeAnalyticsStack(
      "My Profile",
      "click_refresh",
      "",
      "",
      "",
      location.id,
      false
    );

    const language = deviceInfo.language;
    const currency = user.currency ? user.currency : appConfigs.defaultCurrency;

    onGetProfileRequest({
      postData: {
        token,
        language,
        currency,
      },
    });
  };
  const onTakePhoto = async (file: any) => {
    const photoFile = {
      uri: file.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    };

    onUploadProfileImageRequest({
      postData: {
        token: token,
        profile_image: photoFile,
      },
      refreshProfile,
    });
  };

  const handleBackButton = () => {
    onSetAppLoading(false);
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      BackHandler.exitApp();
    }
    return true;
  };

  const onClickSetting = async () => {
    await makeAnalyticsStack(
      "My Profile",
      "click_edit",
      "",
      "",
      "",
      location?.id || 1,
      true
    );
    await makeAnalyticsStack(
      "Account",
      "open",
      "",
      "",
      "",
      location?.id || 1,
      true
    );
    navigation.navigate("Preference");
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
  const onPressRightButton = () => {
    onClickSetting();
  };

  const onPressLeftButtonHandler = () => {
    refreshProfile();
  };

  const onCameraClick = (file) => {
    onTakePhoto(file);
  };

  const onClickViewBreakDown = async () => {
    await makeAnalyticsStack(
      "My Profile",
      "click_savings_breakdown",
      "",
      "",
      "",
      location.id,
      false
    );
    navigation.navigate("SavingBreakdown");
  };

  const currUser = user || userDefaultObj;
  const currency = currUser?.currency || appConfigs.defaultCurrency;
  return children({
    onPressLeftButtonHandler,
    onPressRightButton,
    makeAnalyticsStack,
    refreshProfile,
    setRefreshing,
    onCameraClick,
    onClickViewBreakDown,
    refreshing,
    location,
    currUser,
    currency,
    layout,
    updateLayout,
    onUpdateLayoutRequest,
  });
};

export default ProfileService;

const styles = StyleSheet.create({});
