import { marginHorizontal, marginVertical } from "@utils/genericStyles";
import { PRIMARY_BOLD } from "@fonts";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
// const unChecked = require('../../../../../../../../../assets/png/ic_check_false.png');
// const checkedTick = require('../../../../../../../../../assets/png/ic_tick_check.png');
// const checkedCircle = require('../../../../../../../../../assets/png/ic_circle_check.png');

export default function index(props) {
  if (props.showSelection) {
    const checkboxIcon = props.isSelected ? checkedTick : unChecked;
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={props.onSelected}>
          <Image
            source={checkboxIcon}
            style={styles.checkIcon}
            resizeMode="cover"
          />
        </TouchableOpacity> */}

        <Text style={styles.makeMealText}>{props.sectionTitle}</Text>
      </View>
    );
  } else {
    return <Text style={styles.customizeHeader}>{props.sectionTitle}</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
  makeMealText: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 17,
    marginStart: 10,
    justifyContent: "center",
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  customizeHeader: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    ...marginVertical(5),
    ...marginHorizontal(5),
    alignItems: "center",
    justifyContent: "center",
  },
});
