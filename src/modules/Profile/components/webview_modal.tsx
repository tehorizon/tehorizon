import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { CustomSafeAreaView } from "@components";

export default class WebViewModal extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  onError = (errorName) => {
    return (
      <View style={styles.WebViewStyle}>
        <Text
          style={{
            textAlign: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {errorName}
        </Text>
      </View>
    );
  };

  render() {
    const { urlString, isVisible, disableCalback, headerString } = this.props;
    return (
      <Modal
        animationIn="slideInDown"
        animationInTiming={700}
        animationOut="slideOutUp"
        animationOutTiming={700}
        isVisible={isVisible}
        hasBackdrop={false}
        coverScreen={true}
        style={styles.modalStyle}
      >
        <CustomSafeAreaView style={{ flex: 1 }}>
          <View
            style={{ backgroundColor: "white", width: "100%", height: "100%" }}
          >
            <View style={styles.headerStyle}>
              <Text>{headerString}</Text>
              <Ionicons
                style={styles.iconStyle}
                name="md-close"
                size={32}
                color="grey"
                onPress={() => disableCalback()}
              />
            </View>

            <WebView
              style={styles.WebViewStyle}
              //Loading URL
              source={{ uri: urlString }}
              //Enable Javascript support
              javaScriptEnabled={true}
              //For the Cache
              domStorageEnabled={true}
              cacheEnabled={true}
              //show vertical scrol indicator
              showsVerticalScrollIndicator={true}
              //View to show while loading the webpage
              renderLoading={this.ActivityIndicatorLoadingView}
              // //Want to show the view or not
              startInLoadingState={true}
              onLoad={(syntheticEvent) => {}}
              //error handling
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
              }}
              renderError={(errorName) => this.onError(errorName)}
            />
          </View>
        </CustomSafeAreaView>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalStyle: {
    marginStart: 0,
    marginEnd: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  headerStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderBottomWidth: 0.2,
  },
  iconStyle: {
    position: "absolute",
    right: 16,
  },
  WebViewStyle: {
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  ActivityIndicatorStyle: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

// export default App;
