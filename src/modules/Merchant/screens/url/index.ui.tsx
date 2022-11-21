import React from "react";
import { View } from "react-native";
import Image from "@HybridComponents/Image";
import Swiper from "react-native-swiper";
import PanoramaView from "@HybridComponents/PanoramaView";
import { ActivityIndicator } from "react-native-paper";
import { HeaderWithBackButton } from "@components";
import { ScreenTypes } from "../../interfaces";
import styles from "./styles";
import { getFlipForRTLStyle } from "@localization";

//component containing the view of Url screen
const UrlView = ({
  name,
  goBack,
  indexToMove,
  urls,
  hero_images_360,
  isLoadingImage,
  onImageLoaded,
  navigation,
}: ScreenTypes.URL) => {
  return (
    <View style={[styles.mainView, getFlipForRTLStyle()]}>
      <HeaderWithBackButton title={name} navigation={navigation} />

      <View style={styles.subView}>
        <Swiper
          index={indexToMove ?? 0}
          containerStyle={styles.containerStyle}
          key={urls?.length}
          showsButtons={false}
          loop={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          {urls?.map((url: string, index: number) => {
            if (
              Object.keys(hero_images_360)?.length > 0 &&
              url === hero_images_360[url]
            ) {
              return (
                <View key={index}>
                  <PanoramaView
                    style={styles.panoramaView}
                    dimensions={styles.dimenssions}
                    enableTouchTracking
                    inputType="mono"
                    imageUrl={url}
                    onImageLoaded={onImageLoaded}
                  />
                  {isLoadingImage && (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={styles.activityIndicator}
                    />
                  )}
                </View>
              );
            }
            return (
              <View key={index} style={styles.carousel}>
                <Image
                  source={{
                    uri: url,
                  }}
                  style={styles.image}
                  resizeMode="contain"
                  onLoad={onImageLoaded}
                />
                {isLoadingImage && (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={styles.activityIndicator}
                  />
                )}
              </View>
            );
          })}
        </Swiper>
      </View>
    </View>
  );
};

export default UrlView;
