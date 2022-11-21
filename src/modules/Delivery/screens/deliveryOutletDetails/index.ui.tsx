import { ScreenTypes } from "@delivery/interfaces";
import React from "react";
import { View, SafeAreaView, ScrollView, Pressable } from "react-native";
import i18n, { isRTL } from "@localization";

import MenuProductList from "@delivery/components/MenuProductsList";
import DeliverToBar from "@delivery/components/DeliverToBar";
import Basket from "@delivery/components/Basket";

import {
  MerchantHeader,
  MerchantImageSlider,
  MerchantContactBar,
  CustomText,
  DineInOffersBar,
} from "@components";
import styles from "./styles";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import { SCREEN_WIDTH } from "@fast_track/src/commons/constants/constants";
import RenderOffer from "@Merchant/components/offers/renderOffer";

const DeliveryOutletDetail = ({
  selectedOutlet,
  merchant,
  tabs,
  // menuActiveTab,
  // menuProductsList,
  currentLocation,
  favouriteState,
  orderID,
  basketIsEmpty,
  navigation,
  route,
  activeTab,
  //methods
  onSetMerchantData,
  onClickFavourite,
  onChangeTab,
  updateActiveTab,
  viewDineInOffers,
  onImageClick,
}: ScreenTypes.DeliveryOutletDetail) => {
  var styleToHandleLongTabs = {};
  if (SCREEN_WIDTH / tabs?.length < 115) {
    styleToHandleLongTabs = {
      width: "auto",
    };
  }
  if (!merchant) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <MerchantHeader
            fav={favouriteState}
            headerTitle={merchant.name}
            onBack={() => {
              navigation.goBack();
            }}
            onSetFavourite={onClickFavourite}
          />
          <DeliverToBar
            deliveryRegions={merchant?.delivery_regions}
            deliveryRegion={merchant?.delivery_region}
            outlet={selectedOutlet}
            navigation={navigation}
          />
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            stickyHeaderIndices={[3, 5]}
          >
            <MerchantImageSlider
              key="slider"
              height={200}
              hero_images_360={merchant.hero_images_360}
              outletID={selectedOutlet?.id}
              merchantID={merchant.id}
              onImageClick={onImageClick}
              merchant={merchant}
              selectedOutlet={selectedOutlet}
              onBack={() => {
                navigation.goBack();
              }}
              fav={favouriteState}
              onSetFavourite={onClickFavourite}
            />
            {merchant?.show_view_dine_offer_section && (
              <DineInOffersBar
                key="dine-offers"
                name={"Dine-in offers also available"}
                handleClick={viewDineInOffers}
                isRTL={isRTL}
                i18n={i18n}
              />
            )}

            <View style={styles.offerView}>
              {merchant?.offers?.map((offer: any, index: number) => {
                return (
                  <RenderOffer
                    key={index}
                    offer={offer}
                    onSelectOffer={() => null}
                  />
                );
              })}
            </View>
            <ScrollView
              horizontal
              style={styles.offerFeaturesParetnt}
              key="merchant-offers"
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.offerContentStyle}
            >
              {merchant?.offersDetail?.map((item: any) => {
                return (
                  <CustomText style={styles.offerText} key={item.name}>
                    {`${item.name}\n${item.value}`}
                  </CustomText>
                );
              })}
            </ScrollView>
            <ScrollView
              key="tabbar"
              style={styles.scrollView}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
            >
              {tabs?.map((tab, index) => (
                <Pressable
                  style={styles.tabbar}
                  key={index}
                  onPress={() => updateActiveTab(index)}
                >
                  <View
                    style={[
                      styles.tabbarTextView,
                      activeTab == index && styles.activeTab,
                    ]}
                  >
                    <CustomText style={styles.tabbarText}>
                      {tab.title}
                    </CustomText>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            <MenuProductList
              key="tab-details"
              menuProductsList={tabs[activeTab ?? 0]?.payload || []}
              merchant={merchant}
              basketIsEmpty={basketIsEmpty}
            />

            {/* <TabView
              key="tabview"
              navigationState={{
                index: activeTab,
                routes: tabs || [],
              }}
              renderScene={(screenProps) => (
                <MenuProductList
                  menuProductsList={screenProps?.route?.payload || []}
                  merchant={merchant}
                  // menuActiveTab={menuActiveTab}
                  basketIsEmpty={basketIsEmpty}
                />
              )}
              onIndexChange={updateActiveTab}
              lazy
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={styles.indicatorStyle}
                  style={styles.tabbar}
                  activeColor={design["Tabs_Title_Active_Color"]}
                  inactiveColor={design["Tabs_Title_InActive_Color"]}
                  tabStyle={styleToHandleLongTabs}
                  // labelStyle={styles.labelStyle}
                  renderLabel={_renderLabel}
                  scrollEnabled={
                    SCREEN_WIDTH / tabs?.length < 115 ? true : false
                  }
                />
              )}
              initialLayout={{ width: SCREEN_WIDTH }}
            /> */}
          </ScrollView>
          <Basket
            minimumOrderAmount={merchant?.minimum_order_amount}
            outletCurrency={merchant?.outletCurrency}
            deliveryMinimumAmountMessage={
              merchant?.delivery_minimum_amount_message
            }
            isOpen={merchant?.is_open}
            deliveryCartParams={merchant?.delivery_cart_params}
            selectedOutlet={selectedOutlet}
            merchant={merchant}
            orderID={orderID}
          />
        </View>
      </SafeAreaView>
    );
  }
};
const _renderLabel = ({ route }) => (
  <CustomText style={styles.labelStyle}>{route.title}</CustomText>
);
export default DeliveryOutletDetail;
