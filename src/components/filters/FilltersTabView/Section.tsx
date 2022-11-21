import React from "react";
import { StyleSheet, View } from "react-native";
import CheckboxListing from "./checkBoxListing";
import {
  borderColor,
  borderWidth,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY } from "@fonts";
import { ExpandableView } from "@components";
import SortBySection from "../FilltersTabView/SortBySection";
import ModalBoxListItem from "./modalListItem";

const Section = ({
  title,
  selectedFilters,
  onSetSelectedFilter,
  data,
}: {
  title: string;
  selectedFilters: Object;
  onSetSelectedFilter?: (arg: any) => void;
  data: any;
  onPress?: (arg: any) => void;
  onChange?: () => void;
  checked?: boolean;
}) => {
  let TYPE = data?.selection_type || 0;

  const onSubcategoryPress = (item: any) => {
    selectedFilters.sub_category_filter = item.name == "All" ? "" : item.name;
    onSetSelectedFilter && onSetSelectedFilter(selectedFilters);
  };

  const onPressCuisine = (item: any) => {
    let found = selectedFilters?.cuisine_filter?.indexOf(item?.name);
    if (found >= 0) {
      selectedFilters?.cuisine_filter.splice(found, 1);
    } else {
      let cuisine_filter = selectedFilters?.cuisine_filter || [];
      cuisine_filter.push(item?.name);
      selectedFilters = {
        ...selectedFilters,
        cuisine_filter: cuisine_filter,
      };
    }
    onSetSelectedFilter && onSetSelectedFilter(selectedFilters);
  };

  return (
    <ExpandableView title={title}>
      {TYPE !== 3 && (
        <View>
          {TYPE === 4 && (
            <SortBySection
              selectedFilters={selectedFilters}
              onSetSelectedFilter={onSetSelectedFilter}
            />
          )}
          {TYPE === 1 &&
            data?.options?.map((item: any, index: number) => {
              return (
                <ModalBoxListItem
                  item={item}
                  index={index}
                  isSelected={
                    selectedFilters?.sub_category_filter === item.name
                  }
                  onPress={onSubcategoryPress}
                />
              );
            })}
          {TYPE === 2 &&
            data?.options?.map((item: any, index: number) => {
              return (
                <ModalBoxListItem
                  item={item}
                  index={index}
                  isSelected={selectedFilters?.cuisine_filter?.find(
                    (element) => element == item.name
                  )}
                  onPress={onPressCuisine}
                />
              );
            })}
          <View style={styles.seprator} />
        </View>
      )}

      {TYPE === 3 && (
        <CheckboxListing
          selectedFilters={selectedFilters}
          options={data.options}
          onSetSelectedFilter={onSetSelectedFilter}
        />
      )}
    </ExpandableView>
  );
};

export default Section;

const styles = StyleSheet.create({
  sectionNameView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...paddingVertical(8),
  },
  sectionName: {
    fontFamily: PRIMARY,
    fontSize: 13,
    ...paddingHorizontal(16),
  },
  primaryFont: {
    fontFamily: PRIMARY,
  },
  seprator: {
    width: "100%",
    height: 1,
    ...borderWidth(0.5),
    ...borderColor("#D1D1D1"),
  },
});
