import { PRIMARY_EXTRABOLD } from "@fonts";
import { borderColor, borderWidth } from "@utils/genericStyles";
import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
} from "react-native";
import { design } from "rn_fast_track_uilib";
import { CustomText } from "@components";

interface PROPS {
  title: string;
  onPress: Function;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  testID?: string;
  disabled?: boolean;
  theme?: "default" | "white" | "secondary";
  upArrow?: boolean;
  downArrow?: boolean;
  textTestID?: string;
}

function BorderButton({
  title = "",
  onPress = () => {},
  style = {},
  textStyle = {},
  activeOpacity = 0.5,
  testID = "",
  disabled = false,
  theme = "default",
  upArrow = false,
  downArrow = false,
  textTestID = "",
}: PROPS) {
  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.container,
        style,
        theme == "white" && styles.whiteButton,
        theme == "secondary" && styles.secondaryButton,
        disabled && styles.disabledView,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      <View style={styles.touchableContainer}>
        <CustomText
          style={[
            styles.text,
            textStyle,
            theme == "white" && styles.whiteButtonText,
          ]}
          testID={textTestID}
        >
          {title}
        </CustomText>
        {(downArrow || upArrow) && (
          <Image
            source={require("@assets/images/right_arrow.png")}
            style={[
              styles.arrow,
              upArrow && styles.upArrow,
              downArrow && styles.downArrow,
              theme == "white" && styles.whiteButtonArrow,
              theme == "secodary" && styles.secondaryButtonArrow,
            ]}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default BorderButton;
export { BorderButton };
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 52,
    ...borderWidth(1.15),
    ...borderColor(design["Border_Button_Border_Color"]),
    width: "100%",
    backgroundColor: design["Border_Button_Background"],
    borderRadius: design.Global_Border_Radius,
  },
  disabledView: {
    ...borderColor(design["DISABLED_COLOR"]),
    backgroundColor: design["DISABLED_COLOR"],
  },
  text: {
    textAlign: "center",
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 14,
    fontStyle: "normal",
    letterSpacing: 0,
    color: design["Border_Button_Text_Color"],
  },
  touchableContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteButton: {
    backgroundColor: design["Border_Button_Text_Color"],
  },
  secondaryButton: {
    backgroundColor: design["Secondary_Color"],
    ...borderColor(design["Secondary_Color"]),
  },
  whiteButtonText: {
    color: design["Border_Button_Background"],
  },
  arrow: {
    tintColor: design["Border_Button_Text_Color"],
    width: 10,
    height: 10,
    marginLeft: 5,
  },
  whiteButtonArrow: {
    tintColor: design["Border_Button_Background"],
  },
  secondaryButtonArrow: {
    tintColor: design["Secondary_Color"],
  },
  upArrow: {
    transform: [{ rotate: "-90deg" }],
  },
  downArrow: {
    transform: [{ rotate: "90deg" }],
  },
});
