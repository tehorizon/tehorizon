import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  AppState,
  Linking,
  NativeModules,
  Platform,
} from "react-native";
import { HomeScreenProps, homeSection } from "../../interfaces";
import { useDispatch } from "react-redux";
import Config from "react-native-config";
import appboy from "@HybridComponents/AppBoy";
const { registerSelectedLocation } = appboy;
import { makeStackMongo, updateSessions } from "@utils/horizonAnalytics";
import {
  setHomeSelectedLocation,
  setUserCurrentLocation,
} from "@redux/location/location.actions";
import {
  logoutSuccess,
  setAppLoading,
  setDemographicVisible,
  setErrorObject,
  setWebViewObject,
} from "@redux/appReducer/app.actions";
import {
  homeNearestRequest,
  homeRequest,
  locationListRequest,
  updateLayoutRequest,
} from "@Home/redux/actions";
import { useNavigation, useRoute } from "@react-navigation/native";
import useGeoLocationFetch from "@commons/hooks/useGeoLocationFetch";

import { BottomSheetRef } from "@components/BottomSheet";
import { useAppSelector } from "@redux/root-reducer";
import {
  getLayoutFromArray,
  getSortedLayout,
  usePrevious,
} from "@fast_track/src/utils";
import UILayout from "./layout.json";
import { isRTL } from "@localization";
import { DragnDropLayout } from "@fast_track/src/AppConfig.json";
import { useLinkTo } from "@utils";
import LocationList from "@Home/components/locations";

let isLocationPermissionBlocked = false;
export default (props: any) => {
  //hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const appState = useRef(AppState.currentState);
  const linkto = useLinkTo();
  const [locationGranted, updateLocationStatus] = useState(false);
  const geoLocationFetch = useGeoLocationFetch(
    (location, isPermissionBlocked) => {
      updateLocationStatus(typeof location?.coords != "undefined");
      if (location) onSetUserCurrentLocation(location);
      else if (isPermissionBlocked) goToSettingAlert();
    }
  );

  const checkGeoLocation = useGeoLocationFetch(
    (location, isPermissionBlocked) => {
      updateLocationStatus(typeof location?.coords != "undefined");

      if (location) onSetUserCurrentLocation(location);
      else if (isPermissionBlocked) {
        if (isLocationPermissionBlocked) {
          // setIsLocationPermissionBlocked(false);
          isLocationPermissionBlocked = false;
        } else {
          isLocationPermissionBlocked = true;
          // setIsLocationPermissionBlocked(true);
          handleLocationPermissionApproval(true);
        }
      }
    }
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        if (isLocationPermissionBlocked) {
          checkGeoLocation();
        }
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  ///Selectors ------------
  const user = useAppSelector((state) => state.userReducer.userInfo);

  let LocationList = useAppSelector(
    (state) => state.locationReducer?.LocationList
  );
  let locationIndex = useAppSelector(
    (state) => state.locationReducer?.locationIndex
  );
  let selectedLocation =
    LocationList?.length > 0 && locationIndex >= 0
      ? LocationList[locationIndex]
      : null;
  const currentLocation = useAppSelector(
    (state) => state?.locationReducer?.currentLocation
  );
  const selectedLocationList = useAppSelector(
    (state) => state.locationReducer?.LocationList ?? []
  );

  const location = selectedLocation;

  const locationList = useAppSelector(
    (state) => state.locationReducer.LocationList
  );

  const token = useAppSelector((state) => state.userReducer.token);
  const AppConfigs = useAppSelector((state) => state.appReducer.AppConfigs);
  const skipMode = useAppSelector((state) => state.appReducer.skipMode);
  const deviceInfo = useAppSelector((state) => state.appReducer.deviceInfo);
  const home_sections = useAppSelector(
    (state) => state.homeReducer?.homeSections || []
  );
  const upgradeSection = useAppSelector((state) => state.homeReducer?.upgrade);

  ///States ------------
  const [homeSections, setHomeSections] =
    useState<Array<homeSection>>(home_sections);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowScreenIntro, setIsShowScreenIntro] = useState(false);
  const [isOpenLocationModal, setIsOpenLocationModal] = useState(false);
  const [isOpenLocationPermissionModal, setOpenLocationPermissionModal] =
    useState(false);
  // const [isLocationPermissionBlocked, setIsLocationPermissionBlocked] =
  //   useState(false);

  // Saga calls
  const invokeHomeApi = async (id: number) =>
    dispatch(
      homeRequest({
        token: token,
        postData: {
          token: token,
          currency: user ? user.currency : AppConfigs.defaultCurrency,
          locationID: id,
        },
        location_id: id,
        lat: currentLocation?.coords?.latitude,
        lng: currentLocation?.coords?.longitude,
        checkDemographic,
      })
    );
  const invokeNearestApi = async () =>
    dispatch(
      homeNearestRequest({
        token: token,
        category: "",
        location_id: location?.id,
        lat: currentLocation?.coords?.latitude,
        lng: currentLocation?.coords?.longitude,
      })
    );

  const getLocationList = async () =>
    dispatch(
      locationListRequest({
        postData: {
          token: token,
        },
      })
    );

  const onSetErrorObject = (errorObj: any) =>
    dispatch(setErrorObject(errorObj));
  const onSetHomeSelectedLocation = (index: number) =>
    dispatch(setHomeSelectedLocation(index));
  const onSetUserCurrentLocation = (location: any) =>
    dispatch(setUserCurrentLocation(location));
  const onSetAppLoading = (loading: Boolean) =>
    dispatch(setAppLoading(loading));
  const onSetWebViewObject = (obj: any) => dispatch(setWebViewObject(obj));

  const onUpdateLayoutRequest = () =>
    dispatch(
      updateLayoutRequest({
        postData: {
          data: JSON.stringify(
            getLayoutFromArray(UILayout, homeSections, "section_identifier")
          ),
          path: "./src/modules/Home/screens/Home/layout.json",
        },
      })
    );

  //refrences
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const locationListRef = useRef<LocationList>();
  const offset = useRef(new Animated.Value(0)).current;

  // cDM
  useEffect(() => {
    if (bottomSheetRef.current) {
      if (isOpenLocationModal) bottomSheetRef?.current?.open();
      else bottomSheetRef.current.close();
    }
  }, [isOpenLocationModal]);

  // cDM, listner to homsections global
  useEffect(() => {
    if (DragnDropLayout) {
      setHomeSections(
        getSortedLayout(UILayout, [...home_sections], "section_identifier")
      );
    } else {
      setHomeSections(home_sections);
    }
  }, [home_sections]);

  // cDM, lister to deeplink
  useEffect(() => {
    if (route?.params?.type == "locations") {
      onOpenLocation();
    }
    // else if (route?.params?.type == "getaway") {
    //   invokeTravelSdk({ deeplink: route?.params?.code });
    // }
  }, [route?.params?.type, route?.params?.code]);

  //cDM listner to current location
  useEffect(() => {
    location?.id && currentLocation?.coords?.latitude && invokeNearestApi();
  }, [
    currentLocation?.coords?.latitude,
    currentLocation?.coords?.longitude,
    location?.name,
  ]);

  //Functions---------------

  const onCloseLocationModal = () => {
    setIsOpenLocationModal(false);
  };
  const onOpenLocationModal = () => {
    setIsOpenLocationModal(true);
  };
  const onSetDemographicVisible = (obj: any) =>
    dispatch(setDemographicVisible(obj));

  const onSearchClickHandler = useCallback(() => {
    let stateLocation =
      selectedLocation === null ? { id: 0 } : selectedLocation;

    makeAnalyticsStack(
      "Quick Search",
      "Open",
      "",
      "",
      "",
      stateLocation.id,
      false
    );
    if (selectedLocation === null) {
    } else {
      navigation?.navigate("Search", {
        screen: "SearchScreen",
        params: {},
      });
    }
  }, [selectedLocation]);

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

  const onOpenLocation = useCallback(async () => {
    if (!locationList) {
      getLocationList();
    } else {
      makeAnalyticsStack;
      const stackData = {
        current_screen: "Home",
        action: "click_location",
      };
      await makeStackMongo(stackData);
    }
    onOpenLocationModal();
  }, [locationList]);

  const handleUpgrade = useCallback(() => {
    if (skipMode === true) {
    } else {
      let stateLocation =
        selectedLocation === null ? { id: 0 } : selectedLocation;
      const company = AppConfigs.company;
      const language = deviceInfo.language;
      const app_version = AppConfigs.appVerison;
      const altToken = "dummy";
      const cid = user.userId;
      const bundleId = Config.BUNDLE_ID;
      const platform = deviceInfo.device_os;
      const __platform = deviceInfo.device_os;
      const device_platform = deviceInfo.device_os;
      const location_id = stateLocation.id;
      const query = `&company=${company}&wlcompany=${company}&language=${language}&app_version=${app_version}&altoken=${altToken}&cid=${cid}&bundleId=${bundleId}&platform=${platform}&__platform=${__platform}&device_platform=${device_platform}&location_id=${location_id}&__t=${props.userSessionToken}`;
      const cart_url = AppConfigs.cart_url;

      onSetWebViewObject({
        status: true,
        url: cart_url + query,
        headerText: "",
      });
    }
  }, [selectedLocation, AppConfigs]);

  const ErrorHandler = useCallback((data: any) => {
    const { error, message } = data;
    const errorObj = {
      status: error,
      message,
    };
    onSetErrorObject(errorObj);
  }, []);

  const invokeTravelSdk = useCallback(() => {
    navigation.navigate("Travel");
  }, [navigation]);

  const invokeAttractionSdk = useCallback(() => {
    navigation.navigate("Attractions");
  }, [navigation]);

  const makeCustomAnalyticsStack = async (stackData: any) => {
    await makeStackMongo(stackData);
  };

  //This is for handling navigation
  const handleNavigation = (object: any) => {
    const { type, data } = object;
    if (type === "onCategoryClicked") {
      navigation?.navigate("Outlet", {
        screen: "OutletScreen",
        params: { category: data },
      });
    }
  };

  const onCategoryClickHandler = useCallback(
    async (category: any) => {
      if (category.api_name === "Travel") {
        invokeTravelSdk();
      } else if (category.api_name === "AttractionWorld") {
        invokeAttractionSdk();
      } else {
        const navInfo = {
          type: "onCategoryClicked",
          data: category,
        };
        handleNavigation(navInfo);
      }
      const stackData = {
        current_screen: "Home",
        action: "select_category",
        category_id: category.category_id + "",
        categories: category.analytics_category_name,
        categories_analytics: category.analytics_category_name,
        location_id: selectedLocation?.id ?? 0,
        changeSequenceNumber: false,
      };
      makeCustomAnalyticsStack(stackData);
    },
    [selectedLocation]
  );

  const onFeaturedTileClickHandler = useCallback(
    (featured: any) => {
      try {
        let stateLocation =
          selectedLocation === null ? { id: 0 } : selectedLocation;

        const stackData = {
          current_screen: "Home",
          action: `click_${featured.section_identifier}`,
          category_id: "",
          categories: "",
          categories_analytics: "",
          entity_id: featured.id,
          location_id: stateLocation.id,
          changeSequenceNumber: false,
        };
        makeCustomAnalyticsStack(stackData);
        linkto(featured.deep_link || "-");
      } catch (error) {
        console.log(error);
      }
    },
    [selectedLocation]
  );

  const onDoneHanlder = useCallback(
    (index) => {
      setTimeout(() => {
        onLocationChangeHandler(index);
      }, 100);
      onCloseLocationModal();
    },
    [location]
  );

  const goToSettingAlert = useCallback(async () => {
    setOpenLocationPermissionModal(true);
  }, []);

  const handleLocationPermissionApproval = (isAllow: boolean) => {
    if (isAllow) {
      if (Platform.OS == "ios") {
        Linking.openURL("app-settings:");
      } else if (Platform.OS == "android") {
        let AndroidOpenSettings = require("react-native-android-open-settings");
        AndroidOpenSettings.appDetailsSettings();
      }
    } else {
      onSetUserCurrentLocation({ coords: { latitude: 0, longitude: 0 } });
    }
    setOpenLocationPermissionModal(false);
  };

  const checkDemographic = useCallback(async () => {
    try {
      if (user) {
        onSetDemographicVisible({
          screenName: "home_screen",
          isDemographicUpdated: user.demographicsUpdated,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const onOkayPressHandler = useCallback(() => {
    setIsShowScreenIntro(false);
    onOpenLocationModal();
  }, []);

  const setSelectedLocation = useCallback(
    (location: any) => {
      invokeHomeApi(location?.id);
    },
    [location?.name]
  );

  const onLocationChangeHandler = (index: number) => {
    onSetHomeSelectedLocation(index);
    geoLocationFetch();

    let location = LocationList?.length ? LocationList[index] : {};
    try {
      registerSelectedLocation(location.name);
    } catch (error) {}

    const stackData = {
      current_screen: "Home",
      action: "select_location",
      category_id: "",
      categories: "",
      categories_analytics: "",
      location_id: location?.id ?? 0,
      changeSequenceNumber: false,
    };

    makeCustomAnalyticsStack(stackData);
    setSelectedLocation(location);
    const navInfo = {
      type: "locationChange",
      data: location,
    };
    handleNavigation(navInfo);
  };

  useEffect(() => {
    if (selectedLocation !== null) {
      geoLocationFetch();
    } else {
      setIsShowScreenIntro(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      updateSessions(user.userId, location?.id || 0);
    }

    getLocationList();

    makeAnalyticsStack("Home", "open", "", "", "", location?.id || 0, true);

    onSetAppLoading(false);
  }, []);

  // cDM, updateLocationData && Home Data
  useEffect(() => {
    locationIndex >= 0 && onLocationChangeHandler(locationIndex);
  }, [user?.currency]);

  const showNearest = useCallback(
    () =>
      linkto(
        `${
          Platform.OS == "android"
            ? Config.URI_SCHEME_ANDROID
            : Config.URI_SCHEME_IOS
        }://opencategory?category=FoodAndDrink&limit=10`
      ),
    []
  );

  const showFD = useCallback(
    () =>
      linkto(
        `${
          Platform.OS == "android"
            ? Config.URI_SCHEME_ANDROID
            : Config.URI_SCHEME_IOS
        }://opencategory?category=FoodAndDrink`
      ),
    []
  );

  const showAL = useCallback(
    () =>
      linkto(
        `${
          Platform.OS == "android"
            ? Config.URI_SCHEME_ANDROID
            : Config.URI_SCHEME_IOS
        }://opencategory?category=AttractionsAndLeisure`
      ),
    []
  );

  const gotoNearestOutletDetails = useCallback(
    (data) =>
      navigation?.navigate("Merchant", {
        screen: "MerchantScreen",
        params: { ...data, location: selectedLocation },
      }),
    [selectedLocation]
  );

  return props.children({
    selectedLocation,
    onOpenLocation,
    onSearchClickHandler,
    homeSections,
    user,
    offset,
    upgradeSection,
    AppConfigs,
    isLoading,
    isShowScreenIntro,
    handleUpgrade,
    navigation,
    locationGranted,
    checkGeoLocation,
    onCategoryClickHandler,
    onFeaturedTileClickHandler,
    onDoneHanlder,
    onOkayPressHandler,
    isOpenLocationModal,
    isOpenLocationPermissionModal,
    handleLocationPermissionApproval,
    locationListRef,
    bottomSheetRef,
    setHomeSections,
    onUpdateLayoutRequest,
    selectedLocationList,
    showFD,
    showAL,
    gotoNearestOutletDetails,
    showNearest,
    skipMode,
  } as HomeScreenProps);
};
