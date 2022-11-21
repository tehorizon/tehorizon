import { useNavigation } from "@react-navigation/core";
import React from "react";

import OTPServiceComponent from "./index.service";
import OTPComponent from "./index.ui";

const OTP = () => {
  const navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <OTPServiceComponent navigation={navigation}>
      {(props: any) => <OTPComponent {...props} />}
    </OTPServiceComponent>
  );
};

export default OTP;
