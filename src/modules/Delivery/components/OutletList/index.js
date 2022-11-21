import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { design } from "rn_fast_track_uilib";
import { Feather } from "@expo/vector-icons";
//redux
import { useDispatch } from "react-redux";
import { setSelectedOutlet } from "@delivery/redux/actions";

//images
import list_fav_icon from "@assets/images/list-fav-icon.png";

import { CustomText } from "@components";
import { marginHorizontal, paddingVertical } from "@utils/genericStyles";
import Image from "@HybridComponents/Image";
import { PRIMARY } from "@fast_track/src/commons/fonts";
import { useAppSelector } from "@redux/root-reducer";

export default OutletList = (props) => {
  const { navigation, outlet } = props;

  const dispatch = useDispatch();

  let LocationList = useAppSelector(
    (state) => state.locationReducer?.LocationList
  );
  let locationIndex = useAppSelector(
    (state) => state.locationReducer?.locationIndex
  );
  let productLocation =
    LocationList?.length > 0 && locationIndex >= 0
      ? LocationList[locationIndex]
      : null;
  const userInfo = useAppSelector((state) => state?.userReducer?.userInfo);

  const merchantFavouriteList = useAppSelector(
    (state) => state?.outletReducer?.favouriteList
  );

  const locationName = productLocation?.name;
  const userId = userInfo.userId;
  let favouriteList = merchantFavouriteList;
  let favourite = false;
  if (
    favouriteList &&
    favouriteList[userId] &&
    favouriteList[userId][locationName] &&
    favouriteList[userId][productLocation.name][outlet?.merchant?.id]
  ) {
    favourite = true;
  }

  const Favourite = () => {
    return (
      <View>
        <Image source={list_fav_icon} style={{ height: 40, width: 40 }} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setSelectedOutlet(outlet));
        navigation.navigate("DeliveryOutletDetail", {
          itemId: 9,
          outletParams: outlet,
          favourite: favourite,
        });
      }}
      activeOpacity={1}
      style={styles.container}
    >
      <View style={{ position: "absolute", top: 0, right: 0 }}>
        {favourite ? <Favourite /> : null}
      </View>
      <Image
        style={styles.imagePlaceholder}
        source={{ uri: outlet?.merchant?.logo_small_url }}
      />
      <View style={styles.textContainer}>
        <CustomText style={styles.outletName}>
          {outlet?.merchant?.name}
        </CustomText>
        <CustomText style={styles.location}>{outlet?.name}</CustomText>
        <View style={styles.rightArrow}>
          <Feather
            color={design["Primary_Color"]}
            name="chevron-right"
            size={16}
          />
        </View>
        <CustomText
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.distance}
        >
          {outlet?.cuisine_distance}
        </CustomText>
        <View style={styles.timeContainer}>
          <CustomText style={styles.minutes}>
            {outlet?.default_delivery_time} mins
          </CustomText>
          <View style={styles.timeLocationContair}>
            <View
              style={[
                styles.isLiveTracking,
                {
                  backgroundColor: outlet?.is_open
                    ? "rgb(130, 213, 0)"
                    : "rgb(217, 39, 3)",
                },
              ]}
            ></View>
            <CustomText style={styles.time}>{outlet.opening_hours}</CustomText>
          </View>
        </View>
        {outlet?.is_open && (
          <View style={[styles.timeLocationContair, { marginTop: 5 }]}>
            <View
              style={[
                styles.isLiveTracking,
                {
                  backgroundColor: outlet?.is_open
                    ? "rgb(130, 213, 0)"
                    : "rgb(217, 39, 3)",
                },
              ]}
            ></View>
            <CustomText style={styles.time}>Live Tracking</CustomText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    ...paddingVertical(16),
    ...marginHorizontal(6.3),
    marginBottom: 8.7,
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    ...marginHorizontal(13.3),
  },
  clock: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
  },
  outletName: {
    fontSize: 14,
    fontFamily: PRIMARY,
    color: design.Text_Primary_Color,
  },
  rightArrow: {
    position: "absolute",
    top: "35%",
    right: 7,
  },
  location: {
    fontSize: 11,
    marginTop: 3,
    fontFamily: PRIMARY,
    color: design.Text_Secondary_Color,
  },
  distance: {
    fontSize: 11,
    fontFamily: PRIMARY,
    color: design["DISABLED_COLOR"],
    marginTop: 7.7,
    marginRight: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  minutesContainer: {
    flexDirection: "row",
  },
  minutes: {
    fontSize: 12,
    fontFamily: PRIMARY,
    color: design.Text_Secondary_Color,
  },
  time: {
    fontSize: 12,
    fontFamily: PRIMARY,
    color: design.Text_Secondary_Color,
    marginRight: 9.7,
  },
  isLiveTracking: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  timeLocationContair: {
    flexDirection: "row",
    alignItems: "center",
  },
});
