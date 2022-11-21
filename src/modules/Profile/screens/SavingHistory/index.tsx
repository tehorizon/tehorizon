import React from "react";
import SavingHistoryService from "./index.service";
import SavingHistoryUI from "./index.ui";
import {useRoute} from "@react-navigation/core";

export default function SavingHistory() {
  let route = useRoute();
  return (
    <SavingHistoryService {...route?.params}>
      {(props: any) => <SavingHistoryUI {...props} />}
    </SavingHistoryService>
  );
}
