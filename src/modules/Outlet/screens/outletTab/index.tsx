import React from "react";
import { useNavigation } from "@react-navigation/core";

import OutletServiceComponent from "./index.service";
import OutletComponent from "./index.ui";

const OutletTab = (props) => {
  //navigation
  const navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <OutletServiceComponent navigation={navigation} {...props}>
      {(props: any) => <OutletComponent {...props} />}
    </OutletServiceComponent>
  );
};

export default OutletTab;
