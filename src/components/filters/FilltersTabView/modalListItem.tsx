import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../Text/Text";
import { design } from "rn_fast_track_uilib";
import CheckBox from "../../checkbox/checkbox";
import { PRIMARY } from "@fast_track/src/commons/fonts";
import { paddingVertical } from "@fast_track/src/utils/genericStyles";

const modalListItem = ({ item, index, onPress, isSelected }: any) => {
  const [checked, setChecked] = useState(isSelected);

  useLayoutEffect(() => {
    setChecked(isSelected);
  }, [isSelected]);
  if (item?.name == "All") return null;
  return (
    <View style={[styles.itemContainer]}>
      <CustomText style={styles.itemName}>{item?.name}</CustomText>
      <CheckBox
        disableBuiltInState
        fillColor={design.Primary_Color}
        checked={checked}
        onPress={() => onPress(item)}
      />
    </View>
  );
};

export default modalListItem;
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 16,
    ...paddingVertical(8),
  },
  itemName: {
    fontSize: 13,
    fontFamily: PRIMARY,
  },
});
