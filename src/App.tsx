import React, { useEffect, useRef } from "react";
import { Linking, AppState, StatusBar } from "react-native";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { MainNavigation } from "./navigation";
import AuthModule from "@Auth/navigation";
import {
  makeSessionMongo,
  makeStackMongo,
  mongoInit,
  postMongoAnalytics,
} from "./utils/horizonAnalytics";
import { setDeeplinkData } from "./redux/appReducer/app.actions";
import { Host } from "react-native-portalize";
import { useAppSelector } from "@redux/root-reducer";
import JB from "@HybridComponents/JailMonkey";
import JBNavigationStack from "@jailbreak/navigation";
import * as Device from "expo-device";
import linking from "@utils/deeplink";
import { isRTL } from "@localization";
import { design } from "rn_fast_track_uilib";

const Stack = createStackNavigator();

interface StackData {
  current_screen: string;
  action: string;
  category_id: string;
  categories: string;
  categories_analytics: string;
  location_id: number;
  changeSequenceNumber: boolean;
  network: string;
}

const App = () => {
  // state
  const appState = useRef(AppState.currentState);

  // reducers
  let user = useAppSelector((state) => state?.userReducer?.userInfo?.userId);
  let skipMode = useAppSelector((state) => state?.appReducer?.skipMode);

  // ref
  const navigation = useRef<NavigationContainerRef>(null);

  // dispatch
  const dispatch = useDispatch();

  const onSetDeeplinkData = (data) => dispatch(setDeeplinkData(data));

  //cDM
  useEffect(() => {
    (async () => {
      await mongoInit();
      await makeSessionMongo();
      postMongoAnalytics();
      customAnalyticsStack();
    })();
  }, []);

  // listners
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        const stackData = {
          current_screen: "App foreground",
          action: "",
          category_id: "",
          categories: "",
          categories_analytics: "",
          location_id: 0,
          changeSequenceNumber: true,
          network: "wifi",
        };
        makeCustomAnalyticsStack(stackData);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const customAnalyticsStack = async () => {
    const initialLinking = await Linking.getInitialURL();

    const stackData = {
      current_screen: "App Launch",
      action: initialLinking ? "DeepLink" : "",
      category_id: "",
      categories: "",
      categories_analytics: "",
      location_id: 0,
      changeSequenceNumber: true,
      network: "wifi",
    };

    makeCustomAnalyticsStack(stackData);
  };

  const makeCustomAnalyticsStack = async (stackData: StackData) => {
    await makeStackMongo(stackData);
    // await getStackArrayMongo();
  };

  const userExists = user !== null && user !== undefined;
  const showMain = userExists || skipMode;

  return (
    <Host>
      <StatusBar
        backgroundColor={design.Background_Primary_Color}
        barStyle="dark-content"
      />
      <NavigationContainer ref={navigation} linking={linking}>
        {(!__DEV__ && !Device.isDevice) || JB.isJailBroken() ? (
          <JBNavigationStack />
        ) : (
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: false,
              animationEnabled: true,
              gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
            }}
          >
            {!showMain ? (
              <Stack.Screen
                name="Auth"
                component={AuthModule}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Tab"
                component={MainNavigation}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Host>
  );
};

export default App;
