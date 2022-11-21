import { useCallback, useEffect, useState } from "react";
import { ScreenTypes } from "../../interfaces";
import { useDispatch } from "react-redux";
import { BackHandler, Platform } from "react-native";
import {
  setAppLoading,
  setDemographicVisible,
  setErrorObject,
} from "@redux/appReducer/app.actions";
import { useAppSelector } from "@redux/root-reducer";
import { isRTL } from "@localization";
import { makeStackMongo } from "@fast_track/src/utils/horizonAnalytics";
import {
  getMerchantRequest,
  setDefaultValues,
  setSelectedOffer,
  setSelectedOutlet,
  onRedeemOfferRequest,
} from "@Merchant/redux/actions";
import { setFavouriteList } from "@Outlet/redux/actions";
import { setSelectedOutlet as setSelectedOutletForDeliverModule } from "@delivery/redux/actions";
import _ from "lodash";
import { RedeemPrams } from "../../interfaces/requests";
import { MerchantData, OffersToDisplay } from "../../interfaces/responses";
import {
  outletItemInterface,
  outletResposeInterface,
} from "@Outlet/BL/Interfaces";
import { getProfileRequest } from "@Profile/redux/actions";
import appboy from "@HybridComponents/AppBoy";
// import { setHomeSelectedLocation } from "@redux/location/location.actions";
import { useFocusEffect } from "@react-navigation/core";

const { afterRedemptionEvent } = appboy;

const MechantService = ({
  children,
  navigation,
  route,
}: ScreenTypes.screen) => {
  const appConfig = useAppSelector((state) => state?.appReducer?.AppConfigs);
  const deviceInfo = useAppSelector((state) => state?.appReducer.deviceInfo);
  const userInfo = useAppSelector((state) => state?.userReducer?.userInfo);
  const token = useAppSelector((state) => state?.userReducer?.token);
  let LocationList = useAppSelector(
    (state) => state.locationReducer?.LocationList
  );
  let locationIndex = useAppSelector(
    (state) => state.locationReducer?.locationIndex
  );
  let location =
    LocationList?.length > 0 && locationIndex >= 0
      ? LocationList[locationIndex]
      : null;
  const currentUserLocation = useAppSelector(
    (state) => state?.locationReducer?.currentLocation
  );
  const favouriteList = useAppSelector(
    (state) => state?.outletReducer?.favouriteList || {}
  );
  const selectedOutletIndex: number = useAppSelector(
    (state) => state?.merchantReducer?.selectedOutletIndex
  );
  const merchant: MerchantData = useAppSelector(
    (state) => state?.merchantReducer?.merchant
  );

  const selectedOffer: OffersToDisplay = useAppSelector(
    (state) => state?.merchantReducer?.selectedOffer
  );

  const userSessionToken = useAppSelector(
    (state) => state?.userReducer?.userSessionToken
  );
  let userId = useAppSelector(
    (state) => state?.userReducer?.userInfo?.userId || null
  );

  // variables

  let selectedOutlet: outletItemInterface =
    merchant?.outlets?.length > 0 ? merchant?.outlets[selectedOutletIndex] : {};

  // states
  const [changeLocationModal, setchangeLocationModal] = useState(false);
  const [showContinueOutletModal, setshowContinueOutletModal] = useState(false);
  const [showCongratulationsModal, setshowCongratulationsModal] =
    useState(false);
  const [expandAmenties, setexpandAmenties] = useState(false);
  const [showRedemptionModal, setshowRedemptionModal] = useState(false);
  const [redemptionLoading, setredemptionLoading] = useState(false);
  const [showWebView, setshowWebView] = useState(false);
  const [webViewTitle, setwebViewTitle] = useState("");
  const [webViewUrl, setwebViewUrl] = useState("");
  const [showRedemptionSuccessModal, setshowRedemptionSuccessModal] =
    useState(false);
  const [redemptionResponse, setredemptionResponse] = useState({});

  const [rulesOfUserURL, setrulesOfUserURL] = useState("");
  const [showError, setshowError] = useState(false);
  const [errorString, seterrorString] = useState("");
  const [isDemographicVisible, setisDemographicVisible] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  const onSetAppLoading = (status: boolean) => dispatch(setAppLoading(status));
  const onSetSelectedOutlet = (index: number) =>
    dispatch(setSelectedOutlet(index));
  const onSetDemographicVisible = (data: string) =>
    dispatch(setDemographicVisible(data));
  const onSetDefaultValues = () => dispatch(setDefaultValues());
  const onOfferSelected = (data: OffersToDisplay) =>
    dispatch(setSelectedOffer(data));
  const onSetErrorObject = (data: Object) => dispatch(setErrorObject(data));
  const onSetFavouriteList = (data: outletResposeInterface) =>
    dispatch(setFavouriteList(data));
  const onSetSelectedOutletForDeliverModule = (data: any) =>
    dispatch(setSelectedOutletForDeliverModule(data));
  // const onSetMerchantData = (data: any) => dispatch(setMerchantData(data));
  // const onSetLocation = (index: number) => dispatch(setHomeSelectedLocation(index));

  //saga Calls
  const getMerchant = (merchantID: number, favourite: boolean) =>
    dispatch(
      getMerchantRequest({
        merchantID,
        favourite,
        token,
      })
    );

  const onRedeemOffer = (data: RedeemPrams) =>
    dispatch(
      onRedeemOfferRequest({
        postData: {
          offer_id: data.offer_id,
          outlet_id: data.outlet_id,
          merchant_pin: data.merchant_pin,
          product_id: data.product_id,
          currency: userInfo?.currency ?? "USD",
          language: deviceInfo?.language,
          platform: deviceInfo?.device_os,
          transaction_id: `${Platform.OS?.toLowerCase()?.slice(
            0,
            3
          )}-${Math.round(Date.now() / 1000)}-${userId}-${data.offer_id}-${
            data.outlet_id
          }`, // platform-timestamp-userid-offerid-outletid // timestamp in seconds
          session_token: userSessionToken,
        },
        appLoading: setredemptionLoading,
        customError: (params: { message: string; status: boolean }) => {
          setshowError(params?.status);
          seterrorString(params?.message || "");
        },
        token,
        postAnalyticsEvents,
        handleOnShowRedemptionSuccessModal,
        makeCustomAnalyticsStack: () =>
          makeCustomAnalyticsStack({
            current_screen: "Redemption Card",
            action: "error_incorrect_pin",
            merchant_id: merchant.id,
            outlet_id: data.outlet_id,
            category_id: 0,
            categories: "",
            categories_analytics: "",
            location_id: 0,
            offer_id: data.offer_id,
            changeSequenceNumber: false,
          }),
        makeCustomAnalyticsOnInternetUnavaliable: () =>
          makeCustomAnalyticsStack({
            current_screen: "Redemption Card",
            action: "error_internet_not_available",
            merchant_id: merchant.id,
            outlet_id: data.outlet_id,
            category_id: 0,
            categories: "",
            categories_analytics: "",
            location_id: 0,
            offer_id: data.offer_id,
            changeSequenceNumber: false,
          }),
      })
    );

  const onProfileRequest = () =>
    dispatch(
      getProfileRequest({
        postData: {
          token,
          language: userInfo.language,
          currency: deviceInfo.currency,
        },
      })
    );

  let favouriteState =
    typeof userId == "number" &&
    !_.isEmpty(favouriteList) &&
    typeof location?.name == "string" &&
    favouriteList[userId] &&
    favouriteList[userId][location.name] &&
    favouriteList[userId][location.name][
      route?.params?.id || route?.params?.outlet_id || route?.params?.o_id || 0
    ]
      ? true
      : false;

  const amenties =
    merchant?.merchant_attributes?.length > 0
      ? merchant?.merchant_attributes[0]?.attributes
      : {};

  //backPresshandler
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (showContinueOutletModal) {
          setshowContinueOutletModal(false);
          return true;
        } else if (changeLocationModal) {
          setchangeLocationModal(false);
          return true;
        } else if (showRedemptionModal) {
          setshowRedemptionModal(false);
          return true;
        } else if (showRedemptionModal) {
          disableWebView();
          return true;
        } else {
          onSetAppLoading(false);
          onBackButton();
          return true;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [
      showWebView,
      showContinueOutletModal,
      changeLocationModal,
      showRedemptionModal,
      showRedemptionModal,
    ])
  );

  // componentWillUnMount
  useEffect(() => {
    return () => {
      onSetDefaultValues();
    };
  }, []);

  //cDM //need to refactor flow as location index
  // useEffect(() => {
  //   let location_id = route?.params?.location_id;

  //   if (location_id) {
  //     const getLoc = location;
  //     const locationData = {
  //       ...getLoc,
  //       id: parseInt(location_id),
  //       name: getLoc ? getLoc.name : "",
  //     };
  //     onSetLocation(locationData);
  //   }
  // }, [route?.params?.location_id]);

  //cDM
  useEffect(() => {
    try {
      let merchantError = false;

      if (!route?.params?.merchant) {
        merchantError = true;
      }

      if (!token) {
        merchantError = true;
      }

      if (!location) {
        merchantError = true;
      }

      if (!merchantError) {
        const language = isRTL ? "ar" : "en";
        let queryParams = "?language=" + language;
        if (!appConfig.is_live_chat_enabled) {
          queryParams = queryParams + "&no_chat=true";
        }
        const webviewURL = appConfig.rulesOfUserURL + queryParams;
        setrulesOfUserURL(webviewURL);

        getMerchant(
          route?.params?.merchant?.id ??
            route?.params?.merchant_id ??
            route?.params?.m_id,
          route?.params?.favourite ?? false
        );

        //analytics
        makeCustomAnalyticsStack({
          current_screen: "Merchant Detail",
          action: "open",
          merchant_id:
            route?.params?.merchant?.id ??
            route?.params?.merchant_id ??
            route?.params?.m_id,
          outlet_id:
            route?.params?.id ??
            route?.params?.outlet_id ??
            route?.params?.o_id,
          category_id: 0,
          categories: "",
          categories_analytics: "",
          location_id: location.location_id,
          changeSequenceNumber: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    checkDemographic("pre_redemption");
  }, [
    route?.params?.merchant_id,
    route?.params?.outlet_id,
    route?.params?.id,
    route?.params?.merchant?.id,
    route?.params?.m_id,
    route?.params?.o_id,
    route?.params?.favourite,
  ]);

  const disableWebView = () => {
    setshowWebView(false);
  };

  const onChangeLocationDone = useCallback((index: number) => {
    setchangeLocationModal(false);
    onSetSelectedOutlet(index);
  }, []);

  const disableError = useCallback(() => {
    setredemptionLoading(false);
    setshowError(false);
    seterrorString("");
  }, []);

  const onImageClick = useCallback(
    (index: number) => {
      navigation.navigate("MerchantHeroURL", {
        indexToMove: index,
        itemId: 86,
        name: merchant.name,
        description: merchant.description,
        location: {
          lat: selectedOutlet?.lat,
          lng: selectedOutlet?.lng,
        },
        currentLocation: currentUserLocation,
        urls: merchant.hero_urls,
        hero_images_360: merchant.hero_images_360,
      });

      //analytics
      // sendAnalytics("click_image");
    },
    [merchant, navigation]
  );

  const onLocationClick = useCallback(() => {
    navigation.navigate("MerchantMap", {
      itemId: 86,
      name: merchant.name,
      description: merchant.description,
      location: {
        lat: selectedOutlet?.lat,
        lng: selectedOutlet?.lng,
      },
      currentLocation: currentUserLocation,
    });

    //analytics
    sendAnalytics("click_outlet_location_map");
  }, [navigation, merchant, selectedOutlet, currentUserLocation]);

  const sendAnalytics = useCallback(
    (action: string) => {
      makeCustomAnalyticsStack({
        current_screen: "Merchant Detail",
        action,
        merchant_id: merchant.id,
        outlet_id: selectedOutlet?.id,
        category_id: 0,
        categories: "",
        categories_analytics: "",
        location_id: location.location_id,
        changeSequenceNumber: false,
      });
    },
    [merchant, selectedOutlet, location]
  );

  const onClickWebView = (url: string, title: string) => {
    setshowWebView(true);
    setwebViewUrl(url);
    setwebViewTitle(title);
  };

  const onClickWebViewAndAnalytics = useCallback(() => {
    onClickWebView(merchant?.website || "", merchant?.name);

    //analytics
    sendAnalytics("click_website");
  }, [merchant?.name, merchant?.website]);

  const onMenuClick = useCallback(() => {
    //analytics
    sendAnalytics("click_menu");
    onClickWebView(merchant?.pdf_url, merchant.name);
  }, [merchant?.pdf_url, merchant?.name]);

  const toggleAmenties = useCallback(
    () => setexpandAmenties(!expandAmenties),
    [expandAmenties]
  );

  const checkDemographic = async (screenName: string) => {
    try {
      onSetDemographicVisible(screenName);
    } catch (error) {
      // console.log(error);
    }
  };

  const onBackButton = () => {
    //analytics
    makeCustomAnalyticsStack({
      current_screen: "Merchant Detail",
      action: "click_back",
      category_id: 0,
      categories: "",
      categories_analytics: "",
      location_id: location?.id,
      changeSequenceNumber: false,
    });
    navigation?.goBack();
  };

  const makeCustomAnalyticsStack = async (stackData: Object) => {
    await makeStackMongo(stackData);
    // const dataStack = await getStackArrayMongo();
  };

  const handleChangeLocation = () => {
    setchangeLocationModal(!changeLocationModal);
  };

  const handleCloseRedemptionModal = () => {
    setshowRedemptionModal(false);
    makeCustomAnalyticsStack({
      current_screen: "Redemption Card",
      action: "click_close",
      merchant_id: merchant?.id,
      outlet_id: selectedOutlet?.id,
      category_id: 0,
      categories: "",
      categories_analytics: "",
      location_id: 0,
      changeSequenceNumber: false,
    });
  };

  const handleContinueOutletModal = (data: OffersToDisplay) => {
    makeCustomAnalyticsStack({
      current_screen: "Merchant Detail",
      action: "click_offers",
      merchant_id: merchant?.id,
      outlet_id: selectedOutlet?.id,
      category_id: 0,
      categories: "",
      categories_analytics: "",
      location_id: 0,
      changeSequenceNumber: false,
    });
    onOfferSelected(data);
    if (data?.outlet_ids?.length === 1) {
      continueCallback();
    } else if (data?.outlet_ids?.length > 1) {
      setshowContinueOutletModal(!showContinueOutletModal);
    }
  };

  let skipMode = useAppSelector((state) => state?.appReducer?.skipMode);

  const setFavourite = !skipMode
    ? () => {
        // setFavHandlerForOutletListing();
        // onSetAppLoading(true);

        if (!favouriteState) {
          // adaptor.CallBacks.addFavorite({
          //   locationName: 'test',
          //   merchant: adaptor.data.merchant,
          // });
          merchantAddToFavorites();
        } else {
          merchantRemoveFromFavorites({
            locationName: location.name,
            merchant,
          });
        }
      }
    : null;

  const changeOutletCallback = () => {
    setshowContinueOutletModal(false);
    setTimeout(() => {
      setchangeLocationModal(true);
    }, 500);
  };

  const continueCallback = () => {
    setshowContinueOutletModal(false);
    setTimeout(() => {
      setshowRedemptionModal(true);
    }, 500);

    makeCustomAnalyticsStack({
      current_screen: "Redemption Card",
      action: "click_open_card",
      merchant_id: merchant?.id,
      outlet_id: selectedOutlet?.id,
      offer_id: selectedOffer?.offer_id,
      category_id: 0,
      categories: "",
      categories_analytics: "",
      location_id: 0,
      changeSequenceNumber: false,
    });
  };

  const handleRedemptionSuccessDone = async () => {
    makeCustomAnalyticsStack({
      current_screen: "Redemption Success Card",
      action: "click_done",
      merchant_id: merchant?.id,
      outlet_id: selectedOutlet?.id,
      category_id: 0,
      categories: "",
      categories_analytics: "",
      location_id: 0,
      changeSequenceNumber: false,
    });
    setshowRedemptionSuccessModal(false);
    setshowRedemptionModal(false);
    // add refresh merchant here
    handleCongratulationsModal();

    {
      /*
      comment out the congrats modal
  uncomt this when you want to change to old flow */
    }

    // setTimeout(() => {
    //   setshowCongratulationsModal(true);
    // }, 500);
  };

  const handleCongratulationsModal = () => {
    //uncomment this when you want to change to old flow
    // setshowCongratulationsModal(false);
    onRefreshMerchant();
    checkDemographic("post_redemption");
  };

  const onRefreshMerchant = async () => {
    try {
      let merchantError = false;
      // for current position of users
      let position = currentUserLocation;

      if (!position) {
        position = {
          coords: {
            latitude: 0,
            longitude: 0,
          },
        };
      }

      if (!route?.params?.merchant) {
        merchantError = true;
      }

      if (!token) {
        merchantError = true;
      }

      if (!location) {
        merchantError = true;
      }

      if (!merchantError) {
        getMerchant(
          route?.params?.merchant?.id ??
            route?.params?.merchant_id ??
            route?.params?.m_id ??
            0,
          route?.params?.favourite || false
        );

        // onProfileRequest();

        //analytics
        makeCustomAnalyticsStack({
          current_screen: "Merchant Detail",
          action: "open",
          merchant_id:
            route?.params?.merchant?.id ??
            route?.params?.merchant_id ??
            route?.params?.m_id ??
            0,
          outlet_id:
            route?.params?.id ??
            route?.params?.outlet_id ??
            route?.params?.o_id ??
            0,
          category_id: 0,
          categories: "",
          categories_analytics: "",
          location_id: location.location_id,
          changeSequenceNumber: true,
        });
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  const handleOnShowRedemptionSuccessModal = () => {
    setshowRedemptionSuccessModal(true);
  };
  const postAnalyticsEvents = (paramData, redemptionResponse) => {
    try {
      makeCustomAnalyticsStack({
        current_screen: "Redemption Card",
        action: "click_redeem",
        merchant_id: merchant?.id,
        outlet_id: paramData?.outlet_id,
        category_id: 0,
        categories: "",
        categories_analytics: "",
        location_id: 0,
        offer_id: paramData?.offer_id,
        changeSequenceNumber: false,
      });

      makeCustomAnalyticsStack({
        current_screen: "Redemption Card",
        action: "redeemption_success_card",
        merchant_ref: redemptionResponse?.redemption_code,
        product_sku: "LAUK", //TODO: fix me
        merchant_id: merchant?.id,
        outlet_id: paramData?.outlet_id,
        category_id: 0,
        categories: "",
        categories_analytics: "",
        location_id: 0,
        offer_id: paramData?.offer_id,
        changeSequenceNumber: false,
      });

      setredemptionResponse(redemptionResponse);
      // setshowRedemptionModal(false);
      // setredemptionLoading(false);

      const redemptionEventData = {
        MerchantName: merchant?.name,
        OutletName: selectedOutlet?.name,
        Savings: selectedOffer?.savings_estimate,
        Currency: userInfo?.currency ?? "USD",
      };
      afterRedemptionEvent(redemptionEventData);
    } catch (ignore) {}
  };

  const merchantAddToFavorites = async () => {
    try {
      //analytics
      makeCustomAnalyticsStack({
        current_screen: "Merchant Detail",
        action: "click_add_favourite",
        merchant_id: merchant?.id,
        outlet_id: selectedOutlet.id,
        category_id: 0,
        categories: "",
        categories_analytics: "",
        location_id: location?.location_id,
        changeSequenceNumber: false,
      });

      const locationName = location?.name;
      const userId = userInfo.userId;
      let currentfavouriteList = favouriteList;

      if (currentfavouriteList === null || currentfavouriteList === undefined) {
        currentfavouriteList = {};
      } else {
        //favouriteList = {list: favouriteList}
      }

      //checking if use exits in favourite List object or not.....if not.. adding userID into favourite List object
      if (!currentfavouriteList[userId]) {
        currentfavouriteList[userId] = {};
      }

      const userfavouriteList = currentfavouriteList[userId];
      //checking if location is available in favourite List object or not.....if not.. adding location into favourite List object
      if (!userfavouriteList[locationName]) {
        const name = locationName;
        const merchantList = {};

        userfavouriteList[name] = merchantList;
      }
      //list of favourite from specific locaiton
      const list = userfavouriteList[locationName];
      //checking if it is already added to favourite Merchant object or not....if not.. adding merchant_id and merchant into favourite Merchant object

      if (
        list[
          route?.params?.id || route?.params?.outlet_id || route?.params?.o_id
        ] == undefined
      ) {
        list[
          route?.params?.id || route?.params?.outlet_id || route?.params?.o_id
        ] = route?.params;
      }
      onSetFavouriteList(currentfavouriteList);
      onSetAppLoading(false);
    } catch (error) {
      // console.log(error);
      onSetAppLoading(false);
      onSetErrorObject(false);
    }
  };

  const merchantRemoveFromFavorites = async (data: any) => {
    try {
      //analytics
      makeCustomAnalyticsStack({
        current_screen: "Merchant Detail",
        action: "click_remove_favourite",
        merchant_id: merchant.id,
        outlet_id: selectedOutlet.id,
        category_id: 0,
        categories: "",
        categories_analytics: "",
        location_id: 0,
        changeSequenceNumber: false,
      });

      const locationName = location.name;
      const userId = userInfo.userId;

      //checking if user exits in favourite List object or not.....if not.. return
      if (!favouriteList[userId]) {
        // return
        throw new Error("!favouriteList[userId]: " + favouriteList[userId]);
      }
      let userFavouriteList = favouriteList[userId];
      //checking if location is available in favourite List object or not.....if not.. return
      if (!userFavouriteList[locationName]) {
        // return
        throw new Error(
          "userFavouriteList[locationName]: " + userFavouriteList[locationName]
        );
      }
      //merchantList have favourite from specific locaiton
      const merchantList = userFavouriteList[locationName];

      //checking if merchantID  exits in favourite Merchant object or not....if not.... return satte
      if (
        !merchantList[
          route?.params?.id || route?.params?.outlet_id || route?.params?.o_id
        ]
      ) {
        // return
        throw new Error(
          "merchantList[merchant_id]: " +
            merchantList[
              route?.params?.id ||
                route?.params?.outlet_id ||
                route?.params?.o_id
            ]
        );
      }

      delete merchantList[
        route?.params?.id || route?.params?.outlet_id || route?.params?.o_id
      ];

      //checking if merchant list is empty...delete it
      if (Object.keys(merchantList).length === 0) {
        delete userFavouriteList[locationName];
      }
      onSetFavouriteList(favouriteList);
      onSetAppLoading(false);
    } catch (e) {
      onSetAppLoading(false);
      onSetErrorObject({
        status: true,
        message: e.message,
      });
    }
  };

  const onDeliveryButtonPress = () => {
    if (route?.params?.parentScreen === "DeliveryOutletDetails") {
      navigation.goBack();
    } else {
      console.log("selectedOutlet: ", selectedOutlet);
      const outletParams = {
        id: selectedOutlet.id,
        merchant: {
          id: merchant.id,
          category: merchant.category,
        },
      };
      onSetSelectedOutletForDeliverModule(selectedOutlet);

      navigation.navigate("Delivery", {
        screen: "DeliveryOutletDetail",
        params: {
          itemId: 9,
          outletParams: outletParams,
          favourite: false,
        },
      });
    }
  };

  const onDismissDemographicModalHandler = useCallback(
    () => setisDemographicVisible(false),
    []
  );

  return children({
    navigation,
    webViewUrl,
    webViewTitle,
    showWebView,
    changeLocationModal,
    merchant,
    offer: selectedOffer,
    selectedOutlet,
    showContinueOutletModal,
    redemptionLoading,
    showRedemptionModal,
    redemptionResponse,
    showError,
    errorString,
    rulesOfUserURL,
    showRedemptionSuccessModal,
    showCongratulationsModal,
    appConfig,
    favouriteState,
    expandAmenties,
    amenties,
    currency: userInfo?.currency ?? "USD",
    isDemographicVisible,
    handleRedemptionSuccessDone,
    handleCongratulationsModal,
    onBackButton,
    setFavourite,
    onImageClick,
    onLocationClick,
    handleContinueOutletModal,
    onDeliveryButtonPress,
    onClickWebViewAndAnalytics,
    toggleAmenties,
    onMenuClick,
    onDismissDemographicModalHandler,
    disableError,
    disableWebView,
    onChangeLocationDone,
    handleChangeLocation,
    changeOutletCallback,
    continueCallback,
    handleCloseRedemptionModal,
    onRedeemOffer,
    makeCustomAnalyticsStack,
  } as ScreenTypes.Mechant);
};

export default MechantService;
