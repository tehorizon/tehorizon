import { useNavigation } from "@react-navigation/core";
import React from "react";

import DeliveryHomeService from "./index.service";
import DeliveryHomeComponent from "./index.ui";

const DeliveryHome = () => {
  let navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <DeliveryHomeService navigation={navigation}>
      {(props: any) => <DeliveryHomeComponent {...props} />}
    </DeliveryHomeService>
  );
};

export default DeliveryHome;
