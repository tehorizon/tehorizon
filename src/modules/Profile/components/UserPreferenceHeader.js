import React from "react";
import { TouchableOpacity } from "react-native";
import i18n from "@localization";

//import { Header as RNHeader } from 'react-native-elements';
import { CustomText } from "@components";

import { design } from "rn_fast_track_uilib";

import { AntDesign } from "@expo/vector-icons";
import { Header } from "react-native-elements";

export default function HeaderComponent(props) {
  const headerLeftComponent = () => {
    return (
      <TouchableOpacity onPress={() => props.onBack()}>
        <AntDesign
          name="caretleft"
          color={design["Header_Icon_Color"]}
          size={16}
        />
      </TouchableOpacity>
    );
  };

  const headerCenterComponent = () => {
    return (
      <CustomText isRTL={props.isRTL} style={{ fontSize: 18 }}>
        {props.title}
      </CustomText>
    );
  };

  const headerRightComponent = () => {
    return (
      <TouchableOpacity>
        <CustomText isRTL={props.isRTL}>{i18n.t("Update")}</CustomText>
      </TouchableOpacity>
    );
  };

  const { style } = props;
  return (
    <Header
      containerStyle={[
        {
          orderBottomColor: "rgb(200, 200, 200)",
          borderBottomWidth: 1,
          borderBottomColor: "rgb(200, 200, 200)",
          borderBottomWidth: 1,
          paddingTop: 0,
          height: 45,
          backgroundColor: "#fff",
        },
        style,
      ]}
      backgroundColor={design.Header_Background_Primary_Color}
      leftComponent={headerLeftComponent()}
      centerComponent={headerCenterComponent()}
    />
  );
}
