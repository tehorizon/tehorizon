import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import favorite from "../screens/favorite";
import { isRTL } from "@localization";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

// Favorite module navigation flows
export const FavoriteModule = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name={"FavouriteScreen"}
        component={favorite}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default FavoriteModule;
