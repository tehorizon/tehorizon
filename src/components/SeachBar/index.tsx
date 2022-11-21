import React, {
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  Ref,
} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  InteractionManager,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { design } from "rn_fast_track_uilib";
import {
  borderColor,
  borderWidth,
  marginHorizontal,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY } from "@fonts";
import i18n, { getFlipForRTLStyle, isRTL } from "@localization";

interface PROPS {
  onPressCancel?: () => void;
  autoFocus?: boolean;
  inputProps?: TextInputProps;
  testID?: string;
  onSubmitEditing: (arg: string) => void;
  style?: ViewStyle;
  onChangeText?: (arg: string) => void;
}

export interface SearchBarRef {
  focus: () => void;
  blur: () => void;
  getValue: () => string;
  setValue: (arg: string) => void;
}

const SearchBar = React.forwardRef((props: PROPS, ref: Ref<SearchBarRef>) => {
  const textInput = useRef<TextInput>(null);

  const [searchText, setSearchText] = useState("");
  const {
    onPressCancel,
    autoFocus = false,
    inputProps,
    testID,
    onSubmitEditing,
    style = {},
    onChangeText = () => {},
  } = props;

  useImperativeHandle(ref, () => ({
    focus: () => textInput?.current?.focus(),
    blur: () => textInput?.current?.blur(),
    getValue: () => searchText,
    setValue: setSearchText,
  }));

  useEffect(() => {
    if (autoFocus && textInput.current && Platform.OS == "android") {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          textInput.current?.focus();
        }, 10);
      });
    }
  }, [autoFocus, textInput]);

  const search = () => onSubmitEditing(searchText);
  return (
    <View
      style={[styles.mainView, searchText != "" && styles.activeView, style]}
    >
      <View style={[styles.inputWraper]}>
        <AntDesign
          name="search1"
          size={20}
          style={getFlipForRTLStyle()}
          onPress={search}
          color={
            searchText != ""
              ? design.Text_Primary_Color
              : design.Tabs_Title_InActive_Color
          }
        />
        <TextInput
          allowFontScaling={false}
          ref={textInput}
          value={searchText}
          testID={testID}
          onChangeText={(string) => {
            setSearchText(string);
            onChangeText(string);
          }}
          onSubmitEditing={search}
          style={[
            styles.textInput,
            isRTL && { textAlign: "right" },
            getFlipForRTLStyle(),
          ]}
          placeholderTextColor={design.Tabs_Title_InActive_Color}
          placeholder={i18n.t("What are you looking for?")}
          autoFocus={Platform.OS != "android" && autoFocus}
          clearButtonMode={isRTL ? "never" : "always"}
          {...inputProps}
        />
      </View>
      {onPressCancel && (
        <TouchableOpacity onPress={onPressCancel} style={styles.cancelButton}>
          <Text>{i18n.t("Cancel")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 24,
    ...marginHorizontal(16),
    ...paddingHorizontal(12),
    ...paddingVertical(5),
    ...borderColor(design.Tabs_Title_InActive_Color),
    ...borderWidth(1),
    borderRadius: design.Global_Border_Radius,
    backgroundColor: design.Background_Secondary_Color,
    marginTop: 6,
    minHeight: 40,
  },
  activeView: {
    ...borderColor(design.Text_Primary_Color),
    backgroundColor: design.Background_Primary_Color,
  },
  filter: {
    width: 19,
    height: 14,
    tintColor: "#ffffff",
  },
  filterWrapper: {
    height: 43,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 5,
    ...paddingHorizontal(7.5),
    fontFamily: PRIMARY,
    height: 35,
    ...paddingVertical(0),
    color: design["Text_Primary_Color"],
  },
  inputWraper: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cancelButton: {
    ...paddingVertical(10),
    marginRight: 5,
  },
});
export default SearchBar;
