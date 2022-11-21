import React from "react";

import { Portal } from "react-native-paper";

export default (props) => {
  return <Portal>{props.children}</Portal>;
};
