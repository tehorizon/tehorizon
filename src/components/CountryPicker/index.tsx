import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import CountryJSON from "./countries.json";
import Text from "../Text/Text";
import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { design } from "rn_fast_track_uilib";
import { PRIMARY, PRIMARY_BOLD } from "@commons/fonts";
import { isRTL } from "@localization";
const CountryPicker = (props: CountryPickerProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryJsonProps>();
  const [hidePickerTitle, togglePickerTitle] = useState<boolean>(false);
  const [hideSearchBar, toggleSearchBar] = useState<boolean>(true);
  const [countryJson, setCountryJson] =
    useState<typeof CountryJSON>(CountryJSON);
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const [selectedFlag, setSelectedFlag] = useState<boolean>(false);

  const searchByCountryNameCode = (searchText: string) => {
    if (/^-{0,1}\d+$/.test(searchText)) {
      var filteredJson = CountryJSON.filter((item) => {
        return item.callingCode.startsWith(searchText);
      });
    } else {
      var filteredJson = CountryJSON.filter((item) => {
        const itemData =
          item.name[props.language]?.toUpperCase() || item.name[props.language]; // some lanaguage can't be uppercase e.g Arabic, Japenese
        const queryText = searchText?.toUpperCase() || searchText;
        return itemData?.includes(queryText);
      });
    }
    setCountryJson([...filteredJson]);
  };

  const handleItemOnClick = (item: CountryJsonProps) => {
    toggleModal(false);
    setSelectedFlag(true);
    setSelectedCountry(item);
    setCountryJson(CountryJSON);
    props.selectedValue && props.selectedValue(item.callingCode);
  };

  const renderListItem = ({ item }: { item: CountryJsonProps }) => {
    return (
      <View>
        <Pressable onPress={() => handleItemOnClick(item)}>
          <View style={styles.listItemView}>
            {!props.hideCountryFlag && (
              <Image
                source={{ uri: item.flag }}
                style={styles.countryFlagStyle}
              />
            )}
            <View style={styles.titleView}>
              <Text
                style={[
                  styles.countryNameTextStyle,
                  props.countryNameTextStyle,
                ]}
              >
                {item.name[props.language]} {`(+${item.callingCode})`}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </Pressable>
      </View>
    );
  };

  const renderFlagComponent = (selectedFlag: boolean, defaultText: string) => {
    const filteredJson = CountryJSON.filter(function (item) {
      return item.callingCode === defaultText;
    });

    return (
      <Pressable
        style={{ flexDirection: "row" }}
        disabled={props.disable}
        onPress={() => toggleModal(true)}
      >
        <View style={styles.selectedCountryView}>
          {!props.hideCountryFlag && (
            <Image
              source={{
                uri: selectedFlag
                  ? selectedCountry?.flag
                  : filteredJson[0].flag,
              }}
              style={[styles.countryFlagStyle, props.countryFlagStyle]}
            />
          )}
          {!props.hideCountryCode && (
            <Text
              style={[
                styles.selectedCountryTextStyle,
                props.selectedCountryTextStyle,
              ]}
            >
              {selectedFlag
                ? "+" + selectedCountry?.callingCode
                : "+" + defaultText}
            </Text>
          )}

          <Image
            source={props.dropDownImage}
            style={[styles.dropDownImage, props.dropDownImageStyle]}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.containerStyle, props.containerStyle]}>
      {renderFlagComponent(selectedFlag, props.countryCode)}

      <Modal
        visible={isModalVisible}
        animationType={props.animationType}
        onRequestClose={() => toggleModal(false)}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <View
            style={[styles.searchBarContainer, props.searchBarContainerStyle]}
          >
            <Pressable
              disabled={props.disable}
              onPress={() => {
                setCountryJson(CountryJSON);
                toggleModal(false);
              }}
            >
              <Image
                resizeMode="center"
                style={[styles.imageStyle, props.backImageStyle]}
                source={props.backButtonImage}
              />
            </Pressable>

            {!hidePickerTitle && (
              <Text style={[styles.pickerTitleStyle, props.pickerTitleStyle]}>
                {props.pickerTitle}
              </Text>
            )}

            {!hideSearchBar && (
              <TextInput
                style={[styles.searchBarStyle, props.searchBarStyle]}
                onChangeText={searchByCountryNameCode}
                placeholderTextColor={"#A9A9A9"}
                placeholder={props.searchBarPlaceHolder}
                keyboardType="default"
                returnKeyType={"done"}
                blurOnSubmit={true}
              />
            )}

            <Pressable
              onPress={() => {
                toggleSearchBar(!hideSearchBar);
                togglePickerTitle(!hidePickerTitle);
              }}
            >
              <Image
                resizeMode="center"
                style={[styles.imageStyle, props.searchImageStyle]}
                source={props.searchButtonImage}
              />
            </Pressable>
          </View>

          <FlatList
            data={countryJson}
            numColumns={1}
            overScrollMode="never"
            initialNumToRender={50}
            style={styles.flatListStyle}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderListItem}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
export default CountryPicker;
CountryPicker.defaultProps = {
  disable: false,
  animationType: "slide",
  hideCountryFlag: false,
  hideCountryCode: false,
  dropDownImage: require("@assets/images/arrow_down.png"),
  backButtonImage: require("@assets/images/back-arrow.png"),
  searchButtonImage: require("@assets/images/search_icon.png"),
  countryCode: "92",
  searchBarPlaceHolder: "Search...",
  selectedValue: "",
  pickerTitle: "",
  language: "en",
};
interface CountryJsonProps {
  currency: "string";
  callingCode: number;
  flag: "string";
  name: {
    en: "string";
    cym: "string";
    deu: "string";
    fra: "string";
    hrv: "string";
    ita: "string";
    jpn: "string";
    nld: "string";
    por: "string";
    rus: "string";
    spa: "string";
    svk: "string";
    fin: "string";
    zho: "string";
    isr: "string";
    ar: "string";
  };
}
export interface CountryPickerProps {
  animationType?: "none" | "slide" | "fade" | undefined;
  containerStyle?: ViewStyle;
  searchBarStyle?: ViewStyle;
  searchBarContainerStyle?: ViewStyle;
  pickerTitleStyle?: TextStyle;
  countryNameTextStyle?: TextStyle;
  selectedCountryTextStyle?: TextStyle;
  dropDownImage?: ImageSourcePropType;
  backButtonImage?: ImageSourcePropType;
  searchButtonImage?: ImageSourcePropType;
  dropDownImageStyle?: ImageStyle;
  countryFlagStyle?: ImageStyle;
  searchImageStyle?: ImageStyle;
  countryFlagContainer?: ImageStyle;
  backImageStyle?: ImageStyle;
  countryCode?: string | any;
  hideCountryFlag?: boolean;
  hideCountryCode?: boolean;
  searchBarPlaceHolder?: string;
  pickerTitle?: string;
  disable?: boolean;
  selectedValue?: Function;
  language:
    | "en"
    | "cym"
    | "deu"
    | "fra"
    | "hrv"
    | "ita"
    | "jpn"
    | "nld"
    | "por"
    | "rus"
    | "spa"
    | "svk"
    | "fin"
    | "zho"
    | "isr"
    | "ar";
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  containerStyle: {
    justifyContent: "center",
    backgroundColor: design.Background_Primary_Color,
    ...paddingVertical(14),
    ...borderColor(design.Border_Color),
    ...borderWidth(1),
    ...paddingHorizontal(8),
    borderRadius: design.Global_Border_Radius,
  },
  searchBarStyle: {
    flex: 1,
    textAlign: isRTL ? "right" : "left",
  },
  selectedCountryTextStyle: {
    color: design.Text_Primary_Color,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: PRIMARY_BOLD,
    ...marginHorizontal(9),
  },
  pickerTitleStyle: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  divider: {
    width: "95%",
    height: 0.8,
    marginHorizontal: 10,
    backgroundColor: "#D3D3D3",
  },
  selectedCountryView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemView: {
    ...margin(10),
    flexDirection: "row",
    alignItems: "center",
  },
  titleView: {
    flexDirection: "row",
  },
  countryNameTextStyle: {
    textAlign: isRTL ? "right" : "left",
    color: design.Text_Primary_Color,
    fontSize: 14,
    fontFamily: PRIMARY,
    ...marginHorizontal(10),
  },
  countryFlagStyle: {
    width: 35,
    height: 25,
    borderRadius: 3,
  },
  dropDownImage: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
  searchBarContainer: {
    height: 56,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,9)",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderBottomColor: design.Border_Color,
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: 20,
    height: 20,
    ...margin(10),
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
  flatListStyle: {
    ...margin(15),
  },
});
