import { useNavigation,useRoute } from "@react-navigation/core";
import React from "react";

import OrderHistoryService from "./index.service";
import OrderHistoryComponent from "./index.ui";

const OrderHistory = () => {
  let navigation = useNavigation();
  let route=useRoute();
  //created separate component for business logic and view
  return (
    <OrderHistoryService route={route} navigation={navigation}>
      {(props: any) => <OrderHistoryComponent {...props} />}
    </OrderHistoryService>
  );
};

export default OrderHistory;
