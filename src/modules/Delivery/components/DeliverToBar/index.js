import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { CustomText as Text } from "@fast_track/src/components";
import { checkIsDeliveryInRegion } from "@delivery/helpers/LocationHelpers";
import { PRIMARY_BOLD, PRIMARY } from "@fonts";
import { padding } from "@utils/genericStyles";
import I18n from "@localization";
import { useAppSelector } from "@redux/root-reducer";

let deliveryInfo = {
  deliveryRules: null,
  localZoneId: null,
};

const DeliverToBar = (props) => {
  let selectedDeliverToLocation = useAppSelector(
    (state) =>
      state.deliveryDetailReducer?.deliveryDetails?.selectedDeliverToLocation
  );
  const { deliveryRegions, deliveryRegion, navigation, outlet } = props;

  const [unableToDeliver, setUnableToDeliver] = useState(false);

  const getIsDeliveryInRegion = (from = "") => {
    const currentLocation = {
      latitude: selectedDeliverToLocation
        ? selectedDeliverToLocation.latitude
        : 0,
      longitude: selectedDeliverToLocation
        ? selectedDeliverToLocation.longitude
        : 0,
    };
    return checkIsDeliveryInRegion(
      currentLocation,
      deliveryRegion,
      deliveryRegions,
      deliveryInfo
    );
  };

  const handleChecks = () => {
    // const takeAwayEnabled = outlet.outletInfo.isTakeAwayEnabled;
    const isOpen = outlet.is_open;
    // const isLastMileDelivery = outlet.outletInfo.isLastMile;
    // const lastMileDeliveryMessage = outlet.outletInfo.lastMileDeliveryMessage;
    const isInDeliveryRegion = getIsDeliveryInRegion();
    // alert(isInDeliveryRegion)

    //dispatch({type:deliveryActionTypes.SET_DELIVERY_INFO,data:deliveryInfo})
    let check = false;
    if (!isOpen) {
      check = true;
    } else if (!isInDeliveryRegion) {
      check = true;
    }

    setUnableToDeliver(check);

    // if (isOpen && takeAwayEnabled) {
    //   //dont show
    //   return null;
    // } else if (!isOpen && takeAwayEnabled) {
    //   //show
    //   return t('offline_takeaway');
    // } else if (
    //   isOpen &&
    //   isLastMileDelivery &&
    //   lastMileDeliveryMessage.trim().length > 0
    // ) {
    //   //show
    //   return lastMileDeliveryMessage;
    // } else if (isOpen && isLastMileDelivery) {
    //   //dont show
    //   return null;
    // } else if (isOpen && isLastMileDelivery && !isInDeliveryRegion) {
    //   //show

    //   return t('unable_to_deliver');
    // } else if (isOpen && !isLastMileDelivery && isInDeliveryRegion) {
    //   //don't show
    //   return null;
    // } else {
    //   //show
    //   return t('unable_to_deliver');
    // }
  };

  useEffect(() => {
    //handle delivery regions
    handleChecks();
  }, [selectedDeliverToLocation]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("LocationPickerMap");
      }}
    >
      <View style={styles.row}>
        <Text style={styles.text}>{I18n.t("Deliver_to")}</Text>
        <View style={styles.locationBar}>
          <EvilIcons name="location" size={20} color="black" />
          <Text style={{ flex: 1 }}>
            {selectedDeliverToLocation?.title ||
              selectedDeliverToLocation?.home_office_address ||
              "Location"}
          </Text>
          <AntDesign name="caretdown" size={15} color="grey" />
        </View>
      </View>
      {unableToDeliver ? (
        <View style={styles.sorryView}>
          <Text style={styles.sorry_text}>
            {I18n.t("Sorry_this_outlet_is_unable_to_deliver")}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default DeliverToBar;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 80,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    ...padding(10),
    backgroundColor: design["Primary_Color"],
  },
  row: {
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
  },
  text: {
    paddingRight: 5,
    color: design.Text_Tertiary_Color,
    fontFamily: PRIMARY_BOLD,
  },
  locationBar: {
    flex: 1,
    backgroundColor: design.Background_Secondary_Color,
    height: 35,
    alignItems: "center",
    flexDirection: "row",
    ...padding(5),
  },
  sorryView: {
    marginTop: 7,
  },
  sorry_text: {
    textAlign: "center",
    fontFamily: PRIMARY,
    color: "white",
  },
});
