import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "../screens/Notification";
import { isRTL } from "@localization";
const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

//Search module navigation flows
export const NotificationNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name={"NotificationScreen"}
        component={Notification}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default NotificationNavigation;
