import { ScreenTypes } from "../../interfaces";
import React, { memo } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Header } from "@delivery/components";
import { BorderButton } from "@components";
import i18n from "@localization";
import styles from "./styles";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { design } from "rn_fast_track_uilib";
import Image from "@HybridComponents/Image";

const AddLocationUi = ({
  region,
  address,
  googleInputVisibility,
  map,
  route,
  navigation,
  GOOGLE_API_KEY,
  hideGoogleInput,
  showGoogleInput,
  moveToLocation,
  onRegionChangeComplete,
  onPressLocation,
}: ScreenTypes.addNewLocation) => {
  /**
   * @param params
   * @returns Custom Search input for google auto complete textinput
   */
  const SearchInput = memo((params) => (
    <View style={styles.searchInputMainView}>
      <SafeAreaView style={styles.searchInputSubView} edges={["top"]}>
        <View style={styles.searchInputView}>
          <AntDesign name="search1" size={18} color={"#a5a5a5"} />
          <TextInput {...params} style={styles.searchInput} autoFocus />
        </View>
        <Text style={styles.cancelText} onPress={hideGoogleInput}>
          {i18n.t("Cancel")}
        </Text>
      </SafeAreaView>
      {/* <TouchableOpacity
        style={styles.manualView}
        activeOpacity={1}
        onPress={hideGoogleInput}
      >
        <AntDesign name="plus" size={20} color={design["Primary_Color"]} />
        <Text style={styles.manualText}>{i18n.t("Add_Address_Manually")}</Text>
      </TouchableOpacity> */}
    </View>
  ));

  return (
    <View style={styles.mainView}>
      <Header navigation={navigation} title={"Add_a_new_location"} />
      <MapView
        ref={map}
        // provider={PROVIDER_GOOGLE}
        onMapReady={() => moveToLocation(false)}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={styles.markerFixed}>
        <Image
          style={styles.marker}
          source={require("@assets/images/ic_pin.png")}
        />
      </View>
      {
        <TouchableOpacity
          style={styles.addressView}
          activeOpacity={1}
          onPress={showGoogleInput}
        >
          <View style={styles.bullet} />
          <Text style={styles.addressText}>
            {address || i18n.t("Search your location")}
          </Text>
        </TouchableOpacity>
      }
      {region && address != "" && (
        <BorderButton
          title={i18n.t("CONTINUE")}
          style={styles.button}
          onPress={() =>
            navigation.navigate("AddressDetails", {
              ...route?.params,
              area_city: address,
              ...region,
            })
          }
        />
      )}
      <TouchableOpacity
        style={styles.pinView}
        onPress={() => moveToLocation(true)}
      >
        <Image
          style={styles.locationIcon}
          resizeMode="contain"
          source={require("@assets/images/location-aim.png")}
        />
      </TouchableOpacity>
      {googleInputVisibility && (
        <View style={styles.googleInputView}>
          <GooglePlacesAutocomplete
            placeholder={i18n.t("Search")}
            onPress={onPressLocation}
            listViewDisplayed={"auto"}
            fetchDetails={true}
            // enablePoweredByContainer={false}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
              types: "geocode",
            }}
            styles={{
              row: styles.rowStyle,
              poweredContainer: styles.poweredBy,
            }}
            textInputProps={{
              InputComp: SearchInput,
              clearButtonMode: "never",
              returnKeyType: "search",
            }}
          />
        </View>
      )}
    </View>
  );
};

export default AddLocationUi;
