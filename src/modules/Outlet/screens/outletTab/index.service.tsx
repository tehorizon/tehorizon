import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { isRTL } from "@localization";

import { makeStackMongo, getStackArrayMongo } from "@utils/horizonAnalytics";
import { RequestTypes, ScreenTypes } from "../../interfaces";
import { useDispatch } from "react-redux";
import { MAP_REF } from "@Outlet/components/map";

import {
  setCheersValues,
  getCheersRequest,
  getOutletsRequest,
  getOutletMapsRequest,
} from "@Outlet/redux/actions";
import { useAppSelector } from "@redux/root-reducer";
import {
  CheerRule,
  Merchant,
  SelectedFilter,
} from "../../interfaces/responses";
import { outletItemInterface } from "@Outlet/BL/Interfaces";

const OutletService = ({
  children,
  navigation,
  mode = "List",
  mapRendered = false,
  activeTab = {},
  activeTabLocal = 0,
  route,
  forceRefresh,
  travelLocation,
  tab,
}: ScreenTypes.OutletTabProps) => {
  // states
  // const [mapData, updateMapData] = useState<Pin>();
  const [outletList, updateOutletList] = useState<Array<outletItemInterface>>(
    []
  );
  const [cheersRules, updateCheersRules] = useState<CheerRule>();

  //refrences
  const mapRef = useRef<MAP_REF>(null);

  const dispatch = useDispatch(); // dispatch action to reducer
  //actions

  const onSetCheersValues = (data: {
    userProvidedCheersCheck: boolean;
    isUserFilledCheersCheck: boolean;
  }) => dispatch(setCheersValues(data));

  //reducers
  let currentLocation = useAppSelector(
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
  let token = useAppSelector((state) => state?.userReducer?.token);
  let user = useAppSelector((state) => state?.userReducer?.userInfo);
  let selectedFilters: SelectedFilter = useAppSelector(
    (state) => state?.outletReducer?.selectedFilters || {}
  );
  let favouriteList = useAppSelector(
    (state) => state?.outletReducer?.favouriteList || {}
  );
  let userProvidedCheersCheck: boolean = useAppSelector(
    (state) => state?.outletReducer?.userProvidedCheersCheck
  );
  let isUserFilledCheersCheck = useAppSelector(
    (state) => state?.outletReducer?.isUserFilledCheersCheck
  );
  let category = route?.params?.category || {};

  // sagas
  const getCheersDataHelper = () =>
    dispatch(
      getCheersRequest({
        postData: {
          location_id: travelLocation?.id || location?.id,
          language: isRTL ? "ar" : "en",
        },
        token,
        isUserFilledCheersCheck,
        updateCheersRules,
      })
    );

  const getOutletsDataHelper = (refresh?: boolean, callback?: Function) =>
    dispatch(
      getOutletsRequest({
        postData: {
          location_id: travelLocation?.id || location?.id,
          category: route?.params?.category.api_name,
          offset: refresh ? 0 : outletList?.length,
          user_include_cheers: activeTab?.params["is_cheers"] ? true : false,
          tabsParams: activeTab?.params,
          lat: currentLocation?.coords?.latitude,
          lng: currentLocation?.coords?.longitude,
          radius: 0,
          limit: route?.params?.limit || 60,
        },
        token,
        selectedFilter: selectedFilters
          ? selectedFilters[route?.params?.category.api_name]
          : {},
        location,
        updateOutletList: (oL) => {
          if (refresh) {
            updateOutletList(oL);
          } else {
            updateOutletList([...outletList, ...oL]);
            callback && callback();
          }
        },
      })
    );

  // const invokeMapApi = () =>
  //   dispatch(
  //     getOutletMapsRequest({
  //       postData: {
  //         location_id: location?.id,
  //         category: category?.api_name,
  //         user_include_cheers: activeTab?.params["is_cheers"] ? true : false,
  //         tabsParams: activeTab?.params,
  //         lat: mapData?.coords?.lat || currentLocation?.coords?.latitude || 0,
  //         lng: mapData?.coords?.lng || currentLocation?.coords?.longitude || 0,
  //         radius: mapData?.radius || 0,
  //         language: isRTL ? "ar" : "en",
  //       },
  //       selectedFilter: selectedFilters[route?.params?.category.api_name],
  //       token,
  //       updateMapOutletList,
  //     })
  //   );

  // variables
  let screenName = "Offers List";
  // let _favouriteList = {};

  //cDM, subscribers
  useEffect(() => {
    getOutletsDataHelper(true);
    // invokeMapApi();
  }, [forceRefresh]);

  useEffect(() => {
    let newMode = mode === "Map" ? "List" : "Map";
    if (newMode == "Map") {
      mapRef?.current?.resetPin();
    }
  }, [mode]);

  // const getMapOutletsHandler = async (data: Pin) => {
  //   await updateMapData(data);
  //   invokeMapApi();
  // };

  const cheersSubmit = (data: {
    cheersCheck: 0 | 1 | boolean;
    cheersChecked: 0 | 1 | boolean;
  }) => {
    if (!data.cheersCheck && !data.cheersChecked) {
      return;
    }
    if (
      (data.cheersCheck == 0 || data.cheersCheck === undefined) &&
      data.cheersChecked === true
    ) {
      // updateActiveTabLocal(0);
    }
    cheersSubmitHandler(data);
  };

  const cheersSubmitHandler = (data: any) => {
    if (!data.cheersCheck) {
      // chaneTabHandler(tabs[0]);
    }

    onSetCheersValues({
      userProvidedCheersCheck: data.cheersCheck,
      isUserFilledCheersCheck: data.cheersChecked,
    });

    if (!data.cheersCheck) {
      // chaneTabHandler(tabs[0]);
    } else {
      getOutletsDataHelper(true);
    }
  };

  const onOutletClick = (data: outletItemInterface) => {
    const stackData = {
      current_screen: screenName,
      action: "select_merchant",
      merchant_id: data?.merchant?.id,
      outlet_id: data?.id,
      category_id: category?.api_name,
      categories: category?.analytics_category_name,
      categories_analytics: category?.analytics_category_name,
      location_id: location?.id || travelLocation?.id,
      changeSequenceNumber: true,
    };
    makeCustomAnalyticsStack(stackData);
    onOutletClickHanler(data);
  };

  const onOutletClickHanler = (data: outletItemInterface) => {
    navigation?.navigate("Merchant", {
      screen: "MerchantScreen",
      params: { ...data, location },
    });
  };

  const makeCustomAnalyticsStack = async (stackData: Object) => {
    await makeStackMongo(stackData);
    await getStackArrayMongo();
  };

  return children({
    // props
    mode,
    mapRendered,
    activeTabLocal,
    outletList,
    userProvidedCheersCheck,
    isUserFilledCheersCheck,
    cheersRules,
    route,
    tab,
    activeTabUid: activeTab?.uid,
    favouriteList:
      typeof user?.userId == "number" &&
      !_.isEmpty(favouriteList) &&
      typeof location?.name == "string" &&
      favouriteList[user.userId]
        ? favouriteList[user.userId][travelLocation?.id || location.name]
        : {},
    //ref
    mapRef,
    getCheersDataHelper,
    getOutletsDataHelper,
    onOutletClick,
    cheersSubmit,
  } as ScreenTypes.OutletTab);
};

export default OutletService;
