import { useNavigation } from "@react-navigation/core";
import React from "react";

import CIFIDServiceComponent from "./index.service";
import CIFIDComponent from "./index.ui";

const CIFID = () => {
  const navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <CIFIDServiceComponent navigation={navigation}>
      {(props: any) => <CIFIDComponent {...props} />}
    </CIFIDServiceComponent>
  );
};

export default CIFID;
