import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text/Text";
import { Entypo } from "@expo/vector-icons";
import { design } from "rn_fast_track_uilib";
import { PRIMARY } from "@fonts";

interface propsInterface {
  name: string;
  isRTL: any;
  i18n: any;
  handleClick: () => void;
}

const dineInOffersBar = (props: propsInterface) => {
  const { name, handleClick, isRTL, i18n } = props;
  return (
    <View style={styles.parent}>
      <Text isRTL={isRTL} style={styles.locationText}>
        {name}
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.dineOffers}
        onPress={() => handleClick()}
      >
        <Text isRTL={isRTL} style={styles.otherLocationText}>
          {i18n.t("VIEW_DINE_IN_OFFERS")}
        </Text>

        <Entypo
          style={{ marginTop: 2, marginEnd: 5 }}
          name="chevron-right"
          size={20}
          color={design["Text_Secondary_Color"]}
          onPress={() => {}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingStart: 10,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 15,
  },
  dineOffers: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingStart: 10,
    justifyContent: "center",
    backgroundColor: "white",
  },
  locationText: {
    flex: 1,
    fontFamily: PRIMARY,
    fontSize: 13,
    fontStyle: "normal",
    color: design["Text_Secondary_Color"],
  },
  otherLocationText: {
    fontFamily: PRIMARY,
    fontSize: 12,
    fontStyle: "normal",
    letterSpacing: 0,
    color: design["Text_Primary_Color"],
  },
});

export default dineInOffersBar;
