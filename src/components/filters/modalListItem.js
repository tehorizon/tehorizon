import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import tickModal from "@assets/images/tickModal.png";
import CustomText from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import Image from "@HybridComponents/Image";

const modalListItem = ({ item, index, onPress, isSelected }) => {
  return (
    <TouchableOpacity onPressIn={() => onPress(item.name)} activeOpacity={1}>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isSelected
              ? "rgb(217, 217, 217)"
              : design["Background_Secondary_Color"],
          },
        ]}
      >
        <CustomText style={{ color: design["List_Title_Secondary_Color"] }}>
          {item?.name}
        </CustomText>
        {isSelected && <Image source={tickModal} />}
      </View>
    </TouchableOpacity>
  );
};

export default modalListItem;
const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
