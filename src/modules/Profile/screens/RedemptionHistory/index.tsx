import React from "react";
import RedemptionHistoryService from "./index.service";
import RedemptionHistoryUI from "./index.ui";
import {useRoute} from "@react-navigation/core";

export default function RedemptionHisotry() {
  let route = useRoute();

  return (
    <RedemptionHistoryService {...route?.params}>
      {(props: any) => <RedemptionHistoryUI {...props} />}
    </RedemptionHistoryService>
  );
}
