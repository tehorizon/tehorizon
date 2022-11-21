import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { englishCountries, arabicCountries } from "../defaults/constants";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import i18n, { isRTL, getFlipForRTLStyle } from "@localization";
import { PRIMARY_BOLD } from "@fonts";

interface STATE {
  selected_country: string;
}
export default function CountryPicker(props) {
  const [selected_country, setselected_country] = useState(
    props.selectedCountry
  );

  const _handleCountrySelect = (name: string) => {
    setselected_country(name);
  };

  const renderItem = (country) => {
    const countryName = country.item[2];

    if (selected_country === null) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => _handleCountrySelect(countryName)}
          style={
            selected_country === countryName
              ? styles.listItemSelected
              : styles.listItem
          }
        >
          <Text style={styles.listItemText}>{countryName}</Text>
        </TouchableOpacity>
      );
    } else {
      const countryName = country.item[2];

      const selected = selected_country === countryName ? true : false;

      if (selected === true) {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => _handleCountrySelect(countryName)}
            style={styles.listItemSelected}
          >
            <Text style={styles.listItemText}>{countryName}</Text>

            <Ionicons
              style={{ paddingEnd: 10 }}
              name="md-checkmark"
              size={21}
              color="darkgrey"
            />
          </TouchableOpacity>
        );
      } else if (selected === false) {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => _handleCountrySelect(countryName)}
            style={styles.listItem}
          >
            <Text style={styles.listItemText}>{countryName}</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  const { isVisible, handleDone, countries } = props;

  return (
    <Modal isVisible={isVisible} animationIn="bounceIn" animationOut="fadeOut">
      <View style={styles.cmParent}>
        <View style={styles.cmHeader}>
          <Text style={styles.cmHeaderText}>
            {i18n.t("Country_of_residence")}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={englishCountries.countries}
            renderItem={(country) => renderItem(country)}
          />
        </View>
        <View style={styles.cmFooterParent}>
          <TouchableOpacity
            style={styles.doneButton}
            activeOpacity={1}
            onPress={() => {
              handleDone(selected_country);
            }}
          >
            <Text style={styles.textStyle}>{i18n.t("Done")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
  },
  cmParent: {
    height: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
  },
  cmHeader: {
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    backgroundColor: "rgb(237, 237, 237)",
    borderBottomWidth: 3,
    borderBottomColor: "rgb(37, 100, 171)",
    marginBottom: 5,
    justifyContent: "center",
  },
  cmHeaderText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: PRIMARY_BOLD,
    color: "rgb(79,153,210)",
  },
  listItemSelected: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    color: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
    paddingStart: 15,
    backgroundColor: "rgb(237, 237, 237)",
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
    color: "grey",
    flex: 1,
    fontFamily: PRIMARY_BOLD,
  },
  doneButton: {
    height: 30,
    borderRadius: 1,
    width: "30%",
    elevation: 2,
    backgroundColor: "rgb(79,153,210)",
    justifyContent: "center",
  },

  cmFooterParent: {
    backgroundColor: "#f2f1f1",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

// export default App;
