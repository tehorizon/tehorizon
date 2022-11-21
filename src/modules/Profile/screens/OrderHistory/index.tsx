import React from "react";
import OrderHistoryService from "./index.service";
import OrderHistoryUI from "./index.ui";

export default function OrderHistory() {
  return (
    <OrderHistoryService>
      {(props: any) => <OrderHistoryUI {...props} />}
    </OrderHistoryService>
  );
}
