import React from "react";
import styles from "./styles";
import { design } from "rn_fast_track_uilib";
import Header from "../../components/header/index";
import i18n, { getFlipForRTLStyle } from "@localization";
import MainCover from "../../components/mainCover/index";
import Categories from "../../components/categories/index";
import Featured from "../../components/featured/index";
import Nearest from "../../components/Nearest";
import HotOffers from "../../components/HotOffers";
import Locations from "../../components/locations/index";
import { HomeScreenProps } from "../../interfaces";
import { TouchableOpacity, View, Animated } from "react-native";
import LocationPermisonModal from "../../components/LocationPermisonModal/index";
import {
  CustomText,
  ScreenIntro,
  Loader,
  CustomSafeAreaView,
  BottomSheet,
} from "@components";

import DraggableFlatList, {
  ListItem,
} from "@HybridComponents/DraggableFlatList";
import LayoutButton from "@HybridComponents/LayoutButton";

export default (props: HomeScreenProps) => {
  const {
    selectedLocation,
    onOpenLocation,
    onSearchClickHandler,
    homeSections,
    user,
    offset,
    upgradeSection,
    AppConfigs,
    isLoading,
    isShowScreenIntro,
    handleUpgrade,
    navigation,
    locationGranted,
    checkGeoLocation,
    onCategoryClickHandler,
    onFeaturedTileClickHandler,
    onDoneHanlder,
    onOkayPressHandler,
    isOpenLocationPermissionModal,
    handleLocationPermissionApproval,
    bottomSheetRef,
    locationListRef,
    setHomeSections,
    onUpdateLayoutRequest,
    selectedLocationList,
    showFD,
    showAL,
    gotoNearestOutletDetails,
    showNearest,
    skipMode,
  }: HomeScreenProps = props;
  return (
    <View style={styles.mainView} testID="homeScreen">
      <CustomSafeAreaView style={[styles.container, getFlipForRTLStyle()]}>
        <Loader isVisible={isLoading} />
        <View style={styles.subView}>
          <Header
            skipMode={skipMode}
            userInfo={user}
            selectedLocation={selectedLocation}
            onOpenLocation={onOpenLocation}
            isShowScreenIntro={isShowScreenIntro}
            onSearchPress={onSearchClickHandler}
            onNotificationPress={() => navigation.navigate("Notification")}
          />

          <LayoutButton title="Upload Layout" onPress={onUpdateLayoutRequest} />
          <Animated.ScrollView
            bounces={false}
            style={{ flex: 1 }}
            testID="homeSections"
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: offset } } }]
              // {useNativeDriver: true},
            )}
          >
            {!isShowScreenIntro && homeSections?.length > 0 && (
              <DraggableFlatList
                showsVerticalScrollIndicator={false}
                onDragEnd={({ data }: any) => setHomeSections(data)}
                data={homeSections}
                bounces={false}
                renderItem={({ item, drag, isActive }: any) => {
                  switch (item.section_identifier) {
                    case "main_cover":
                      return (
                        <ListItem drag={drag} isActive={isActive}>
                          <MainCover
                            testID="banner"
                            offset={offset}
                            key={item?.section_identifier}
                            mainCover_section={item}
                            upgradeSection={upgradeSection}
                            appConfig={AppConfigs}
                            handleUpgrade={handleUpgrade}
                          />
                        </ListItem>
                      );
                    case "categories":
                      return (
                        <ListItem drag={drag} isActive={isActive}>
                          <Categories
                            testID="categories"
                            title={
                              AppConfigs?.showHomeSectionsNames && item.title
                            }
                            key={item.section_identifier}
                            categories_section={item}
                            navigation={navigation}
                            onCategoryClickHandler={onCategoryClickHandler}
                          />
                        </ListItem>
                      );
                    case "featured":
                      return (
                        <ListItem drag={drag} isActive={isActive}>
                          <Featured
                            testID="featured"
                            title={
                              AppConfigs?.showHomeSectionsNames && item.title
                            }
                            key={item.section_identifier}
                            featured_sections={item}
                            onOfferClickHandler={onFeaturedTileClickHandler}
                          />
                        </ListItem>
                      );
                    case "hot_offers":
                      return (
                        <ListItem drag={drag} isActive={isActive}>
                          <HotOffers
                            testID="hot_offers"
                            title={
                              AppConfigs?.showHomeSectionsNames && item.title
                            }
                            key={item.section_identifier}
                            featured_sections={item}
                            onOfferClickHandler={onFeaturedTileClickHandler}
                          />
                        </ListItem>
                      );
                    case "nearest":
                      return (
                        <ListItem drag={drag} isActive={isActive}>
                          <Nearest
                            testID="nearest"
                            title={
                              AppConfigs?.showHomeSectionsNames && item.title
                            }
                            key={item.section_identifier}
                            featured_sections={item}
                            onOfferClickHandler={gotoNearestOutletDetails}
                            locationGranted={locationGranted}
                            allowLocation={checkGeoLocation}
                            showAll={showNearest}
                          />
                        </ListItem>
                      );
                    case "food_and_drink":
                      return (
                        <ListItem drag={drag} isActive={isActive}>
                          <Featured
                            testID="food_and_drink"
                            title={
                              AppConfigs?.showHomeSectionsNames && item.title
                            }
                            showAll={showFD}
                            key={item.section_identifier}
                            featured_sections={item}
                            onOfferClickHandler={onFeaturedTileClickHandler}
                          />
                        </ListItem>
                      );
                    case "attraction_and_leisure":
                      return (
                        <ListItem drag={drag} isActive={isActive}>
                          <Featured
                            testID="attraction_and_leisure"
                            title={
                              AppConfigs?.showHomeSectionsNames && item.title
                            }
                            showAll={showAL}
                            key={item.section_identifier}
                            featured_sections={item}
                            onOfferClickHandler={onFeaturedTileClickHandler}
                          />
                        </ListItem>
                      );
                    default:
                      return null;
                  }
                }}
                keyExtractor={(item) => item.section_identifier}
              />
            )}
          </Animated.ScrollView>
        </View>
      </CustomSafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        modalHeight={
          (selectedLocationList?.length < 5
            ? selectedLocationList?.length + 0.5
            : 5.5) * 51
        }
        header={
          AppConfigs.showLocationsListHeader ? (
            <View style={styles.doneBtnWrapper}>
              {selectedLocation?.id !== "" && (
                <TouchableOpacity
                  onPress={() => {
                    onDoneHanlder(
                      locationListRef?.current?.getSelectedLocation()
                    );
                  }}
                  testID="bottom_sheet_done"
                >
                  <View style={styles.doneBtn}>
                    <CustomText
                      style={{
                        color: design.Header_Title_Secondary_Color,
                        fontSize: 10,
                      }}
                    >
                      {i18n.t("DONE")}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View />
          )
        }
        onBackButtonPress={() => true}
      >
        <Locations
          ref={locationListRef}
          hasLocationHeader={AppConfigs.showLocationsListHeader}
          onDonehandler={onDoneHanlder}
          selectedLocation={selectedLocation}
          locationList={selectedLocationList}
        />
      </BottomSheet>

      {isOpenLocationPermissionModal && (
        <LocationPermisonModal
          onAllowCallback={() => handleLocationPermissionApproval(true)}
          onCancelCallback={() => handleLocationPermissionApproval(false)}
        />
      )}
      <ScreenIntro onPress={onOkayPressHandler} visible={isShowScreenIntro} />
    </View>
  );
};
