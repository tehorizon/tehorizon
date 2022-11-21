import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Text from "../Text/Text";
import { Header } from "react-native-elements";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { Portal } from "react-native-paper";
import { CustomSafeAreaView } from "@components";
import { design } from "rn_fast_track_uilib";
import { margin } from "@utils/genericStyles";
import Modal from "@HybridComponents/Modal";
import { getFlipForRTLStyle } from "@localization";
export default class WebViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        testID="webViewLoader"
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  onError = (errorName) => {
    return (
      <View testID="webViewError" style={styles.WebViewStyle}>
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

  headerCenterComponent() {
    return (
      <Text
        testID={"webViewHeaderTitle"}
        numberOfLines={1}
        style={{ fontSize: 14, color: design["Header_Title_Primary_Color"] }}
      >
        {this.props.headerString}
      </Text>
    );
  }

  headerRightComponent() {
    const { disableCalback } = this.props;
    return (
      <TouchableOpacity
        testID="webViewClose"
        activeOpacity={1}
        onPress={() => {
          disableCalback();
        }}
        style={{ marginRight: 8 }}
      >
        <Ionicons
          name="md-close"
          size={32}
          color={design["Header_Icon_Color"]}
          onPress={() => disableCalback()}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { urlString, isVisible } = this.props;
    console.log("render webview", this.props);
    return (
      <Modal
        isVisible={isVisible}
        animationType="slide"
        style={styles.modalStyle}
      >
        <CustomSafeAreaView
          style={{
            flex: 1,
            backgroundColor: design["Background_Primary_Color"],
            ...getFlipForRTLStyle(),
          }}
        >
          <View
            testID="webViewContainer"
            style={{ width: "100%", height: "100%", zIndex: 99999 }}
          >
            <Header
              containerStyle={{
                borderBottomColor: "rgb(200, 200, 200)",
                borderBottomWidth: 1,
                paddingTop: 0,
                height: 45,
                backgroundColor: design["Header_Background_Primary_Color"],
              }}
              backgroundColor={"White"}
              centerComponent={this.headerCenterComponent()}
              rightComponent={this.headerRightComponent()}
            />

            <WebView
              // Native config
              nativeConfig={{
                props: {
                  testID: "webView",
                },
              }}
              style={styles.WebViewStyle}
              //Loading URL
              source={{ uri: urlString.replace("http://", "https://") }} //FIXME: this is not right solution
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
                console.log("WebView error: ", nativeEvent);
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;

                let f_errorName = "Web View Error";
                let f_errorMessage =
                  "Web View Http Error => " + nativeEvent.statusCode;

                //console.log('WebView received error status code: ', nativeEvent.statusCode);
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
    ...margin(0),
  },
  headerStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cacaca",
    width: "100%",
    height: 50,
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
