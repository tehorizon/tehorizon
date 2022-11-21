import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../Text/Text";
import OutletCheckBoxFilter from "../checkbox/index";
import { design } from "rn_fast_track_uilib";
import {
  borderColor,
  borderWidth,
  marginHorizontal,
} from "@utils/genericStyles";
import { PRIMARY } from "@fonts";
import Image from "@HybridComponents/Image";

const checkBoxListing = ({ options, selectedFilters, onSetSelectedFilter }) => {
  return (
    <View>
      {options.map((optionsItems) => {
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                ...marginHorizontal(15),
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: optionsItems.image_url }}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: design["Primary_Color"],
                  }}
                  showPlaceHolder
                />
                <CustomText
                  style={{
                    fontSize: 13,
                    paddingTop: 9,
                    paddingRight: 16,
                    paddingBottom: 9,
                    paddingLeft: 16,
                    fontFamily: PRIMARY,
                  }}
                >
                  {optionsItems.name}
                </CustomText>
              </View>

              <OutletCheckBoxFilter
                selectedFilters={selectedFilters}
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
                onChange={(flag) => {
                  if (flag) {
                    if (
                      selectedFilters?.filters_selected_for_no?.includes(
                        optionsItems.name
                      )
                    ) {
                      const index =
                        selectedFilters?.filters_selected_for_no?.findIndex(
                          (element) => element == optionsItems.name
                        );
                      selectedFilters?.filters_selected_for_no.splice(index, 1);
                    }
                    if (
                      selectedFilters?.filters_selected_for_yes?.includes(
                        optionsItems.name
                      )
                    ) {
                      const index =
                        selectedFilters?.filters_selected_for_yes?.findIndex(
                          (element) => element == optionsItems.name
                        );
                      selectedFilters?.filters_selected_for_yes?.splice(
                        index,
                        1
                      );
                    } else {
                      selectedFilters?.filters_selected_for_yes.push(
                        optionsItems.name
                      );
                    }
                  } else {
                    if (
                      selectedFilters?.filters_selected_for_yes?.includes(
                        optionsItems.name
                      )
                    ) {
                      const index =
                        selectedFilters?.filters_selected_for_yes?.findIndex(
                          (element) => element == optionsItems.name
                        );
                      selectedFilters?.filters_selected_for_yes?.splice(
                        index,
                        1
                      );
                    }
                    if (
                      selectedFilters?.filters_selected_for_no?.includes(
                        optionsItems.name
                      )
                    ) {
                      const index =
                        selectedFilters?.filters_selected_for_no?.findIndex(
                          (element) => element == optionsItems.name
                        );
                      selectedFilters?.filters_selected_for_no?.splice(
                        index,
                        1
                      );
                    } else {
                      selectedFilters?.filters_selected_for_no?.push(
                        optionsItems.name
                      );
                    }
                  }
                  onSetSelectedFilter(selectedFilters);
                }}
              />
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                ...borderWidth(0.5),
                ...borderColor("#D1D1D1"),
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default checkBoxListing;

const styles = StyleSheet.create({});
