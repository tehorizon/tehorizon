import { useNavigation,useRoute } from "@react-navigation/core";
import React from "react";
import BasketViewService from "./index.service";
import BasketViewComponent from "./index.ui";

const BasketView = () => {
  let navigation = useNavigation();
  let route=useRoute();
  //created separate component for business logic and view
  return (
    <BasketViewService route={route} navigation={navigation}>
      {(props: any) => <BasketViewComponent {...props} />}
    </BasketViewService>
  );
};

export default BasketView;
