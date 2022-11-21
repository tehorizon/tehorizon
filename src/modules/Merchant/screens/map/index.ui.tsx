import React from "react";
import { View, TouchableOpacity } from "react-native";
import { CustomText, HeaderWithBackButton } from "@components";
import MapView from "react-native-maps";
import { Marker, Callout } from "@HybridComponents/MapView";
import { ScreenTypes } from "../../interfaces";
import styles from "./styles";
import Image from "@HybridComponents/Image";
import { getFlipForRTLStyle } from "@localization";

//component containing the view of Map screen
const CustomMapView = ({
  name,
  mapRef,
  initialRegion,
  description,
  openGps,
  gotToMyLocation,
  navigation,
}: ScreenTypes.Map) => {
  return (
    <View style={[styles.mainView, getFlipForRTLStyle()]}>
      <HeaderWithBackButton title={name} navigation={navigation} />
      <MapView
        ref={mapRef}
        style={[styles.mapView, getFlipForRTLStyle()]}
        showsUserLocation={true}
        showsMyLocationButton={false}
        initialRegion={initialRegion}
      >
        <Marker
          key={1}
          coordinate={initialRegion}
          title={name}
          description={description}
        >
          <Callout onPress={openGps}>
            <View
              // underlayColor='ghostwhite'
              // onPress={showFacilityDetails}
              style={styles.markerView}
            >
              <View style={styles.subMarkerView}>
                <CustomText style={styles.nameText}>{name}</CustomText>

                <CustomText style={styles.mapText}>{"Open Maps"}</CustomText>
              </View>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <TouchableOpacity style={styles.pinView} onPress={gotToMyLocation}>
        <Image
          style={styles.locationIcon}
          source={require("@assets/images/locationIcon.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomMapView;
