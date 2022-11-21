import { outletDetailsRequest, ScreenTypes } from "@delivery/interfaces";
import { useState, useEffect } from "react";

import {
  getOutletDetailsRequest,
  setMenuActiveTab,
  clearOutletDetailsData,
} from "@delivery/redux/actions";
import { setMerchantData, setFavouriteList } from "@Outlet/redux/actions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/root-reducer";
import { Merchant } from "@Outlet/interfaces/responses";
import { outletResposeInterface } from "@Search/interfaces";
import { Routes } from "@Outlet/BL/Interfaces";
import { useWindowDimensions } from "react-native";
import { setAppLoading, setErrorObject } from "@redux/appReducer/app.actions";

const DeliveryOutletDetail = ({
  children,
  navigation,
  route,
}: ScreenTypes.screen) => {
  //redux Actions
  const dispatch = useDispatch();
  const getOutletDetails = (data: outletDetailsRequest) =>
    dispatch(getOutletDetailsRequest(data));
  const setMenuActiveTabFunc = (data: number) =>
    dispatch(setMenuActiveTab(data));
  const onSetMerchantData = (data: Merchant) => dispatch(setMerchantData(data));
  const onSetFavouriteList = (data: outletResposeInterface) =>
    dispatch(setFavouriteList(data));
  const onClearOutletDetailsData = () => dispatch(clearOutletDetailsData());
  const onSetAppLoading = (status: boolean) => dispatch(setAppLoading(status));
  const onSetErrorObject = (data: Object) => dispatch(setErrorObject(data));

  const layout = useWindowDimensions();

  //redux state
  const reduxState = useAppSelector((state) => state);
  const selectedOutlet = route?.params?.outletParams;
  const merchant = useAppSelector(
    (state) => state.deliveryDetailReducer?.deliveryOutletDetail?.outletDetail
  );
  const tabs = useAppSelector(
    (state) =>
      state.deliveryDetailReducer?.deliveryOutletDetail?.outletDetailMenuTabs
  );
  const menuActiveTab = useAppSelector(
    (state) => state.deliveryDetailReducer?.deliveryOutletDetail?.menuActiveTab
  );

  const menuProductsList = useAppSelector(
    (state) => state.deliveryDetailReducer?.deliveryOutletDetail?.menuProducts
  );
  const selectedDeliveryLocation = useAppSelector(
    (state) =>
      state.deliveryDetailReducer?.deliveryOutletDetail
        ?.selectedDeliverToLocation
  );
  const currentLocation = useAppSelector(
    (state) => state?.locationReducer?.currentLocation
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
      : null;
  const userInfo = useAppSelector((state) => state?.userReducer?.userInfo);
  const favouriteList = useAppSelector(
    (state) => state?.outletReducer?.favouriteList || {}
  );
  const token = useAppSelector((state) => state.userReducer?.token);
  const basketIsEmpty = useAppSelector(
    (state) =>
      state.deliveryDetailReducer?.deliveryOutletDetail?.basket?.isEmpty
  );

  const [favourite, setFavourite] = useState(false);
  const [routes, updateTabs] = useState<Array<Routes>>([]);
  const [activeTab, updateActiveTab] = useState(0);

  const { orderID = null } = route?.params;

  const favouriteState =
    typeof userInfo?.userId == "number" &&
    favouriteList &&
    favouriteList != {} &&
    typeof location?.name == "string" &&
    favouriteList[userInfo?.userId] &&
    favouriteList[userInfo?.userId][location?.name] &&
    favouriteList[userInfo?.userId][location?.name][merchant?.id]
      ? true
      : false;

  useEffect(() => {
    fetchDeliveryDetailData();
  }, []);

  useEffect(() => {
    fetchDeliveryDetailData();
  }, [selectedDeliveryLocation]);

  useEffect(() => {
    // let data: Routes[] = [];
    // tabs?.map((item: any) => {
    //   data.push({
    //     key: item.id,
    //     title: item.name,
    //     testID: item.id,
    //     payload: item,
    //   });
    // });
    updateTabs(tabs || []);
  }, [tabs?.length]);

  // componentWillUnMount
  useEffect(() => {
    return () => {
      onClearOutletDetailsData();
    };
  }, []);

  const merchantAddToFavorites = async () => {
    try {
      //analytics
      // makeCustomAnalyticsStack({
      //   current_screen: "Merchant Detail",
      //   action: "click_add_favourite",
      //   merchant_id: merchant.id,
      //   outlet_id: selectedOutlet.id,
      //   category_id: 0,
      //   categories: "",
      //   categories_analytics: "",
      //   location_id: location.location_id,
      //   changeSequenceNumber: false,
      // });
      const locationName = location.name;
      const userId = userInfo?.userId;
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

      if (list[merchant.id] == undefined) {
        list[merchant.id] = {
          merchantName: merchant.name,
          merchantLogo: merchant.logo_small_url,
          attributes: selectedOutlet?.attributes,
          outletId: selectedOutlet?.id,
          selectedOutlet: selectedOutlet,
          deliveryMerchant: true,
        };
      }
      onSetFavouriteList(currentfavouriteList);
    } catch (error) {
      // onSetErrorObject(false);
    }
  };

  const merchantRemoveFromFavorites = () => {
    try {
      //analytics
      // makeCustomAnalyticsStack({
      //   current_screen: "Merchant Detail",
      //   action: "click_remove_favourite",
      //   merchant_id: merchant.id,
      //   outlet_id: selectedOutlet.id,
      //   category_id: 0,
      //   categories: "",
      //   categories_analytics: "",
      //   location_id: 0,
      //   changeSequenceNumber: false,
      // });

      const locationName = location?.name;
      const userId = userInfo?.userId;

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
      if (!merchantList[merchant?.id]) {
        // return
        throw new Error(
          "merchantList[merchant_id]: " + merchantList[merchant?.id]
        );
      }

      delete merchantList[merchant?.id];

      //checking if merchant list is empty...delete it
      if (Object.keys(merchantList).length === 0) {
        delete userFavouriteList[locationName];
      }
      onSetFavouriteList(favouriteList);
    } catch (e) {
      onSetErrorObject({
        status: true,
        message: e.message,
      });
    }
  };

  const fetchDeliveryDetailData = async () => {
    try {
      const postData = {
        outlet_id: selectedOutlet?.id,
        merchant_id: selectedOutlet?.merchant?.id,
        language: reduxState.appReducer?.deviceInfo?.language,
        session_token: reduxState.userReducer?.userSessionToken,
        __lat: currentLocation?.coords
          ? currentLocation.coords.latitude
          : location?.latitude
          ? location?.latitude
          : 0,
        __lng: currentLocation?.coords
          ? currentLocation.coords.longitude
          : location?.longitude
          ? location?.longitude
          : 0,
        currency: reduxState.userReducer?.userInfo?.currency,
        location_id: "1",
        user_id: reduxState.userReducer?.userInfo?.userId,
        customer_id: reduxState.userReducer?.userInfo?.userId,
        app_version: reduxState.appReducer?.deviceInfo?.app_version,
        __platform: reduxState.appReducer?.deviceInfo?.device_os,
        platform: reduxState.appReducer?.deviceInfo?.device_os,
        device_os: reduxState.appReducer?.deviceInfo?.device_os,
        __device_id: reduxState.appReducer?.deviceInfo?.device_uid,
        __i: reduxState.userReducer?.userInfo?.userId,
        lat: currentLocation?.coords
          ? currentLocation.coords.latitude
          : location?.latitude
          ? location?.latitude
          : 0,
        lng: currentLocation?.coords
          ? currentLocation.coords.longitude
          : location?.longitude
          ? location?.longitude
          : 0,
        delivery_lat: selectedDeliveryLocation?.latitude
          ? selectedDeliveryLocation.latitude
          : 0,
        delivery_lng: selectedDeliveryLocation?.longitude
          ? selectedDeliveryLocation.longitude
          : 0,
        category: selectedOutlet?.merchant?.category,
        cashless_delivery: "true",
        is_last_mile_enabled: true,
        is_new_order_status_flow: "true",
        show_monthly_product: "true",
      };

      // console.log(params, "merchant params", selectedDeliveryLocation);

      getOutletDetails({ postData, token });

      // setMenuProductsList(fetchMenuProductsList(menuActiveTab, merchant.menus));
      // setIsLoading(false);
    } catch (error) {
      alert(error?.message);
    }

    //setOutletListing(outlets.data.outlets);
  };

  const onClickFavourite = () => {
    if (!favouriteState) {
      merchantAddToFavorites();
    } else {
      merchantRemoveFromFavorites();
    }
  };

  const onChangeTab = (index, tabItem) => {
    // updateTabs
    // setMenuProductsList(fetchMenuProductsList(index, merchant.menus));
    // setMenuActiveTabFunc(index);
  };

  const viewDineInOffers = () => {
    navigation?.navigate("Merchant", {
      screen: "MerchantScreen",
      params: {
        outlet_id: merchant?.id,
        merchant_id: selectedOutlet?.id,
        favourite: favourite,
        location: location,
      },
    });
  };

  const onImageClick = () => {
    navigation.navigate("Merchant", {
      screen: "MerchantHeroURL",
      params: {
        itemId: 86,
        name: merchant.name,
        description: merchant.description,
        location: {
          lat: selectedOutlet.lat,
          lng: selectedOutlet.lng,
        },
        currentLocation: currentLocation,
        urls: merchant.hero_urls,
        hero_images_360: merchant.hero_images_360,
      },
    });

    // //analytics
    // const stackData = {
    //   current_screen: 'Merchant Detail',
    //   action: 'click_image',
    //   merchant_id: merchant.id,
    //   outlet_id: selectedOutlet.id,
    //   category_id: 0,
    //   categories: '',
    //   categories_analytics: '',
    //   location_id: location?.id,
    //   changeSequenceNumber: false,
    // };

    // makeCustomAnalyticsStack(stackData);
  };

  return children({
    selectedOutlet,
    merchant,
    tabs,
    menuActiveTab,
    menuProductsList,
    currentLocation,
    favouriteState,
    orderID,
    basketIsEmpty,
    navigation,
    routes,
    route,
    activeTab,
    layout,
    //methods
    onSetMerchantData,
    onClickFavourite,
    onChangeTab,
    updateActiveTab,
    viewDineInOffers,
    onImageClick,
  } as ScreenTypes.DeliveryOutletDetail);
};

export default DeliveryOutletDetail;
