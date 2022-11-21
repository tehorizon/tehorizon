import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Outlet from "../screens/outlet";
import { isRTL } from "@localization";
const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

// Outlet module navigation flows
export const OutletModule = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name="OutletScreen"
        component={Outlet}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default OutletModule;
