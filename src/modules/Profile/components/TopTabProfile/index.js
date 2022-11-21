import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import i18n, { isRTL } from "@localization";

import { CustomText } from "@components";
import { borderColor, borderWidth } from "@utils/genericStyles";
import { PRIMARY_EXTRABOLD } from "@fonts";
const TopTabProfile = (props) => {
  const [activeTab, setactiveTab] = useState(props.activeTab);

  useEffect(() => {
    setactiveTab(props.activeTab);
  }, [props.activeTab]);

  const onChangeTab = (tabIndex) => {
    setactiveTab(tabIndex);
    props.onChangeTab && props.onChangeTab(tabIndex);
  };

  return (
    <View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => onChangeTab(0)}
          style={[
            styles.tabGeneral,
            {
              backgroundColor:
                activeTab == 0 ? "rgb(50, 192, 168)" : "transparent",
            },
          ]}
        >
          <View>
            <CustomText
              isRTL={isRTL}
              style={[
                styles.tabTextGeneral,
                { color: activeTab == 0 ? "#FFFFFF" : "rgb(50, 192, 168)" },
              ]}
            >
              {i18n.t("MONTHLY")}
            </CustomText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChangeTab(1)}
          style={[
            styles.tabGeneral,
            {
              backgroundColor:
                activeTab == 1 ? "rgb(50, 192, 168)" : "transparent",
            },
          ]}
        >
          <View>
            <CustomText
              isRTL={isRTL}
              style={[
                styles.tabTextGeneral,
                { color: activeTab == 1 ? "#FFFFFF" : "rgb(50, 192, 168)" },
              ]}
            >
              {i18n.t("YEARLY")}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopTabProfile;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 36,
    ...borderColor("#60BDA9"),
    ...borderWidth(1),
  },
  tabGeneral: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabTextGeneral: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: PRIMARY_EXTRABOLD,
  },
});
