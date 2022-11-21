import React from "react";
import { FlatList, Pressable, View } from "react-native";
import styles from "./styles";
import { ScreenTypes } from "../../interfaces";
import {
  Attraction,
  CustomText,
  HeaderWithBackButton,
  SearchBar,
} from "@components";
import i18n from "@localization";
import Image from "@HybridComponents/Image";

const AttractionsComponent = ({
  navigation,
  attractions,
  currency,
  searchBar,
  pickLocation,
  selectedLocation,
}: ScreenTypes.attractions) => {
  return (
    <View style={styles.mainView}>
      <HeaderWithBackButton
        title={i18n.t("Attraction World")}
        navigation={navigation}
      />
      <View style={styles.searchbarView}>
        <SearchBar
          ref={searchBar}
          testID={"search_input"}
          onSubmitEditing={(text: string) => {}}
          inputProps={{
            returnKeyType: "search",
            placeholder: i18n.t("Find a place"),
          }}
          style={styles.searchBar}
        />
        <Pressable onPress={pickLocation} style={styles.locationPicker}>
          <CustomText style={styles.locationText} numberOfLines={1}>
            {selectedLocation?.name || i18n.t("Select City")}
          </CustomText>
          <Image
            source={require("@assets/images/arrow_down.png")}
            style={styles.downArrow}
          />
        </Pressable>
      </View>

      <FlatList
        data={attractions}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Attraction
            item={item}
            onPress={() =>
              navigation.navigate("AttractionDetails", { id: item.id })
            }
            currency={currency}
          />
        )}
        keyExtractor={(item, index) => `attraction_${index}`}
      />
    </View>
  );
};

export default AttractionsComponent;
