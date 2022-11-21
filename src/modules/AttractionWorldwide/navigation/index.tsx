import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
import Destination from "../screens/Destination";
import Location from "../screens/Location";
import Attraction from "../screens/AttractionsWorldwide";
import AttractionDetail from "../screens/AttractionsDetails";
import Bookings from "../screens/Bookings";

// Outlet module navigation flows
export const AttractionModule = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name="AttractionWorldwide"
        component={Attraction}
        options={screenOptions}
      />
      <Stack.Screen
        name="AllLocation"
        component={Location}
        options={screenOptions}
      />
      <Stack.Screen
        name="Select City"
        component={Destination}
        options={screenOptions}
      />
      <Stack.Screen
        name="AttractionDetails"
        component={AttractionDetail}
        options={screenOptions}
      />
      <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default AttractionModule;
