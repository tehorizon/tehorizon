import React from "react";
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { Portal } from "react-native-paper";
import { design } from "rn_fast_track_uilib";
import { BorderButton, CustomText } from "@components";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  marginVertical,
  padding,
  paddingVertical,
} from "@utils/genericStyles";
import I18n from "@localization";

const Index = ({
  isVisible,
  onDonePress,
  products,
  onRemoveAllPress,
  onRemovePress,
}) => {
  //styles
  const {
    centeredView,
    modalView,
    modalText,
    listStyle,
    listItemStyle,
    textStyle,
    okButton,
    buttonWithoutBackground,
    textStyleButtonWithoutBackground,
    itemDescriptionStyle,
  } = styles;
  if (isVisible) {
    return (
      <Portal>
        <View style={centeredView}>
          <View style={modalView}>
            <CustomText style={modalText}>{I18n.t("Remove_Item")}</CustomText>
            <FlatList
              data={products}
              style={listStyle}
              renderItem={({ item, index }) => {
                const { name, selectedOptions } = item;
                const border =
                  index !== products.length - 1
                    ? {
                        borderBottomWidth: 1,
                        borderColor: design.Border_Color,
                      }
                    : {};
                return (
                  <View style={[listItemStyle, border]}>
                    <View style={{ flexDirection: "row" }}>
                      <CustomText
                        style={{
                          ...textStyle,
                          color: design.Text_Primary_Color,
                          textAlign: "left",
                          flex: 1,
                        }}
                      >
                        {name}
                      </CustomText>

                      <TouchableOpacity
                        activeOpacity={1}
                        style={{
                          ...borderWidth(1),
                          ...borderColor(design.Primary_Color),
                          ...padding(5),
                        }}
                        onPress={() => {
                          onRemovePress(item.index);
                        }}
                      >
                        <CustomText
                          style={{
                            ...textStyleButtonWithoutBackground,
                            fontSize: 12,
                          }}
                        >
                          {I18n.t("REMOVE")}
                        </CustomText>
                      </TouchableOpacity>
                    </View>

                    {selectedOptions.map((option) => {
                      const { mainTitle, title } = option;
                      return (
                        <CustomText style={itemDescriptionStyle}>
                          {mainTitle}: {title}
                        </CustomText>
                      );
                    })}
                  </View>
                );
              }}
            />
            <BorderButton
              style={styles.okButton}
              activeOpacity={1}
              onPress={onDonePress}
              title={I18n.t("DONE")}
              textStyle={styles.textStyle}
            />
            <BorderButton
              style={buttonWithoutBackground}
              activeOpacity={1}
              onPress={() => {
                const productID = products[0].productId;
                onRemoveAllPress(productID);
              }}
              theme="white"
              title={I18n.t("Remove_All")}
              textStyle={styles.textStyle}
            />
          </View>
        </View>
      </Portal>
    );
  } else {
    return <></>;
  }
};

export default Index;

const styles = StyleSheet.create({
  listStyle: {
    // borderTopColor: "rgb(240,240,240)",
    borderTopWidth: 1,
    borderColor: design.Border_Color,
    maxHeight: 250,
    width: "100%",
  },
  listItemStyle: {
    ...paddingVertical(20),
    ...marginHorizontal(25),
  },
  listItemHeaderStyle: {
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    fontStyle: "normal",
    letterSpacing: 0,
    color: design["Text_Tertiary_Color"],
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    backgroundColor: design["Background_Secondary_Color"],
    // ...paddingVertical(20),
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "90%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
  okButton: {
    width: "80%",
    marginBottom: 5,
  },
  buttonWithoutBackground: {
    width: "auto",
    ...borderWidth(0),
  },
  textStyle: {
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    fontStyle: "normal",
    letterSpacing: 0,
    color: design["Text_Tertiary_Color"],
  },
  itemDescriptionStyle: {
    fontFamily: PRIMARY,
    fontSize: 13,
    color: design["Text_Secondary_Color"],
    ...marginVertical(2),
  },
  textStyleButtonWithoutBackground: {
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    fontStyle: "normal",
    letterSpacing: 0,
    color: design["Primary_Color"],
  },
  modalText: {
    fontFamily: PRIMARY,
    fontSize: 18,
    ...paddingVertical(30),
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
  },
  modalTextDescription: {
    fontFamily: PRIMARY,
    fontSize: 14,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    // color: "#000000",
  },
  iconStyle: {
    color: "red",
  },
});
