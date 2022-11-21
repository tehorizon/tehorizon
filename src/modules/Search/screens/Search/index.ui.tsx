import React, { memo, RefObject } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SearchScreenProps } from "../../interfaces/SearchScreenProps";
import { getFlipForRTLStyle } from "@localization";
import i18n from "@localization";
import {
  CustomListing,
  CustomChipList,
  SearchBar,
  HeaderWithBackButton,
  CustomNoRecord,
  CustomText,
} from "@components";
import Image from "@HybridComponents/Image";
import { SearchBarRef } from "@components/SeachBar";
import styles from "./styles";

export default ({
  searchBar,
  params,
  chipsData,
  outlets,
  favouriteList,
  navigation,
  onDeleteChip,
  setPreviousSearchText,
  searchSubmitHandler,
  onOutletClickHandler,
  resetRecents,
  isSearched,
  recents,
}: SearchScreenProps) => {
  return (
    <View style={[styles.mainView, getFlipForRTLStyle()]}>
      <View style={styles.subView}>
        <HeaderWithBackButton
          title={i18n.t("Search")}
          noBorder
          navigation={navigation}
        />
        <SearchBar
          ref={searchBar}
          testID={"search_input"}
          onSubmitEditing={(text: string) => {
            if (text != "") {
              setPreviousSearchText(text);
              searchSubmitHandler(params);
            }
          }}
          autoFocus={true}
          inputProps={{
            returnKeyType: "search",
          }}
        />
        <CustomChipList chipsData={chipsData} onDeleteChip={onDeleteChip} />
      </View>
      <CustomListing
        OutletList={outlets}
        isSearch
        getOutlet={searchSubmitHandler}
        onOutletClick={onOutletClickHandler}
        favouriteList={favouriteList}
        ListEmptyComponent={
          isSearched ? (
            <CustomNoRecord
              bottomText={" "}
              topText={i18n.t(
                "Sorry we couldn’t find anything on your keyword"
              )}
              icon={require("@assets/images/empty_search.png")}
            />
          ) : (
            <Recents
              data={recents}
              reset={resetRecents}
              search={searchSubmitHandler}
              searchBar={searchBar}
            />
          )
        }
      />
    </View>
  );
};

const Recents = ({
  data = [],
  reset = () => {},
  searchBar,
  search,
}: RecentsPROPS) =>
  data?.length > 0 ? (
    <View style={styles.recentView}>
      <View style={styles.recentHeadView}>
        <CustomText style={styles.recentText}>{i18n.t("Recent")}</CustomText>
        <Pressable onPress={reset}>
          <CustomText style={styles.clearText}>
            {i18n.t("Clear all")}
          </CustomText>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            style={styles.recentItemView}
            onPress={() => {
              searchBar?.current?.setValue(item);
              setTimeout(() => {
                search(true);
              }, 200);
            }}
          >
            <Image
              source={require("@assets/icons/load-icon.png")}
              style={styles.loadIcon}
            />
            <CustomText style={styles.recentItemText}>{item}</CustomText>
          </Pressable>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  ) : null;

interface RecentsPROPS {
  data: string[];
  reset: () => void;
  searchBar: RefObject<SearchBarRef>;
  search: (arg?: boolean | undefined) => void;
}
