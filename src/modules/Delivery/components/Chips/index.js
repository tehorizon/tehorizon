import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import closeIcon from "@assets/images/close-icon.png";

import { CustomText } from "@components";
import {
  marginVertical,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";

const { width } = Dimensions.get("window");

export default Chips = ({ list, selectedCuisines, view = "list" }) => {
  const toggleCheckbox = (uid, index) => {
    const checkboxData = [...list];
    checkboxData[index].ischecked = !checkboxData[index].ischecked;
    console.log("checkboxData", checkboxData[index]);
    selectedCuisines(checkboxData);
  };
  return list.length > 0 ? (
    <View>
      <ScrollView
        horizontal={view == "list" ? true : false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={view == "list" ? true : false}
        contentContainerStyle={[
          styles[view],
          list.length == 0 && styles.contentEmptyContainerStyle,
        ]}
      >
        {/* { (list.length == 0 &&  <View style={{height: 20}}/>)} */}
        {list.map((item, index) => {
          return (
            item.ischecked && (
              <View key={item.name} style={styles[`${view}Chip`]}>
                <CustomText style={styles.name}>{item?.name}</CustomText>
                <TouchableOpacity
                  onPress={() => toggleCheckbox(item.uid, index)}
                >
                  <Image source={closeIcon} style={styles.crossIcon} />
                </TouchableOpacity>
              </View>
            )
          );
        })}
      </ScrollView>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  crossIcon: {
    height: 20,
    width: 10,
    tintColor: "white",
    marginRight: 5,
    resizeMode: "contain",
    marginLeft: 10,
  },
  chipContainer: {
    height: 50,
  },
  list: {
    flexDirection: "row",
    ...marginVertical(10),
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    marginLeft: 8,
    width: "92%",
  },
  contentEmptyContainerStyle: {
    ...marginVertical(0),
  },
  listChip: {
    backgroundColor: "rgb(98, 198, 211)",
    borderRadius: 3.3,
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    ...paddingHorizontal(6),
    marginLeft: 12,
  },
  wrapChip: {
    backgroundColor: "rgb(98, 198, 211)",
    borderRadius: 3.3,
    height: 36,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    ...paddingHorizontal(12),
    marginLeft: 12,
    marginTop: 10,
  },
  name: {
    fontSize: 14,
    color: "white",
  },
});
