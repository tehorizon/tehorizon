import React, { Component, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import i18n from "@localization";
import OptionHeader from "../OptionHeader/index";
import OptionItem from "../OptionItem/index";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";
import {
  marginHorizontal,
  marginVertical,
  padding,
} from "@utils/genericStyles";
import { BorderButton, CustomText } from "@components";

export default class OrderCustomizationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customisations: null,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if (!state.customisations) {
      return {
        customisations: props.customisations,
      };
    }
    return state;
  };

  validateCustomizations = () => {
    const customisations = this.state.customisations;
    try {
      for (let index = 0; index < customisations.length; index++) {
        const customisation = customisations[index];

        for (let index = 0; index < customisation.options.length; index++) {
          const option = customisation.options[index];

          let currentSelectionCount = 0;
          for (let index = 0; index < option.options_items.length; index++) {
            const optionsItem = option.options_items[index];
            if (optionsItem.is_selected) {
              currentSelectionCount++;
            }
          }

          if (
            option.minimum_option_selection &&
            currentSelectionCount < option.minimum_option_selection
          ) {
            if (customisation.show_selection && !customisation.is_selected) {
              // if main header is not selected
            } else {
              alert(option.validation_message, "hello");
              this.props.errorCallback(option.validation_message);
              return false;
            }
          }

          // if (
          //   option.minimum_option_selection &&
          //   currentSelectionCount > option.minimum_option_selection
          // ) {
          //   if (customisation.show_selection && !customisation.is_selected) {
          //     // if main header is not selected
          //   } else {
          //     this.props.errorCallback(option.maximumValidationMessage);
          //     return false;
          //   }
          // }
        }
      }
    } catch (error) {
      return false;
    }

    return true;
  };

  onAddCustomizationPress = () => {
    if (!this.validateCustomizations()) return;
    console.log("add pressed", this.state.customisations);
    this.props.handleAddToCart(this.state.customisations);
    this.setState({ customisations: null });
  };

  onOptionSelected = (
    selectedSectionTitle,
    selectedOption,
    selectedItemOption
  ) => {
    // return

    if (selectedOption.allow_multiple_selection) {
      // is multiselection
      let numberOfSelectedItems = 0;
      selectedOption.options_items.forEach((element) => {
        if (element.is_selected) {
          numberOfSelectedItems++;
        }
      });

      const tempCustomizations = this.state.customisations.map(
        (customisation) => {
          if (customisation.section_title === selectedSectionTitle) {
            return {
              ...customisation,
              options: customisation.options.map((option) => {
                if (option.title === selectedOption.title) {
                  return {
                    ...option,
                    options_items: option.options_items.map((optionItem) => {
                      if (optionItem.item_id == selectedItemOption.item_id) {
                        if (selectedItemOption.is_selected) {
                          return {
                            ...optionItem,
                            is_selected: !selectedItemOption.is_selected,
                          };
                        } else {
                          if (
                            numberOfSelectedItems <
                            selectedOption.maximum_option_selection
                          ) {
                            return {
                              ...optionItem,
                              is_selected: !selectedItemOption.is_selected,
                            };
                          }
                          return optionItem;
                        }
                      } else {
                        return optionItem;
                      }
                    }),
                  };
                } else {
                  return option;
                }
              }),
            };
          } else {
            return customisation;
          }
        }
      );

      this.setState({
        customisations: tempCustomizations,
      });
    } else {
      const tempCustomizations = this.state.customisations.map(
        (customisation) => {
          if (customisation.section_title === selectedSectionTitle) {
            return {
              ...customisation,
              options: customisation.options.map((option) => {
                if (option.title === selectedOption.title) {
                  return {
                    ...option,
                    options_items: option.options_items.map((optionItem) => {
                      if (optionItem.item_id == selectedItemOption.item_id) {
                        return {
                          ...optionItem,
                          is_selected: !optionItem.is_selected,
                        };
                      } else {
                        return {
                          ...optionItem,
                          is_selected: false,
                        };
                      }
                    }),
                  };
                } else {
                  return option;
                }
              }),
            };
          } else {
            return customisation;
          }
        }
      );

      console.log(tempCustomizations, selectedOption, "hello");
      this.setState({
        customisations: tempCustomizations,
      });
    }
  };

  // onSectionSelected = (customisation) => {
  //   let tempArray = [];
  //   this.state.customisations.forEach((item) => {
  //     if (item.sectionTitle == customisation.sectionTitle) {
  //       tempArray.push({
  //         ...customisation,
  //         is_selected: !customisation.is_selected,
  //         options: customisation.options.map((option) => ({
  //           ...option,
  //           options_items: option.options_items.map((optionItem) => ({
  //             ...optionItem,
  //             is_selected: customisation.is_selected
  //               ? false
  //               : optionItem.is_selected,
  //           })),
  //         })),
  //       });
  //     } else {
  //       tempArray.push(item);
  //     }
  //   });
  //   this.setState({ customisations: tempArray });
  // };

  render() {
    const { isVisible = false } = this.props;
    console.log(this.props, "props customization");

    return (
      <Modal
        isVisible={isVisible}
        animationIn="slideInDown"
        animationOut="slideOutUp"
      >
        <View style={styles.cmParent}>
          <View style={styles.cmHeader}>
            <AntDesign
              style={styles.backBtn}
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
            contentContainerStyle={styles.contentContainer}
          >
            {this.state.customisations &&
              this.state.customisations?.map((customisation) => {
                return (
                  <View>
                    <CustomText style={styles.sectionTitle}>
                      {customisation?.section_title}
                    </CustomText>
                    {customisation?.options?.map((option) => {
                      return (
                        <View>
                          <OptionHeader {...option} />
                          {option?.options_items?.map((optionItem) => {
                            return (
                              <OptionItem
                                {...optionItem}
                                allowMultipleSelection={
                                  option.allow_multiple_selection
                                }
                                disable={
                                  customisation.show_selection &&
                                  !customisation.is_selected
                                }
                                onPress={() => {
                                  this.onOptionSelected(
                                    customisation.section_title,
                                    option,
                                    optionItem
                                  );
                                }}
                              />
                            );
                          })}
                        </View>
                      );
                    })}
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
                this.onAddCustomizationPress();
              }}
              title="Add"
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  cmParent: {
    height: "95%",
    backgroundColor: design["Background_Secondary_Color"],
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
    // width: "90%",
  },

  cmFooterParent: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    ...marginHorizontal(15),
    marginBottom: 10,
  },
  backBtn: {
    paddingLeft: 17,
    ...padding(10),
  },
  sectionTitle: {
    alignSelf: "center",
    marginTop: 12,
    marginBottom: -15,
  },
  contentContainer: {
    paddingBottom: 60,
  },
});

// export default App;
