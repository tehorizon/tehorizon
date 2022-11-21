import React, { memo, useEffect, useState } from "react";
import { View, TextInput, Switch, Pressable } from "react-native";
import { Header } from "@delivery/components";
import { BorderButton as Button, CustomText } from "@components";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import i18n from "@localization";
import Modal from "@HybridComponents/Modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalProps, ScreenTypes } from "../../interfaces";

const AddressDetailsComponent = ({
  address,
  specialInstructions,
  saveLocation,
  selectedTag,
  area_city,
  isModalVisible,
  deliveryDetails,
  navigation,
  // methods
  hideModalVisible,
  updateTagID,
  pushNewLocation,
  updateAddress,
  updateSI,
  toggleSaveLocation,
}: ScreenTypes.locationDetails) => {
  return (
    <SafeAreaView style={styles.mainView} edges={["bottom"]}>
      <CustomModal
        isModalVisible={isModalVisible}
        hideModalVisible={hideModalVisible}
        currentValue={selectedTag?.tag_name || ""}
      />
      <Header navigation={navigation} title={"Add_a_new_location"} />
      <KeyboardAwareScrollView
        style={styles.mainView}
        contentContainerStyle={styles.contentConatinerStyle}
      >
        <View style={styles.inputsView}>
          <CustomText style={styles.headText}>
            {i18n.t("Complete_Address")}
          </CustomText>
          <TextInput
            returnKeyType="done"
            onChangeText={updateAddress}
            value={address}
            placeholder={i18n.t("Apt_Office_Villa_No")}
            style={styles.input}
          />
          <CustomText style={styles.addressText}>{area_city}</CustomText>
          <CustomText style={styles.headText}>
            {i18n.t("Special_Instructions")}
          </CustomText>
          <TextInput
            returnKeyType="done"
            onChangeText={updateSI}
            value={specialInstructions}
            placeholder={i18n.t("Present_ID_at_reception")}
            style={styles.input}
          />
          <View style={styles.locationView}>
            <CustomText style={styles.headText}>
              {i18n.t("Save_this_location?")}
            </CustomText>
            <Switch onValueChange={toggleSaveLocation} value={saveLocation} />
          </View>
          {saveLocation && (
            <View style={styles.suggestionView}>
              {deliveryDetails?.location_tags.map((item: any) => (
                <Pressable
                  key={item?.tag_name}
                  style={[
                    styles.itemView,
                    selectedTag?.tag_id == item?.tag_id &&
                      styles.selectedItemView,
                  ]}
                  onPress={() => updateTagID(item)}
                >
                  <CustomText
                    style={[
                      styles.itemText,
                      selectedTag?.tag_id == item?.tag_id &&
                        styles.selectedItem,
                    ]}
                  >
                    {item?.tag_name || ""}
                  </CustomText>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        <Button
          title={i18n.t("DONE")}
          onPress={pushNewLocation}
          style={styles.pushNewLocationButton}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const CustomModal = memo(
  ({ isModalVisible, hideModalVisible, currentValue }: ModalProps) => {
    const [customLocation, updateCustomLocation] = useState("");
    /**
     * set current value from tag, as user might cancel changes
     */
    useEffect(() => {
      isModalVisible &&
        updateCustomLocation(currentValue == "Other" ? "" : currentValue);
    }, [isModalVisible]);

    return (
      <Modal
        isVisible={isModalVisible}
        backdropColor="rgba(0,0,0,.8)"
        backdropOpacity={0.8}
        swipeDirection={["up", "down"]}
        onSwipeComplete={() => hideModalVisible()}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={styles.mainModalView}>
          <CustomText style={styles.modalHeadText}>
            {i18n.t("Add_Name")}
          </CustomText>
          <CustomText style={styles.modalText}>
            {i18n.t("Enter_Details")}
          </CustomText>
          <TextInput
            returnKeyType="done"
            onChangeText={updateCustomLocation}
            value={customLocation}
            placeholder={i18n.t("Name")}
            style={styles.modalInput}
          />
          <Button
            title={i18n.t("DONE")}
            style={styles.doneButtonStyle}
            onPress={() => hideModalVisible(customLocation)}
          />
          <CustomText
            style={styles.cancelText}
            onPress={() => hideModalVisible()}
          >
            {i18n.t("Cancel")}
          </CustomText>
        </View>
      </Modal>
    );
  }
);
export default AddressDetailsComponent;
