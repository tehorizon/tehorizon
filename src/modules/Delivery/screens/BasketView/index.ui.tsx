import { ScreenTypes } from "../../interfaces";
import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";
import { HeaderWithBackButton } from "@components";
import styles from "./styles";
import I18n from "@localization";

const BasketViewScreen = ({
  source,
  showProgress,
  originWhitelist,
  onLoadEnd,
  //methods
  navigationStateChange,
}: ScreenTypes.BasketView) => {
  return (
    <View style={styles.mainView}>
      <HeaderWithBackButton title={I18n.t("Order Basket")} />

      {source?.body != "" ? (
        <WebView
          onNavigationStateChange={navigationStateChange}
          originWhitelist={originWhitelist}
          onLoadEnd={onLoadEnd}
          source={source}
        />
      ) : (
        <Text></Text>
      )}

      {showProgress && (
        <View style={styles.loadingView}>
          <ActivityIndicator color={"blue"} size="large" />
        </View>
      )}
    </View>
  );
};

export default BasketViewScreen;
