import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";
import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { borderColor, borderWidth } from "@utils/genericStyles";
class index extends Component {
  render() {
    const { checked } = this.props;
    return (
      <View style={[styles.button, checked && styles.checked]}>
        {checked && (
          <Image
            source={require("@assets/images/tick_icon.png")}
            style={styles.icon}
          />
        )}
      </View>
    );
  }
}
export default index;

const styles = StyleSheet.create({
  button: {
    ...borderColor(design.Border_Color),
    ...borderWidth(1),
    height: 18,
    width: 18,
    borderRadius: 25 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: design.Checkbox_Check_Color,
    ...borderColor(design.Checkbox_Check_Color),
  },
  icon: {
    width: 10,
    height: 10,
    tintColor: "white",
    resizeMode: "contain",
  },
});
