import React from "react";
import { useNavigation } from "@react-navigation/core";
import ServiceComponent from "./index.service";
import UIComponent from "./index.ui";

const TravelLocations = (props) => {
  //navigation
  const navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <ServiceComponent navigation={navigation} {...props}>
      {(props: any) => <UIComponent {...props} />}
    </ServiceComponent>
  );
};

export default TravelLocations;
