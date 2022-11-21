import React from "react";
import { ScreenTypes } from "@jailbreak/interfaces";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import { CustomText } from "@components";

//component containing the view of Home screen
const JailBreakComponent = ({ t }: ScreenTypes.jailbreak) => {
  return (
    <View style={styles.mainView}>
      <Image
        source={require("@assets/icons/ic-exclamation.png")}
        style={styles.image}
      />
      <CustomText style={styles.text}>{t("Jail-Break-Message")}</CustomText>
    </View>
  );
};

export default JailBreakComponent;
