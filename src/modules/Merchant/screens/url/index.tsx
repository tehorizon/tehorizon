import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";

import UrlServiceComponent from "./index.service";
import UrlComponent from "./index.ui";

const Url = () => {
  let navigation = useNavigation();
  let route = useRoute();
  //created separate component for business logic and view
  return (
    <UrlServiceComponent navigation={navigation} route={route}>
      {(props: any) => <UrlComponent {...props} />}
    </UrlServiceComponent>
  );
};

export default Url;
