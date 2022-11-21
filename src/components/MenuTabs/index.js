import { padding } from "@utils/genericStyles";
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { design } from "rn_fast_track_uilib";

const halfWidth = Dimensions.get("window").width / 4;
const fullWidth = Dimensions.get("window").width;

import CustomText from "../Text/Text";
class index extends React.Component {
  state = {
    tabs: [
      {
        id: 0,
        title: "ALL OFFERS",
      },
      {
        id: 1,
        title: "CHEERS",
      },
    ],
    ativeTabIndex: this.props.activeTab ? this.props.activeTab : 0,
  };

  UNSAFE_componentWillReceiveProps(props) {
    const { activeTab } = props;
    if (activeTab !== null && activeTab !== undefined) {
      this.setState({ ativeTabIndex: activeTab });
    }
  }

  onPressTabHandler = (index, tab) => {
    this.setState({ ativeTabIndex: index });
    this.props.onChangeTab && this.props.onChangeTab(index, tab);
  };

  render() {
    const { ativeTabIndex } = this.state;
    const { tabs } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView
            horizontal
            scrollEnabled={tabs.length > 2 ? true : false}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              {console.log("tabsLength: ", tabs)}
              {tabs.map((tabItem, index) => {
                return (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => this.onPressTabHandler(index, tabItem)}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 40,
                          ...padding(10),
                        }}
                      >
                        <CustomText
                          localize
                          style={{
                            fontSize: 14,
                            color:
                              ativeTabIndex === index
                                ? design["Tabs_Title_Active_Color"]
                                : design["Tabs_Title_InActive_Color"],
                          }}
                        >
                          {tabItem.name}
                        </CustomText>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={[
                        styles.line,
                        {
                          backgroundColor:
                            ativeTabIndex === index
                              ? design["Active_Tabs_Under_Line_Color"]
                              : "white",
                        },
                      ]}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={{ backgroundColor: "red", height: 100 }}>
          <CustomText>hello</CustomText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: 40,
    backgroundColor: design["Header_Background_Primary_Color"],
  },
  line: {
    height: 7,
  },
});

export default index;
