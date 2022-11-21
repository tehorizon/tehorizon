import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text/Text";
import i18n from "@localization";
import { design } from "rn_fast_track_uilib";
import { PRIMARY_BOLD } from "@fonts";

export default class proceedButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.handleProceed}
        style={{
          marginTop: 50,
          justifyContent: "center",
          backgroundColor: design["Border_Button_Background"],
          height: 60,
          alignSelf: "center",
          width: "50%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontFamily: PRIMARY_BOLD,
            fontSize: 18,
          }}
        >
          {i18n.t("PROCEED")}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
