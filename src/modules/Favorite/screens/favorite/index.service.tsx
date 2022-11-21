import { makeStackMongo } from "@utils/horizonAnalytics";
import { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { ScreenTypes } from "../../interfaces";
import { useAppSelector } from "@redux/root-reducer";
import {
  logoutSuccess,
  setAppLoading,
  setSkipMode,
} from "@redux/appReducer/app.actions";
import { useDispatch } from "react-redux";
import { setMerchantData } from "@Outlet/redux/actions";
import { AppActionTypes } from "@redux/appReducer/app.types";
import { locationDataType } from "@Home/BL/Interfaces";

const FavoriteService = ({ children, navigation }: ScreenTypes.screen) => {
  // reducers

  let skipMode = useAppSelector((state) => state?.appReducer?.skipMode);
  let userId = useAppSelector(
    (state) => state?.userReducer?.userInfo?.userId || null
  );
  let locationList = useAppSelector(
    (state) => state?.locationReducer?.LocationList
  );

  let favouriteList = useAppSelector(
    (state) => state?.outletReducer?.favouriteList || {}
  );
  let favourite = favouriteList[userId] || {};

  const dispatch = useDispatch(); // dispatch action to reducer

  // dispach
  // const onSetSelectedOutlet = (data) => dispatch(setSelectedOutlet(data));
  const onSetAppLoading = (status: boolean) => dispatch(setAppLoading(status));
  const onSetSkipMode = (value: Boolean) => dispatch(setSkipMode(value));

  // cDM, add listeners
  useEffect(() => {
    getListAndMakeAnalytics();

    // listeners
    navigation?.addListener("focus", getListAndMakeAnalytics);
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    // componentWillUnmount
    return () => {
      navigation?.removeListener("focus", getListAndMakeAnalytics);
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const getListAndMakeAnalytics = useCallback(() => {
    makeAnalyticsStack("Favourites", "open", "", "", "", 0, true);
    if (skipMode) {
      onSetAppLoading(true);
      setTimeout(() => {
        onSetSkipMode(false);
        onSetAppLoading(false);
      }, 500);
    }
  }, []);

  const makeAnalyticsStack = useCallback(
    async (
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
    },
    []
  );

  const handleBackButton = useCallback(() => {
    onSetAppLoading(false);
    if (navigation?.canGoBack()) {
      navigation.goBack();
    } else {
      BackHandler.exitApp();
    }
    return true;
  }, [navigation]);

  const onfavouriteClick = (data: any, locationName: string) => {
    const { deliveryMerchant, selectedOutlet } = data;
    makeAnalyticsStack("Favourites", "select_favourites", "", "", "", 0, false);

    if (deliveryMerchant) {
      // onSetSelectedOutlet(selectedOutlet);
      navigation?.navigate("DeliveryOutletDetail", {
        outletParams: selectedOutlet,
        favourite: true,
      });
    } else {
      navigation?.navigate("Merchant", {
        screen: "MerchantScreen",
        params: {
          ...data,
          favourite: true,
          location: locationList.find(
            (item: locationDataType) => item.name == locationName
          ),
        },
      });
    }
  };

  return children({
    onfavouriteClick,
    favourite,
    navigation,
  } as ScreenTypes.Favorite);
};

export default FavoriteService;
