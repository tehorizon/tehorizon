import { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import _ from "lodash";
import i18n, { isRTL } from "@localization";

import { makeStackMongo, getStackArrayMongo } from "@utils/horizonAnalytics";
import { useDispatch } from "react-redux";
import { BottomSheetRef } from "@components/BottomSheet";
import { setAppLoading, setErrorObject } from "@redux/appReducer/app.actions";
import { getOutletTabsRequest, setSelectedFilter } from "@Outlet/redux/actions";
import { useAppSelector } from "@redux/root-reducer";
import { DeviceInfo } from "../../interfaces/requests";
import { setHomeCategory } from "@Home/redux/actions";
import { useRoute } from "@react-navigation/core";
import { store } from "@redux/store";
import { ScreenTypes } from "../../interfaces";
import { Routes } from "../../BL/Interfaces";
import { SelectedFilter } from "../../interfaces/responses";

const OutletService = ({ children, navigation }: ScreenTypes.screen) => {
  const route = useRoute();

  // states
  const [forceRefresh, toggleRefresh] = useState(false);
  const [mode, updateMode] = useState("List");
  const [routes, updateTabs] = useState<Array<Routes>>([]);
  const [activeTab, updateActiveTab] = useState(0);
  const layout = useWindowDimensions();
  const [mapRendered, setMapRender] = useState(false);

  const dispatch = useDispatch(); // dispatch action to reducer
  //actions
  const onSetAppLoading = (data: boolean) => dispatch(setAppLoading(data));
  const onSetErrorObject = (data: Object) => dispatch(setErrorObject(data));
  const onSetSelectedFilters = (data: SelectedFilter) =>
    dispatch(setSelectedFilter(data));
  //reducers

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
  let deviceInfo: DeviceInfo = useAppSelector(
    (state) => state?.appReducer?.deviceInfo
  );
  let category = route?.params?.category || {};
  let travelLocation = route?.params?.travelLocation;
  let selectedFilters: SelectedFilter = useAppSelector(
    (state) => state?.outletReducer?.selectedFilters || {}
  );
  // sagas
  const onSetHomeCategory = (category: any) =>
    dispatch(setHomeCategory(category));

  const getTabsDataHelper = () =>
    dispatch(
      getOutletTabsRequest({
        postData: {
          category: category?.api_name,
          location_id: travelLocation?.id || location?.id,
          language: isRTL ? "ar" : "en",
        },
        token,
        updateTabs,
      })
    );

  //ref
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  // variables
  let screenName = "Offers List";

  //cDM, subscribers
  useEffect(() => {
    if (
      route?.params?.category &&
      store
        .getState()
        ?.homeReducer?.categoryList?.some(
          (e) =>
            e.api_name.toLowerCase() ===
            route?.params?.category?.api_name.toLowerCase()
        )
    ) {
      onSetHomeCategory(route?.params?.category);
      getTabsDataHelper();
    } else {
      navigation?.goBack();
      onSetErrorObject({
        status: true,
        message: i18n.t("Category not exists"),
      });
    }
  }, [route?.params?.category]);

  // cDM
  useEffect(() => {
    getCategoryAndFilterHandler();
  }, []);

  const getCategoryAndFilterHandler = () => {
    try {
      let selectedFilter: SelectedFilter = selectedFilters;
      if (selectedFilter === undefined) {
        selectedFilter = null;
      }
      if (category?.api_name) {
        let categorySelectedFilter = {
          show_new_offers: null,
          sub_category_filter: "",
          cuisine_filter: [],
          filters_selected_for_no: [],
          filters_selected_for_yes: [],
        };
        if (!selectedFilter[route?.params?.category?.api_name]) {
          onSetSelectedFilter(categorySelectedFilter);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makeAnalyticsStack = async (
    screenName = "",
    action = "",
    category_id = 0,
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
    let newMode = mode === "Map" ? "List" : "Map";
    onSetAppLoading(true);
    // if (newMode == "Map") {
    //   onSetAppLoading(true);
    //   setMapRender(true);
    // }
    // setTimeout(
    //   () => {
    updateMode(newMode);
    changeModeHandler(newMode);
    onSetAppLoading(false);
    // },
    //   newMode == "Map" ? 1000 : 0
    // );
    // newMode !== "Map" && setMapRender(true);
  };

  const changeModeHandler = async (mode: string) => {
    if (mode === "List") {
      screenName = "Offers List";
    } else if (mode === "Map") {
      screenName = "Offers Map";
    }

    if (mode === "Map") {
      makeAnalyticsStack(
        "Offers List",
        "select_map",
        category.category_id,
        category.api_name,
        category.display_name,
        travelLocation?.id || location.id,
        false
      );
    } else if (mode === "List") {
      makeAnalyticsStack(
        "Offers Map",
        "select_list",
        category.category_id,
        category.api_name,
        category.display_name,
        travelLocation?.id || location.id,
        false
      );
    }
  };

  const backHandler = () => {
    navigation?.goBack();
    makeAnalyticsStack(
      screenName,
      "select_back",
      category?.id,
      category?.api_name,
      category?.analytics_category_name,
      travelLocation?.id || location?.id,
      false
    );
  };

  const onSearchCLickHandler = async () => {
    //analytics
    await makeAnalyticsStack(
      "Advance Search",
      "open",
      category?.id,
      category?.api_name,
      category?.analytics_category_name,
      travelLocation?.id || location?.id,
      false
    );

    const selectedFilter: any = selectedFilters
      ? selectedFilters[category?.api_name]
      : {};

    navigation?.navigate("Search", {
      screen: "SearchScreen",
      params: {
        category,
        show_new_offers: selectedFilter?.show_new_offers,
        cuisine_filter: selectedFilter?.cuisine_filter,
        sub_category_filter: selectedFilter?.sub_category_filter,
        filters_selected_for_no: selectedFilter?.filters_selected_for_no,
        filters_selected_for_yes: selectedFilter?.filters_selected_for_yes,
        show_keyboard: true,
        travelLocation,
        location_id: travelLocation?.id || location?.id,
      },
    });
  };

  const onClickFilter = () => {
    //analytics
    makeAnalyticsStack(
      screenName,
      "select_filter",
      category.category_id,
      category.api_name,
      category.analytics_category_name,
      travelLocation?.id || location.id,
      false
    );
    onOpenFilters();
  };

  const onOpenFilters = () => {
    bottomSheetRef?.current?.open();
  };

  const onDeleteChip = (item: {}, index: number) => {
    try {
      if (
        item?.filter_type == "filters_selected_for_no" ||
        item?.filter_type == "filters_selected_for_yes"
      ) {
        const index = selectedFilters[category.api_name][
          item?.filter_type
        ].indexOf(item.title);
        selectedFilters[category?.api_name][item?.filter_type].splice(index, 1);
      }

      if (item?.filter_type == "sub_category_filter") {
        selectedFilters[category?.api_name][item?.filter_type] = "";
      }

      if (item?.filter_type == "sort_by_filter") {
        selectedFilters[category?.api_name][item?.filter_type] = "";
      }

      if (item?.filter_type == "cuisine_filter") {
        const index = selectedFilters[category.api_name][
          item?.filter_type
        ].findIndex((element) => element === item.key);

        selectedFilters[category?.api_name][item?.filter_type].splice(index, 1);
      }

      if (item?.filter_type == "show_new_offers") {
        selectedFilters[category?.api_name][item?.filter_type] = null;
      }

      onSetSelectedFilters(selectedFilters);
      const data = {
        refresh: true,
        more: false,
      };
      toggleRefresh(!forceRefresh);
    } catch (e) {
      /** */
    }
  };

  const onDoneHanlder = async () => {
    bottomSheetRef?.current?.close();
    const data = {
      refresh: true,
      more: false,
    };
    toggleRefresh(!forceRefresh);

    setTimeout(async () => {
      const filters = {
        badge: chipsData?.length,
        chipsData: chipsData,
      };
      const stackData = {
        current_screen: "Filters",
        action: "",
        filters: filters,
        category_id: category?.api_name,
        categories: category?.analytics_category_name,
        categories_analytics: category?.analytics_category_name,
        location_id: location?.id,
        changeSequenceNumber: true,
      };
      await makeCustomAnalyticsStack(stackData);
    }, 100);
  };

  const getChipsData = () => {
    let chips = [];
    if (selectedFilters[category?.api_name]) {
      const {
        show_new_offers = false,
        sub_category_filter = "",
        cuisine_filter = [],
        filters_selected_for_yes = [],
        filters_selected_for_no = [],
        sort_by_filter = "",
      } = selectedFilters[category?.api_name];

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
      if (cuisine_filter?.length > 0) {
        for (let i = 0; i < cuisine_filter.length; i++) {
          let item = {
            title: cuisine_filter[i],
            filter_type: "cuisine_filter",
            key: cuisine_filter[i],
          };
          chips.push(item);
        }
      }
      if (filters_selected_for_yes?.length > 0) {
        for (let i = 0; i < filters_selected_for_yes.length; i++) {
          let item = {
            title: filters_selected_for_yes[i],
            filter_type: "filters_selected_for_yes",
          };
          chips.push(item);
        }
      }
      if (filters_selected_for_no?.length > 0) {
        for (let i = 0; i < filters_selected_for_no.length; i++) {
          let item = {
            title: filters_selected_for_no[i],
            filter_type: "filters_selected_for_no",
          };
          chips.push(item);
        }
      }
    }
    return chips;
  };

  const onClearHandler = () => {
    if (selectedFilters && selectedFilters[category?.api_name]) {
      let categorySelectedFilter = {
        show_new_offers: null,
        sub_category_filter: "",
        cuisine_filter: [],
        filters_selected_for_no: [],
        filters_selected_for_yes: [],
      };
      onSetSelectedFilter(categorySelectedFilter);
    }
  };

  const onSetSelectedFilter = (data: any) => {
    selectedFilters[category?.api_name] = data;
    onSetSelectedFilters(selectedFilters);
  };

  const makeCustomAnalyticsStack = async (stackData: Object) => {
    await makeStackMongo(stackData);
    await getStackArrayMongo();
  };
  const chipsData = getChipsData();

  return children({
    // props
    mode,
    deviceInfo,
    routes,
    route,
    activeTab,
    mapRendered,
    category,
    layout,
    bottomSheetRef,
    chipsData,
    forceRefresh,
    travelLocation,
    navigation,
    updateActiveTab,
    backHandler,
    onPressRightButton,
    onSearchCLickHandler,
    onClickFilter,
    onDeleteChip,
    onDoneHanlder,
    onClearHandler,
    onSetSelectedFilter,
    onSetSelectedFilters,
  } as ScreenTypes.OutletScreen);
};

export default OutletService;
