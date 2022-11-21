import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Text from "../Text/Text";
import { Header } from "react-native-elements";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { margin } from "@utils/genericStyles";
import Image from "@HybridComponents/Image";
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const imageHeight = Dimensions.get("screen").height * 0.7;
const imageWidth = Dimensions.get("screen").width - 18;

export default class SwiperModal extends Component {
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

  headerCenterComponent() {
    return (
      <Text
        testID="swiperModalHeaderTitle"
        numberOfLines={1}
        style={{ fontSize: 14 }}
      >
        {this.props.headerString}
      </Text>
    );
  }

  headerRightComponent() {
    const { disableCalback } = this.props;
    return (
      <TouchableOpacity
        testID="swiperModalClose"
        activeOpacity={1}
        onPress={() => {
          disableCalback();
        }}
        style={{ marginRight: 8 }}
      >
        <Ionicons
          name="md-close"
          size={32}
          color={"rgb(200, 200, 200)"}
          onPress={() => disableCalback()}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { slidesData, isVisible, disableCalback } = this.props;

    return (
      <Modal
        animationIn="slideInDown"
        animationInTiming={700}
        animationOut="slideOutUp"
        animationOutTiming={700}
        isVisible={isVisible}
        hasBackdrop={false}
        coverScreen={true}
        onBackButtonPress={disableCalback}
        style={styles.modalStyle}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ width: "100%", height: "100%" }}>
            <Header
              containerStyle={{
                borderBottomColor: "rgb(200, 200, 200)",
                borderBottomWidth: 1,
                paddingTop: 0,
                height: 45,
                backgroundColor: "#fff",
              }}
              backgroundColor={"White"}
              centerComponent={this.headerCenterComponent()}
              rightComponent={this.headerRightComponent()}
            />

            {slidesData?.length === 0 ? (
              <View style={styles.slideContainer}>
                <Text>Sorry! No instructions available</Text>
              </View>
            ) : (
              <Swiper
                testID="swiperModal"
                showsPagination={false}
                showsButtons={false}
                loop={false}
              >
                {slidesData?.map((item, index) => (
                  <ScrollView
                    key={index}
                    style={styles.slide}
                    contentContainerStyle={styles.slideContainer}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        marginTop: 10,
                        textAlign: "center",
                      }}
                    >
                      {item?.text || ""}
                    </Text>
                    <Image
                      style={{
                        marginTop: 20,
                        height: imageHeight,
                        width: imageWidth,
                      }}
                      resizeMode="contain"
                      source={{
                        uri: item?.url,
                      }}
                    />
                  </ScrollView>
                ))}
              </Swiper>
            )}
          </View>
        </SafeAreaView>
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
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  slide: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
