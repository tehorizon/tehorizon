import React from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Portal } from "react-native-paper";
import i18n from "@localization";
import { design } from "rn_fast_track_uilib";

//images
import icExclamation from "@assets/images/icExclamation.png";

import { CustomText } from "@components";
import { PRIMARY } from "@fonts";
import { paddingHorizontal, paddingVertical } from "@utils/genericStyles";

const CancelModal = (props) => {
  //props
  const { hide, onCancel } = props;

  return (
    <Portal>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.sureImg} source={icExclamation} />
          <CustomText style={styles.sureText}>
            {i18n.t("Cancel_Order_Title")}
          </CustomText>

          <CustomText style={styles.sureText}>
            {i18n.t("Cancel_Order_Description")}
          </CustomText>

          <TouchableOpacity
            onPress={() => onCancel()}
            style={[
              styles.button,
              { backgroundColor: design["Primary_Color"] },
            ]}
          >
            <CustomText
              style={{
                color: design["Text_Tertiary_Color"],
                fontSize: 19,
                fontFamily: PRIMARY,
              }}
            >
              {i18n.t("CONTINUE")}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => hide()} style={styles.button}>
            <CustomText
              style={{
                color: design["Primary_Color"],
                fontSize: 17,
                fontFamily: PRIMARY,
              }}
            >
              {i18n.t("Cancel")}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Portal>
  );
};

export default CancelModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    backgroundColor: design["Background_Secondary_Color"],
    ...paddingHorizontal(36),
    ...paddingVertical(30),
    alignItems: "center",
    width: "90%",
    borderRadius: 4,
  },
  sureImg: {
    width: 42,
    height: 37,
    resizeMode: "contain",
  },
  sureText: {
    textAlign: "center",
    marginTop: 15,
    color: design["Text_Color"],
    fontFamily: PRIMARY,
    fontSize: 13,
  },
  button: {
    marginTop: 22,
    height: 36,
    borderRadius: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
