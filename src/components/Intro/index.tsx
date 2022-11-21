import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { paddingVertical, paddingHorizontal } from "@utils/genericStyles";
import { CustomText } from "@components";
import Swiper from "react-native-swiper";
import { design, introImages } from "rn_fast_track_uilib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import I18n from "@localization";
import { Portal } from "react-native-paper";
import Image from "@HybridComponents/Image";
import { SCREEN_HEIGHT } from "@fast_track/src/commons/constants/constants";
const { width, height } = Dimensions.get("window");
const total = introImages.length - 1;
const Intro = ({ onPressSkip, isVisible = false }) => {
  const [swipeIndex, updateSwipeIndex] = useState(0);
  const swiperRef = useRef();
  return isVisible ? (
    <Portal>
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: design.Background_Secondary_Color,
          }}
        >
          <Swiper
            ref={swiperRef}
            loop={false}
            testID="onboarding"
            onIndexChanged={updateSwipeIndex}
          >
            {introImages.map((item, index) => (
              <Image
                testID={`slide${index}`}
                style={styles.image}
                source={item}
                resizeMode="cover"
                key={index}
              />
            ))}
          </Swiper>
          <SafeAreaView style={styles.footer} edges={["bottom"]}>
            <View style={styles.paginationView}>
              <View style={styles.row}>
                {introImages.map((item, i) => (
                  <View
                    style={swipeIndex == i ? styles.activeDot : styles.dot}
                    key={i}
                  />
                ))}
              </View>
              <TouchableOpacity
                testID="nextArrow"
                onPress={() =>
                  swipeIndex == total
                    ? onPressSkip()
                    : swiperRef.current.scrollBy(1)
                }
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle"
                  size={50}
                  color={design.Primary_Color}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <TouchableOpacity
            testID="skip_onboarding"
            activeOpacity={1}
            onPress={onPressSkip}
            style={styles.skipView}
          >
            <CustomText style={styles.skipText}>{I18n.t("Skip")}</CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    </Portal>
  ) : null;
};
export default Intro;
const styles = StyleSheet.create({
  image: {
    height: Platform.select({
      ios: SCREEN_HEIGHT - 75,
      android: SCREEN_HEIGHT + 45,
      web: SCREEN_HEIGHT - 75,
    }),
    width: "100%",
    backgroundColor: design.Primary_Color,
  },
  height: {
    height: height,
  },
  width: {
    width: width,
  },
  row: {
    flexDirection: "row",
  },
  paginationView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    width: width,
    backgroundColor: design.Background_Secondary_Color,
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    ...paddingHorizontal(20),
    ...paddingVertical(7),
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 20,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  skipView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    top: 50,
    right: 16,
    position: "absolute",
    alignSelf: "flex-end",
  },
  skipText: {
    textAlign: "center",
    color: design.Border_Button_Text_Color,
    textDecorationLine: "underline",
    fontSize: 13,
    lineHeight: 20,
  },
});
