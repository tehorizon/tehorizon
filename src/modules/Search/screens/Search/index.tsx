import React from "react";
import { View } from "react-native";
import SearchScreenService from "./index.service";
import SearchScreenUI from "./index.ui";
export default (props) => {
  return (
    <SearchScreenService {...props}>
      {(props) => <SearchScreenUI {...props} />}
    </SearchScreenService>
  );
};
