import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { design } from "rn_fast_track_uilib";

import { CustomText } from "@components";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import { paddingVertical } from "@utils/genericStyles";

const OrderListItemItem = (props) => {
  //props
  const { style, item } = props;

  //style
  const {
    mainView,
    topView,
    middleView,
    bottomView,
    itemImage,
    itemTitleView,
    itemDescriptionText,
    itemTitleText,
    upgradeItemView,
    subTotalTitle,
    subTotalPrice,
    upgradeTitleText,
  } = Styles;

  const _renderUpgrades = (upgrades) => {
    let upgradesItem = [];

    upgrades.forEach((upgrade) => {
      const { options = [] } = upgrade;

      options.forEach((item) => {
        const { title = "", sub_title = "", color = "" } = item;
        upgradesItem.push(
          <View style={upgradeItemView}>
            <CustomText
              style={{ ...itemDescriptionText, flex: 1, color: `#${color}` }}
            >
              {title}
            </CustomText>

            <CustomText style={{ ...itemDescriptionText, color: `#${color}` }}>
              {sub_title}
            </CustomText>
          </View>
        );
      });
    });

    return upgradesItem;
  };

  const {
    imageURL = "",
    name = "",
    selected_item_total_price = "",
    selectedOptions = [],
    sub_total = "",
  } = item;

  return (
    <View style={[mainView, style]}>
      <View style={topView}>
        <Image src={{ uri: imageURL }} style={itemImage} />

        <View style={itemTitleView}>
          <CustomText style={itemTitleText}>{name}</CustomText>

          <CustomText style={itemDescriptionText}>{"Includes:"}</CustomText>
        </View>

        <CustomText style={itemDescriptionText}>
          {selected_item_total_price}
        </CustomText>
      </View>

      <View style={middleView}>
        {selectedOptions.length !== 0 && (
          <>
            <CustomText
              style={{
                ...upgradeTitleText,
                color: `#${selectedOptions[0].section_title_color}`,
              }}
            >
              {selectedOptions[0].section_title}
            </CustomText>

            {_renderUpgrades(selectedOptions)}
          </>
        )}
      </View>

      <View style={bottomView}>
        <CustomText style={subTotalTitle}>{"Subtotal"}</CustomText>
        <CustomText style={subTotalPrice}>{sub_total}</CustomText>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  mainView: {
    backgroundColor: design["Background_Secondary_Color"],
    paddingLeft: 8,
    paddingRight: 12,
    ...paddingVertical(20),
    marginBottom: 2,
  },
  topView: {
    flexDirection: "row",
  },
  middleView: {
    marginBottom: 16,
    marginTop: 7.5,
    marginLeft: 32,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: design["Background_Primary_Color"],
  },
  bottomView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  upgradeItemView: {
    flexDirection: "row",
  },
  itemImage: {
    width: 25,
    height: 25,
  },
  itemTitleView: {
    marginLeft: 7,
    marginRight: 15,
    flex: 1,
  },
  itemTitleText: {
    fontSize: 15,
  },
  itemDescriptionText: {
    fontSize: 13,
    fontFamily: PRIMARY,
    color: design["Text_Secondary_Color"],
  },
  upgradeTitleText: {
    fontSize: 13,
    fontFamily: PRIMARY_BOLD,
    marginBottom: 3,
  },
  titleView: {
    marginBottom: 11,
  },
  titleText: {
    fontSize: 15,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: PRIMARY,
    color: design["Text_Secondary_Color"],
  },
  subTotalTitle: {
    fontSize: 12,
    color: design["Text_Secondary_Color"],
    marginRight: 8,
  },
  subTotalPrice: {
    fontSize: 13,
    fontFamily: PRIMARY_EXTRABOLD,
  },
});

export default OrderListItemItem;
