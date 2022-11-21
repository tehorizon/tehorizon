import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { isRTL } from "@localization";
import { setAppLoading } from "@redux/appReducer/app.actions";
import { redemptionHistoryRequest } from "@Profile/redux/actions";
import { userDefaultObj } from "@utils/commons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@redux/root-reducer";
import { makeStackMongo } from "@fast_track/src/utils/horizonAnalytics";

export default function RedemptionHistoryService({ children, ...props }: any) {
  const userSessionToken = useAppSelector(
    (state) => state.userReducer?.userSessionToken
  );
  const user = useAppSelector((state) => state.userReducer?.userInfo);
  const AppConfigs = useAppSelector((state) => state.appReducer?.AppConfigs);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [detailsModalVisible, setdetailsModalVisible] = useState(false);
  const [redemption, setredemption] = useState(null);
  const [redemptionHistory, setredemptionHistory] = useState({
    currentYear: new Date().getFullYear(),
    totalNumberOfRedemption: null,
    monthWiseRedemmptions: [],
  });

  const makeCustomAnalyticsStack = async (stackData) => {
    await makeStackMongo(stackData);
    // const dataStack = await getStackArrayMongo();
  };

  const onRedemptionHistoryRequest = (data: any) =>
    dispatch(redemptionHistoryRequest(data));
  const onSetAppLoading = (flag: any) => dispatch(setAppLoading(flag));

  //Saga call
  const getRedemtionHistory = async () => {
    let currUser = user || userDefaultObj;
    const company = AppConfigs.company;
    const currency = currUser.currency
      ? currUser.currency
      : AppConfigs.defaultCurrency;
    var currentYear = new Date().getFullYear();

    onRedemptionHistoryRequest({
      postData: {
        sessionToken: userSessionToken,
        company: company,
        currency: currency,
        currentYear: currentYear,
        language: isRTL ? "ar" : "en",
      },
      setRedemptionData: setRedemtionData,
    });
  };
  const collapseMonth = (index) => {
    onExpandHandler(index);
  };

  const closeDetailsModal = () => {
    setdetailsModalVisible(false);
  };

  useEffect(() => {
    getRedemtionHistory();
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

  const setRedemtionData = (data) => {
    setredemptionHistory({
      ...data,
    });
  };

  const onExpandHandler = (index) => {
    const monthWiseRedemmptions = redemptionHistory.monthWiseRedemmptions;
    monthWiseRedemmptions[index].collapsed =
      !monthWiseRedemmptions[index].collapsed;
    setredemptionHistory({
      ...redemptionHistory,
      monthWiseRedemmptions,
    });
  };

  const activeLoader = (flag: boolean): void => {
    onSetAppLoading(flag);
  };
  const onCLickRedemptionItem = (item: any) => {
    setredemption(item);
    setdetailsModalVisible(true);
    makeCustomAnalyticsStack({
      current_screen: "Savings Breakdown",
      action: "click_redemption",
      reference_code: "",
    });
  };
  const data = redemptionHistory;
  const { header } = props;

  return children({
    header,
    data,
    navigation,
    setredemption,
    setdetailsModalVisible,
    collapseMonth,
    redemption,
    detailsModalVisible,
    closeDetailsModal,
    onCLickRedemptionItem,
  });
}
