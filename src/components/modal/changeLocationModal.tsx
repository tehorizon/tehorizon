import React, { memo } from "react";
import { View, FlatList, StyleSheet, Image, Pressable } from "react-native";
import Modal from "@HybridComponents/Modal";
import Text from "../Text/Text";
import i18n, { getFlipForRTLStyle } from "@localization";
import { PRIMARY_BOLD } from "@fonts";
import {
  borderColor,
  margin,
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import CustomSafeAreaView from "../SafeAreaView";
import { design } from "rn_fast_track_uilib";
import { getDistance } from "@utils/functions";
import { outletItemInterface } from "@Outlet/BL/Interfaces";

interface PROPS {
  outlets: outletItemInterface[];
  onDone: (arg: number) => void;
  disable: () => void;
  title: string;
  isVisible: boolean;
}
const ChangeLocation = (props: PROPS) => {
  const { isVisible, disable, title, outlets, onDone } = props;

  return (
    <Modal isVisible={isVisible} style={styles.mainView}>
      <CustomSafeAreaView
        style={[styles.safeAreaView, getFlipForRTLStyle()]}
        edges={["bottom"]}
      >
        <CustomSafeAreaView style={styles.subView} edges={["top"]}>
          <View style={styles.changeLocationHeader}>
            <Text style={styles.changeLocationHeaderText}>{title}</Text>
            <Text onPress={disable} style={styles.changeLocationDoneButton}>
              {i18n.t("Done")}
            </Text>
          </View>
          <View style={styles.changeLocationOutletsCount}>
            <Image
              source={require("@assets/icons/location-pin.png")}
              style={styles.pin}
            />
            <Text style={styles.changeLocationOutletsCountText}>
              {`${outlets?.length} ${i18n.t("locations")}`}
            </Text>
          </View>
        </CustomSafeAreaView>

        <FlatList
          style={styles.list}
          data={outlets}
          keyExtractor={(item, index) => item.name}
          //ref={(e) => (this.categoryList = e)}
          renderItem={(data) => <Location {...data} onDone={onDone} />}
        />
      </CustomSafeAreaView>
    </Modal>
  );
};

const Location = memo(
  ({
    index = 0,
    item,
    onDone = () => {},
  }: {
    index: number;
    item: outletItemInterface;
    onDone: Function;
  }) => (
    <Pressable
      onPress={() => {
        onDone(index);
      }}
      style={styles.locationView}
    >
      <Image
        source={require("@assets/icons/location-pin.png")}
        style={styles.pin}
      />
      <View style={styles.detailsView}>
        <Text style={styles.locationName}>{item?.name || ""}</Text>
        <Text style={styles.humanLocation}>{item?.human_location || ""}</Text>
      </View>
      {item?.distance > 0 && (
        <Text style={styles.distance}>{getDistance(item.distance)}</Text>
      )}
    </Pressable>
  )
);

const styles = StyleSheet.create({
  mainView: {
    ...margin(0),
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  changeLocationHeader: {
    alignItems: "center",
    justifyContent: "center",
    ...paddingHorizontal(16),
    ...marginVertical(24),
  },
  changeLocationHeaderText: {
    ...marginHorizontal(45),
    fontSize: 20,
    fontFamily: PRIMARY_BOLD,
    lineHeight: 25,
  },
  changeLocationOutletsCount: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    ...paddingVertical(10),
  },
  subView: {
    shadowOpacity: 0.1,
    backgroundColor: design.Background_Primary_Color,
    shadowRadius: 15,
    shadowOffset: { height: 5, width: 0 },
    elevation: 2,
  },
  changeLocationOutletsCountText: {
    fontSize: 13,
    fontFamily: PRIMARY_BOLD,
    lineHeight: 25,
    marginLeft: 7,
  },
  changeLocationDoneButton: {
    fontSize: 15,
    fontFamily: PRIMARY_BOLD,
    color: design.Primary_Color,
    position: "absolute",
    right: 16,
  },
  pin: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
    ...marginHorizontal(16),
    borderBottomWidth: 0.5,
    ...borderColor(design.Border_Color),
    ...paddingVertical(16),
  },
  detailsView: {
    flex: 1,
    ...marginHorizontal(8),
  },
  locationName: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 13,
    lineHeight: 25,
    marginBottom: 4,
  },
  humanLocation: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 13,
  },
  distance: {
    fontSize: 13,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
  },
  list: {
    paddingTop: 8,
  },
});

export default ChangeLocation;
