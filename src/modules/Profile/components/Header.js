import React from "react";
import { TouchableOpacity } from "react-native";
import i18n from "@localization";

import { design } from "rn_fast_track_uilib";

import { CustomText } from "@components";
import { AntDesign } from "@expo/vector-icons";
import { Header } from "react-native-elements";

function RNHeader(props) {
  const headerLeftComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => props.onBack()}
        style={{
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 5,
        }}
      >
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
      <CustomText
        isRTL={props.isRTL}
        style={{ fontSize: 18, color: design["Header_Title_Primary_Color"] }}
      >
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
          borderBottomColor: "rgb(200, 200, 200)",
          borderBottomWidth: 1,
          borderBottomColor: "rgb(200, 200, 200)",
          borderBottomWidth: 1,
          paddingTop: 0,
          height: 45,
          backgroundColor: design["Header_Background_Primary_Color"]
            ? design["Header_Background_Primary_Color"]
            : "#fff",
        },
        style,
      ]}
      backgroundColor={design.Header_Background_Primary_Color}
      leftComponent={headerLeftComponent()}
      centerComponent={headerCenterComponent()}
    />
  );
}

export default React.memo(RNHeader);
