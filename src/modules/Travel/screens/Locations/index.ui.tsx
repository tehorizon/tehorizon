import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  View,
} from "react-native";
import _ from "lodash";
import { design } from "rn_fast_track_uilib";
import {
  OutletHeader1,
  Header,
  CustomSafeAreaView,
  HeaderWithBackButton,
  CustomText,
} from "@components";
import { ScreenTypes } from "../../interfaces";
import styles from "./styles";
import { CountriesSection } from "@Travel/components";
import I18n, { getFlipForRTLStyle } from "@localization";

//component containing the view of Outlet screen
const LocationsView = ({
  // props
  countries,
  onClickLocationHandler,
  navigation,
}: ScreenTypes.OutletTab) => {
  return (
    <View style={[styles.mainView, getFlipForRTLStyle()]}>
      <HeaderWithBackButton title={I18n.t("Travel")} navigation={navigation} />
      <View style={styles.listing}>
        <FlatList
          data={countries}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <CountriesSection
              item={item}
              index={index}
              onClickLocationHandler={onClickLocationHandler}
            />
          )}
        />
      </View>
    </View>
  );
};

export default LocationsView;
