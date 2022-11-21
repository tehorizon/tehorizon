import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "@Profile/screens/UserProfile";
import Subscription from "@Profile/screens/Subscription";
import SavingHistory from "@Profile/screens/SavingHistory";
import Preference from "@Profile/screens/UserPreferences";
import RedemptionHistory from "@Profile/screens/RedemptionHistory";
import OrderHistory from "@Profile/screens/OrderHistory";
import ProfileDetail from "@Profile/screens/ProfileDetail";
import ChangePassword from "@Profile/screens/ChangePassword";
import { isRTL } from "@localization";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

export const PreferencesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name={"PreferenceScreen"}
        component={Preference}
        options={screenOptions}
      />
      <Stack.Screen
        name={"Subscription"}
        component={Subscription}
        options={screenOptions}
      />

      <Stack.Screen
        name={"SavingHistory"}
        component={SavingHistory}
        options={screenOptions}
      />

      <Stack.Screen
        name={"RedemptionHistory"}
        component={RedemptionHistory}
        options={screenOptions}
      />
      <Stack.Screen
        name={"OrderHistory"}
        component={OrderHistory}
        options={screenOptions}
      />
      <Stack.Screen
        name={"ProfileDetail"}
        component={ProfileDetail}
        options={screenOptions}
      />
      <Stack.Screen
        name={"ChangePassword"}
        component={ChangePassword}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};
const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen
        name={"UserProfile"}
        component={UserProfile}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
