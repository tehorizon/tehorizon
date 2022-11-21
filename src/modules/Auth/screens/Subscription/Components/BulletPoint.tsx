import React from "react";
import { View } from "react-native";
import styles from "@Auth/screens/Subscription/styles";
import { Feather } from "@expo/vector-icons";

import { CustomText } from "@components";

//Interface
interface PROPS {
  value: String;
}

//Component
const BulletPoint = (props: PROPS) => {
  //props
  const { value } = props;

  return (
    <View style={styles.bulletPointView}>
      <Feather name={"check"} size={18} color={"rgb(61,202,18)"} />
      <CustomText style={styles.pointText}>{value}</CustomText>
    </View>
  );
};

export default BulletPoint;
