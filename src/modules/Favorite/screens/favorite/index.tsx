import { useNavigation } from "@react-navigation/core";
import React from "react";

import FavouriteServiceComponent from "./index.service";
import FavouriteComponent from "./index.ui";

const Favourite = () => {
  let navigation = useNavigation();
  //created separate component for business logic and view
  return (
    <FavouriteServiceComponent navigation={navigation}>
      {(props: any) => <FavouriteComponent {...props} />}
    </FavouriteServiceComponent>
  );
};

export default Favourite;
