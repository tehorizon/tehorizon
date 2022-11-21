import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";

import MerchantServiceComponent from "./index.service";
import MerchantComponent from "./index.ui";

const Merchant = () => {
  let navigation = useNavigation();
  let route = useRoute();
  //created separate component for business logic and view
  return (
    <MerchantServiceComponent route={route} navigation={navigation}>
      {(props: any) => <MerchantComponent {...props} />}
    </MerchantServiceComponent>
  );
};

export default Merchant;
