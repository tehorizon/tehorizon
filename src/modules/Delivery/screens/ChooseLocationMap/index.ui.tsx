import { ScreenTypes } from "../../interfaces";
import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import styles from "./styles";
import { Header } from "@delivery/components";
import i18n from "@localization";
import Swipeout from "@HybridComponents/Swipeout";
import { AntDesign } from "@expo/vector-icons";
import Modal from "@HybridComponents/Modal";
import { design } from "rn_fast_track_uilib";

const ChooseLocationMap = ({
  navigation,
  swipeout,
  isModalVisible,
  deliveryDetails,
  currentOpenSwipe,
  gotoAddLocationScreen,
  onSwipeOpen,
  selectLocation,
  removeLocation,
  rightButtons,
  setModalVisibility,
}: ScreenTypes.chooseLocationMap) => {
  /**
   *
   * @param param0
   * @returns `Previouse Used Location View`
   */
  const _renderLocation = ({ item, index }: any) => (
    <Swipeout
      ref={(c) => (swipeout.current[index] = c)}
      style={styles.swipeable}
      right={rightButtons(index)}
      autoClose
      onOpen={() => onSwipeOpen(index)}
    >
      <TouchableOpacity
        onPress={() => selectLocation(item)}
        style={styles.itemView}
        activeOpacity={1}
      >
        <Text style={styles.itemTitle}>
          {item.title || item.home_office_address}
        </Text>
        <Text style={styles.itemDetails}>{item.area_city}</Text>
      </TouchableOpacity>
    </Swipeout>
  );

  /**
   *
   * @returns `Previous Used Location Header`
   */
  const _renderListHeader = () => (
    <View style={styles.mainHeadView}>
      <TouchableOpacity
        style={[styles.headerView, styles.marginBottom10]}
        activeOpacity={1}
        onPress={() => navigation.navigate("AddLocation")}
      >
        <AntDesign name="plus" size={20} color={design["Primary_Color"]} />
        <Text style={styles.headerText}>{i18n.t("Add_a_new_location")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerView}
        activeOpacity={1}
        onPress={gotoAddLocationScreen}
      >
        <Image
          source={require("@assets/images/ic_current_loc.png")}
          style={styles.locationIcon}
        />
        <Text style={styles.headerText}>
          {i18n.t("Delivered_to_my_current_location")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const _renderCustomLocationModal = () => (
    <Modal
      isVisible={isModalVisible}
      backdropColor="rgba(0,0,0,.8)"
      backdropOpacity={0.8}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={styles.mainModalView}>
        <View style={styles.modalSubView}>
          <Image
            style={styles.successImage}
            source={require("@assets/images/success.png")}
          />
          <Text style={styles.tagline}>{`${i18n.t(
            "Do You want to delete this"
          )}\n${
            deliveryDetails?.delivery_locations[currentOpenSwipe]?.title ||
            deliveryDetails?.delivery_locations[currentOpenSwipe]
              ?.home_office_address
          }?`}</Text>
          <TouchableOpacity onPress={removeLocation} style={styles.popupButton}>
            <Text style={styles.popupButtonText}>{i18n.t("Yes")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisibility(false)}
            style={styles.popupButton}
          >
            <Text style={styles.popupButtonText}>{i18n.t("No")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.mainView}>
      {_renderCustomLocationModal()}
      <Header navigation={navigation} title={"Delivery_Details"} />
      <FlatList
        stickyHeaderIndices={[0]}
        style={styles.list}
        ListHeaderComponent={_renderListHeader}
        data={deliveryDetails?.delivery_locations}
        renderItem={_renderLocation}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default ChooseLocationMap;
