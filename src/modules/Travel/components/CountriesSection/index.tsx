import React, { useState } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import _ from "lodash";
import { design } from "rn_fast_track_uilib";
import { CustomText } from "@components";
import Image from "@HybridComponents/Image";
import { SimpleLineIcons } from "@expo/vector-icons";
import allFlags from "@Home/defaults/flag";
import { padding, paddingVertical } from "@utils/genericStyles";
import { PRIMARY } from "@fonts";

const CountriesSection = ({ item, index, onClickLocationHandler }: any) => {
  const [open, setopen] = useState(true);
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setopen(!open);
  };
  return (
    <View style={styles.mainView}>
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <CustomText style={styles.sectionHeader}>{item?.title}</CustomText>
      </TouchableOpacity>
      {open &&
        item.data.map((i: any) => (
          <TouchableOpacity
            onPress={() => {
              onClickLocationHandler(i);
            }}
            testID={"select_location_item"}
            style={styles.item}
          >
            <View style={styles.itemSubView}>
              <Image source={allFlags[i?.shortname]} style={styles.flag} />
              <CustomText style={styles.title}>{i.name}</CustomText>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              size={12}
              color={design["Header_Icon_Color"]}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default CountriesSection;

const styles = StyleSheet.create({
  mainView: {
    paddingBottom: 10,
  },
  sectionHeader: {
    backgroundColor: design.TRAVEL_LOCATIONS_SECTION_HEADER_COLOR,
    ...padding(5),
    color: design.TRAVEL_LOCATIONS_SECTION_HEADER_TITLE_COLOR,
    fontSize: 16,
    // fontFamily: PRIMARY,
  },
  item: {
    flexDirection: "row",
    marginLeft: 15,
    ...padding(5),
    ...paddingVertical(10),
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: design.Border_Color,
  },
  itemSubView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: PRIMARY,
  },
  flag: {
    width: 25,
    height: 25,
    marginRight: 8.5,
    resizeMode: "cover",
  },
});
