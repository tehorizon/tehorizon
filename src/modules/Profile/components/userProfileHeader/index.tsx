import React from "react";
import { TouchableOpacity } from "react-native";
import { Header as RNHeader } from "react-native-elements";
import { CustomText } from "@components";
import profileRefreshImage from "../../images/refresh-icon.png";
import settingImage from "../../images/setting-icon.png";
import { design } from "rn_fast_track_uilib";
import Image from "@HybridComponents/Image";

export default function Header(props: any) {
  const headerLeftComponent = () => {
    return (
      <TouchableOpacity
        testID={"headerLeftButton"}
        activeOpacity={1}
        onPress={() => {
          props.onPressBack();
        }}
        style={{ marginLeft: 8 }}
      >
        <Image
          source={profileRefreshImage}
          style={{
            height: 25,
            width: 25,
            tintColor: design["Header_Icon_Color"],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const headerCenterComponent = () => {
    return (
      <CustomText
        style={{ fontSize: 18, color: design["Header_Title_Primary_Color"] }}
      >
        {props.title}
      </CustomText>
    );
  };

  const headerRightComponent = () => {
    return (
      <TouchableOpacity
        testID={"headerRightButton"}
        activeOpacity={1}
        onPress={() => {
          props.onPressRightButton();
        }}
        style={{ marginRight: 8 }}
      >
        <Image
          source={settingImage}
          style={{
            height: 25,
            width: 25,
            tintColor: design["Header_Icon_Color"],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  return (
    <RNHeader
      containerStyle={{
        borderBottomColor: design.Border_Color,
        borderBottomWidth: 1,
      }}
      backgroundColor={
        design["Header_Background_Primary_Color"]
          ? design["Header_Background_Primary_Color"]
          : "white"
      }
      leftComponent={headerLeftComponent()}
      centerComponent={headerCenterComponent()}
      rightComponent={headerRightComponent()}
    />
  );
}
