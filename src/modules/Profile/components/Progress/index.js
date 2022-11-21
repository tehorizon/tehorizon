import React, { Component, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { getFlipForRTLStyle } from "@localization";

import { CustomText } from "@components";

const screenW = Dimensions.get("window").width;
export default function Index(props) {
  const [screenWidth, setscreenWidth] = useState(screenW);

  let { progress, text, headText } = props;
  if (progress > 100) {
    progress = 100;
  }
  const width = (progress / 100) * screenWidth;
  return (
    <View style={styles.container}>
      <CustomText
        style={{ marginBottom: 5, color: "#ccc", ...getFlipForRTLStyle() }}
      >
        {headText}
      </CustomText>
      <View
        style={{
          height: 20,
          backgroundColor: "#ccc",
          justifyContent: "center",
        }}
        onLayout={(event) => {
          setscreenWidth(event.nativeEvent.layout.width);
        }}
      >
        <CustomText style={[styles.textStyle, getFlipForRTLStyle()]}>
          {text}
        </CustomText>
        <View style={[{ width: width }, styles.barContainer]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  barContainer: {
    height: 20,
    backgroundColor: "#4bb190",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textStyle: {
    paddingStart: 10,
    paddingEnd: 10,
    fontSize: 12,
    color: "white",
    position: "absolute",
    zIndex: 5,
  },
});
