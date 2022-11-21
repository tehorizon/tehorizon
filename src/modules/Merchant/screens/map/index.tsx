import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";

import MapServiceComponent from "./index.service";
import MapComponent from "./index.ui";

const Map = () => {
  let navigation = useNavigation();
  let route = useRoute();
  //created separate component for business logic and view
  return (
    <MapServiceComponent navigation={navigation} route={route}>
      {(props: any) => <MapComponent {...props} />}
    </MapServiceComponent>
  );
};

export default Map;
