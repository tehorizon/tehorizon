import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NotificationModule from "@Notification/navigation";
import HomeModule from "@Home/navigation";
import ProfileModule, { PreferencesStack } from "@Profile/navigation";
import Search from "./modules/Search/navigation";
import FavouriteModule from "@Favorite/navigation";
import TravelModule from "@Travel/navigation";
import AttractionModule from "@Attractions/navigation";

//static images
import home_icon from "@assets/images/home-icon.png";
import notification_icon from "@assets/images/notification-icon.png";
import favourites_icon from "@assets/images/favourites-icon.png";
import profile_icon from "@assets/images/profile-icon.png";
import delivery_icon from "@assets/images/delivery.png";
import travel_icon from "@assets/images/travel-icon.png";

import { design } from "rn_fast_track_uilib";
import { Delivery, Travel } from "./Modules.json";
//Delivery module
import DeliveryNavigationStack, {
  DeliveryLocationStack,
} from "@delivery/navigation/deliveryStacks";
//Components
// import Fab from "@components/Fab/Fab";

import MarchantStack from "@Merchant/navigation";
import SavingBreakdown from "@Profile/screens/SavingBreakdown";
import I18n, { getFlipForRTLStyle, isRTL } from "@localization";

//Stacks
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

//colors
const tabActiveColor = design["Bottom_Tabs_Icon_Active_Color"];
const tabInActiveColor = design["Bottom_Tabs_Icon_InActive_Color"];

const hideHeader = {
  headerShown: false,
};

export const FavModule = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="FavouriteStack"
        component={FavouriteModule}
        options={hideHeader}
      />
      {/* <Stack.Screen
        name="DeliveryOutletDetail"
        component={DeliveryOutletDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocationPickerMap"
        component={LocationPickerMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddressDetails"
        component={AddressDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Basket"
        component={Basket}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};
let screenOptions = {
  animationEnabled: true,
};

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Tabs} options={hideHeader} />
      {/* screens dont have bottom navigation bar */}
      <Stack.Screen
        name="Merchant"
        component={MarchantStack}
        options={hideHeader}
      />
      <Stack.Screen name="Search" component={Search} options={hideHeader} />
      <Stack.Screen
        name={"Preference"}
        component={PreferencesStack}
        options={hideHeader}
      />
      <Stack.Screen
        name={"SavingBreakdown"}
        component={SavingBreakdown}
        options={hideHeader}
      />
      <Stack.Screen
        name={"LocationPickerMap"}
        component={DeliveryLocationStack}
      />
      <Stack.Screen
        name={"Travel"}
        component={TravelModule}
        options={hideHeader}
      />

      <Stack.Screen
        name="DeliveryNavigationStack"
        component={DeliveryNavigationStack}
        options={hideHeader}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationModule}
        options={hideHeader}
      />
      <Stack.Screen
        name="Attractions"
        component={AttractionModule}
        options={hideHeader}
      />
    </Stack.Navigator>
  );
};
let tabIcon = {
  HomeTab: home_icon,
  Travel: travel_icon,
  Notification: notification_icon,
  Favourite: favourites_icon,
  User: profile_icon,
  Delivery: delivery_icon,
};

const Tabs = (props) => {
  return (
    <>
      {/* <Fab /> */}
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // You can return any component that you like here!
            return (
              <Image
                source={tabIcon[route.name]}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  tintColor: color,
                  ...getFlipForRTLStyle(),
                }}
              />
            );
          },
        })}
        tabBarOptions={{
          allowFontScaling: false,
          style: {
            ...getFlipForRTLStyle(),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: 101,
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.35,
            shadowRadius: 3.84,

            elevation: 5,
          },
          tabStyle: {
            height: 55,
            alignSelf: "center",
            ...getFlipForRTLStyle(),
          },
          iconStyle: {
            height: 24,
          },
          // showLabel: false,
          activeTintColor: tabActiveColor,
          inactiveTintColor: tabInActiveColor,
          activeBackgroundColor:
            design["Bottom_Tab_Background_Color"] || "transparent",
          inactiveBackgroundColor:
            design["Bottom_Tab_Background_Color"] || "transparent",
        }}
        backBehavior="initialRoute"
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeModule}
          options={{ tabBarTestID: "homeTab", tabBarLabel: I18n.t("Home") }}
        />
        {Travel.isActive && (
          <Tab.Screen
            options={{
              tabBarTestID: "travelTab",
              tabBarLabel: I18n.t("Travel"),
            }}
            name="Travel"
            component={TravelModule}
          />
        )}
        {/* <Tab.Screen name="Notification" component={NotificationModule} /> */}
        {Delivery.isActive && (
          <Tab.Screen
            name="Delivery"
            component={DeliveryNavigationStack}
            options={{
              tabBarTestID: "deliveryTab",
              tabBarLabel: I18n.t("Delivery"),
            }}
          />
        )}
        <Tab.Screen
          name="Favourite"
          component={FavModule}
          options={{ tabBarTestID: "fvtTab", tabBarLabel: I18n.t("Favourite") }}
        />
        <Tab.Screen
          options={{ tabBarTestID: "userTab", tabBarLabel: I18n.t("Profile") }}
          name="User"
          component={ProfileModule}
        />
      </Tab.Navigator>
    </>
  );
};

export { MainNavigation };
