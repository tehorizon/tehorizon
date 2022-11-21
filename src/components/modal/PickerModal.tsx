import React, { ReactElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Text from "../Text/Text";
import Modal from "@HybridComponents/Modal";
import BorderButton from "../Buttons/BorderButton";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";
import I18n, { getFlipForRTLStyle } from "@localization";
import {
  marginHorizontal,
  paddingHorizontal,
} from "@fast_track/src/utils/genericStyles";
import { SCREEN_WIDTH } from "@fast_track/src/commons/constants/constants";

const PickerModal = ({
  isVisible,
  title,
  handleDone,
  children,
}: {
  isVisible: boolean;
  title: string;
  handleDone: () => void;
  children: ReactElement;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.5}
      style={Platform.OS == "web" && styles.modal}
    >
      <View
        testID="select_country_modal"
        style={[styles.cmParent, getFlipForRTLStyle()]}
      >
        <View style={styles.cmHeader}>
          <Text style={styles.cmHeaderText}>{title}</Text>
        </View>

        <View style={{ flex: 1 }}>{children}</View>

        <View style={styles.cmFooterParent}>
          <BorderButton
            testID="picker_done"
            style={styles.doneButton}
            activeOpacity={1}
            onPress={handleDone}
            textStyle={styles.textStyle}
            title={I18n.t("DONE_STRING")}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PickerModal;

const styles = StyleSheet.create({
  modal: {
    ...paddingHorizontal(24),
    justifyContent: "center",
  },
  textStyle: {
    color: design["Text_Tertiary_Color"],
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
  },
  cmParent: {
    height: "85%",
    backgroundColor: design["Background_Secondary_Color"],
    borderRadius: 10,
    overflow: "hidden",
  },
  cmHeader: {
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    backgroundColor: design["Header_Background_Primary_Color"],
    borderBottomWidth: 3,
    borderBottomColor: design.Active_Tabs_Under_Line_Color,
    marginBottom: 5,
    justifyContent: "center",
  },
  cmHeaderText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: PRIMARY_BOLD,
    color: design.Secondary_Color,
  },
  doneButton: {
    height: 30,
    borderRadius: 1,
    width: "30%",
    elevation: 2,
    backgroundColor: design["Primary_Color"],
    justifyContent: "center",
  },
  cmFooterParent: {
    backgroundColor: design["Header_Background_Secondary_color"],
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
