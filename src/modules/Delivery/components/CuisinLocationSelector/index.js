import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import cuisin from "@assets/images/icCuisines.png";
import loction from "@assets/images/icLoc.png";
// import i18n from '@localization';
import i18n from "@localization";
import { AntDesign } from "@expo/vector-icons";

import { CustomText } from "@components";
import { marginHorizontal, paddingHorizontal } from "@utils/genericStyles";

export default CuisinLocationSelector = ({
  navigation,
  showModal,
  selectedLocation,
}) => {
  return (
    <View style={styles.locationCuisinContainer}>
      <TouchableOpacity
        onPress={() => showModal()}
        activeOpacity={1}
        style={[styles.selectionContainer, { marginRight: 5 }]}
      >
        <View style={styles.selection}>
          <Image
            source={cuisin}
            style={styles.selectionIcons}
            resizeMode="contain"
          />
          <CustomText style={styles.centerText} numberOfLines={1}>
            {i18n.t("All_Cuisines")}
          </CustomText>
        </View>
        <AntDesign
          name="caretdown"
          size={12}
          color={design["Header_Icon_Color"]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectionContainer}
        onPress={() => navigation.navigate("LocationPickerMap")}
        activeOpacity={1}
      >
        <View style={styles.selection}>
          <Image
            source={loction}
            style={styles.selectionIcons}
            resizeMode="contain"
          />
          <CustomText style={styles.centerText} numberOfLines={1}>
            {selectedLocation?.title || i18n.t("Current_location")}
          </CustomText>
        </View>
        <AntDesign
          name="caretdown"
          size={12}
          color={design["Header_Icon_Color"]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  locationCuisinContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: design["Primary_Color"],
    height: 48,
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    ...marginHorizontal(15),
    ...paddingHorizontal(9),
  },
  selection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  selectionIcons: {
    width: 18,
    tintColor: design["Primary_Color"],
  },
  centerText: {
    flex: 1,
    color: design.Text_Primary_Color,
    fontSize: 14,
    ...marginHorizontal(7),
  },
});
