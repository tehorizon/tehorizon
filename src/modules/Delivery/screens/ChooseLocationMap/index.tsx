import { useNavigation,useRoute } from "@react-navigation/core";
import React from "react";

import ChoseLocationMapService from "./index.service";
import ChoseLocationMapComponent from "./index.ui";

const ChooseLocationMap = () => {
  let navigation = useNavigation();
  let route = useRoute();

  //created separate component for business logic and view
  return (
    <ChoseLocationMapService route={route} navigation={navigation}>
      {(props: any) => <ChoseLocationMapComponent {...props} />}
    </ChoseLocationMapService>
  );
};

export default ChooseLocationMap;
