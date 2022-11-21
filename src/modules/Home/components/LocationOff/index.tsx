import React from "react";
import { View, StyleSheet, Image } from "react-native";
import i18n from "@localization";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import Button from "@components/Button";
import { CustomText } from "@components";
import { borderWidth, marginHorizontal, padding } from "@utils/genericStyles";
import { design } from "rn_fast_track_uilib";

export default ({ onPress = null }) => (
  <View style={styles.locationPermissionModal}>
    <View style={styles.locationPermissionModalBox}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <CustomText style={styles.locationPermissionModalTitle}>
            {i18n.t("Explore_all_greate_offers_near_you")}
          </CustomText>
          <CustomText
            numberOfLines={3}
            style={styles.locationPermissionModalMessage}
          >
            {i18n.t("We_use_your_location_to_serve_the_top_offers_around_you")}
          </CustomText>
        </View>

        <View style={styles.imageView}>
          <Image
            style={styles.mapImage}
            source={require("@assets/images/map_img.png")}
          />
        </View>
      </View>
      <Button title={i18n.t("Allow Location")} onPress={onPress} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  locationPermissionModal: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    backgroundColor: "rgba(255, 255, 255,0.8)",
    position: "absolute",
  },
  locationPermissionModalBox: {
    backgroundColor: design.Background_Secondary_Color,
    ...marginHorizontal(6),
    ...padding(13),
    borderRadius: 16,
    ...borderWidth(2),
    borderColor: design.Border_Color,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  locationPermissionModalTitle: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    lineHeight: 20,
    color: design.Text_Primary_Color,
  },
  locationPermissionModalMessage: {
    fontFamily: PRIMARY,
    fontSize: 13,
    lineHeight: 18,
    color: design.Text_Primary_Color,
    marginTop: 10,
  },
  imageView: {
    height: 105,
    width: 105,
    borderRadius: 52.5,
    backgroundColor: "black",
    overflow: "hidden",
  },
  mapImage: { width: 105, height: 105 },
});
