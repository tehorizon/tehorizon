import React, { useRef, memo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import i18n, { isRTL } from "@localization";
import Swiper from "react-native-swiper";
import { AntDesign } from "@expo/vector-icons";
import { design } from "rn_fast_track_uilib";
import { CustomText, FastImageBackground } from "@components";
import {
  borderColor,
  borderWidth,
  marginHorizontal,
  padding,
} from "@utils/genericStyles";
import { mainCoverSection } from "@Home/interfaces";

const { width, height } = Dimensions.get("window");

const ParallaxHeight = height * 0.45;
export const HEADER_IMAGE_HEIGHT = width / 3;

const AnimatedFastImage = Animated.createAnimatedComponent(FastImageBackground);

const MainCover = memo(
  ({
    mainCover_section = { tiles: [] },
    upgradeSection = {},
    appConfig = {},
    offset,
    testID = "banner",
    handleUpgrade,
  }: mainCoverSection) => {
    const swiper = useRef<Swiper>(null);

    const onPressRightSwap = () => {
      swiper?.current?.scrollBy(1);
    };

    const onPressLeftSwap = () => {
      swiper?.current?.scrollBy(-1);
    };
    let scrollY = new Animated.Value(0);

    // shouldComponentUpdate = (nextProps) => {
    //   if (
    //     nextProps.mainCover_section !== this.props.mainCover_section ||
    //     nextProps.upgradeSection !== this.props.upgradeSection ||
    //     nextProps.offset !== this.props.offset ||
    //     nextProps.appConfig !== this.props.appConfig
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    if (
      mainCover_section?.tiles &&
      typeof mainCover_section?.tiles[0]?.main_top_image == "string"
    ) {
      mainCover_section.tiles[0].main_top_image = [
        mainCover_section?.tiles[0].main_top_image,
      ];
    }

    if (
      mainCover_section?.tiles &&
      typeof mainCover_section?.tiles[0]?.messages == "string"
    ) {
      mainCover_section.tiles[0].messages = [
        mainCover_section?.tiles[0].messages,
      ];
    }

    if (
      mainCover_section?.tiles &&
      mainCover_section?.tiles[0]?.main_top_image &&
      mainCover_section?.tiles[0]?.main_top_image[
        mainCover_section?.tiles[0]?.main_top_image?.length - 1
      ] != "details"
    ) {
      mainCover_section.tiles[0].main_top_image = [
        ...mainCover_section.tiles[0].main_top_image,
        "details",
      ];
    }

    return (
      <Animated.View
        style={{
          height: offset.interpolate({
            inputRange: [0, ParallaxHeight],
            outputRange: [ParallaxHeight, 85],
          }),
        }}
      >
        <Swiper
          loop={false}
          ref={swiper}
          showsPagination={false}
          testID={testID}
        >
          {mainCover_section?.tiles ? (
            mainCover_section?.tiles[0]?.main_top_image?.map(
              (item: string, index: number) => {
                if (item == "details") {
                  return (
                    <View
                      style={styles.mainBanner}
                      key={index}
                      testID="bannerDetails"
                    >
                      <View style={styles.subBanner}>
                        <Animated.View
                          style={[
                            {
                              borderBottomWidth: 0,
                              justifyContent: "center",
                              height: scrollY.interpolate({
                                inputRange: [-ParallaxHeight, 0],
                                outputRange: [
                                  ParallaxHeight,
                                  ParallaxHeight / 2,
                                ],
                                extrapolate: "clamp",
                              }),
                            },
                          ]}
                        >
                          <View style={[styles.savedWrapper, styles.noBorder]}>
                            <Image
                              source={require("@assets/images/offer-icon1.png")}
                              style={styles.offerIcon}
                              resizeMode="contain"
                            />
                            <View style={{ alignItems: "center" }}>
                              <CustomText style={styles.savingText}>
                                {mainCover_section?.tiles[1]?.savings
                                  ?.savings_this_year || "0"}
                              </CustomText>
                              <CustomText>
                                {mainCover_section?.tiles[1]?.savings
                                  ?.savings_this_year_label ||
                                  appConfig.defaultCurrency +
                                    " SAVED THIS YEAR"}
                              </CustomText>
                            </View>
                          </View>
                        </Animated.View>
                      </View>
                      <Animated.View
                        style={[
                          styles.savedWrapper,
                          {
                            height: scrollY?.interpolate({
                              inputRange: [-ParallaxHeight, 0],
                              outputRange: [ParallaxHeight, ParallaxHeight / 2],
                            }),
                          },
                        ]}
                      >
                        <View style={styles.secondView}>
                          <TouchableOpacity onPress={onPressLeftSwap}>
                            <View style={styles.midArrow}>
                              <AntDesign name="left" size={15} color="#000" />
                            </View>
                          </TouchableOpacity>
                        </View>
                        <Image
                          source={require("@assets/images/home_total_offers.png")}
                          style={styles.offerIcon}
                          resizeMode="contain"
                        />
                        <View style={{ alignItems: "center" }}>
                          <CustomText style={{ fontSize: 30, ...padding(9) }}>
                            {mainCover_section?.tiles[1]?.savings
                              ?.offers_used || "0"}
                          </CustomText>
                          <CustomText>
                            {i18n.t("OFFERS_USED_SO_FAR")}
                          </CustomText>
                        </View>
                      </Animated.View>
                    </View>
                  );
                } else {
                  return (
                    <AnimatedFastImage
                      style={[
                        styles.parallexBackgroundImage,
                        {
                          justifyContent: appConfig.homeModuleConfig
                            ? appConfig.homeModuleConfig.messageTilePosition
                            : "flex-end",
                        },
                      ]}
                      source={{
                        uri: item,
                      }}
                      key={item}
                      testID={`banner${index}`}
                    >
                      <View
                        style={[
                          styles.rectangle,
                          {
                            backgroundColor: `#${
                              mainCover_section?.tiles[0]?.main_top_color ||
                              "a9a9a9"
                            }`,
                          },
                        ]}
                      >
                        <View style={styles.flex} />

                        <View style={styles.welcomeView}>
                          <CustomText
                            style={[
                              styles.welcomeMsg,
                              {
                                color: `#${
                                  mainCover_section?.tiles[0]
                                    ?.main_top_text_color || "ffffff"
                                }`,
                              },
                            ]}
                          >
                            {mainCover_section?.tiles[0]?.messages?.length !== 0
                              ? mainCover_section?.tiles[0]?.messages[
                                  index %
                                    mainCover_section?.tiles[0]?.messages.length
                                ]
                              : i18n.t("WELCOME_MESSAGE")}{" "}
                          </CustomText>
                        </View>

                        <View style={[styles.arrow]}>
                          <TouchableOpacity onPress={onPressRightSwap}>
                            <View style={styles.rightArrow}>
                              <AntDesign
                                name="right"
                                size={15}
                                color="#FFFFFF"
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {upgradeSection && true ? (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={handleUpgrade}
                          style={[
                            styles.upgradeSection,
                            {
                              backgroundColor:
                                upgradeSection.upgrade_button_background_color,
                            },
                          ]}
                        >
                          <CustomText
                            style={{
                              color: upgradeSection.upgrade_button_title_color,
                            }}
                          >
                            {upgradeSection.upgrade_button_title}
                          </CustomText>
                        </TouchableOpacity>
                      ) : null}
                    </AnimatedFastImage>
                  );
                }
              }
            )
          ) : (
            <View key={"empty"} />
          )}
        </Swiper>
      </Animated.View>
    );
  }
);

export default MainCover;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  parallexBackgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  rectangle: {
    width: "100%",
    height: 88,
    opacity: 0.6,
    alignItems: "center",
    flexDirection: "row",
  },
  category: {
    marginTop: 16,
    marginBottom: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    ...marginHorizontal(11),
  },
  offers: {
    width: "100%",
    height: 37,
    backgroundColor: "#7F526E",
    justifyContent: "center",
    alignItems: "center",
  },
  offersText: {
    color: "#ffffff",
  },
  doneBtnWrapper: {
    backgroundColor: "#D1D1D1",
    height: 45,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  doneBtn: {
    height: 30,
    width: 60,
    ...borderColor("#FFFFFF"),
    ...borderWidth(1),
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  slide: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "transparent",
  },
  savedWrapper: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  savingText: {
    fontSize: 30,
    ...padding(9),
  },
  rightArrow: { ...padding(5) },
  mainBanner: {
    backgroundColor: design.Background_Secondary_Color,
  },
  subBanner: {
    // flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    justifyContent: "center",
  },
  offerIcon: { height: 80, width: 80 },
  secondView: {
    position: "absolute",
    top: -12,
    left: 5,
  },
  upgradeSection: {
    opacity: 1,
    height: 25,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    bottom: 4,
    left: "50%",
    marginLeft: -50,
  },
  arrow: {
    flex: 1,
    alignItems: isRTL ? "flex-start" : "flex-end",
    marginRight: 10,
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
  noBorder: { borderBottomWidth: 0 },
  midArrow: {
    ...padding(5),
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
  welcomeMsg: {
    width: 269,
    textAlign: "center",
    paddingBottom: 5,
  },
  welcomeView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
