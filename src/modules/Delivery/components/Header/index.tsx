import React, { FC } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { design } from "rn_fast_track_uilib";
import { AntDesign } from "@expo/vector-icons";
import closeIcon from "@assets/images/close-icon.png";
import i18n from "@localization";
import { NavigationScreenProp } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomText } from "@components";
import { PRIMARY } from "@fonts";
import { paddingHorizontal } from "@utils/genericStyles";

interface PROPS {
  navigation: NavigationScreenProp<any, any>;
  title: string;
  onBack?: () => void;
}

const Header: FC<PROPS> = ({
  navigation,
  title,
  onBack = () => {
    navigation.goBack();
  },
}) => {
  // const onBack = () => {
  //     // navigation.goBack()
  //     navigation.navigate('Home', {
  //         screen: 'Home',
  //     });
  // }

  return (
    <SafeAreaView style={styles.mainView} edges={["top"]}>
      <View style={styles.devliveryContainer}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.button}
          activeOpacity={1}
        >
          <AntDesign
            name="caretleft"
            size={14}
            color={design["Header_Icon_Color"]}
          />
        </TouchableOpacity>
        <CustomText style={styles.title}> {i18n.t(title)} </CustomText>
        <TouchableOpacity
          onPress={onBack}
          style={styles.button}
          activeOpacity={1}
        >
          <Image source={closeIcon} style={styles.crossIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: design.Header_Background_Primary_Color,
  },
  devliveryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Platform.OS == "android" ? 45 : 45,
    backgroundColor: design.Background_Secondary_Color,
    borderBottomColor: "rgb(178,178,178)",
    borderBottomWidth: 0.2,
  },
  crossIcon: {
    height: 14.5,
    width: 14.5,
    tintColor: design["Header_Icon_Color"],
    marginRight: 5,
    resizeMode: "contain",
  },
  title: {
    color: design.Header_Title_Primary_Color,
    fontSize: 18,
    fontFamily: PRIMARY,
  },
  button: {
    height: "100%",
    justifyContent: "center",
    ...paddingHorizontal(12),
  },
});

export default Header;
