import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PreferenceService from "./index.service";
import PreferenceUI from "./index.ui";

const Preference = () => {
  return (
    <PreferenceService>
      {(props: any) => <PreferenceUI {...props} />}
    </PreferenceService>
  );
};

export default Preference;
