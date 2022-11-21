import { useNavigation } from "@react-navigation/core";
import React from "react";

import LoginServiceComponent from "./index.service";
import LoginComponent from "./index.ui";

const Login = () => {
  let navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <LoginServiceComponent navigation={navigation}>
      {(props: any) => <LoginComponent {...props} />}
    </LoginServiceComponent>
  );
};

export default Login;
