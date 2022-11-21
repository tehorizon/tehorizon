import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CustomText } from "@components";
import { design } from "rn_fast_track_uilib";
import { PRIMARY, PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import {
  marginVertical,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import Image, { ImageBackground } from "@HybridComponents/Image";
import i18n from "@localization";
import LocationOff from "../LocationOff";
import { useAppSelector } from "@redux/root-reducer";
import { ActivityIndicator } from "react-native-paper";
import { outletItemInterface } from "@Outlet/BL/Interfaces";
import { getDistance } from "@utils/functions";
const { width } = Dimensions.get("window");

const Nearest = React.memo((props: any) => {
  let nearestOffers = useAppSelector(
    (state) => state?.homeReducer?.nearestOffers || []
  );

  const {
    featured_sections,
    onOfferClickHandler,
    title,
    showAll,
    locationGranted = false,
    allowLocation,
    testID = "nearest",
  } = props;

  const listEmptyComponent = memo(() => (
    <View style={styles.emptyView}>
      <ActivityIndicator size="large" color={design.Primary_Color} />
    </View>
  ));
  const _renderItem = ({ item }: { item: outletItemInterface }) => {
    return (
      <TouchableOpacity
        testID={testID}
        onPress={() => onOfferClickHandler(item)}
        activeOpacity={1}
      >
        <View>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: item?.merchant?.photo_url,
            }}
            style={styles.tile}
          >
            {item.distance > 0 && (
              <View style={styles.outletDistance}>
                <CustomText style={styles.outletDistanceText}>
                  {`${getDistance(item.distance)}`}
                </CustomText>
              </View>
            )}
          </ImageBackground>
          <View
            style={{
              justifyContent: "center",
              ...paddingVertical(12),
              // height: 50,
            }}
          >
            <CustomText style={styles.outletName}>
              {`${item?.merchant?.name || ""}`}
            </CustomText>
            {item.human_location !== "" && (
              <CustomText style={styles.outletLocation}>
                {`${item.name}, ${item.human_location}`}
              </CustomText>
            )}

            {item?.attributes?.length > 0 && (
              <CustomText numberOfLines={1} style={styles.outletLocation}>
                {item?.attributes.map((e: any, i: number) => (
                  <CustomText key={i}>
                    {i ? ` • ` : ""}
                    {`${e.value}`}
                  </CustomText>
                ))}
              </CustomText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.carousel,
        {
          backgroundColor: featured_sections?.section_bg_color
            ? `#${featured_sections?.section_bg_color}`
            : design["Background_Primary_Color"],
        },
      ]}
    >
      <View style={styles.headerView}>
        <View style={styles.row}>
          <CustomText
            style={[
              styles.offersText,
              {
                color: featured_sections?.section_title_color
                  ? `#${featured_sections?.section_title_color}`
                  : design["Text_Primary_Color"],
              },
            ]}
          >
            {title}
          </CustomText>
          <Image
            resizeMode="contain"
            source={require("@assets/images/nearest_loaction_pin.png")}
            style={styles.pin_icon}
          />
        </View>
        {showAll && locationGranted && (
          <CustomText style={styles.showAllText} onPress={showAll}>
            {i18n.t("Show all")}
          </CustomText>
        )}
      </View>

      <View style={styles.subView}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 55}
          decelerationRate="fast"
          bounces={false}
          data={nearestOffers}
          ListEmptyComponent={listEmptyComponent}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {!locationGranted && <LocationOff onPress={allowLocation} />}
      </View>
    </View>
  );
});
export default Nearest;

const styles = StyleSheet.create({
  carousel: {
    // minHeight: 245,
    overflow: "hidden",
    ...paddingHorizontal(16),
  },
  subView: { minHeight: 245 },
  offersText: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...marginVertical(16),
  },
  showAllText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: PRIMARY_BOLD,
    textAlign: "center",
    color: design["Link_Color"],
    textDecorationLine: "underline",
  },
  tile: {
    height: 143,
    width: width - 55,
    marginRight: 5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  emptyView: {
    height: 143,
    width: width - 32,
    alignItems: "center",
    justifyContent: "center",
  },
  outletName: {
    fontSize: 15,
    lineHeight: 20,
    color: "#000000",
  },
  outletDistance: {
    backgroundColor: design.Background_Secondary_Color,
    marginRight: 8,
    marginBottom: 8,
    ...padding(7),
    borderRadius: 20,
  },
  outletDistanceText: {
    fontSize: 10,
  },
  outletLocation: {
    maxWidth: width - 70,
    fontFamily: PRIMARY,
    fontSize: 12,
    opacity: 0.6,
    ...marginVertical(4),
  },
  row: {
    flexDirection: "row",
  },
  pin_icon: {
    height: 22,
    width: 22,
    marginLeft: 8,
    alignSelf: "center",
  },
});
