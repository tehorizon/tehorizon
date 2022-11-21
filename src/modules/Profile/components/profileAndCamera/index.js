import React, { Component, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from "react-native";
import profileDummyImage from "../../images/profilepic_placeholder.gif";
import cameraimage from "../../images/camera-icon.png";
import * as ImageManipulator from "expo-image-manipulator";
import i18n, { getFlipForRTLStyle } from "@localization";
import { design } from "rn_fast_track_uilib";
import * as ImagePicker from "expo-image-picker";
import ActionSheet from "react-native-actionsheet";

import { TextLabel } from "@components";
import { borderColor, borderWidth } from "@utils/genericStyles";
import { PRIMARY } from "@fast_track/src/commons/fonts";
import Image from "@HybridComponents/Image";

function Index(props) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [
    mediaPermisssionStatus = status,
    requestMediaLibrayPermission = requestPermission,
  ] = ImagePicker.useMediaLibraryPermissions();

  const actionSheetRef = useRef();
  const onSetImageHandler = (file) => {
    props.onCameraClick(file);
  };

  const _pickCamera = async () => {
    try {
      if (status !== "granted") {
        const permission = await requestPermission();
        if (!permission.granted) {
          Alert.alert(
            "",
            i18n.t(
              "Turn_on_Camera_permission_from_Settings_to_allow_app_to_access_your_Camera"
            ),
            [
              {
                text: i18n.t("Settings"),
                onPress: () => Linking.openURL("app-settings:"),
              },
              { text: i18n.t("Cancel"), onPress: () => {} },
            ],
            { cancelable: false }
          );
          return;
        }
      }
    } catch (error) {}

    try {
      if (Platform.OS !== "web") {
        const { openCamera } = require("react-native-image-crop-picker");
        const result = await openCamera({
          cropping: true,
          mediaType: "photo",
          quality: 1,
        });
        if (result) {
          const compressedImage = await ImageManipulator.manipulateAsync(
            result.path,
            [{ resize: { width: 600 } }],
            { compress: 0.7 }
          );
          onSetImageHandler(compressedImage);
        }
      } else {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
        if (!result.cancelled) {
          const compressedImage = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 600 } }],
            { compress: 0.7 }
          );
          onSetImageHandler(compressedImage);
        }
      }
    } catch (E) {
      console.log(E);
    }
  };

  const _pickImage = async () => {
    try {
      if (mediaPermisssionStatus !== "granted") {
        const permission = await requestMediaLibrayPermission();

        if (!permission.granted) {
          alert(
            i18n.t("Sorry_we_need_camera_roll_permissions_to_make_this_work")
          );
          return;
        }
      }
    } catch (error) {}

    try {
      if (Platform.OS !== "web") {
        const { openPicker } = require("react-native-image-crop-picker");

        const result = await openPicker({
          cropping: true,
          mediaType: "photo",
        });
        if (result) {
          const compressedImage = await ImageManipulator.manipulateAsync(
            result.path,
            [{ resize: { width: 600 } }],
            { compress: 0.7 }
          );
          onSetImageHandler(compressedImage);
        }
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
        if (!result.cancelled) {
          const compressedImage = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 600 } }],
            { compress: 0.7 }
          );
          onSetImageHandler(compressedImage);
        }
      }
    } catch (E) {
      console.log(E);
    }
  };

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const onPressActionSheetHandler = (index) => {
    switch (index) {
      case 0:
        props.makeAnalyticsStack(
          "My Profile",
          "click_camera",
          "",
          "",
          "",
          props.location_id,
          false
        );
        _pickCamera();
        break;

      case 1:
        props.makeAnalyticsStack(
          "My Profile",
          "click_gallery",
          "",
          "",
          "",
          props.location_id,
          false
        );
        _pickImage();
        break;
      case 1:
        props.makeAnalyticsStack(
          "My Profile",
          "click_gallery",
          "",
          "",
          "",
          props.location_id,
          false
        );
        _pickImage();
        break;
      case 2:
        console.log(index, "index");
        props.makeAnalyticsStack(
          "My Profile",
          "click_cancel",
          "",
          "",
          "",
          props.location_id,
          false
        );
        break;
    }
  };

  const { user } = props;
  return (
    <View style={[styles.container]}>
      <View style={[styles.imageWrapper, getFlipForRTLStyle()]}>
        <Image
          source={
            user?.profile_image === ""
              ? profileDummyImage
              : { uri: user?.profile_image }
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.containerWrapper}>
        <View style={[styles.textView, getFlipForRTLStyle()]}>
          <TextLabel style={styles.name}>
            {user?.firstname + " " + user?.lastname}
          </TextLabel>
          <TextLabel
            style={{
              fontFamily: PRIMARY,
            }}
          >
            {user?.email}
          </TextLabel>
        </View>

        <View style={styles.camera}>
          <TouchableOpacity
            testID="cameraIcon"
            onPress={() => {
              showActionSheet();
              props.makeAnalyticsStack(
                "My Profile",
                "click_pic_edit",
                "",
                "",
                "",
                props.location_id,
                false
              );
            }}
          >
            <Image
              source={cameraimage}
              style={styles.cameraIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ActionSheet
        testID="actionSheet"
        ref={actionSheetRef}
        title={i18n.t("Update_Profile_Image")}
        options={[i18n.t("Camera"), i18n.t("Gallery"), i18n.t("Cancel")]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={onPressActionSheetHandler}
      />
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: design.Background_Primary_Color
      ? design.Background_Primary_Color
      : "rgb(240, 240, 240)",
  },
  imageWrapper: {
    marginTop: 40,
    alignSelf: "center",
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 130 / 2,
    ...borderColor("white"),
    ...borderWidth(2),
    resizeMode: "cover",
    backgroundColor: "lightgrey",
  },
  camera: {
    height: 40,
    width: 40,
    position: "absolute",
    right: 20,
    top: 20,
  },
  textView: {
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cameraIcon: {
    height: 40,
    width: 40,
    tintColor: design.Header_Icon_Color,
  },
  name: {
    paddingBottom: 10,
    fontSize: 18,
    lineHeight: 20,
    fontFamily: PRIMARY,
  },
  containerWrapper: {},
});
