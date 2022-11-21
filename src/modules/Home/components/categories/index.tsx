import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { getSortedLayout, getLayoutFromArray } from "@utils";
import { CustomCategoryHome, CustomText } from "@components";
import DraggableFlatList, {
  ListItem,
} from "@HybridComponents/DraggableFlatList";
import UILayout from "./layout.json";
import { updateLayoutRequest } from "@Home/redux/actions";
import { useDispatch } from "react-redux";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import { margin, paddingHorizontal } from "@utils/genericStyles";
import AppConfig, { DragnDropLayout } from "@fast_track/src/AppConfig.json";
import { SCREEN_WIDTH } from "@commons/constants/constants";
import LayoutButton from "@HybridComponents/LayoutButton";
import { homeCategory } from "@Home/BL/Interfaces";

const Categories = React.memo(
  ({
    categories_section,
    onCategoryClickHandler,
    title,
    testID = "categories",
  }: homeCategory) => {
    const [sections, updateSections] = useState(
      categories_section?.tiles || []
    );

    // cDM
    useEffect(() => {
      if (DragnDropLayout) {
        updateSections(
          getSortedLayout(UILayout, [...sections], "display_name")
        );
      }
    }, []);

    const dispatch = useDispatch();
    //saga call
    const onUpdateLayoutRequest = () =>
      dispatch(
        updateLayoutRequest({
          postData: {
            data: JSON.stringify(
              getLayoutFromArray(UILayout, sections, "display_name")
            ),
            path: "./src/modules/Home/components/categories/layout.json",
          },
        })
      );

    return (
      <View
        style={[
          {
            backgroundColor:
              `#${categories_section?.section_bg_color}` ||
              design["Background_Primary_Color"],
          },
        ]}
      >
        <CustomText
          style={[
            styles.offersText,
            {
              color:
                categories_section?.section_title_color ||
                design["Text_Primary_Color"],
            },
          ]}
        >
          {title}
        </CustomText>
        <View style={styles.mainView}>
          <LayoutButton title="Upload Layout" onPress={onUpdateLayoutRequest} />
          <DraggableFlatList
            testID={testID}
            horizontal
            // style={styles.category}
            // bounces={false}
            data={sections}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.category,

              { width: Platform.OS == "web" ? SCREEN_WIDTH : "auto" },
              // AppConfig.largeOutlet && styles.spaceBetween,
            ]}
            onDragEnd={({ data }) => updateSections(data)}
            renderItem={({ item, drag, isActive, index }) => (
              <ListItem drag={drag} isActive={isActive} isSmall>
                <CustomCategoryHome
                  testID={`category${index}`}
                  isLarge={AppConfig.largeOutlet}
                  category={item}
                  onPress={onCategoryClickHandler}
                  index={index}
                />
              </ListItem>
            )}
            keyExtractor={(item) => item.display_name}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
  category: {
    marginBottom: 22,
    ...paddingHorizontal(18),
    justifyContent: "space-between",
  },
  // spaceBetween: {
  //   justifyContent: "space-between",
  // },
  offersText: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
    ...margin(16),
  },
});

export default Categories;
