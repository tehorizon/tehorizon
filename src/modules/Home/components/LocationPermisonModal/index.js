import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import i18n from "@localization";
import { Portal } from "react-native-paper";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
export default (props) => {
  const isWeb = Platform.OS === "web";
  const locationText = isWeb
    ? i18n.t("please_goto_setting_and_on_location_permission_manual_web")
    : i18n.t("please_goto_setting_and_on_location_permission_manual");
  return (
    <Portal>
      <View style={styles.locationPermissionModal}>
        <View style={styles.locationPermissionModalBox}>
          <Text style={styles.locationPermissionModalTitle}>
            {i18n.t("No_Location_Permission")}
          </Text>
          <Text style={styles.locationPermissionModalMessage}>
            {locationText}
          </Text>
          <View style={styles.locationPermissionModalLine} />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.locationPermissionModalBtns}
              onPress={props.onCancelCallback}
            >
              <Text style={styles.locationPermissionModalBtnsTxt}>
                {i18n.t("Cancel")}
              </Text>
            </TouchableOpacity>
            {!isWeb && (
              <>
                <View style={styles.locationPermissionModalBtnsLine} />
                <TouchableOpacity
                  style={styles.locationPermissionModalBtns}
                  onPress={props.onAllowCallback}
                >
                  <Text style={styles.locationPermissionModalBtnsTxt}>
                    {i18n.t("Allow")}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  locationPermissionModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    ...StyleSheet.absoluteFillObject,
  },
  locationPermissionModalBox: {
    backgroundColor: "white",
    width: "85%",
    paddingTop: 20,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 20,
  },
  locationPermissionModalTitle: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    color: "black",
    paddingLeft: 20,
    paddingRight: 20,
  },
  locationPermissionModalMessage: {
    fontFamily: PRIMARY,
    fontSize: 13,
    color: "black",
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  locationPermissionModalLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#cccccc",
    marginTop: 20,
  },
  locationPermissionModalBtnsLine: {
    height: 45,
    width: 1,
    backgroundColor: "#cccccc",
  },
  locationPermissionModalBtns: {
    width: 160,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  locationPermissionModalBtnsTxt: {
    fontFamily: PRIMARY,
    fontSize: 15,
    color: "black",
    textAlignVertical: "center",
  },
});
