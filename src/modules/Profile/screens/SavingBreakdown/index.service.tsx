import React, { useState } from "react";
import RedemptionsHistory from "../RedemptionHistory";
import { makeStackMongo, getStackArrayMongo } from "@utils/horizonAnalytics";
import { useNavigation } from "@react-navigation/native";

export default function SavingBreakdownService({ children, ...props }: any) {
  const [detailsModalVisible, setdetailsModalVisible] = useState(false);
  const navigation = useNavigation();
  const hideErrorModal = () => {
    props.CallBacks.onError({
      error: false,
      message: "",
    });
  };

  const closeDetailsModal = () => {
    setdetailsModalVisible(false);
  };

  const redemptionHistoryComponent = () => {
    return <RedemptionsHistory header={false} />;
  };

  const makeCustomAnalyticsStack = async (stackData) => {
    await makeStackMongo(stackData);
    await getStackArrayMongo();
  };
  return children({
    navigation,
    makeCustomAnalyticsStack,
  });
}
