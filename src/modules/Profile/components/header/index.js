import React from "react";
import { TouchableOpacity } from "react-native";
import { Header as RNHeader } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import Text from "../Text/Text.js";
import i18n from "@localization";
import { design } from "rn_fast_track_uilib";

export default function Header(props) {
  const headerLeftComponent = () => {
    return (
      <TouchableOpacity onPress={props.onBack}>
        <AntDesign name="caretleft" color={"rgb(143, 143, 143)"} size={16} />
      </TouchableOpacity>
    );
  };

  const headerCenterComponent = () => {
    return <Text style={{ fontSize: 18 }}>{props.title}</Text>;
  };

  const headerRightComponent = () => {
    return (
      <TouchableOpacity>
        <Text>{i18n.t("Update")}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <RNHeader
      containerStyle={{
        borderBottomColor: "rgb(200, 200, 200)",
        borderBottomWidth: 1,
      }}
      backgroundColor={design.Background_Primary_Color}
      leftComponent={headerLeftComponent()}
      centerComponent={headerCenterComponent()}
    />
  );
}
