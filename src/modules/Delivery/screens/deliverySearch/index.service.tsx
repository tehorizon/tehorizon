import { ScreenTypes } from "../../interfaces";
import { useEffect, useState } from "react";
//Redux
import { useDispatch } from "react-redux";
import {
  getSearchOutletListingRequest,
  setSearchOutletListingData,
  cancelSearchOutletListingRequest,
} from "@delivery/redux/actions";
import { useAppSelector } from "@redux/root-reducer";

const DeliveryOutletSearch = ({
  children,
  navigation,
  route,
}: ScreenTypes.screen) => {
  //props
  const { list, refreshList } = route?.params;

  //state
  const [searchText, setSearchText] = useState("");
  const [searchedFlag, setSearchedFlag] = useState(false);
  const [cuisineList, setCuisineList] = useState(list);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [refreshDeliveryHome, setRefreshDeliveryHome] = useState(false);

  //redux
  const dispatch = useDispatch();
  let currentLocation = useAppSelector(
    (state) => state?.locationReducer?.currentLocation
  );
  const searchedOutlets = useAppSelector((state) =>
    state.deliveryDetailReducer?.outletListing?.searchOutlets
      ? state.deliveryDetailReducer?.outletListing?.searchOutlets[0]
      : []
  );
  const loader = useAppSelector(
    (state) => state.deliveryDetailReducer?.deliverySearchLoader
  );
  const searchOutletListingRequest = (data: any) =>
    dispatch(getSearchOutletListingRequest(data));
  const cancelApiRequest = (data: any) =>
    dispatch(cancelSearchOutletListingRequest(data));
  currentLocation = currentLocation.coords;

  useEffect(() => {
    updateSelectedCuisineList(cuisineList);
  }, []);

  useEffect(() => {
    searchHandler();
  }, [selectedCuisine]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch(setSearchOutletListingData([]));
    });

    return unsubscribe;
  }, [navigation]);

  const searchHandler = async () => {
    if (searchText.length === 0) {
      return;
    }
    try {
      const data = {
        __lat: currentLocation?.latitude
          ? currentLocation?.latitude.toString()
          : "0",
        __lng: currentLocation?.longitude
          ? currentLocation?.longitude.toString()
          : "0",
        sort: "default",
        lat: currentLocation?.latitude
          ? currentLocation?.latitude.toString()
          : "0",
        lng: currentLocation?.longitude
          ? currentLocation?.longitude.toString()
          : "0",
        category: "Restaurants and Bars",
        limit: 20,
        offset: 0,
        cashless_delivery_enabled: "true",
        is_last_mile_enabled: "true",
        query: searchText,
        query_type: "name",
      };
      if (selectedCuisine.length !== 0) {
        data["cuisine_filter"] = selectedCuisine;
      }
      searchOutletListingRequest({
        data: data,
        extraData: {
          isLoadMore: false,
        },
      });
      setSearchedFlag(true);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

  const onPressCancel = () => {
    if (loader) {
      cancelApiRequest(null);
    }
    navigation.goBack();
    if (refreshDeliveryHome) {
      refreshList(cuisineList, selectedCuisine);
    }
  };

  const updateCuisineList = (list) => {
    setRefreshDeliveryHome(true);
    setCuisineList(list);
    updateSelectedCuisineList(list);
    // refreshOutletListing(tempCuisines, false, false);
  };

  const updateSelectedCuisineList = (list) => {
    let tempCuisines = [];
    list.map((item) => {
      if (item.ischecked == true) {
        tempCuisines.push(item.key);
      }
    });
    setSelectedCuisine(tempCuisines);
  };

  return children({
    searchText,
    searchedFlag,
    cuisineList,
    searchedOutlets,
    loader,
    navigation,
    //methods
    setSearchText,
    updateCuisineList,
    onPressCancel,
    searchHandler,
  } as ScreenTypes.deliverySearch);
};

export default DeliveryOutletSearch;
