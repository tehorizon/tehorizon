import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import OutletModule from "@Outlet/navigation";
// import { isRTL } from "@localization";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        // gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="Outlet"
        component={OutletModule}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
