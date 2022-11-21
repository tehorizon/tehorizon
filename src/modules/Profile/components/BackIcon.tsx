import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const BackIcon = ({ onPress }: any) => {
  return (
    <Fontisto
      onPress={onPress}
      style={styles.icon}
      size={16}
      name="caret-left"
    />
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  icon: {
    color: "rgb(81,84,86)",
    marginStart: 22,
  },
});
