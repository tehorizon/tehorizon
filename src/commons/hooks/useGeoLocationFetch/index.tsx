import { useEffect, useState } from "react";
import { Platform } from "react-native";
import GL from "@react-native-community/geolocation";
const Geolocation =
  Platform.OS != "web" ? GL : global?.navigator?.geolocation || {};
let watcherID: any;
export default (
  locationCallBack: (location: any, permissionBlocked?: boolean) => void
) => {
  useEffect(() => {
    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  const fetchLocation = () => {
    const watchId = Geolocation.watchPosition(
      (location) => {
        locationCallBack(location);
      },
      (error) => {
        if (error?.code === 1) {
          locationCallBack(undefined, true);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      }
    );
    Geolocation.clearWatch(watcherID);
    watcherID = watchId;
  };
  const getCurrentLocation = async () => {
    if (Platform.OS === "web") {
      fetchLocation();
    } else {
      const Permissions = require("react-native-permissions");
      const { PERMISSIONS } = require("react-native-permissions");

      let status = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
      ]);
      if (
        (status[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === "denied" &&
          status[PERMISSIONS.IOS.LOCATION_ALWAYS] === "denied") ||
        status[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "denied"
      ) {
        status = await Permissions.requestMultiple([
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          PERMISSIONS.IOS.LOCATION_ALWAYS,
        ]);
      }

      if (
        status[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === "granted" ||
        status[PERMISSIONS.IOS.LOCATION_ALWAYS] === "granted" ||
        status[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted"
      ) {
        Geolocation.setRNConfiguration({
          skipPermissionRequests: true,
          authorizationLevel: "whenInUse",
        });
        fetchLocation();
      } else {
        locationCallBack(undefined, true);
      }
    }
  };

  return getCurrentLocation;
};
