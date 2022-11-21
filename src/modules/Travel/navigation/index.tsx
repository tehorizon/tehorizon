import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Locations from "../screens/Locations";
import { isRTL } from "@localization";
const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

// Outlet module navigation flows
export const TravelModule = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name="Locations"
        component={Locations}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default TravelModule;
