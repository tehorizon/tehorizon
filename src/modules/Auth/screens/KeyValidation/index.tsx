import { useNavigation } from "@react-navigation/core";
import React from "react";

import KetValidationServiceComponent from "./index.service";
import KeyValidationScreen from "./index.ui";

const KeyValidation = () => {
  let navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <KetValidationServiceComponent navigation={navigation}>
      {(props: any) => <KeyValidationScreen {...props} />}
    </KetValidationServiceComponent>
  );
};

export default KeyValidation;
