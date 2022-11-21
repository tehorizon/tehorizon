import { padding } from "@utils/genericStyles";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";

export default class index2 extends Component {
  state = {
    checked: false,
  };

  render() {
    const { checked, onChange } = this.props;
    return (
      <View style={{ height: 55, width: 55 }}>
        <CheckBox
          checkedIcon="check-square"
          checked={checked}
          onPress={onChange}
          checkedColor="black"
          style={{
            ...padding(10),
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
