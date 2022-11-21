import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CustomText from "../../Text/Text";
import { design } from "rn_fast_track_uilib";
import { marginHorizontal, paddingVertical } from "@utils/genericStyles";
import { PRIMARY } from "@fonts";
import { SimpleRadioButton } from "@components";
import I18n from "@localization";

const SortBySection = ({ selectedFilters, onSetSelectedFilter }: any) => {
  const onPress = (item: any) => {
    selectedFilters = {
      ...selectedFilters,
      sort_by_filter:
        selectedFilters?.sort_by_filter == item.key ? "" : item?.key,
    };
    onSetSelectedFilter(selectedFilters);
  };

  return (
    <View style={styles.mainView}>
      <FlatList
        data={[
          {
            name: I18n.t("NEW_OFFERS"),
            key: "New Offers",
            uid: "New_Offers",
          },
          { name: I18n.t("Top_Rated"), key: "Top Rated", uid: "Top_Rated" },
        ]}
        renderItem={({ item, index }: any) => (
          <View style={styles.item}>
            <CustomText style={styles.itemName}>{item?.name}</CustomText>
            <SimpleRadioButton
              onPress={() => onPress(item)}
              isSelected={selectedFilters?.sort_by_filter == item?.key}
              size={24}
              color={
                selectedFilters?.sort_by_filter == item?.key
                  ? design.Primary_Color
                  : design.Border_Color
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...marginHorizontal(16),
    ...paddingVertical(8),
  },
  itemName: {
    fontSize: 13,
    fontFamily: PRIMARY,
  },
});

export default SortBySection;
