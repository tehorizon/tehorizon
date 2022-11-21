import { useEffect } from "react";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { selectSkipMode } from "@redux/appReducer/app.selectors";
import { useNavigation } from "@react-navigation/core";
import { makeStackMongo } from "@utils/horizonAnalytics";
import { logoutSuccess } from "@redux/appReducer/app.actions";
import { ScreenTypes } from "@Auth/interfaces";

const NotificationService = ({ children }: any) => {
  const navigation = useNavigation();
  const skipMode = useSelector(selectSkipMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBackButton = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        BackHandler.exitApp();
      }
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const onInitialRender = async () => {
    const asyncObject = await AsyncStorage.multiGet(["token", "location"]);
    skipModeCheck();
    const location = JSON.parse(asyncObject[1][1]);
    const locationID = location === null ? 0 : location.id;
    makeAnalyticsStack("Notifications", "open", "", "", "", locationID, true);
  };

  const skipModeCheck = async () => {
    if (skipMode) {
      dispatch(logoutSuccess());
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
    //resetStackObject();
    // const dataStack = await getStackArrayMongo();
  };
  return children({
    navigation,
  } as ScreenTypes.screen);
};

export default NotificationService;
