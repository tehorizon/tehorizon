import React from "react";

import Text from "../Text/Text";

import { View, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import { borderColor, marginHorizontal } from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import Image from "@HybridComponents/Image";
import i18n from "@localization";

const Empty = () => {
  return (
    <View style={fav_styles.emptyParent}>
      <Image
        resizeMode="contain"
        style={fav_styles.image}
        source={require("@assets/images/sad_icon.png")}
      />
      <Text style={fav_styles.noFav}>{i18n.t("NO_FAV")}</Text>
      <Text style={fav_styles.favExplain}>{i18n.t("FAV_EXPLAIN")}</Text>
    </View>
  );
};

const fav_styles = StyleSheet.create({
  emptyParent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 209,
    // backgroundColor: design["Background_Primary_Color"],
    // backgroundColor: "red",
  },
  image: {
    height: 66,
    width: 66,
  },
  noFav: {
    fontSize: 17,
    marginTop: 24,
    textAlign: "justify",
    fontFamily: PRIMARY_BOLD,
    lineHeight: 24,
    color: design["Header_Title_Primary_Color"],
    letterSpacing: 1,
  },
  favExplain: {
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
    fontFamily: PRIMARY,
    color: design["Header_Title_Primary_Color"],
    // ...marginHorizontal(60),
  },
  listItemParent: {
    borderBottomWidth: 0.5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    height: 65,
    backgroundColor: "white",
    alignItems: "center",
    paddingStart: 15,
    borderBottomWidth: 0.5,
    ...borderColor("grey"),
  },
  listItemLogo: {
    height: 40,
    width: 40,
  },
  listItemTextParent: {
    paddingStart: 15,
    paddingTop: 10,
    flexDirection: "column",
    flex: 1,
  },
  listItemText: {
    color: design["List_Title_Primary_Color"],
    flex: 1,
    fontFamily: PRIMARY_BOLD,
  },
  listItemFavLogo: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 30,
    width: 30,
  },
});

export default Empty;
