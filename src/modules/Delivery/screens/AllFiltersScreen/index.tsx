import { useNavigation,useRoute } from "@react-navigation/core";
import React from "react";
import AllFiltersService from "./index.service";
import AllFiltersComponent from "./index.ui";

const AllFilters = () => {
  let navigation = useNavigation();
  let route=useRoute();
  //created separate component for business logic and view
  return (
    <AllFiltersService route={route} navigation={navigation}>
      {(props: any) => <AllFiltersComponent {...props} />}
    </AllFiltersService>
  );
};

export default AllFilters;
