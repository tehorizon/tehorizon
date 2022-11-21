
import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";

import DeliveryDetailsService from "./index.service";
import DeliveryDetailsomponent from "./index.ui";

const DeliveryDetails = () => {
  let navigation = useNavigation();
  let route = useRoute();
  //created separate component for business logic and view
  return (
    <DeliveryDetailsService route={route} navigation={navigation}>
      {(props: any) => <DeliveryDetailsomponent {...props} />}
    </DeliveryDetailsService>
  );
};

export default DeliveryDetails;
