import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SearchScreenProps } from "../../interfaces/SearchScreenProps";
//analytics
import { makeStackMongo, getStackArrayMongo } from "@utils/horizonAnalytics";
import { useAppSelector } from "@redux/root-reducer";
import {
  searchOutlet,
  pushQuery,
  searchOutletSuccess,
} from "../../redux/actions";
import { setSelectedFilter } from "@Outlet/redux/actions";
import { useNavigation, useRoute } from "@react-navigation/core";
import { outletItemInterface } from "@Outlet/BL/Interfaces";
import _ from "lodash";

import { SearchBarRef } from "@components/SeachBar";

export default ({ children }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const searchBar = useRef<SearchBarRef>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, updateSearch] = useState(false);
  const [chipsData, setchipsData] = useState([]);
  const [previousSearchText, setPreviousSearchText] = useState("");
  ///Selectors ------------

  const user = useAppSelector((state) => state.userReducer.userInfo);
  const token = useAppSelector((state) => state.userReducer.token);
  let currentLocation = useAppSelector(
    (state) => state?.locationReducer?.currentLocation?.coords
  );

  let recents = useAppSelector((state) => state?.searchReducer?.recents || []);

  let selectedFilters = useAppSelector(
    (state) => state?.outletReducer?.selectedFilters
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

  let favouriteList = useAppSelector(
    (state) => state.outletReducer?.favouriteList
  );

  const dispatch = useDispatch();
  const onSetSelectedFilters = (data: any) => dispatch(setSelectedFilter(data));

  const onSearchOutlet = (data: any) => dispatch(searchOutlet(data));
  const onResetOutlet = () => dispatch(searchOutletSuccess([]));
  const resetRecents = () => dispatch(pushQuery([]));

  let outlets = useAppSelector((state) => state?.searchReducer.outlets || []);

  let params = route?.params;
  //saga
  const searchSubmitHandler = (refresh?: boolean, callback?: Function) => {
    updateSearch(true);
    onSearchOutlet({
      postData: {
        token: token,
        params: {
          location_id: params?.location_id || location?.id,
          category: params?.category?.api_name,
          query: searchBar?.current?.getValue()?.trim(),
          query_type: "name",
          offset: refresh ? 0 : outlets?.length || 0,
          lat: currentLocation?.latitude,
          lng: currentLocation?.longitude,
          m_id: params?.m_id,
          merchant_id: params?.merchant_id,
          show_new_offers: params?.show_new_offers,
          cuisine_filter: params?.cuisine_filter,
          sub_category_filter: params?.sub_category_filter,
          filters_selected_for_no: params?.filters_selected_for_no,
          filters_selected_for_yes: params?.filters_selected_for_yes,
        },
        favouriteList:
          user?.userId &&
          favouriteList?.length >= 0 &&
          favouriteList[user?.userId]?.length > 0 &&
          favouriteList[user?.userId][
            (params?.travelLocation?.name || location?.name) ?? ""
          ]?.length > 0
            ? favouriteList[user?.userId][
                (params?.travelLocation?.name || location?.name) ?? ""
              ]
            : {},
      },
      outlets,
      refresh,
      callback,
      makeCustomAnalyticsStack: () =>
        makeCustomAnalyticsStack({
          current_screen: "Advance Search",
          action: "click_search",
          category_id: "",
          categories: "",
          categories_analytics: "",
          location_id: 0,
          query: searchBar?.current?.getValue()?.trim(),
          changeSequenceNumber: false,
        }),
    });
  };

  useEffect(() => {
    // componentWillUnMount
    return () => {
      onResetOutlet();
    };
  }, []);

  //cDM deeplining handle
  useEffect(() => {
    params = route?.params;
    if (route?.params?.search?.length > 0) {
      searchBar?.current?.setValue(route?.params?.search || "");
      setTimeout(() => {
        setPreviousSearchText(route?.params?.search || "");
        searchSubmitHandler(true);
      }, 500);
    }
  }, [
    route?.params?.category,
    route?.params?.search,
    route?.params?.cuisine_filter,
    route?.params?.m_id,
    route?.params?.merchant_id,
    route.params?.show_new_offers,
    route.params?.sub_category_filter,
    route.params?.filters_selected_for_no,
    route.params?.filters_selected_for_yes,
  ]);

  const onEndReached = () => {
    // this.loadMoreOutletHanler();
  };

  const onRefresh = () => {
    // this.outletRefreshHanler();
  };

  const onPressCancel = () => navigation.canGoBack() && navigation.goBack();

  const getChipsData = () => {
    let chips = [];
    try {
      // const category = route.params?.category;
      const {
        show_new_offers = false,
        sub_category_filter = "",
        cuisine_filter = [],
        filters_selected_for_yes = [],
        filters_selected_for_no = [],
        sort_by_filter = "",
      } = route.params || {};

      if (show_new_offers) {
        let item = {
          title: "New Offers",
          filter_type: "show_new_offers",
        };
        chips.push(item);
      }
      if (sort_by_filter) {
        let item = {
          title: sort_by_filter,
          filter_type: "sort_by_filter",
        };
        chips.push(item);
      }
      if (sub_category_filter != "") {
        let item = {
          title: sub_category_filter,
          filter_type: "sub_category_filter",
        };
        chips.push(item);
      }
      if (cuisine_filter.length > 0) {
        for (let i = 0; i < cuisine_filter.length; i++) {
          let item = {
            title: cuisine_filter[i],
            filter_type: "cuisine_filter",
            key: cuisine_filter[i],
          };
          chips.push(item);
        }
      }
      if (filters_selected_for_yes.length > 0) {
        for (let i = 0; i < filters_selected_for_yes.length; i++) {
          let item = {
            title: filters_selected_for_yes[i],
            filter_type: "filters_selected_for_yes",
          };
          chips.push(item);
        }
      }
      if (filters_selected_for_no.length > 0) {
        for (let i = 0; i < filters_selected_for_no.length; i++) {
          let item = {
            title: filters_selected_for_no[i],
            filter_type: "filters_selected_for_no",
          };
          chips.push(item);
        }
      }
      setchipsData(chips);
    } catch (e) {}
  };

  const onDeleteChip = (item: {}, index: number) => {
    try {
      let chips = [...chipsData];
      chips.splice(index, 1);

      const category = route.params?.category;
      if (
        item?.filter_type == "filters_selected_for_no" ||
        item?.filter_type == "filters_selected_for_yes"
      ) {
        const index = params[item?.filter_type].indexOf(item.title);
        params[item?.filter_type].splice(index, 1);
      }

      if (item?.filter_type == "sub_category_filter") {
        params[item?.filter_type] = "";
      }

      if (item?.filter_type == "sort_by_filter") {
        selectedFilters[category?.api_name][item?.filter_type] = "";
      }

      if (item?.filter_type == "cuisine_filter") {
        const index = params[item?.filter_type].findIndex(
          (element) => element === item.key
        );
        params[item?.filter_type].splice(index, 1);
      }

      if (item?.filter_type == "show_new_offers") {
        params[item?.filter_type] = null;
      }

      if (selectedFilters[category?.api_name]) {
        let newSelectedFilters = { ...selectedFilters };
        newSelectedFilters[category?.api_name]["filters_selected_for_no"] =
          params["filters_selected_for_no"] || [];
        newSelectedFilters[category?.api_name]["filters_selected_for_yes"] =
          params["filters_selected_for_yes"] || [];
        newSelectedFilters[category?.api_name]["sub_category_filter"] =
          params["sub_category_filter"] || "";
        newSelectedFilters[category?.api_name]["cuisine_filter"] =
          params["cuisine_filter"] || [];
        newSelectedFilters[category?.api_name]["show_new_offers"] =
          params["show_new_offers"] || null;
        onSetSelectedFilters(newSelectedFilters);
      }
      setchipsData(chips);
      previousSearchText != "" && searchSubmitHandler(true);
    } catch (e) {
      console.log(e);
    }
  };

  const makeCustomAnalyticsStack = async (stackData: any) => {
    await makeStackMongo(stackData);
    await getStackArrayMongo();
  };
  const activeLoader = (flag: boolean) => {
    setIsLoading(flag);
  };

  const ErrorHandler = (data: any) => {
    const { error, message } = data;
    // this.setState({
    //   adaptor: {
    //     data: {
    //       ...this.state.data,
    //       error: error,
    //       errorText: message,
    //     },
    //     CallBacks: this.state.CallBacks,
    //   },
    // });
  };

  const onOutletClickHandler = async (data: outletItemInterface) => {
    navigation?.navigate("Merchant", {
      screen: "MerchantScreen",
      params: data,
    });

    const stackData = {
      current_screen: "Advance Search",
      action: "select_merchant",
      category_id: "",
      categories: "",
      merchant_id: data.merchant?.id,
      categories_analytics: "",
      location_id: 0,
      changeSequenceNumber: false,
    };
    await makeCustomAnalyticsStack(stackData);
  };

  useEffect(() => {
    getChipsData();
  }, []);

  return children({
    searchBar,
    isLoading,
    chipsData,
    outlets,
    params: route?.params,
    favouriteList:
      typeof user?.userId == "number" &&
      !_.isEmpty(favouriteList) &&
      typeof location?.name == "string" &&
      favouriteList[user.userId]
        ? favouriteList[user.userId][
            params?.travelLocation?.id || location.name
          ]
        : {},
    onPressCancel,
    onDeleteChip,
    setPreviousSearchText,
    searchSubmitHandler,
    onOutletClickHandler,
    navigation,
    isSearched,
    recents,
    resetRecents,
  }) as SearchScreenProps;
};
