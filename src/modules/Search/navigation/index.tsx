import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import { isRTL } from "@localization";
const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
//Search module navigation flows
export const SearchNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name={"SearchScreen"}
        component={Search}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
