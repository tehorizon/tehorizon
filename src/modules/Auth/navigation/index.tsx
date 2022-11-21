import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import KeyValidationScreen from "../screens/KeyValidation";
import Login from "../screens/Login_Signup/Login";
import Register from "../screens/Login_Signup/Register";
import PhoneNumber from "../screens/PhoneNumber";
import SubscriptionScreen from "../screens/Subscription";
import OTP from "../screens/OTP";
import CIFID from "../screens/CIFID";
import { useAppSelector } from "@redux/root-reducer";
import { isRTL } from "@localization";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
const RegisterStack = () => (
  <Stack.Navigator
    screenOptions={{
      animationEnabled: true,
      gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Login" component={Login} options={screenOptions} />
    <Stack.Screen
      name="Register"
      component={Register}
      options={screenOptions}
    />
    <Stack.Screen
      name="PhoneNumber"
      component={PhoneNumber}
      options={screenOptions}
    />
    <Stack.Screen name="OTP" component={OTP} options={screenOptions} />
    <Stack.Screen name="CIFID" component={CIFID} options={screenOptions} />
    <Stack.Screen
      name="Subscription"
      component={SubscriptionScreen}
      options={screenOptions}
    />
  </Stack.Navigator>
);
// Auth module navigation flows
export const AuthModule = () => {
  const appConfig = useAppSelector((state) => state?.appReducer?.AppConfigs);

  if (appConfig?.isKeyValidationEnabled === true) {
    return (
      <Stack.Navigator
        screenOptions={{
          animationEnabled: true,
          gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
        }}
      >
        <Stack.Screen
          name="KeyValidation"
          component={KeyValidationScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="Registeration"
          component={RegisterStack}
          options={screenOptions}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName={"Registeration"}
        screenOptions={{
          animationEnabled: true,
          gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
        }}
      >
        <Stack.Screen
          name="Registeration"
          component={RegisterStack}
          options={screenOptions}
        />
      </Stack.Navigator>
    );
  }
};

export default AuthModule;
