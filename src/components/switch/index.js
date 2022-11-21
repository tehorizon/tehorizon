import Switch from "@HybridComponents/switch";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { design } from "rn_fast_track_uilib";

export default class index extends Component {
  state = {
    isEnabled: false,
  };
  toggleSwitch = () => {
    this.setState({ isEnabled: !this.state.isEnabled });
  };

  render() {
    const { isEnabled } = this.state;
    return (
      <Switch
        circleSize={20}
        backgroundActive={design["Primary_Color"]}
        backgroundInactive={"#C4C7CC"}
        circleActiveColor={design["Primary_Color"]}
        circleInActiveColor={"#E5E5E5"}
        circleBorderWidth={0}
        barHeight={15}
        activeText={''}
        inActiveText={''}
        activeTrackColor={design["Primary_Color"]}
        activeThumbColor={design["Primary_Color"]}
        switchWidthMultiplier={1.5}
        onValueChange={this.props.onChange}
        value={this.props.checked}
        // trackColor={{ false: "#C4C7CC", true: design["Primary_Color"] }}
        // thumbColor={this.props.checked ? design["Primary_Color"] : "#E5E5E5"}
        // onValueChange={this.toggleSwitch}
        // value={isEnabled}
      />
    );
  }
}

const styles = StyleSheet.create({});
