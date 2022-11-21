import React from "react";
import { View, Text } from "react-native";
import { ScreenTypes } from "../../interfaces";
import styles from "./styles";

const AllFiltersScreen = ({ navigation }: ScreenTypes.allFilters) => {
  return (
    <View style={styles.mainView}>
      <Text>AllFiltersScreen home</Text>
    </View>
  );
};
export default AllFiltersScreen;
