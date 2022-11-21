import React from "react";
import Text from "../Text/Text";
import { View, StyleSheet, ImageProps } from "react-native";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD, PRIMARY } from "@fonts";
import { padding } from "@utils/genericStyles";
import Image from "@HybridComponents/Image";
import i18n from "@localization";

const Empty = ({
  title,
  image,
  bodyText = "",
}: {
  title: string;
  image: ImageProps;
  bodyText: string;
}) => {
  return (
    <View style={styles.emptyParent}>
      <View style={styles.headerView}>
        <Image source={image} style={styles.headerIcon} resizeMode="contain" />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.savings}>{"0"}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Image
          source={require("@assets/images/sad_icon.png")}
          style={styles.sad_icon}
          resizeMode="contain"
        />
        <Text style={styles.noResultText}>
          {i18n.t("You_havent_done_anything_yet")}
        </Text>
        <Text style={styles.subTitle}>{bodyText}</Text>
      </View>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  emptyParent: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"],
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    ...padding(16),
    backgroundColor: design.Primary_Color_Light,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    alignSelf: "flex-start",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sad_icon: {
    width: 66,
    height: 66,
  },
  noResultText: {
    fontSize: 17,
    marginTop: 24,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: "justify",
    fontFamily: PRIMARY_BOLD,
    color: design["Header_Title_Primary_Color"],
  },
  subTitle: {
    width: 216,
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
    fontFamily: PRIMARY,
    color: design["Header_Title_Primary_Color"],
  },
  savings: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 28,
    color: design["Primary_Color"],
  },
  title: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 17,
    color: design["Primary_Color"],
  },
});
