import React, { useCallback } from "react";
import { Pressable, StyleProp, StyleSheet, View } from "react-native";
import APP_COLORS from "@colors";
import { Header as RNHeader } from "react-native-elements";
import Text from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import Image from "@HybridComponents/Image";
import { PRIMARY_EXTRABOLD } from "@commons/fonts";
import { NavigationProp } from "@react-navigation/core";
import { paddingHorizontal } from "@utils/genericStyles";
import { isRTL } from "@localization";
type header = {
  customStyle?: StyleProp<any>;
  navigation?: NavigationProp<any, any>;
  title: string;
  rightComponent?: any;
  onPressBack?: () => void;
  noBorder?: boolean;
};
const HeaderWithBackButton = ({
  customStyle = {},
  navigation,
  title = "",
  rightComponent,
  noBorder = false,
  onPressBack,
}: header) => {
  const onBack = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  return (
    <RNHeader
      placement="left"
      containerStyle={[
        styles.container,
        customStyle,
        noBorder && styles.noBorder,
      ]}
      backgroundColor={
        design["Header_Background_Primary_Color"] || APP_COLORS.COLOR_BACKGROUND
      }
      leftComponent={
        <Pressable
          testID="headerBackButton"
          // activeOpacity={1}
          onPress={onPressBack || onBack}
          style={styles.leftButton}
        >
          <Image
            source={require("@assets/images/arrow_back.png")}
            style={styles.arrow}
            resizeMode="contain"
          />
        </Pressable>
      }
      centerComponent={
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>
      }
      rightComponent={rightComponent}
    />
  );
};

export default HeaderWithBackButton;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: APP_COLORS.LIGHT_GREY,
    width: "100%",
    ...paddingHorizontal(16),
  },
  noBorder: {
    borderBottomColor: "transparent",
  },
  leftButton: {
    justifyContent: "center",
  },
  arrow: {
    width: 16.88,
    height: 15.75,
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: PRIMARY_EXTRABOLD,
    color: design["Header_Title_Primary_Color"],
  },
});
