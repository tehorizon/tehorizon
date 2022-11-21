import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import MobileListView, { ListItem as MobileListItem } from "./FlatList";
import { DragnDropLayout } from "@fast_track/src/AppConfig.json";

const ListItem = DragnDropLayout
  ? ({ drag, isActive, children, isSmall = false }) => (
      <View>
        {children}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.pickerView}
          onPressIn={drag}
          disabled={isActive}
        >
          <Image
            style={isSmall ? styles.smallIcon : styles.icon}
            resizeMode={"center"}
            source={require("@assets/icons/move.png")}
          />
        </TouchableOpacity>
      </View>
    )
  : MobileListItem;
const styles = StyleSheet.create({
  pickerView: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  icon: {
    width: 20,
    height: 40,
  },
  smallIcon: {
    width: 10,
    height: 20,
  },
});
export { ListItem };
const ListView = DragnDropLayout ? DraggableFlatList : MobileListView;
export default ListView;
