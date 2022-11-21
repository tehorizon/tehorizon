import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import i18n from "@localization";
import BorderButton from "../Buttons/BorderButton";
import { PRIMARY_BOLD } from "@fonts";
import { padding } from "@utils/genericStyles";

interface STATE {
  selected_currency: string;
}
export default class OrderCustomizationModal extends Component<any, STATE> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected_currency: this.props.selectedCurrency,
    };
  }

  _handleCurrencySelect = (name: string) => {
    this.setState({ selected_currency: name });
  };

  renderItem = (currency) => {
    const { selected_currency } = this.state;
    const currencyName = currency.translated_currency;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this._handleCurrencySelect(currencyName)}
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
  };

  render() {
    const { isVisible, handleDone, selectedItem } = this.props;
    console.log("selected item", selectedItem);

    if (
      selectedItem && // 👈 null and undefined check
      Object.keys(selectedItem).length === 0 &&
      selectedItem.constructor === Object
    ) {
      return null;
    }

    return (
      <Modal
        isVisible={isVisible}
        animationIn="slideInDown"
        animationOut="slideOutUp"
      >
        <View style={styles.cmParent}>
          <View style={styles.cmHeader}>
            <AntDesign
              style={{ ...padding(10) }}
              name="caretleft"
              size={14}
              color={"#9F9F9F"}
              onPress={() => {
                this.props.onBack();
              }}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={styles.scrollView}
            contentContainerStyle={{
              paddingBottom: 60,
            }}
          >
            {selectedItem.customizations.map((element) => {
              return (
                <View style={{ flex: 1 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text>{element.section_title}</Text>
                  </View>

                  {element.options.map((option) => {
                    return (
                      <View>
                        <Text>{option.title}</Text>
                        <Text>{option.sub_title}</Text>

                        {option.options_items.map((optionItem) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                ...padding(10),
                              }}
                            >
                              <Text>{optionItem.title}</Text>
                              <Text>{optionItem.sub_title}</Text>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}

                  {/* <FlatList
                  data={element.options}
                  //keyExtractor={(item, index) => item}
                  //ref={(e) => (this.categoryList = e)}
                  renderItem={({ item }) => this.renderItem(item)}
                /> */}
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.cmFooterParent}>
            <BorderButton
              style={styles.doneButton}
              activeOpacity={1}
              onPress={() => {
                //handleDone(this.state.selected_currency);
                console.log("make validations");
              }}
              textStyle={styles.textStyle}
              title={i18n.t("Done")}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
  },
  cmParent: {
    height: "95%",
    backgroundColor: "white",
    overflow: "hidden",
  },
  cmHeader: {
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    backgroundColor: "rgb(237, 237, 237)",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(180, 180, 180)",
    marginBottom: 5,
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
