import { useNavigation } from "@react-navigation/core";
import React from "react";
import ChangePasswordService from "./index.service";
import ChangePasswordUI from "./index.ui";

const ChangePassword = () => {
  const navigation = useNavigation();
  return (
    <ChangePasswordService navigation={navigation}>
      {(props: any) => <ChangePasswordUI {...props} />}
    </ChangePasswordService>
  );
};

export default ChangePassword;
