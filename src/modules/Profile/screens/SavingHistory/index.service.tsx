import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";

import {
  setAppLoading,
  setErrorObject,
  setAppValues,
} from "@redux/appReducer/app.actions";
import { useDispatch } from "react-redux";
import { savingHistoryRequest } from "@Profile/redux/actions";
import { useAppSelector } from "@redux/root-reducer";

//analytics
import { makeStackMongo, getStackArrayMongo } from "@utils/horizonAnalytics";
import { userDefaultObj } from "@utils/commons";
import { useNavigation } from "@react-navigation/native";

export default function SavingHistoryService({ children, ...props }: any) {
  const [activeTab, setactiveTab] = useState(0);
  const [currency, setcurrency] = useState("");
  const [title, settitle] = useState(null);
  const [savings, setsavings] = useState(null);
  const [graph, setgraph] = useState(null);
  const [progressBar, setprogressBar] = useState(null);
  const [monthlySaving, setmonthlySaving] = useState(null);
  const [yearlySavings, setyearlySavings] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userSessionToken = useAppSelector(
    (state) => state.userReducer?.userSessionToken || ""
  );
  const user = useAppSelector((state) => state.userReducer?.userInfo);
  const AppConfigs = useAppSelector((state) => state.appReducer?.AppConfigs);
  const deviceInfo = useAppSelector((state) => state.appReducer?.deviceInfo);

  const onSavingHistoryRequest = (data: any) =>
    dispatch(savingHistoryRequest(data));
  const onSetErrorObject = (errorObj: any) =>
    dispatch(setErrorObject(errorObj));
  const onSetAppLoading = (loading: Boolean) =>
    dispatch(setAppLoading(loading));

  useEffect(() => {
    try {
      onChangeTab(0);
      // onChangeTabHandler("1");
    } catch (error) {
      activeLoader(false);
      console.log(error);
    }
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    activeLoader(false);
    navigation.goBack();
    return true;
  };

  // const onChangeTab = (activeTab: number) => {
  //   if (activeTab === 0) {
  //     setactiveTab(1);
  //     let data = {
  //       name: "Savings Breakdown",
  //       action: "select_savings_monthly",
  //     };
  //     makeAnalyticsStack(data.name, data.action);
  //   } else if (activeTab === 1) {
  //     setactiveTab(0);
  //     let data = {
  //       name: "Savings Breakdown",
  //       action: "select_savings_yearly",
  //     };
  //     makeAnalyticsStack(data.name, data.action);
  //   }
  //   onChangeTabHandler(activeTab);
  // };

  const getUserSaving = (activeTab: number, summaryType: string) => {
    onSavingHistoryRequest({
      postData: {
        activeTab: activeTab,
        sessionToken: userSessionToken,
        company: AppConfigs.company.toLowerCase(),
        currency: user.currency,
        summaryType: summaryType,
        language: deviceInfo.language,
      },
      onChangeTabHandler: onChangeTabHandler,
    });

    // const redemData =  UserProfileBL.userSaving(data);
    // return { data: redemData, userObj: data };
  };

  const onChangeTab = (activeTab: number) => {
    console.log("onChangeTabHandler: ", activeTab);
    if (activeTab === 0) {
      let data = {
        name: "Savings Breakdown",
        action: "select_savings_monthly",
      };
      makeAnalyticsStack(data.name, data.action);
      setactiveTab(activeTab);

      if (monthlySaving === null) {
        getUserSaving(activeTab, "by_month");
      } else {
        settitle(monthlySaving.currentMonth + " SAVINGS");
        setsavings(monthlySaving.currentMonthSaving);
        setprogressBar(monthlySaving.savings.progressBar);
        setgraph(monthlySaving.savings.graph);
      }
    } else if (activeTab === 1) {
      let data = {
        name: "Savings Breakdown",
        action: "select_savings_yearly",
      };
      makeAnalyticsStack(data.name, data.action);
      setactiveTab(activeTab);

      if (yearlySavings === null) {
        getUserSaving(activeTab, "by_year");
      } else {
        settitle("LIFETIME SAVINGS");
        setsavings(yearlySavings.lifeTimeSaving);
        setprogressBar(yearlySavings.savings.progressBar);
        setgraph(yearlySavings.savings.graph);
      }
    }
  };

  const onChangeTabHandler = (data, tab: number) => {
    console.log("onChangeTabHandler: ", data, tab);
    if (tab === 0) {
      settitle(data.currentMonth + " SAVINGS");
      setsavings(data.currentMonthSaving);
      setprogressBar(data.savings.progressBar);
      setgraph(data.savings.graph);
      setcurrency(user.currency);
      setmonthlySaving(data);
    } else if (tab === 1) {
      settitle("LIFETIME SAVINGS");
      setsavings(data.lifeTimeSaving);
      setprogressBar(data.savings.progressBar);
      setgraph(data.savings.graph);
      setcurrency(user.currency);
      setyearlySavings(data);
    }
  };

  const activeLoader = (flag: boolean): void => {
    onSetAppLoading(flag);
  };

  const ErrorHandler = (data: any) => {
    const { error, message } = data;
    const errorObj = {
      status: error,
      message,
    };
    onSetErrorObject(errorObj);
  };

  const makeCustomAnalyticsStack = async (stackData) => {
    await makeStackMongo(stackData);
    await getStackArrayMongo();
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
    await getStackArrayMongo();
  };

  const { header } = props;
  let showHeader = false;
  if (header === undefined) {
    showHeader = true;
  } else {
    showHeader = false;
  }

  const currUser = user || userDefaultObj;

  const graphData = {
    currency,
    graph,
    progressBar,
    activeTab,
  };

  return children({
    showHeader,
    monthlySaving,
    currUser,
    title,
    navigation,
    currency,
    savings,
    activeTab,
    onChangeTab,
    graphData,
  });
}
