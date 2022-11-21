import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
  ImageSourcePropType,
  GestureResponderEvent,
  Linking,
  Platform,
  Share,
} from "react-native";
import Swiper from "react-native-swiper";
import Image from "@HybridComponents/Image";

const { width } = Dimensions.get("window");
import IC360 from "@assets/images/ic_360.png";
import { borderColor, borderWidth, margin } from "@utils/genericStyles";
import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";
import { MerchantData, outletInterface } from "@Merchant/interfaces/responses";
import I18n, { isRTL } from "@localization";

const dialCall = (number: any) => {
  let phoneNumber = "";
  if (Platform.OS === "android") {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};

const sendEmail = (email: string) => {
  Linking.openURL(`mailto:${email}`);
};

interface PROPS {
  height: number;
  onBack: () => void;
  onImageClick: (arg: number) => void;
  pushAnalytics: (arg: {
    current_screen: string;
    action: string;
    merchant_id?: number;
    outlet_id?: number;
    category_id?: number;
    categories?: string;
    categories_analytics?: string;
    location_id?: number;
    changeSequenceNumber?: boolean;
  }) => void;
  selectedOutlet: outletInterface;
  merchant: MerchantData;
  onLocationClick: () => void;
  fav: Object;
  onSetFavourite: () => void;
}

const ImageSlider = (props: PROPS) => {
  const {
    height,
    onBack = () => {},
    onImageClick = () => {},
    pushAnalytics = () => {},
    selectedOutlet,
    merchant,
    onLocationClick = () => {},
    fav,
    onSetFavourite = () => {},
  } = props;

  const makeAnalyticsCall = useCallback(
    (action) =>
      pushAnalytics({
        current_screen: "Merchant Detail",
        action,
        merchant_id: merchant?.id,
        outlet_id: selectedOutlet?.id,
        category_id: 0,
        categories: "",
        categories_analytics: "",
        location_id: 0,
        changeSequenceNumber: false,
      }),
    [merchant?.id, selectedOutlet?.id]
  );

  const shareOutlet = useCallback(() => {
    Share.share({
      message: `${I18n.t("Hey, I hear good things about this outlet")} ${
        merchant?.name
      }! ${I18n.t("I found on")} ${I18n.t("Company_Name")}. ${I18n.t(
        "Should we go"
      )}? https://www.theentertainerme.com/outlets/detail?m=${merchant?.id}`,
    });
  }, [merchant]);

  return (
    <View
      style={[
        styles.mainView,
        {
          height,
        },
      ]}
    >
      {merchant?.hero_urls?.length == 0 && (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      )}
      <Swiper
        containerStyle={[
          styles.containerStyle,
          {
            height,
          },
        ]}
        showsPagination
        key={merchant?.hero_urls?.length}
        showsButtons={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        loop={false}
      >
        {merchant?.hero_urls?.map((url: any, index: number) => {
          if (
            Object.keys(merchant?.hero_images_360 || {}).length > 0 &&
            url === merchant?.hero_images_360[url]
          ) {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  onImageClick(index);
                  makeAnalyticsCall("click_360_icon");
                }}
              >
                <View key={index}>
                  <Image
                    source={IC360}
                    style={{
                      zIndex: 999,
                      position: "absolute",
                      right: 15,
                      top: 5,
                      width: 35,
                      height: 35,
                    }}
                  />
                  <Text style={styles.view360}>360 view</Text>

                  <Image
                    source={{
                      uri: url,
                    }}
                    style={{
                      width: width,
                      height: height,
                    }}
                    resizeMode="cover"
                  />
                </View>
              </Pressable>
            );
          }
          return (
            <Pressable
              key={index}
              onPress={() => {
                onImageClick(index);
                makeAnalyticsCall("click_image");
              }}
              style={{
                width: width,
                height: height,
              }}
            >
              <Image
                source={{
                  uri: url,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
              />
            </Pressable>
          );
        })}
      </Swiper>
      <Pressable onPress={onBack} style={styles.backArrowView}>
        <Image
          style={styles.headIcon}
          source={require("@assets/images/arrow_back.png")}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable onPress={onSetFavourite} style={styles.favouriteView}>
        <Image
          style={styles.headIcon}
          source={
            fav
              ? require("@assets/images/favourites-filled.png")
              : require("@assets/images/favourites-icon.png")
          }
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.linksView}>
        {selectedOutlet?.telephone?.length > 0 && (
          <SmartIcon
            source={require("@assets/icons/call.png")}
            onPress={() => {
              makeAnalyticsCall("click_call");
              dialCall(selectedOutlet?.telephone?.replace(/\s/g, "") || "");
            }}
          />
        )}
        {selectedOutlet?.email?.length > 0 && (
          <SmartIcon
            source={require("@assets/icons/msg-box.png")}
            onPress={() => {
              makeAnalyticsCall("click_email");
              sendEmail(selectedOutlet?.email);
            }}
          />
        )}
        {selectedOutlet.lat != null && (
          <SmartIcon
            source={require("@assets/icons/pin-1.png")}
            onPress={onLocationClick}
          />
        )}
        <SmartIcon
          source={require("@assets/icons/share.png")}
          onPress={shareOutlet}
        />
      </View>
    </View>
  );
};

const SmartIcon = ({
  source,
  onPress,
}: {
  source: ImageSourcePropType;
  onPress: (event?: GestureResponderEvent) => void;
}) => (
  <Pressable onPress={onPress} style={styles.iconView}>
    <Image source={source} style={styles.icon} resizeMode="contain" />
  </Pressable>
);
export default ImageSlider;

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  sliderParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerStyle: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    ...margin(3),
    ...borderWidth(0.8),
    ...borderColor("white"),
    backgroundColor: "transparent",
  },
  activeDot: {
    backgroundColor: "white",
    width: 8,
    height: 8,
    borderRadius: 4,
    ...margin(3),
  },
  view360: {
    fontSize: 10,
    color: "white",
    position: "absolute",
    zIndex: 999,
    right: 5,
    top: 45,
  },
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconView: {
    backgroundColor: design.Header_Background_Primary_Color,
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 8,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: { flex: 1, margin: 7 },
  linksView: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "transparent",
    right: 8,
    bottom: -12,
  },
  favouriteView: {
    position: "absolute",
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 40,
    top: 51,
    right: 16,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  backArrowView: {
    position: "absolute",
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 40,
    top: 51,
    left: 16,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  headIcon: {
    flex: 1,
    margin: 11,
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
});
