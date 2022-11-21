import { useNavigation } from "@react-navigation/core";
import React from "react";

import PhoneNumberServiceComponent from "./index.service";
import PhoneNumberComponent from "./index.ui";

const PhoneNumber = () => {
  const navigation = useNavigation();
  return (
    <PhoneNumberServiceComponent navigation={navigation}>
      {(props: any) => <PhoneNumberComponent {...props} />}
    </PhoneNumberServiceComponent>
  );
};

export default PhoneNumber;
