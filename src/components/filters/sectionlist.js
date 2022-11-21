import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Switch from "../switch";
import CheckboxListing from "./checkBoxListing";
import CustomText from "../Text/Text";
import i18n from "@localization";
import { design } from "rn_fast_track_uilib";
import {
  borderColor,
  borderWidth,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY } from "@fonts";

const sectionlist = ({
  title,
  selectedFilters,
  onSetSelectedFilter,
  data,
  onPress,
  onChange,
  checked,
}) => {
  let TYPE = data ? data.selection_type : 0;

  let sectionName = "";
  switch (TYPE) {
    case 1:
      sectionName = i18n.t("SELECT_TYPE");
      break;
    case 2:
      sectionName = i18n.t("SELECT_CUISINE");
      break;

    default:
      sectionName = data.section_name;
      break;
  }
  return (
    <View style={{}}>
      <View
        style={{
          alignItems: "flex-start",
          backgroundColor: design["Header_Background_Tertiary_color"],
          paddingTop: 4,
          paddingRight: 16,
          paddingBottom: 4,
          paddingLeft: 16,
        }}
      >
        <CustomText
          style={{
            fontSize: 11,
            fontFamily: PRIMARY,
            color: design["Header_Title_Primary_Color"],
          }}
        >
          {title}
        </CustomText>
      </View>

      {TYPE !== 3 && (
        <View>
          <TouchableOpacity
            activeOpacity={onPress ? 0.5 : 1}
            onPress={() => onPress && onPress(TYPE)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: 20,
                ...paddingVertical(8),
              }}
            >
              <CustomText
                style={{
                  fontFamily: PRIMARY,
                  fontSize: 13,
                  ...paddingHorizontal(16),
                }}
              >
                {sectionName}
              </CustomText>
              {TYPE === 4 && <Switch onChange={onChange} checked={checked} />}

              {TYPE === 1 && (
                <CustomText
                  style={{
                    fontFamily: PRIMARY,
                  }}
                >
                  {selectedFilters?.sub_category_filter == ""
                    ? i18n.t("All")
                    : selectedFilters?.sub_category_filter}
                </CustomText>
              )}

              {TYPE === 2 && (
                <CustomText
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    fontFamily: PRIMARY,
                    fontSize: 13,
                    textAlign: "right",
                    //flexWrap:'no-wrap',
                  }}
                >
                  {selectedFilters?.cuisine_filter?.length > 0
                    ? selectedFilters?.cuisine_filter
                        .map((item) => item)
                        .join(", ")
                    : ""}
                </CustomText>
              )}
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: 1,
              ...borderWidth(0.5),
              ...borderColor("#D1D1D1"),
            }}
          />
        </View>
      )}

      {TYPE === 3 && (
        <CheckboxListing
          selectedFilters={selectedFilters}
          options={data.options}
          onSetSelectedFilter={onSetSelectedFilter}
        />
      )}
    </View>
  );
};

export default sectionlist;

const styles = StyleSheet.create({});
