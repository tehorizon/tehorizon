import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import Text from "../Text/Text";
import { Ionicons } from "@expo/vector-icons";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";
import { isRTL, getFlipForRTLStyle } from "@localization";
import { currencies } from "@commons/countries/static";
import PickerModal from "./PickerModal";

const CurrencyPicker = ({
  isVisible,
  title,
  selectedCurrency,
  handleDone,
}: any) => {
  const [selectedItem, setSelectedItem] = useState(selectedCurrency);

  return (
    <PickerModal
      isVisible={isVisible}
      title={title}
      handleDone={() => handleDone(selectedItem)}
    >
      <FlatList
        testID={"countries"}
        data={currencies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={1}
            testID={`country${index}`}
            onPress={() => setSelectedItem(item?.translated_currency)}
            style={[
              styles.listItem,
              selectedItem === item?.translated_currency &&
                styles.listItemSelected,
            ]}
          >
            <Text style={styles.listItemText}>{item?.translated_currency}</Text>
            {selectedItem === item?.translated_currency && (
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

export default CurrencyPicker;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    height: 50,
    color: "grey",
    alignItems: "center",
    justifyContent: "center",
    paddingStart: 15,
  },
  listItemSelected: {
    color: "#A9A9A9",
    backgroundColor: design.List_Selected_Color,
  },
  listItemText: {
    flex: 1,
    fontFamily: PRIMARY_BOLD,
    color: design["List_Title_Secondary_Color"],
  },
});
