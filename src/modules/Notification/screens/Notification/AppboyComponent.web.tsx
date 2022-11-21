import AppBoy from "@HybridComponents/AppBoy";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/core";

export default function AppboyComponent() {
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      AppBoy.launchNewsFeed();
      navigation.goBack();
    }, [])
  );
  return null;
}
