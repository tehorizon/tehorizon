import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text/Text";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { design } from "rn_fast_track_uilib";
//local imports
import APP_COLORS from "@colors";
import { TouchableOpacity } from "react-native";
import { Header as RNHeader } from "react-native-elements";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { padding } from "@utils/genericStyles";

interface headerProps {
  fav: boolean;
  headerTitle: string;
  onBack: () => void;
  onSetFavourite: () => void;
}

const header = (props: headerProps) => {
  const { headerTitle, onBack, onSetFavourite, fav } = props;
  return (
    <View style={STYLES.headerParent}>
      <View style={STYLES.headerLeft}>
        <AntDesign
          style={{ ...padding(10) }}
          name="caretleft"
          size={14}
          color={"#9F9F9F"}
          onPress={() => {
            onBack();
          }}
        />
      </View>
      <Text style={STYLES.headerTitle}>{headerTitle}</Text>
      <View style={STYLES.headerRight}>
        <Ionicons
          name="ios-star-outline"
          size={28}
          color={
            fav === true ? APP_COLORS.COLOR_f7ce4f : APP_COLORS.COLOR_999999
          }
          onPress={() => {
            onSetFavourite();
          }}
        />
      </View>
    </View>
  );
};
export default class HeaderWithBackButton extends PureComponent {
  headerLeftComponent() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.onBack}
        style={{
          ...padding(10),
          marginLeft: -5,
        }}
      >
        <AntDesign
          name="caretleft"
          color={design["Header_Icon_Color"]}
          size={16}
        />
      </TouchableOpacity>
    );
  }

  headerCenterComponent() {
    return (
      <Text
        style={{
          fontSize: 16,
          justifyContent: "center",
          textAlign: "center",
          fontFamily: PRIMARY,
          color: design["Header_Title_Primary_Color"],
        }}
      >
        {this.props.headerTitle}
      </Text>
    );
  }

  headerRightComponent() {
    return this.props.onSetFavourite ? (
      <TouchableOpacity
        onPress={() => {
          this.props.onSetFavourite();
        }}
        activeOpacity={1}
        style={{
          ...padding(10),
          marginRight: -5,
        }}
      >
        <Ionicons
          name="ios-star-outline"
          size={25}
          color={
            this.props.fav === true
              ? APP_COLORS.COLOR_f7ce4f
              : APP_COLORS.COLOR_999999
          }
          onPress={() => {
            this.props.onSetFavourite();
          }}
        />
      </TouchableOpacity>
    ) : null;
  }

  render() {
    // const {title} = this.props;
    return (
      <RNHeader
        containerStyle={{
          borderBottomColor: APP_COLORS.LIGHT_GREY,
          borderBottomWidth: 1,
          paddingTop: 0,
          height: 45,
        }}
        backgroundColor={
          design["Header_Background_Primary_Color"]
            ? design["Header_Background_Primary_Color"]
            : APP_COLORS.COLOR_BACKGROUND
        }
        leftComponent={this.headerLeftComponent()}
        centerComponent={this.headerCenterComponent()}
        rightComponent={this.headerRightComponent()}
      />
    );
  }
}

// export default HeaderWithBackButton;

const STYLES = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

  //header Style
  headerParent: {
    flex: 1,
    flexDirection: "row",
    height: 47,
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: 2,
    backgroundColor: design["Primary_Color"]
      ? design["Primary_Color"]
      : "transparent",
  },
  headerLeft: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headerTitle: {
    flex: 0.6,
    fontSize: 16,
    fontFamily: PRIMARY,
    color: APP_COLORS.COLOR_2a2a2a,
  },
  headerRight: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingEnd: 20,
  },

  //change Location styles
  changeLocationParent: {
    flex: 1,
    backgroundColor: APP_COLORS.COLOR_WHITE,
    borderRadius: 10,
    overflow: "hidden",
  },
  changeLocationHeader: {
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    backgroundColor: APP_COLORS.COLOR_WHITE,
    justifyContent: "center",
  },
  changeLocationHeaderText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: "black",
    paddingStart: 10,
  },
  changeLocationOutletsCount: {
    alignItems: "center",
    flexDirection: "row",
    height: 35,
    backgroundColor: APP_COLORS.COLOR_666666,
    justifyContent: "center",
  },
  changeLocationOutletsCountText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: APP_COLORS.COLOR_WHITE,
    paddingStart: 10,
  },

  changeLocationListItemSelected: {
    flexDirection: "row",
    height: 65,
    color: "grey",
    alignItems: "center",
    paddingStart: 15,
    borderBottomWidth: 0.7,
    backgroundColor: APP_COLORS.COLOR_OVERLAY,
  },
  changeLocationListItem: {
    flexDirection: "row",
    height: 65,
    color: "grey",
    alignItems: "center",
    paddingStart: 15,
    borderBottomWidth: 0.7,
  },
  changeLocationListItemText: {
    color: "grey",
    flex: 1,
    fontFamily: PRIMARY_BOLD,
  },
  changeLocationDistanceText: {
    color: "grey",
    paddingEnd: 20,
    fontFamily: PRIMARY_BOLD,
  },

  changeLocationFooterParent: {
    backgroundColor: APP_COLORS.COLOR_WHITE,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  changeLocationDoneButton: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    paddingEnd: 10,
  },
});
