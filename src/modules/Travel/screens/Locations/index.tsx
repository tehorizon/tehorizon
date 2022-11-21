import React from "react";
import { useNavigation } from "@react-navigation/core";

import TravelLocationsServiceComponent from "./index.service";
import TravelLocationsComponent from "./index.ui";

const TravelLocations = (props) => {
  //navigation
  const navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <TravelLocationsServiceComponent navigation={navigation} {...props}>
      {(props: any) => <TravelLocationsComponent {...props} />}
    </TravelLocationsServiceComponent>
  );
};

export default TravelLocations;
