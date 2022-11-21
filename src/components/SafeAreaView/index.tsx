import { design } from "rn_fast_track_uilib";
import React, { Component } from "react";
import APP_COLORS from "@colors";
import { SafeAreaView } from "react-native-safe-area-context";
const CustomSafeAreaView = (props) => {
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: design["Background_Primary_Color"] || "white",
        },
        props?.style,
      ]}
      edges={props.edges}
    >
      {props.children}
    </SafeAreaView>
  );
};
export default CustomSafeAreaView;
