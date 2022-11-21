import React, { useRef, useImperativeHandle, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  InteractionManager,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { design } from "rn_fast_track_uilib";
import {
  marginHorizontal,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY } from "@fonts";

const SearchBar = React.forwardRef((props: any, ref) => {
  const textInput = useRef(null);

  const [searchText, setSearchText] = useState("");
  const {
    autoFocus = false,
    inputProps,
    onChangeText,
    i18nCollection,
    testID,
    onSubmitEditing,
  } = props;
  const { isRTL } = i18nCollection;
  const i18n = i18nCollection.default;

  useImperativeHandle(ref, () => ({
    focus: () => textInput?.current?.focus(),
    blur: () => textInput?.current?.blur(),
    getValue: () => searchText,
    setValue: setSearchText,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.inputCancelWrapper}>
        <View style={styles.searchView}>
          <AntDesign
            name="search1"
            size={20}
            color={design.Input_Placeholder_Color}
            style={styles.icon}
          />
          <TextInput
            allowFontScaling={false}
            ref={textInput}
            // value={searchText}
            testID={testID}
            onChangeText={onChangeText}
            onSubmitEditing={() => onSubmitEditing(searchText)}
            isRTL={isRTL}
            style={styles.textInput}
            placeholderTextColor={design.Input_Placeholder_Color}
            placeholder={i18n.t("Search")}
            autoFocus={autoFocus}
            returnKeyType="search"
            {...inputProps}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 45,
    justifyContent: "center",
  },
  searchView: {
    borderRadius: 5,
    height: 36,
    marginLeft: 5,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginLeft: 5,
  },
  inputCancelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    borderRadius: 5,
    ...marginHorizontal(20),
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: PRIMARY,
    height: 35,
    color: design["Text_Primary_Color"],
    ...paddingVertical(0),
    ...paddingHorizontal(7.5),
  },
});
export default SearchBar;
