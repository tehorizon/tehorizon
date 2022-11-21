import React, {
  Component,
  forwardRef,
  Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { LatLng, Marker } from "@HybridComponents/MapView";
import * as Location from "expo-location";
import i18n, { isRTL, getFlipForRTLStyle } from "@localization";
import { CustomText } from "@components";
import { useAppSelector } from "@redux/root-reducer";
import { MarkerItem, Merchant } from "../../interfaces/responses";
import { padding } from "@utils/genericStyles";

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

var width = Dimensions.get("window").width;

var rad = function (x: number) {
  return (x * Math.PI) / 180;
};

interface SelectedPin {
  currentPosition: LatLng;
  selectedPin: MarkerItem;
  onOutletClick: (arg: Merchant) => void;
  calculateDistance: (p1: LatLng, p2: LatLng) => number;
}

interface HUAWIEMAPPROPS {
  mapApi: Function;
  onOutletClick: (arg: Merchant) => void;
}

interface HUAWIEMAPREF {}

const HuaweiMap = forwardRef(
  (props: HUAWIEMAPPROPS, ref: Ref<HUAWIEMAPREF>) => {
    //reducers
    let currentLocation = useAppSelector(
      (state) => state?.locationReducer?.currentLocation
    );
    let LocationList = useAppSelector(
      (state) => state.locationReducer?.LocationList
    );
    let locationIndex = useAppSelector(
      (state) => state.locationReducer?.locationIndex
    );
    let location =
      LocationList?.length > 0 && locationIndex >= 0
        ? LocationList[locationIndex]
        : null;
    let list = useAppSelector(
      (state) => state?.outletNotPersistedReducer?.mapOutletList
    );
    let category = useAppSelector((state) => state?.homeReducer?.categoryList);

    let { mapApi, onOutletClick } = props;

    // const [region, updateRegion] = useState({
    //   latitude: -37.78825,
    //   longitude: -122.4324,
    //   latitudeDelta: 1,
    //   longitudeDelta: 1,
    // });

    const [ready, setReady] = useState(false);
    const [selectedPin, setPin] = useState<MarkerItem | null>();

    // const googleMapAPIkey="AIzaSyDv84jPwluM302tmua8wuVHNVM8B32xCtI&v=3.exp&libraries=geometry,drawing,places";

    const map = useRef<MapView>(null);

    const calculateDistance = (p1: LatLng, p2: LatLng) => {
      var R = 6378137; // Earth's mean radius in meter
      var dLat = rad(p2.latitude - p1.latitude);
      var dLong = rad(p2.longitude - p1.longitude);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.latitude)) *
          Math.cos(rad(p2.latitude)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round(d); // returns the distance in meter
    };

    // const setRegion = useCallback((region) => {
    //   if (ready) {
    //     setTimeout(() => {
    //       map?.current?.animateToRegion(region);
    //     }, 10);
    //   }
    //   // updateRegion(region);
    // },[ready]);

    // const onMapReady = useCallback(async (e) => {
    //   if (!ready) {
    //     await setReady(true);
    //     // getCurrentPosition();
    //   }
    // },[ready]);

    // const onRegionChange = useCallback((region) => {},[]);

    const onRegionChangeComplete = useCallback((region) => {
      const center = region;
      let northeast = {
        latitude: center.latitude + center.latitudeDelta / 2,
        longitude: center.longitude + center.longitudeDelta / 2,
      };

      const data = {
        coords: {
          lat: center.latitude,
          lng: center.longitude,
        },
        radius: calculateDistance(center, northeast),
      };

      mapApi(data);
    }, []);

    const gotToMyLocation = useCallback(() => {
      if (map?.current) {
        let position = currentLocation;

        if (!position) {
          position = {
            coords: {
              latitude: 0,
              longitude: 0,
            },
          };
        }

        map?.current?.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    }, [map, currentLocation]);

    const getLocation = useCallback(async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        alert(i18n.t("Permission_to_access_location_was_denied"));
      }
    }, []);

    let markerArray: Array<MarkerItem> = [];
    if (list) {
      markerArray = [...list];
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={map}
          style={styles.map}
          // showsUserLocation={true}
          initialRegion={{
            ...initialRegion,
            latitude: location.lat,
            longitude: location.lng,
          }}
          // region={region}
          // region={{
          //   ...initialRegion,
          //   latitude: mapCenterPosition.latitude,
          //   longitude: mapCenterPosition.longitude,
          // }}

          // onRegionChangeComplete={updateRegion}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {markerArray?.map((markerItem) => {
            return (
              <Marker
                // description="Current location"
                // image={{
                //   uri:
                //     "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
                // }}
                // coordinate={region}
                coordinate={{
                  ...initialRegion,
                  latitude: markerItem.latitude,
                  longitude: markerItem.longitude,
                }}
                onPress={() => setPin(markerItem)}
              >
                <Image
                  source={{ uri: category?.map_pin_url }}
                  style={{ resizeMode: "contain", height: 40, width: 30 }}
                />
              </Marker>
            );
          })}
        </MapView>
        {selectedPin && (
          <SelectedPinDetail
            currentPosition={currentLocation}
            selectedPin={selectedPin}
            onOutletClick={onOutletClick}
            calculateDistance={calculateDistance}
          />
        )}

        <MaterialIcons
          style={{ position: "absolute", bottom: 30, right: 10, ...padding(5) }}
          name="my-location"
          size={24}
          color="#4f99d2"
          onPress={gotToMyLocation}
        />
      </View>
    );
  }
);

const SelectedPinDetail = ({
  currentPosition,
  selectedPin,
  onOutletClick,
  calculateDistance,
}: SelectedPin) => {
  let distanceNum = calculateDistance(currentPosition, {
    latitude: selectedPin.latitude,
    longitude: selectedPin.longitude,
  });
  let distance;
  if (distanceNum >= 1000) {
    distance = Math.round(distanceNum / 1000) + "km";
  } else {
    distance = distanceNum + "m";
  }

  return (
    <View
      style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
      }}
    >
      <View
        style={{
          width: width - 20,
          height: 100,
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            onOutletClick({
              favourite: selectedPin.favourite,
              merchant_id: selectedPin.merchant_id,
              outlet_id: selectedPin.outlet_id,
            })
          }
        >
          <View
            style={{
              width: width - 20,
              height: 100,
              justifyContent: "center",
              // alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ height: 100, width: 100 }}>
              <Image
                source={{ uri: selectedPin.merchantLogo }}
                style={{ height: 100, width: 100 }}
              />
            </View>

            <View style={{ marginLeft: 5, ...padding(5) }}>
              <CustomText
                style={{
                  textAlign: isRTL ? "right" : "left",
                  color: "#252525",
                  fontWeight: "500",
                  marginBottom: 5,
                  ...getFlipForRTLStyle,
                }}
              >
                {selectedPin.merchantName}
              </CustomText>

              <CustomText
                style={{
                  textAlign: isRTL ? "right" : "left",
                  fontSize: 11,
                  width: width - 150,
                  marginBottom: 8,
                  ...getFlipForRTLStyle,
                }}
              >
                {selectedPin.humanLocation}
              </CustomText>

              <CustomText
                style={{
                  textAlign: isRTL ? "right" : "left",
                  fontSize: 12,
                  ...getFlipForRTLStyle,
                }}
              >
                {distance}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 500,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default HuaweiMap;
