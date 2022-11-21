import React, { ReactElement } from "react";
import { View, TouchableOpacity, Pressable, Platform } from "react-native";
import _ from "lodash";
import i18n, { getFlipForRTLStyle, isRTL } from "@localization";
import { design } from "rn_fast_track_uilib";
import {
  OutletHeader1,
  CustomSearchBar,
  CustomChipList,
  CustomSafeAreaView,
  OutletFilter,
  BottomSheet,
  CustomText,
  HeaderWithBackButton,
  Filters,
} from "@components";
import { ScreenTypes } from "../../interfaces";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import OutletTab from "../outletTab";
import styles from "./styles";
import { SCREEN_WIDTH } from "@fast_track/src/commons/constants/constants";

import { SCREEN_HEIGHT } from "@commons/constants/constants";
import Image from "@fast_track/src/HybridComponents/Image";
import FilterHeader from "@fast_track/src/components/filters/FilltersTabView/Header";

const listIcon = require("@assets/images/list-icon.png");
const mapIcon = require("@assets/images/map-icon.png");
//component containing the view of Outlet screen
const OutletView = ({
  // props
  mode,
  routes,
  route,
  mapRendered,
  activeTab,
  layout,
  category,
  bottomSheetRef,
  chipsData,
  forceRefresh,
  travelLocation,
  navigation,
  updateActiveTab,
  backHandler,
  onPressRightButton,
  onSearchCLickHandler,
  onClickFilter,
  onDeleteChip,
  onDoneHanlder,
  onClearHandler,
  onSetSelectedFilter,
}: ScreenTypes.OutletScreen) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomSafeAreaView
        edges={["left", "right"]}
        style={[styles.mainView, getFlipForRTLStyle()]}
      >
        <View style={styles.conatiner}>
          {/* <OutletHeader1
            onPressBack={backHandler}
            onPressRightButton={onPressRightButton}
            mode={mode}
            hasGms={deviceInfo.hasGms}
            travelLocation={travelLocation}
          /> */}
          <HeaderWithBackButton
            title={category.display_name}
            navigation={navigation}
            onPressBack={backHandler}
            rightComponent={() => (
              <Pressable onPress={onPressRightButton}>
                <Image
                  source={mode == "List" ? mapIcon : listIcon}
                  style={[styles.mapIcon, getFlipForRTLStyle()]}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          />
          <CustomSearchBar
            onSearchPress={onSearchCLickHandler}
            onClickFilter={onClickFilter}
            badge={chipsData?.length}
          />
          <CustomChipList chipsData={chipsData} onDeleteChip={onDeleteChip} />
          <TabView
            navigationState={{ index: activeTab, routes }}
            renderScene={(screenProps) => (
              <OutletTab
                mode={mode}
                mapRendered={mapRendered}
                activeTabLocal={activeTab}
                activeTab={screenProps?.route?.payload}
                route={route}
                tab={screenProps.route.title}
                onSetSelectedFilter={onSetSelectedFilter}
                forceRefresh={forceRefresh}
                travelLocation={travelLocation}
              />
            )}
            onIndexChange={updateActiveTab}
            lazy
            renderTabBar={(props) => (
              <ScrollableTabBar props={props} routes={routes} />
            )}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </CustomSafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        modalHeight={SCREEN_HEIGHT - 58}
        header={
          <FilterHeader
            theme="primary"
            onDoneHanlder={onDoneHanlder}
            onClearHandler={onClearHandler}
          />
        }
      >
        <Filters
          theme="primary"
          layout={layout}
          categoryKey={category.api_name}
        />
      </BottomSheet>
    </View>
  );
};

const ScrollableTabBar = ({
  routes = [],
  props,
  children,
}: {
  routes: Route[];
  props: SceneRendererProps & {
    navigationState: NavigationState<Route>;
  };
  children?: ReactElement | ReactElement[];
}) => {
  var styleToHandleLongTabs: Object = {
    width: "auto",
    paddingHorizontal: Platform.OS == "web" ? 10 : "auto",
  };
  // if (SCREEN_WIDTH / routes.length < 115) {
  //   styleToHandleLongTabs = {
  //     width: 115,
  //   };
  // }

  return (
    <View>
      {routes?.length > 0 && (
        <TabBar
          {...props}
          indicatorStyle={styles.indicatorStyle}
          style={styles.tabbar}
          getTestID={({ route }) => route.title}
          activeColor={design["Tabs_Title_Active_Color"]}
          inactiveColor={design["Tabs_Title_InActive_Color"]}
          tabStyle={[
            styleToHandleLongTabs,
            Platform.OS == "web" && { paddingHorizontal: 10 },
          ]}
          labelStyle={styles.tabLabelStyle}
          scrollEnabled={SCREEN_WIDTH / routes.length < 115 ? true : false}
          renderLabel={_renderLabel}
        />
      )}
      {routes?.length > 0 && children}
    </View>
  );
};
export default OutletView;

const _renderLabel = ({ route, focused, color }: any) => (
  <CustomText style={[styles.tabLabelStyle, { color: color }]}>
    {route?.title}
  </CustomText>
);
