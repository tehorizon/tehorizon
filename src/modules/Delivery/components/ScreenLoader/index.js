import React from "react";
import { View } from "react-native";

import { Loader } from "@components";

const ScreenLoader = (props) => {
  //props
  const { loader = false, height = "100%" } = props;

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: height,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <Loader isVisible={loader} />
    </View>
  );
};

export default ScreenLoader;
