import {
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY } from "@fonts";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import CheckBox from "./utils/CheckBox";

export default function index({
  title,
  sub_title,
  allowMultipleSelection,
  is_selected,
  disable,
  onPress,
  ...props
}) {
  let CheckBoxComponent = () => (
    <CheckBox
      isFill={false}
      size={18}
      color={"rgb(244,116,33)"}
      isCircle={true}
    />
  );
  console.log(props, "option items");
  if (allowMultipleSelection) {
    if (is_selected) {
      CheckBoxComponent = () => (
        <CheckBox
          isFill={true}
          size={18}
          color={"rgb(244,116,33)"}
          isCircle={false}
        />
      );
    } else {
      CheckBoxComponent = () => (
        <CheckBox
          isFill={false}
          size={18}
          color={"rgb(244,116,33)"}
          isCircle={false}
        />
      );
    }
  } else {
    if (is_selected) {
      CheckBoxComponent = () => (
        <CheckBox
          isFill={true}
          size={18}
          color={"rgb(244,116,33)"}
          isCircle={true}
        />
      );
    } else {
      CheckBoxComponent = () => (
        <CheckBox
          isFill={false}
          size={18}
          color={"rgb(244,116,33)"}
          isCircle={true}
        />
      );
    }
  }
  const opacity = disable ? 0.4 : 1;

  return (
    <View
      style={{
        borderBottomWidth: 0.3,
        borderBottomColor: "grey",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (!disable) {
            onPress();
          }
        }}
        activeOpacity={1}
        style={[styles.container]}
      >
        <View style={styles.startingContainer}>
          <View>
            <CheckBoxComponent />
          </View>
          <Text style={styles.productName}>{title}</Text>
        </View>

        <Text style={styles.price}>{sub_title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...padding(15),
  },
  startingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  productName: {
    fontSize: 15,
    fontFamily: PRIMARY,
    marginLeft: 10,
  },
  price: {
    fontSize: 15,
    fontFamily: PRIMARY,
  },
});
