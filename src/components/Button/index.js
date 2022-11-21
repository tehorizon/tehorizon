import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import { borderColor } from "@utils/genericStyles";

class blueButton extends Component {
  render() {
    const { onPress, title, backgrounColor, height, isRTL } = this.props;
    return (
      <TouchableOpacity onPressIn={onPress} testID={this.props.testID}>
        <View
          style={{
            backgroundColor: backgrounColor
              ? backgrounColor
              : design["Primary_Color"],
            height: height ? height : 40,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            borderRadius: design["Global_Button_Border_Radius"]
              ? design["Global_Button_Border_Radius"]
              : 3,
            ...borderColor(
              design["Border_Button_Border_Color"]
                ? design["Border_Button_Border_Color"]
                : "transparent"
            ),
          }}
        >
          <CustomText
            style={{
              color: design["Text_Tertiary_Color"]
                ? design["Text_Tertiary_Color"]
                : "#FFFFFF",
              fontSize: 16,
            }}
            isRTL={isRTL}
          >
            {title}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  }
}
export default blueButton;

const styles = StyleSheet.create({});
