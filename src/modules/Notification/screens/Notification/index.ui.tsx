import React from "react";
import { View } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";
import AppboyComponent from "./AppboyComponent";
import { design } from "rn_fast_track_uilib";
import { CustomSafeAreaView, HeaderWithBackButton } from "@components";
import { ScreenTypes } from "@Auth/interfaces";

export default function NotificationUI({ navigation }: ScreenTypes.screen) {
  return (
    <View
      style={{
        backgroundColor: design.Background_Primary_Color,
        flex: 1,
      }}
    >
      <View style={{ ...getFlipForRTLStyle() }}>
        <HeaderWithBackButton
          navigation={navigation}
          title={i18n.t("Notifications")}
        />
      </View>

      <AppboyComponent
        style={{
          width: "100%",
          height: "95%",
          backgroundColor: design.Background_Primary_Color,
        }}
      />
    </View>
  );
}
