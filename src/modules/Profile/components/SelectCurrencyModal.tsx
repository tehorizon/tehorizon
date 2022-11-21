import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { currencies } from "../defaults/constants";
import Modal from "@HybridComponents/Modal/index.web";
import { Ionicons } from "@expo/vector-icons";
import i18n, {
  changeLanguage,
  withTransation,
  getFlipForRTLStyle,
  isRTL,
} from "@localization";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";
interface STATE {
  selected_currency: string;
}
export default function CurrencyPicker(props) {
  const [selected_currency, setSelectedCurrency] = useState(
    props.selectedCurrency
  );

  const _handleCurrencySelect = (name: string) => {
    setSelectedCurrency(name);
  };

  const renderItem = (currency) => {
    const currencyName = currency.translated_currency;

    if (selected_currency === null) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => _handleCurrencySelect(currencyName)}
          style={
            selected_currency === currencyName
              ? styles.listItemSelected
              : styles.listItem
          }
        >
          <Text style={styles.listItemText}>{currencyName}</Text>
        </TouchableOpacity>
      );
    } else {
      const currencyName = currency.translated_currency;

      const selected = selected_currency === currencyName ? true : false;

      if (selected === true) {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => _handleCurrencySelect(currencyName)}
            style={styles.listItemSelected}
          >
            <Text style={styles.listItemText}>{currencyName}</Text>

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
            onPress={() => _handleCurrencySelect(currencyName)}
            style={styles.listItem}
          >
            <Text style={styles.listItemText}>{currencyName}</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  const { isVisible, handleDone } = props;

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5} backdropColor={"black"}>
      <View style={styles.cmParent}>
        <View style={styles.cmHeader}>
          <Text style={styles.cmHeaderText}>
            {i18n.t("Currency_Preference")}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={currencies}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
        <View style={styles.cmFooterParent}>
          <TouchableOpacity
            style={styles.doneButton}
            activeOpacity={1}
            onPress={() => {
              handleDone(selected_currency);
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
    color: design["Text_Tertiary_Color"],
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
  },
  cmParent: {
    width: "100%",
    height: "85%",
    backgroundColor: design["Background_Secondary_Color"],
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
  },
  cmHeader: {
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    backgroundColor: design["Header_Background_Secondary_color"],
    borderBottomWidth: 3,
    borderBottomColor: design["Primary_Color"],
    marginBottom: 5,
    justifyContent: "center",
  },
  cmHeaderText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: PRIMARY_BOLD,
    color: design["Primary_Color"],
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
    color: design["List_Title_Secondary_Color"],
    flex: 1,
    fontFamily: PRIMARY_BOLD,
  },
  doneButton: {
    height: 30,
    borderRadius: 1,
    width: "30%",
    elevation: 2,
    backgroundColor: design["Primary_Color"],
    justifyContent: "center",
  },

  cmFooterParent: {
    backgroundColor: design["Header_Background_Secondary_color"],
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

// export default App;
