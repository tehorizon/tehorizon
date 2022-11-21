import React, { memo } from "react";
import styles from "./styles";
import { ScreenTypes } from "../../interfaces";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import Image from "@HybridComponents/Image";
import Modal from "@HybridComponents/Modal";
import { design } from "rn_fast_track_uilib";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  CustomSafeAreaView,
  HeaderWithBackButton,
  SearchBar,
} from "@components";
import i18n from "@localization";

const LocationComponent = ({
  index,
  changeIndex,
  routes,
  renderScene,
  navigation,
  toggleSearchModal,
  searchModal,
  cities,
  filterCities,
  searchBar,
  updateLocation,
}: ScreenTypes.location) => {
  return (
    <View style={styles.mainView} testID={"attractionLocationList"}>
      <FilterLocationModal
        searchModal={searchModal}
        cities={cities}
        updateLocation={updateLocation}
        filterCities={filterCities}
        toggleSearchModal={toggleSearchModal}
      />
      <HeaderWithBackButton
        title={i18n.t("Where are you going?")}
        navigation={navigation}
      />
      <View style={styles.searchbarView}>
        <SearchBar
          ref={searchBar}
          testID={"search_input"}
          onSubmitEditing={() => {}}
          inputProps={{
            returnKeyType: "search",
            placeholder: i18n.t("Find a place"),
            editable: false,
            autoFocus: false,
          }}
          style={styles.searchBar}
        />
        <Pressable
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          onPressIn={() => toggleSearchModal(true)}
        />
      </View>
      <TabView
        style={styles.tabViewStyle}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={changeIndex}
        renderTabBar={CustomTabBar}
        swipeEnabled
      />
    </View>
  );
};

const CustomTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<Route>;
  }
) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      activeColor={design.Tabs_Title_Active_Color}
      inactiveColor={design.Tabs_Title_InActive_Color}
      bounces={false}
      labelStyle={styles.tabLabelStyle}
      tabStyle={styles.tabStyle}
    />
  );
};

const FilterLocationModal = memo(
  ({
    searchModal,
    cities,
    updateLocation,
    filterCities,
    toggleSearchModal,
  }) => (
    <Modal
      isVisible={searchModal}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={10}
    >
      <CustomSafeAreaView style={styles.searchModalView}>
        <View style={styles.modalSearchbarView}>
          <SearchBar
            testID={"search_input"}
            onChangeText={filterCities}
            onSubmitEditing={(query) => filterCities(query)}
            autoFocus={true}
            inputProps={{
              returnKeyType: "search",
              placeholder: i18n.t("Find a place"),
            }}
            style={styles.modalSearchbar}
          />
          <Pressable onPress={() => toggleSearchModal(false)}>
            <Image
              style={styles.crossIcon}
              source={require("@assets/images/close-icon.png")}
            />
          </Pressable>
        </View>
        <FlatList
          data={cities}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <City city={item} updateLocation={updateLocation} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </CustomSafeAreaView>
    </Modal>
  )
);

const City = ({
  city,
  updateLocation,
}: {
  city: ScreenTypes.City;
  updateLocation: (city: ScreenTypes.City) => void;
}) => (
  <Pressable
    style={styles.cityView}
    onPress={() => updateLocation(city)}
    testID={city.name}
  >
    <Text style={styles.cityName}>{city.name}</Text>
    <View style={styles.countryDetail}>
      <Text style={styles.countryName}>{city.country}</Text>
      <Image
        source={require("@assets/images/arrow_down.png")}
        style={styles.arrowImage}
      />
    </View>
  </Pressable>
);

export default LocationComponent;
