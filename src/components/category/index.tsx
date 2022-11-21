import React, { memo } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import CustomText from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import Image from "@HybridComponents/Image";
import { category } from "@Home/BL/Interfaces";

export const CustomCategoryHome = memo(
  ({ category, onPress, isLarge, index, testID }: customeCategory) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => onPress(category)}
        testID={category.display_name}
      >
        <View
          style={[
            styles.categoryView,
            isLarge && styles.categoryViewLarge,
            index != 0 && styles.marginLeft,
          ]}
        >
          <Image
            source={{ uri: category.image }}
            resizeMode={"cover"}
            style={isLarge ? styles.categoryLogoLarge : styles.categoryLogo}
          />
          <View style={styles.titleContainer}>
            <CustomText
              testID={testID}
              style={isLarge ? styles.categoryTextLarge : styles.categoryText}
            >
              {category.display_name}
            </CustomText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

const styles = StyleSheet.create({
  categoryView: {
    alignItems: "center",
  },
  marginLeft: {
    marginLeft: 8,
  },
  categoryViewLarge: {
    // borderTopLeftRadius: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: design.Background_Secondary_Color,
    borderWidth: 0.15,
    borderColor: design.Border_Color,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  categoryLogo: {
    width: 47,
    height: 47,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 8,
    lineHeight: 10,
    textAlign: "center",
    color: design["Text_Primary_Color"],
    width: 55,
  },
  categoryLogoLarge: {
    width: 109,
    height: 109,
  },
  categoryTextLarge: {
    // ...marginVertical(10),
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    textAlignVertical: "center",
    color: design["Text_Primary_Color"],
    width: 90,
  },
  titleContainer: {
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CustomCategoryHome;

interface customeCategory {
  category: category;
  isLarge: boolean;
  index: number;
  testID: string;
  onPress: (data: category) => void;
}
