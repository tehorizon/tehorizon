import React from "react";
import { View, StyleSheet, StyleProp, Pressable } from "react-native";
import Text from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import { AntDesign } from "@expo/vector-icons";
import { PRIMARY_BOLD } from "@fonts";
import { marginHorizontal, paddingVertical } from "@utils/genericStyles";
import Image from "@HybridComponents/Image";
import { Merchant } from "@Outlet/interfaces/responses";
import inactive_indicator from "@assets/images/inactive_indicator.png";
import { getFlipForRTLStyle } from "@localization";
import Cuisine from "../Cuisines";
import { Redeemability } from "@commons/constants/constants";
import { outletItemInterface } from "@Outlet/BL/Interfaces";
import { getDistance } from "@utils/functions";

type outlet = {
  key?: string;
  favouriteList: any;
  item: outletItemInterface;
  onClick: (arg: outletItemInterface, arg1?: any) => void;
  locationName?: string;
  isRTL?: boolean;
  containerStyle?: StyleProp<any>;
  distanContainerStyle?: StyleProp<any>;
};

const Outlet = ({
  favouriteList,
  item,
  key,
  onClick,
  locationName,
  containerStyle,
  distanContainerStyle,
}: outlet) => {
  return (
    <Pressable
      key={key}
      testID="select_outlet_item"
      onPress={() => onClick(item, locationName)}
      style={[styles.mainView, containerStyle]}
    >
      <Image
        style={[styles.listItemLogo, getFlipForRTLStyle()]}
        source={{ uri: item?.merchant?.logo_url }}
      />
      <View style={styles.listItemTextParent}>
        <Text style={styles.listItemText} numberOfLines={1}>
          {item?.merchant?.name}
        </Text>
        <Text numberOfLines={1} style={styles.outletName}>
          {item?.name}
        </Text>
        <Cuisine
          array={item?.attributes}
          index="value"
          color={design["Text_Secondary_Color"]}
        />
      </View>
      <View style={styles.rightComponent}>
        {favouriteList && item?.id >= 0 && favouriteList[item?.id] ? (
          <Image
            style={styles.listItemFavLogo}
            source={require("@assets/images/favourites-filled.png")}
            resizeMode="contain"
          />
        ) : (
          <View />
        )}
        {item?.distance > 0 && (
          <View style={[styles.distanceView, distanContainerStyle]}>
            <Text numberOfLines={1} style={styles.distance}>
              {`${getDistance(item.distance)}`}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.loackedImage}>
        {item?.top_offer_redeemability == Redeemability.NON_REDEEMABLE && (
          <Locked />
        )}
      </View>
    </Pressable>
  );
};

export default Outlet;
const Locked = () => <Image source={inactive_indicator} style={styles.icon} />;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    backgroundColor: design["Background_Primary_Color"] || "white",
    ...marginHorizontal(16),
    ...paddingVertical(15.5),
  },
  listItemLogo: {
    height: 80,
    width: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: design.Border_Color,
  },
  listItemTextParent: {
    paddingStart: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  listItemText: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: design["List_Title_Primary_Color"],
  },
  outletName: {
    fontSize: 14,
    color: design["List_Title_Primary_Color"],
  },
  listItemFavLogo: {
    height: 19.94,
    width: 21.49,
  },
  rightComponent: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  distanceView: {
    alignItems: "center",
    justifyContent: "center",
  },
  distance: {
    fontSize: 10,
    color: design.List_Subtitle_Color,
  },
  icon: {
    height: 40,
    width: 40,
  },
  loackedImage: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
