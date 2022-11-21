import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "@HybridComponents/MapView";
import { isRTL, getFlipForRTLStyle } from "@localization";
import { CustomText } from "@components";
import { useAppSelector } from "@redux/root-reducer";
import { padding } from "@utils/genericStyles";
import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";
import { outletItemInterface } from "../../BL/Interfaces";
import { getDistance } from "@utils/functions";

var width = Dimensions.get("window").width;
interface SelectedPin {
  selectedPin: outletItemInterface;
  onOutletClick: (arg: outletItemInterface) => void;
}

interface MAP_PROPS {
  markerArray: outletItemInterface[];
  onOutletClick: (arg: outletItemInterface) => void;
  tab: string;
}

export interface MAP_REF {
  resetPin: () => void;
}

const CustomMap = memo(
  forwardRef((props: MAP_PROPS, ref: Ref<MAP_REF>) => {
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

    let category = useAppSelector((state) => state?.homeReducer?.categoryList);

    let { onOutletClick, markerArray, tab } = props;

    const [region, updateRegion] = useState({
      latitude: 25.276987,
      longitude: 55.296249,
      latitudeDelta: 1,
      longitudeDelta: 1,
    });

    const [selectedPin, setPin] = useState<outletItemInterface | null>(null);

    useImperativeHandle(ref, () => ({
      resetPin: () => setPin(null),
    }));

    const map = useRef<MapView>(null);

    // cDM, subscriber to marker list change
    useEffect(() => {
      markerArray?.length > 0 && updateRegion({ ...region, ...markerArray[0] });
    }, [markerArray]);

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

    return (
      <View
        style={[styles.mainView, getFlipForRTLStyle()]}
        testID={`map-${tab}`}
      >
        <MapView
          ref={map}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={false}
          initialRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          region={region}
          onRegionChangeComplete={updateRegion}
        >
          {markerArray?.map((markerItem: outletItemInterface) => {
            return (
              <Marker
                key={markerItem?.outlet_id}
                image={{
                  uri:
                    category?.map_pin_url ||
                    "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
                }}
                coordinate={{
                  latitude: markerItem?.lat,
                  longitude: markerItem?.lng,
                }}
                onPress={() => setPin(markerItem)}
              />
            );
          })}
        </MapView>

        {selectedPin && (
          <SelectedPinDetail
            selectedPin={selectedPin}
            onOutletClick={() => onOutletClick(selectedPin)}
          />
        )}
        <TouchableOpacity onPress={gotToMyLocation} style={styles.locationPin}>
          <Image
            style={styles.locationArrow}
            source={require("@assets/images/locationIcon.png")}
          />
        </TouchableOpacity>
      </View>
    );
  })
);

const SelectedPinDetail = memo(
  ({ selectedPin, onOutletClick }: SelectedPin) => {
    return (
      <View style={styles.pinView}>
        <View style={styles.pinSubView}>
          <Pressable onPress={() => onOutletClick(selectedPin)}>
            <View style={styles.merchantDetails}>
              <View style={styles.merchantLogo}>
                <Image
                  source={{ uri: selectedPin?.merchant?.logo_url }}
                  style={styles.merchantIcon}
                />
              </View>

              <View style={styles.merchatNameView}>
                <CustomText style={styles.merchantName}>
                  {selectedPin?.merchant?.name || ""}
                </CustomText>

                <CustomText style={styles.name}>{selectedPin.name}</CustomText>

                <CustomText style={styles.distance}>
                  {`${getDistance(selectedPin.distance)}`}
                </CustomText>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 500,
    backgroundColor: design.Header_Background_Primary_Color,
  },
  mainView: {
    flex: 1,
    backgroundColor: design.Header_Background_Primary_Color,
  },
  merchatNameView: {
    marginLeft: 5,
    ...padding(5),
  },
  merchantName: {
    textAlign: isRTL ? "right" : "left",
    color: "#252525",
    fontWeight: "500",
    marginBottom: 5,
    ...getFlipForRTLStyle(),
  },
  merchantLogo: {
    height: 100,
    width: 100,
  },
  merchantIcon: {
    height: "100%",
    width: "100%",
  },
  name: {
    textAlign: isRTL ? "right" : "left",
    fontSize: 11,
    width: width - 150,
    marginBottom: 8,
    ...getFlipForRTLStyle(),
  },
  distance: {
    textAlign: isRTL ? "right" : "left",
    fontSize: 12,
    ...getFlipForRTLStyle(),
  },
  merchantDetails: {
    width: width - 20,
    height: 100,
    justifyContent: "center",
    flexDirection: "row",
  },
  pinSubView: {
    width: width - 20,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pinView: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  locationPin: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  locationArrow: {
    ...padding(10),
    height: 25,
    width: 25,
  },
  markerImage: { resizeMode: "contain", height: 40, width: 30 },
});

export default CustomMap;
