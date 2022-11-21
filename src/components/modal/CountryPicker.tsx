import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import Text from "../Text/Text";
import { Ionicons } from "@expo/vector-icons";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";
import { getFlipForRTLStyle, isRTL } from "@localization";
import { arabic, english } from "@commons/countries/static";
import PickerModal from "./PickerModal";

const CountryPicker = ({
  isVisible,
  title,
  selectedCountry,
  handleDone,
}: any) => {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    setSelectedItem(selectedCountry);
  }, [selectedCountry]);

  return (
    <PickerModal
      isVisible={isVisible}
      title={title}
      handleDone={() => handleDone(selectedItem)}
    >
      <FlatList
        testID={"countries"}
        data={isRTL ? arabic?.countries : english?.countries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={1}
            testID={`country${index}`}
            onPress={() => setSelectedItem(item[2])}
            style={[
              styles.listItem,
              selectedItem === item[2] && styles.listItemSelected,
            ]}
          >
            <Text style={styles.listItemText}>{item[2]}</Text>
            {selectedItem === item[2] && (
              <Ionicons
                style={[{ paddingEnd: 10 }, getFlipForRTLStyle()]}
                name="md-checkmark"
                size={21}
                //   color={design.List_Selected_Tick_Colors}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </PickerModal>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  listItemSelected: {
    color: "#A9A9A9",
    backgroundColor: design.List_Selected_Color,
  },
  listItem: {
    flexDirection: "row",
    height: 50,
    color: "grey",
    alignItems: "center",
    justifyContent: "center",
    paddingStart: 15,
  },
  listItemText: {
    flex: 1,
    fontFamily: PRIMARY_BOLD,
    color: design["List_Title_Secondary_Color"],
  },
});
