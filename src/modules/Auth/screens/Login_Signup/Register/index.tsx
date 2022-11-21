import { useNavigation } from "@react-navigation/core";
import React from "react";

import SigunUpServiceComponent from "./index.service";
import SignUpComponent from "./index.ui";

const SignUp = () => {
  let navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <SigunUpServiceComponent navigation={navigation}>
      {(props: any) => <SignUpComponent {...props} />}
    </SigunUpServiceComponent>
  );
};

export default SignUp;
