import { from } from 'core-js/fn/array';
import React from 'react';
import { StyleSheet, Platform, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import colors from 'colors';
export default function WebViewScreen(props) {
  const renderLoading = () => (
    <View
      style={{
        width: '100%',
        height: 50,
        alignItems: 'center',
        position: 'absolute',
        top: 20,
      }}>
      <ActivityIndicator color="black" size="small" />
    </View>
  );

  console.log({ props });
  return (
    <WebView
      source={{ uri: props.route.params.url }}
      renderLoading={renderLoading}
      startInLoadingState={true}></WebView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
