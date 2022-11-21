import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Image from "@HybridComponents/Image";
import { design } from "rn_fast_track_uilib";
import { borderColor, borderWidth } from "@fast_track/src/utils/genericStyles";
import { getFlipForRTLStyle } from "@localization";
const checkedImage = require("@assets/images/filter_tick_icon.png");
const crossImage = require("@assets/images/filter_cross_icon.png");

const OutletCheckBox = ({
  item,
  selectedFilters,
  onChange,
}: {
  item: any;
  selectedFilters: {
    filters_selected_for_no: Array<any>;
    filters_selected_for_yes: Array<any>;
  };
  onChange: (arg: string) => void;
}) => {
  const [type, setType] = useState("none");

  useLayoutEffect(() => {
    const value = selectedFilters?.filters_selected_for_yes?.includes(
      item?.name
    )
      ? "tick"
      : selectedFilters?.filters_selected_for_no?.includes(item?.name)
      ? "cross"
      : "none";
    setType(value);
  }, [
    selectedFilters?.filters_selected_for_no?.length,
    selectedFilters?.filters_selected_for_yes?.length,
  ]);

  const onClickCheckBoxHandler = () => {
    let newtype = "none";
    switch (type) {
      case "none":
        newtype = "tick";
        setType(newtype);
        break;
      case "tick":
        newtype = "cross";
        setType(newtype);
        break;
      case "cross":
        newtype = "none";
        setType(newtype);
        break;
      default:
        setType("none");
    }
    onChange && onChange(newtype);
  };

  return (
    <View style={styles.mainView}>
      <Pressable onPressIn={onClickCheckBoxHandler}>
        <View
          style={[
            styles.button,
            {
              backgroundColor:
                type == "tick"
                  ? design["Chechbox_Tick_Active_Color"]
                  : type == "cross"
                  ? design["Chechbox_Cross_Active_Color"]
                  : design["Chechbox_Not_Active_Color"],
            },
            (type == "tick" || type == "cross") && styles.noBorder,
          ]}
        >
          {(type == "tick" || type == "cross") && (
            <Image
              source={type == "tick" ? checkedImage : crossImage}
              style={[styles.image, getFlipForRTLStyle()]}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default OutletCheckBox;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    height: 24,
    width: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    ...borderWidth(1),
    ...borderColor(design.Border_Color),
  },
  image: {
    height: 13,
    width: 13,
    // borderRadius: 13 / 2,
  },
  noBorder: {
    ...borderWidth(0),
  },
});
