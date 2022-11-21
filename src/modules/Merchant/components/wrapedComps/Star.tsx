import React, { useState, memo, useCallback } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import YellowStar from "@assets/images/star-yellow.png";
import GrayStar from "@assets/images/star-gray.png";
import { CustomText } from "@fast_track/src/components";
import { borderColor, borderWidth } from "@fast_track/src/utils/genericStyles";
import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";
import { PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import { SCREEN_WIDTH } from "@fast_track/src/commons/constants/constants";

const ratingArray = [
  { value: 1, source: GrayStar },
  { value: 2, source: GrayStar },
  { value: 3, source: GrayStar },
  { value: 4, source: GrayStar },
  { value: 5, source: GrayStar },
];

const Stars = memo(
  ({ onSelectRating }: { onSelectRating: (arg: number) => void }) => {
    const [ratings, setRatings] = useState(ratingArray);

    const onPress = useCallback((item: { value: number; source: number }) => {
      let newArray = [...ratingArray];
      for (let i = 0; i < ratingArray.length; i++) {
        if (item.value >= ratingArray[i].value) {
          newArray[i] = { ...newArray[i], source: YellowStar };
        }
      }
      setRatings(newArray);
      onSelectRating(item.value);
    }, []);

    const Star = memo(
      ({ item }: { item: { value: number; source: number } }) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={[Styles.star, { marginRight: item.value == 5 ? 0 : 8 }]}
            onPress={() => onPress(item)}
          >
            <CustomText style={Styles.text}>{item.value}</CustomText>
            <Image
              resizeMode="contain"
              source={item.source}
              style={[Styles.starImg]}
            />
          </TouchableOpacity>
        );
      }
    );

    return (
      <View style={[Styles.container]}>
        {ratings.map((item, index) => (
          <Star item={item} key={index?.toString()} />
        ))}
      </View>
    );
  }
);

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    width: (SCREEN_WIDTH - 80) / 5,
    height: 34,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 4,
    ...borderWidth(1),
    ...borderColor(design.Border_Color),
  },
  starImg: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
  text: {
    fontSize: 17,
    fontFamily: PRIMARY_BOLD,
  },
});

export default Stars;
