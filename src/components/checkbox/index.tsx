import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import checkedImage from "./images/filter_tick_icon.png";
import crossImage from "./images/filter_cross_icon.png";
import Image from "@HybridComponents/Image";
import { design } from "rn_fast_track_uilib";

const index = ({
  value,
  selectedFilters,
  onChange,
}: {
  value: string;
  selectedFilters: any;
  onChange: (arg: boolean) => void;
}) => {
  const [type, setType] = useState("none");

  useLayoutEffect(() => {
    setType(value);
  }, [
    selectedFilters?.filters_selected_for_no,
    selectedFilters?.filters_selected_for_yes,
  ]);

  const onClickCheckBoxHandler = (param) => {
    let onChangeValue = false;
    let newtype = "none";
    switch (param) {
      case "tick":
        newtype = type == "tick" ? "none" : param;
        setType(newtype);
        break;
      case "cross":
        newtype = type == "cross" ? "none" : param;
        setType(newtype);
        break;
      default:
        setType("none");
    }
    onChangeValue = param === "tick" ? true : false;
    onChange && onChange(onChangeValue);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {
        <TouchableOpacity
          onPressIn={() => onClickCheckBoxHandler("tick")}
          activeOpacity={1}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor:
                  type == "tick"
                    ? design["Chechbox_Tick_Active_Color"]
                    : design["Chechbox_Not_Active_Color"],
                marginRight: 5,
              },
            ]}
          >
            <Image source={checkedImage} style={styles.image} />
          </View>
        </TouchableOpacity>
      }

      {
        <TouchableOpacity
          onPressIn={() => onClickCheckBoxHandler("cross")}
          activeOpacity={1}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor:
                  type == "cross"
                    ? design["Chechbox_Cross_Active_Color"]
                    : design["Chechbox_Not_Active_Color"],
              },
            ]}
          >
            <Image source={crossImage} style={styles.image} />
          </View>
        </TouchableOpacity>
      }
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  button: {
    height: 22,
    width: 22,
    borderRadius: 22 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 13,
    width: 13,
    borderRadius: 13 / 2,
  },
});
