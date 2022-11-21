import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { design } from "rn_fast_track_uilib";
import i18n, { isRTL, getFlipForRTLStyle } from "@localization";

import outletDetailData from "../../assets/data.json";
import outletDetailDataCustom from "../../assets/dataWithCustomise.json";
import MenuProductList from "../MenuProductsList";
import DeliverToBar from "../DeliverToBar/index";
import {
  MerchantHeader,
  MerchantImageSlider,
  MerchantContactBar,
  CustomText,
  DineInOffersBar,
  ChangeLocationModal,
  MerchantContinueModal,
  WebViewModal,
  MenuTabs,
  NewOrderModal,
} from "@components";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import {
  borderColor,
  borderWidth,
  margin,
  padding,
} from "@utils/genericStyles";

//dummy for
const dummyTabsData = [
  {
    id: 0,
    title: "ALL OFFERS",
  },
  {
    id: 1,
    title: "CHEERS",
  },
];

class DeliveryOutletDetail extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      menuActiveTab: 0,
      merchant: outletDetailDataCustom.data,
      tabs: dummyTabsData,
      menuProductsList: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchTabsFromData(this.state.merchant.menus);
    this.fetchMenuProductsList(
      this.state.menuActiveTab,
      this.state.merchant.menus
    );
  }

  fetchTabsFromData = (data) => {
    try {
      if (data) {
        const menuTabs = data.map((menuItem) => {
          return {
            id: menuItem.menuId,
            name: menuItem.menuName,
          };
        });

        this.setState({ tabs: menuTabs });
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  fetchMenuProductsList = (activeIndex, data) => {
    try {
      if (data) {
        const menuProductList = data.filter((item, index) => {
          if (index === activeIndex) {
            return item;
          }
        });

        this.setState({ menuProductsList: menuProductList });
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  render() {
    const { merchant, tabs, menuActiveTab, menuProductsList, loading } =
      this.state;

    if (loading) {
      return null;
    }

    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? 25 : 0,
          backgroundColor: design["Header_Background_Primary_Color"]
            ? design["Header_Background_Primary_Color"]
            : "transparent",
        }}
      >
        <NewOrderModal isVisible={false} />

        <View
          style={{
            flex: 1,
            // ...getFlipForRTLStyle(),
            backgroundColor: design["Background_Primary_Color"],
          }}
        >
          <MerchantHeader
            fav={true}
            headerTitle={merchant.name}
            onBack={() => {
              alert("back callback");
            }}
            onSetFavourite={() => alert("fav callback")}
          />

          <ScrollView bounces={false} style={{ flex: 1 }}>
            <DeliverToBar />
            <MerchantImageSlider
              urls={merchant.hero_urls}
              hero_images_360={merchant.hero_images_360}
              outletID={1} //TODO: selectedOutlet id will be placed here
              merchantID={merchant.id}
              pushAnalytics={() => {
                console.log("handle pushAnalytics");
              }} //TODO: handle analytics implementation will be placed here
              onImageClick={() => {
                // this.props.navigation.navigate('MerchantHeroURL', {
                //   itemId: 86,
                //   name: merchant.name,
                //   description: merchant.description,
                //   location: {
                //     lat: selectedOutlet.lat,
                //     lng: selectedOutlet.lng,
                //   },
                //   currentLocation: this.props.currentUserLocation,
                //   urls: merchant.hero_urls,
                //   hero_images_360: merchant.hero_images_360,
                // });

                // //analytics
                // const stackData = {
                //   current_screen: 'Merchant Detail',
                //   action: 'click_image',
                //   merchant_id: merchant.id,
                //   outlet_id: selectedOutlet.id,
                //   category_id: 0,
                //   categories: '',
                //   categories_analytics: '',
                //   location_id: this.state.location_id,
                //   changeSequenceNumber: false,
                // };

                // this.makeCustomAnalyticsStack(stackData);

                console.log("on image click");
              }}
            />
            <MerchantContactBar
              email={"test@gmail.com"} //TODO:
              phone={"+923333 12"} //TODO:
              onLocationClick={() => {
                // this.props.navigation.navigate('MerchantMap', {
                //   itemId: 86,
                //   name: merchant.name,
                //   description: merchant.description,
                //   location: {
                //     lat: selectedOutlet.lat,
                //     lng: selectedOutlet.lng,
                //   },
                //   currentLocation: this.props.currentUserLocation,
                // });
                // const stackData = {
                //   current_screen: 'Merchant Detail',
                //   action: 'click_outlet_location_map',
                //   merchant_id: merchant.id,
                //   outlet_id: selectedOutlet.id,
                //   category_id: 0,
                //   categories: '',
                //   categories_analytics: '',
                //   location_id: this.state.location_id,
                //   changeSequenceNumber: false,
                // };
                // this.makeCustomAnalyticsStack(stackData);
              }}
              location={{ lat: 12.121, lng: 1212 }}
              merchant={merchant}
              selectedOutlet={{}}
              pushAnalytics={() => {
                console.log("push analytics");
              }} //TODO:
            />

            <DineInOffersBar
              name={"Dine-in offers also available"}
              handleClick={() => {
                console.log("handle this");
              }} //TODO: fix me
              // isRTL={isRTL}
              i18n={i18n}
            />
            <View style={{ backgroundColor: "white" }}>
              <View style={styles.offerFeaturesParetnt}>
                {merchant.offersDetail.map((item: any, index: number) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <CustomText
                        style={{
                          marginTop: 10,
                          fontSize: 12,
                          fontStyle: "normal",
                          letterSpacing: 0,
                          color: design["Text_Color"],
                        }}
                      >
                        {item.name}
                      </CustomText>
                      <CustomText
                        style={{
                          marginTop: 10,
                          fontSize: 12,
                          fontStyle: "normal",
                          letterSpacing: 0,
                          color: design["Text_Color"],
                        }}
                      >
                        {item.value}
                      </CustomText>
                    </View>
                  );
                })}
              </View>
            </View>

            <MenuTabs
              tabs={tabs}
              activeTab={menuActiveTab}
              onChangeTab={(index, tabItem) => {
                setMenuProductsList(
                  fetchMenuProductsList(index, merchant.menus)
                );
                setMenuActiveTab(index);
              }}
              getFlipForRTLStyle={getFlipForRTLStyle}
            />

            <MenuProductList menuProductsList={menuProductsList[0]} />
          </ScrollView>
          <View
            style={{
              backgroundColor: "red",
              height: 55,
              position: "absolute",
              bottom: 0,
              width: "100%",
              zIndex: 100,
              flexDirection: "row",
              alignItems: "center",
              ...padding(5),
            }}
          >
            <View
              style={{
                ...borderWidth(1),
                ...borderColor("white"),
                borderRadius: 15,
                height: 30,
                width: 30,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: PRIMARY_EXTRABOLD,
                  fontSize: 13,
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                12
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: PRIMARY_EXTRABOLD,
                  fontSize: 16,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                VIEW BASKET
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                ...padding(5),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: PRIMARY_EXTRABOLD,
                  fontSize: 16,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                AED 4444.00
              </Text>
              <Text
                style={{
                  fontFamily: PRIMARY_EXTRABOLD,
                  fontSize: 10,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Before Savings
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default DeliveryOutletDetail;

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: PRIMARY,
  },
  modalStyle: {
    ...margin(0),
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  cmParent: {
    flex: 1,
    backgroundColor: design["Background_Secondary_Color"],
  },
  cmHeader: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: design["Background_Secondary_Color"],
    justifyContent: "flex-end",
  },
  cmCloseButton: {
    paddingEnd: 10,
    paddingTop: 3,
    paddingBottom: 0,
  },
  logoParent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: 80,
    width: 80,
  },
  offerFeaturesParetnt: {
    height: 70,
    backgroundColor: "lightgrey",
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  outletName: {
    marginTop: 10,
    fontFamily: PRIMARY,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "rgb(79,153,210)",
  },

  outletDetail: {
    marginTop: 10,
    fontFamily: PRIMARY,
    fontSize: 16,
    textAlign: "center",
    color: "rgb(79,153,210)",
  },

  cmOutletsCount: {
    alignItems: "center",
    flexDirection: "row",
    height: 35,
    backgroundColor: "grey",
    justifyContent: "center",
  },
  cmOutletsCountText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: "white",
    paddingStart: 10,
  },

  doneButton: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    paddingEnd: 10,
  },
  listItemSelected: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    color: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
    paddingStart: 15,
    backgroundColor: "rgb(237, 237, 237)",
  },
  listItem: {
    flexDirection: "row",
    height: 65,
    color: "grey",
    alignItems: "center",
    paddingStart: 15,
    borderBottomWidth: 0.7,
  },
  listItemText: {
    color: "grey",
    flex: 1,
    fontFamily: PRIMARY_BOLD,
  },
  distanceText: {
    color: "grey",
    paddingEnd: 20,
    fontFamily: PRIMARY_BOLD,
  },

  cmFooterParent: {
    backgroundColor: "#f2f1f1",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  eightPointBurst: {},
  eightPointBurst20: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    transform: [{ rotate: "20deg" }],
  },
  eightPointBurst155: {
    width: 20,
    height: 20,
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    left: 0,
    transform: [{ rotate: "155deg" }],
  },
});
