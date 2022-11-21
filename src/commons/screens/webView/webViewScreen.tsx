import { from } from 'core-js/fn/array';
import React from 'react';
import { StyleSheet, Platform, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

export const WebViewScreen = (props) => {
  const { screenContainer } = styles;
  const appReducer = useSelector((state) => state.appReducer);
  const { response } = appReducer;
  const { cart_url = '' } = response;
  const { params } = props.route;
  const url =
    cart_url +
    '&' +
    'show_close_button=true' +
    '&product_id=' +
    params?.product_id +
    `&platform=${Platform.OS}`;

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (url.includes('close_view')) {
      const { navigation } = props;
      console.log(url);
      navigation.pop();
    }
  };

  const renderLoading = () => (
    <ActivityIndicator
      color={'blue'}
      size="large"
      style={{ position: 'absolute', height: '100%', width: '100%' }}
    />
  );

  console.log(url);

  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      renderLoading={renderLoading}
      startInLoadingState={true}></WebView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
