import { useCallback, useEffect, useRef, useState } from "react";
import { ScreenTypes } from "../../interfaces";
import { useDispatch } from "react-redux";
import { BackHandler, Linking, Platform } from "react-native";
import { setAppLoading } from "@redux/appReducer/app.actions";
import MapView from "react-native-maps";

const MapService = ({ children, navigation, route }: ScreenTypes.map) => {
  const { name, location, description, currentLocation } = route?.params || {};

  //refrences
  const mapRef = useRef<MapView>(null);

  let initialRegion = {
    latitude: location?.lat || -37.78825,
    longitude: location?.lng || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const dispatch = useDispatch(); // dispatch action to reducer

  // dispach
  const onAppLoading = (status: boolean) => dispatch(setAppLoading(status));

  // cDM, add listeners
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    // componentWillUnMount
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    onAppLoading(false);
    navigation.goBack();
    return true;
  };

  const gotToMyLocation = useCallback(() => {
    if (mapRef) {
      mapRef?.current?.animateToRegion({
        latitude: currentLocation?.coords?.latitude || 0,
        longitude: currentLocation?.coords?.longitude || 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [mapRef]);

  const openGps = useCallback(() => {
    let scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    let url = scheme + `${location?.lat},${location?.lng}`;
    Linking.openURL(url);
  }, [location]);

  return children({
    name,
    mapRef,
    initialRegion,
    description,
    openGps,
    gotToMyLocation,
    navigation,
  } as ScreenTypes.Map);
};

export default MapService;
