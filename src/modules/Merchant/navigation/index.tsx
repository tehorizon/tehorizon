import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
import MerchantModule from "../screens/merchant";
import MerchantMapScreen from "../screens/map";
import MerchantHeroURLScreen from "../screens/url";
import { isRTL } from "@localization";

// Marchant module navigation flows
export const MarchantStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name="MerchantScreen"
        component={MerchantModule}
        options={screenOptions}
      />

      <Stack.Screen
        name="MerchantMap"
        component={MerchantMapScreen}
        options={screenOptions}
      />

      <Stack.Screen
        name="MerchantHeroURL"
        component={MerchantHeroURLScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default MarchantStack;
