import { useNavigation,useRoute } from "@react-navigation/core";
import React from "react";

import DeliverySearchService from "./index.service";
import DeliverySearchComponent from "./index.ui";

const DeliverySearch = () => {
  let navigation = useNavigation();
  let route=useRoute();
  //created separate component for business logic and view
  return (
    <DeliverySearchService route={route} navigation={navigation}>
      {(props: any) => <DeliverySearchComponent {...props} />}
    </DeliverySearchService>
  );
};

export default DeliverySearch;
