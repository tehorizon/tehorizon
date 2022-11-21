import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import _ from "lodash";
import { isRTL } from "@localization";
import { design } from "rn_fast_track_uilib";
import { CustomSafeAreaView, CustomText, OutletFilter } from "@components";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import { PRIMARY_BOLD } from "@fast_track/src/commons/fonts";
import { SCREEN_WIDTH } from "@fast_track/src/commons/constants/constants";
import { arabicFilter, defaultFilter } from "../defaults";
import { useAppSelector } from "@redux/root-reducer";
import { borderColor } from "@fast_track/src/utils/genericStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Filters = ({
  layout,
  categoryKey,
}: {
  layout: any;
  categoryKey: string;
}) => {
  const home_sections = useAppSelector(
    (state) => state.homeReducer?.homeSections || []
  );
  const categorySection = home_sections.filter(
    (item: any) => item?.section_identifier === "categories"
  );

  const categories = categorySection[0]?.tiles;
  const routes: Array<Route> = isRTL
    ? arabicFilter.filter
        .map((x) => {
          if (categories.some((el: any) => x.category_name == el.api_name)) {
            return {
              key: x.category_id.toString(),
              title: x.category_name,
              testID: x.category_name,
              payload: x,
            };
          }
        })
        .filter((e) => e)
    : defaultFilter.filter
        .map((x) => {
          if (categories.some((el: any) => x.category_name == el.api_name)) {
            return {
              key: x.category_id.toString(),
              title: x.category_name,
              testID: x.category_name,
              payload: x,
            };
          }
        })
        .filter((e) => e);

  const index = routes?.findIndex(
    (element) => element?.payload?.category_name == categoryKey
  );
  const [activetab, setActivetab] = useState(index);

  return (
    <SafeAreaProvider>
      <CustomSafeAreaView edges={["bottom"]} style={styles.mainView}>
        {routes?.length > 0 && (
          <TabView
            navigationState={{ index: activetab, routes: routes }}
            renderScene={(screenProps) => (
              <OutletFilter
                {...screenProps}
                categoryKey={screenProps.route?.payload?.category_name}
                filters={screenProps.route?.payload?.filter_sections}
              />
            )}
            onIndexChange={(index) => setActivetab(index)}
            renderTabBar={(props) => (
              <ScrollableTabBar props={props} routes={routes} />
            )}
            initialLayout={{ width: layout.width }}
          />
        )}
      </CustomSafeAreaView>
    </SafeAreaProvider>
  );
};

const ScrollableTabBar = ({
  routes = [],
  props,
}: {
  routes: Route[];
  props: SceneRendererProps & {
    navigationState: NavigationState<Route>;
  };
}) => {
  var styleToHandleLongTabs: Object = {
    width: "auto",
    paddingHorizontal: Platform.OS != "web" && 0,
    paddingRight: 16,
  };
  // if (SCREEN_WIDTH / routes.length < 115) {
  //   styleToHandleLongTabs = {
  //     width: 115,
  //     paddingRight: 16,
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
          tabStyle={styleToHandleLongTabs}
          labelStyle={styles.tabLabelStyle}
          scrollEnabled={SCREEN_WIDTH / routes.length < 115 ? true : false}
          renderLabel={({ route, focused, color }: any) => (
            <CustomText style={[styles.tabLabelStyle, { color: color }]}>
              {route?.title}
            </CustomText>
          )}
        />
      )}
      <View style={styles.seprater} />
    </View>
  );
};
export default Filters;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Secondary_Color,
  },
  tabbar: {
    backgroundColor: design["Background_Secondary_Color"],
    marginLeft: 16,
  },
  indicatorStyle: {
    backgroundColor: design["Active_Tabs_Under_Line_Color"],
  },
  tabLabelStyle: {
    fontSize: 15,
    fontFamily: PRIMARY_BOLD,
  },
  seprater: {
    borderBottomWidth: 1,
    ...borderColor(design.Border_Color),
  },
});
