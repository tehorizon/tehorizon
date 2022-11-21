import { ScreenTypes } from "../../interfaces";
import { useState, useRef, useEffect, useCallback } from "react";
import { Animated } from "react-native";
import { defaultFilter, arabicFilter } from "@components/filters/defaults";
import { isRTL } from "@localization";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/root-reducer";
import {
  getOutletListingRequest,
  cancelOutletListingRequest,
  setOutletListingData,
} from "@delivery/redux/actions";
import { setAppLoading, setSkipMode } from "@redux/appReducer/app.actions";
import { useRoute } from "@react-navigation/core";

export const DeliveryHomeService = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  //pan refrence
  const pan = useRef(new Animated.ValueXY()).current;
  const route = useRoute();

  //declarations
  const dispatch = useDispatch();

  //actions use Reducers
  const getOutletListing = (data: any) =>
    dispatch(getOutletListingRequest(data));
  const cancelApiRequest = (data: any) =>
    dispatch(cancelOutletListingRequest(data));
  const updateOutletListingData = (data: any) =>
    dispatch(setOutletListingData(data));

  //state
  const [isVisible, setIsVisible] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [isLocationChanged, setIsLocationChanged] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isFetching, updateFetching] = useState(false);

  //app states or selectors
  let state = useAppSelector((state) => state);
  let { deliveryDetailReducer } = state;
  let isLoadingData = useAppSelector((state) => state?.appReducer?.isLoading);
  let LocationList = useAppSelector(
    (state) => state.locationReducer?.LocationList
  );
  let locationIndex = useAppSelector(
    (state) => state.locationReducer?.locationIndex
  );
  let locationId =
    LocationList?.length > 0 && locationIndex >= 0
      ? LocationList[locationIndex]?.id
      : 1;
  let currentLocation = useAppSelector(
    (state) => state?.locationReducer?.currentLocation?.coords
  );
  let SelectedDeliverToLocation = useAppSelector(
    (state) =>
      state.deliveryDetailReducer?.deliveryDetails?.selectedDeliverToLocation
  );
  let skipMode = useAppSelector((state) => state?.appReducer?.skipMode);
  let outletListing = useAppSelector(
    (state) => deliveryDetailReducer?.outletListing?.outlets || []
  );

  const token = useAppSelector((state) => state.userReducer?.token);

  // sagas
  const onSetAppLoading = (status: boolean) => dispatch(setAppLoading(status));
  const onSetSkipMode = (value: Boolean) => dispatch(setSkipMode(value));

  // cDM, listner to search Text
  useEffect(() => {
    if (skipMode) {
      onSetAppLoading(true);
      setTimeout(() => {
        onSetSkipMode(false);
        onSetAppLoading(false);
      }, 500);
    } else {
      refreshOutletListing(cuisines, false, false);
    }
  }, [searchText]);

  // cDM, lisnter to slected Location
  useEffect(() => {
    onRefresh();
  }, [SelectedDeliverToLocation]);

  //other methods
  const refreshOutletListing = (
    cuisines: any,
    isLoadMore?: boolean,
    isLocationhange?: boolean,
    outletListing = [],
    callBack?: () => void
  ) => {
    const { latitude, longitude } = SelectedDeliverToLocation;

    // if (canLoadMore || cuisines?.length > 0 || isLocationhange) {
    const data: any = {
      cuisine_filter: cuisines,
      __lat: currentLocation?.latitude
        ? currentLocation?.latitude.toString()
        : "0",
      __lng: currentLocation?.longitude
        ? currentLocation?.longitude.toString()
        : "0",
      location_id: locationId ? locationId.toString() : "1",
      sort: "default",
      lat: latitude
        ? latitude.toString()
        : currentLocation?.latitude
        ? currentLocation?.latitude.toString()
        : "0",
      lng: longitude
        ? longitude.toString()
        : currentLocation?.longitude
        ? currentLocation?.longitude.toString()
        : "0",
      category: route?.params?.category?.api_name || "Restaurants and Bars",
      limit: 60,
      offset: cuisines?.length > 0 ? 0 : outletListing.length,
      cashless_delivery_enabled: "true",
      is_last_mile_enabled: "true",
      show_monthly_product: "true",
      redeemability: "redeemable_reusable",
      user_include_cheers: 0,
      outlet_limit: 60,
      include_featured: 1,
    };
    if (searchText && searchText !== "") {
      data["query"] = searchText;
      data["query_type"] = "name";
    }

    getOutletListing({
      data: data,
      extraData: {
        isLoadMore: isLoadMore,
      },
      token: token,
      updateOutletList: (oL: any) => {
        console.log(oL, "ol");
        if (!isLoadMore) {
          updateOutletListingData(oL);
        } else {
          updateOutletListingData([...outletListing, ...oL]);
          callBack && callBack();
        }
      },
    });

    // }
  };

  const loadMoreOutlets = useCallback(() => {
    if (outletListing?.length > 0 && outletListing?.length % 60 == 0) {
      updateFetching(true);
      refreshOutletListing(cuisines, true, false, outletListing, () => {
        updateFetching(false);
      });
    }
  }, [outletListing?.length, cuisines, refreshOutletListing]);

  const filter = isRTL
    ? arabicFilter.filter.filter(
        (x) => x.category_name === "Restaurants and Bars"
      )
    : defaultFilter.filter.filter(
        (x) => x.category_name === "Restaurants and Bars"
      );

  let section = filter[0]?.filter_sections?.filter((section) => {
    if (
      section.section_name == "نوع المطبخ" ||
      section.section_name == "Cuisine"
    ) {
      return section;
    }
  });

  let options = section[0].options;

  const selectedCuisines = (list: any) => {
    setSelectedList(list);
    let tempCuisines: any = [];
    list.map((item: any) => {
      if (item.ischecked == true) {
        tempCuisines.push(item.key);
      }
    });
    setCuisines(tempCuisines);
    if (!isVisible) {
      refreshOutletListing(tempCuisines, false, false);
    }
  };

  const refreshList = (list: any, selectedCuisine: any) => {
    setSelectedList(list);
    setCuisines(selectedCuisine);
    refreshOutletListing(selectedCuisine, false, false);
  };

  const onBack = () => {
    navigation.goBack();
    if (isLoadingData) {
      cancelApiRequest(null);
    }
    // navigation.navigate("Home", {
    //   screen: "Home",
    // });
  };
  const onRefresh = () => {
    refreshOutletListing(cuisines, false, false);
  };

  return children({
    pan,
    options,
    isVisible,
    selectedList,
    cuisines,
    isLocationChanged,
    outletListing,
    searchText,
    isLoadingData,
    deliveryDetailReducer,
    isFetching,
    navigation,
    SelectedDeliverToLocation,
    // methods
    onBack,
    refreshList,
    selectedCuisines,
    loadMoreOutlets,
    setCuisines,
    setSelectedList,
    setIsVisible,
    setSearchText,
    refreshOutletListing,
    onRefresh,
  } as ScreenTypes.home);
};

export default DeliveryHomeService;
