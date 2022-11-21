import React, { useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
// import i18n from '@localization';
import i18n from "@localization";
import { design } from "rn_fast_track_uilib";

import { CustomInput } from "@components";
import { marginHorizontal } from "@utils/genericStyles";

export default SearchInput = ({ setSearchText, navigation, list }) => {
  //ref
  const inputRef = useRef();

  return (
    <View style={styles.textInputContainer}>
      <Image
        source={require("@assets/images/search_btn.png")}
        style={styles.searchIcon}
      />
      <CustomInput
        ref={inputRef}
        customStyle={styles.customInputContainer}
        style={styles.inputStyles}
        placeholder={i18n.t("search_by_name_locatoin_keyboard")}
        placeholderTextColor={styles.textInput}
        autoCapitalize="none"
        onSubmitEditing={() => {
          setSearchText(inputRef.current?.getValue());
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: design.Background_Secondary_Color,
    borderBottomColor: design.Input_Placeholder_Color,
    borderBottomWidth: 1,
  },
  searchIcon: {
    height: 15,
    width: 15,
    ...marginHorizontal(13),
  },
  textInput: {
    fontSize: 13,
    color: design.Input_Placeholder_Color,
  },
  customInputContainer: {
    marginTop: 0,
  },
  inputStyles: {
    width: "85%",
    height: 42,
  },
});
