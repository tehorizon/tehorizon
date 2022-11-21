import React from "react";
import { FlatList, Platform } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";
import * as i18nCollection from "@localization";
import styles from "./styles";

//Components
import { OutletList, Chips } from "@delivery/components";

import { design } from "rn_fast_track_uilib";
import { View } from "react-native";
import ScreenLoader from "@delivery/components/ScreenLoader";
import {
  CustomNoRecord,
  SearchBar,
  CustomText,
  CustomSafeAreaView,
} from "@components";
import { ScreenTypes } from "../../interfaces";

const DeliveryOutletSearch = ({
  searchText,
  searchedFlag,
  cuisineList,
  searchedOutlets,
  loader,
  navigation,
  //methods
  setSearchText,
  updateCuisineList,
  onPressCancel,
  searchHandler,
}: ScreenTypes.deliverySearch) => {
  const renderCustomSearch = () => {
    return (
      <SearchBar
        onPressCancel={onPressCancel}
        inputProps={{
          value: searchText,
          returnKeyType: "search",
          onSubmitEditing: searchHandler,
          onChangeText: (text: string) => {
            setSearchText(text);
          },
          autoFocus: true,
        }}
        autoFocus={true}
        i18nCollection={i18nCollection}
      />
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <OutletList
        key={item?.id}
        name={item?.merchant?.name}
        merchantID={item?.merchant?.id}
        human_location={item?.name}
        logo={item?.merchant?.logo_small_url}
        opening_hours={item?.opening_hours}
        is_open={item?.is_open}
        cuisine_distance={item?.cuisine_distance}
        clock={item?.attributes[0]?.value}
        time={item?.attributes[1]?.value}
        listItem={item}
        navigation={navigation}
      />
    );
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      {renderCustomSearch()}
      {loader && (
        <ScreenLoader
          loader={loader}
          height={Platform.OS === "ios" ? "98%" : "92%"}
        />
      )}
      <View style={styles.mainView}>
        {/* selected cuisines */}
        {cuisineList && cuisineList.length !== 0 && searchText.length !== 0 && (
          <Chips list={cuisineList} selectedCuisines={updateCuisineList} />
        )}

        <View style={styles.searchResultText}>
          <CustomText>{i18n.t("Search_results")}</CustomText>
        </View>

        {searchedFlag && <CustomNoRecord />}

        {/*searchedOutlets*/}
        <FlatList
          data={searchedOutlets}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default DeliveryOutletSearch;
