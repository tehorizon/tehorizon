import React, { useState } from "react";
import Text from "../Text/Text";
import {
  View,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import { PRIMARY_BOLD } from "@fonts";
import { padding } from "@utils/genericStyles";
import Image from "@HybridComponents/Image";

const Expandable = ({ title, children }: any) => {
  const [expanded, setExpanded] = useState(false);

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const onPress = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "opacity")
    );
    setExpanded(!expanded);
  };

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={styles.headerView}
      >
        <Text style={styles.title}>{title}</Text>
        <Image
          source={require("@assets/images/arrow_down.png")}
          style={[styles.headerIcon, expanded && styles.arrwoUp]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {expanded && children}
    </View>
  );
};

export default Expandable;

const styles = StyleSheet.create({
  mainView: {
    // flex: 1,
  },
  headerView: {
    // flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    // ...paddingHorizontal(16),
    // ...paddingVertical(16),
    ...padding(16),
  },
  headerIcon: {
    width: 16,
    height: 8,
  },
  title: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    lineHeight: 20,
  },
  arrwoUp: {
    transform: [{ rotate: "180deg" }],
  },
});
