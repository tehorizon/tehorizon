import { ScreenTypes } from "../../interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import Geocoder from "react-native-geocoding";
import Config from "react-native-config";
import MapView from "react-native-maps";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import useGeoLocationFetch from "@fast_track/src/commons/hooks/useGeoLocationFetch";
import { useAppSelector } from "@redux/root-reducer";

const initialRegion = {
  latitude: -37.785834,
  longitude: -122.406417,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const AddLocation = ({ children, navigation, route }: ScreenTypes.screen) => {
  const [region, onRegionChange] = useState(initialRegion);
  const [address, updateAddress] = useState("");
  const [googleInputVisibility, toggleGoogleInput] = useState(false);

  let currentLocation = useAppSelector(
    (state) => state?.locationReducer?.currentLocation?.coords
  );

  let deliveryLocations = useAppSelector(
    (state) =>
      state?.deliveryDetailReducer?.deliveryDetails?.delivery_locations || []
  );
  const map = useRef<MapView>();

  // cDM - initailized geocoder with API key
  useEffect(() => {
    Geocoder.init(Config.MAP_API_KEY, { language: "en" });
  }, []);

  /**
   * if has latlng values then use them otherwise move to current Location
   */
  const moveToLocation = (forceCurrent = false) => {
    let location = currentLocation;

    if (
      !forceCurrent &&
      route?.params?.itemIndex >= 0 &&
      deliveryLocations?.length >= 0
    ) {
      location = deliveryLocations[route?.params?.itemIndex];
    }
    if (location?.latitude && location?.longitude) {
      getPlaceName(location); // set address
      map?.current?.animateToRegion(
        {
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: initialRegion.latitudeDelta,
          longitudeDelta: initialRegion.longitudeDelta,
        },
        0
      );
    } else {
      moveToCurrentLocation();
    }
  };

  /**
   * get current latlng and animate region to that location
   */
  const moveToCurrentLocation = useGeoLocationFetch(
    (location, isPermissionBlocked) => {
      let loc = currentLocation || location;
      if (loc) {
        map?.current?.animateToRegion(
          {
            latitude: loc?.coords?.latitude || 0,
            longitude: loc?.coords?.longitude || 0,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
          },
          0
        );
      }
      // else if (isPermissionBlocked) goToSettingAlert();
    }
  );

  /**
   * after region navigate successfully this function get reverse geolocation address
   * and set to top Text bar view
   * @param region {latitude,longitude,latitudeDelta,longitudeDeslta}
   */
  const getPlaceName = useCallback(async (region) => {
    let address = await Geocoder.from({
      latitude: region.latitude,
      longitude: region.longitude,
    });
    address?.results[0]?.formatted_address &&
      updateAddress(address?.results[0]?.formatted_address);
  }, []);

  /**
   * When map navigated to selected region this function called
   * @param region {latitude,longitude,latitudeDelta,longitudeDeslta}
   */
  const onRegionChangeComplete = useCallback((region) => {
    onRegionChange(region); // set latlng
    getPlaceName(region); // set address
  }, []);

  /**
   * when a search address press from google list
   * @param data contains reverse geo location details (will not use)
   * @param details contains latlng along with address
   * set latlng to region and hide google input
   */
  const onPressLocation = (
    data: GooglePlaceData,
    details?: GooglePlaceDetail
  ) => {
    if (details?.geometry?.location?.lat && details?.geometry?.location?.lng) {
      map?.current?.animateToRegion(
        {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: initialRegion.latitudeDelta,
          longitudeDelta: initialRegion.longitudeDelta,
        },
        0
      );
      toggleGoogleInput(false);
    }
  };

  const hideGoogleInput = useCallback(() => toggleGoogleInput(false), []);
  const showGoogleInput = useCallback(() => toggleGoogleInput(true), []);

  return children({
    region,
    address,
    googleInputVisibility,
    map,
    navigation,
    route,
    GOOGLE_API_KEY: Config.MAP_API_KEY,
    // methods
    onRegionChange,
    hideGoogleInput,
    showGoogleInput,
    moveToLocation,
    onRegionChangeComplete,
    onPressLocation,
  } as ScreenTypes.addNewLocation);
};

export default AddLocation;
