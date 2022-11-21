import { useNavigation,useRoute } from "@react-navigation/core";
import React from "react";

import AddLocationService from "./index.service";
import AddLocationComponent from "./index.ui";

const AddNewLocation = () => {
  let navigation = useNavigation();
  let route=useRoute();
  //created separate component for business logic and view
  return (
    <AddLocationService route={route} navigation={navigation}>
      {(props: any) => <AddLocationComponent {...props} />}
    </AddLocationService>
  );
};

export default AddNewLocation;
