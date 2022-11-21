import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeliveryHome from "@delivery/screens/deliveryHome";
import DeliveryOutletDetails from "@delivery/screens/deliveryOutletDetails";
import BasketView from "@delivery/screens/BasketView";
import OrderStatus from "@delivery/screens/orderStatus/index";
import AllFiltersScreen from "@delivery/screens/AllFiltersScreen";
import DeliveryOutletSearch from "@delivery/screens/deliverySearch";
import AddLocation from "@delivery/screens/AddNewLocation";
import ChooseLocationMap from "@delivery/screens/ChooseLocationMap";
import AddressDetails from "@delivery/screens/AddressDetails";
import { isRTL } from "@localization";

const Stack = createStackNavigator();

const DeliveryNavigationStack = (props: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen name="DeliveryHome" component={DeliveryHome} />
      <Stack.Screen
        name="DeliveryOutletDetail"
        component={DeliveryOutletDetails}
      />
      <Stack.Screen name="AllFiltersScreen" component={AllFiltersScreen} />
      <Stack.Screen name="Basket" component={BasketView} />
      <Stack.Screen name="OrderStatus" component={OrderStatus} />
      {/* <Stack.Screen name="OrderHistory" component={OrderHistory} /> */}
      <Stack.Screen
        name="DeliveryOutletSearch"
        component={DeliveryOutletSearch}
      />
    </Stack.Navigator>
  );
};

export const DeliveryLocationStack = (props: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
      }}
    >
      <Stack.Screen name="LocationPickerMap" component={ChooseLocationMap} />
      <Stack.Screen name={"AddLocation"} component={AddLocation} />
      <Stack.Screen name="AddressDetails" component={AddressDetails} />
    </Stack.Navigator>
  );
};

export default DeliveryNavigationStack;
