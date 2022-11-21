import { useNavigation,useRoute } from "@react-navigation/core";
import React from "react";

import OrderStatusService from "./index.service";
import OrderStatusComponent from "./index.ui";

const OrderStatus = () => {
  let navigation = useNavigation();
  let route=useRoute();
  //created separate component for business logic and view
  return (
    <OrderStatusService route={route} navigation={navigation}>
      {(props: any) => <OrderStatusComponent {...props} />}
    </OrderStatusService>
  );
};

export default OrderStatus;
