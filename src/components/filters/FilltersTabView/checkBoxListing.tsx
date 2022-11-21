import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../Text/Text";
import OutletCheckBoxFilter from "./CheckBox";
import { design } from "rn_fast_track_uilib";
import { marginHorizontal, paddingVertical } from "@utils/genericStyles";
import { PRIMARY } from "@fonts";
import Image from "@HybridComponents/Image";

const checkBoxListing = ({
  options,
  selectedFilters,
  onSetSelectedFilter,
}: any) => {
  return (
    <View>
      {options.map((optionsItems: any) => {
        return (
          <View>
            <View style={styles.item}>
              <View style={styles.leftComponent}>
                {/* <Image
                  source={{ uri: optionsItems.image_url }}
                  style={styles.icon}
                  showPlaceHolder
                /> */}
                <CustomText style={styles.itemName}>
                  {optionsItems.name}
                </CustomText>
              </View>

              <OutletCheckBoxFilter
                selectedFilters={selectedFilters}
                item={optionsItems}
                value={
                  selectedFilters?.filters_selected_for_yes?.includes(
                    optionsItems.name
                  )
                    ? "tick"
                    : selectedFilters?.filters_selected_for_no?.includes(
                        optionsItems.name
                      )
                    ? "cross"
                    : "none"
                }
                onChange={(value) =>
                  onChangeAmenties(
                    value,
                    optionsItems,
                    selectedFilters,
                    onSetSelectedFilter
                  )
                }
              />
            </View>
            <View style={styles.seperator} />
          </View>
        );
      })}
    </View>
  );
};

export default checkBoxListing;

const onChangeAmenties = (
  value: string,
  optionsItems: any,
  selectedFilters: any,
  onSetSelectedFilter: any
) => {
  switch (value) {
    case "tick":
      if (!selectedFilters.filters_selected_for_yes) {
        selectedFilters.filters_selected_for_yes = [];
      }
      selectedFilters?.filters_selected_for_yes?.push(optionsItems.name);
      onSetSelectedFilter(selectedFilters);
      return;
    case "cross":
      const index = selectedFilters?.filters_selected_for_yes?.findIndex(
        (element: any) => element == optionsItems.name
      );
      selectedFilters?.filters_selected_for_yes?.splice(index, 1);
      if (!selectedFilters.filters_selected_for_no) {
        selectedFilters.filters_selected_for_no = [];
      }
      selectedFilters?.filters_selected_for_no?.push(optionsItems.name);
      onSetSelectedFilter(selectedFilters);

      return;
    case "none":
      const i = selectedFilters?.filters_selected_for_no?.findIndex(
        (element: any) => element == optionsItems.name
      );
      selectedFilters?.filters_selected_for_no?.splice(i, 1);
      onSetSelectedFilter(selectedFilters);
  }
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...marginHorizontal(16),
    ...paddingVertical(8),
  },
  leftComponent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 25,
    width: 25,
    tintColor: design["Primary_Color"],
    marginRight: 16,
  },
  itemName: {
    fontSize: 13,
    // paddingBottom: 16,
    fontFamily: PRIMARY,
  },
  seperator: {
    // width: "100%",
    // height: 1,
    // ...borderWidth(0.5),
    // ...borderColor("#D1D1D1"),
  },
});
