import { useNavigation,useRoute } from "@react-navigation/core";
import React from "react";

import AddressDetailsService from "./index.service";
import AddressDetailsComponent from "./index.ui";

const AddressDetails = () => {
  let navigation = useNavigation();
  let route = useRoute();
  //created separate component for business logic and view
  return (
    <AddressDetailsService route={route} navigation={navigation}>
      {(props: any) => <AddressDetailsComponent {...props} />}
    </AddressDetailsService>
  );
};

export default AddressDetails;
