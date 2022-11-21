import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JailBreak from "../screens";
import { isRTL } from "@localization";

const screenOptions = { headerShown: false };
const Stack = createStackNavigator();

// JailBreak module navigation flows
const JailBreakNavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name="JailBreak"
        component={JailBreak}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default JailBreakNavigationStack;
