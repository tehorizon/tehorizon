import React from "react";
import HomeScreenService from "./index.service";
import HomeScreenUI from "./index.ui";

export default (props) => {
  return (
    <HomeScreenService {...props}>
      {(props) => <HomeScreenUI {...props} />}
    </HomeScreenService>
  );
};
