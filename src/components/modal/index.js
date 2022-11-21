import React, { Component, Children } from "react";
import { View, Dimensions, StyleSheet } from "react-native";

import TextLabel from "../Text/Text";
import BorderButton from "../Buttons/BorderButton";
import { design } from "rn_fast_track_uilib";
import Modal from "@HybridComponents/Modal";
import { PRIMARY_EXTRABOLD } from "@fonts";

const height = Dimensions.get("window").height;

export default class ChangeLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_outlet: null,
    };
  }

  render() {
    const {
      isVisible,
      title,
      isDoneButton,
      doneButtonText,
      type,
      onPress,
      children,
    } = this.props;

    let modalHeight = height;
    switch (type) {
      case "lg":
        modalHeight = height / 1.2;
        break;

      case "md":
        modalHeight = height / 1.5;
        break;

      case "sm":
        modalHeight = height / 2;
        break;
    }

    return (
      <Modal
        animationIn="slideInDown"
        animationInTiming={700}
        animationOut="slideOutUp"
        animationOutTiming={700}
        isVisible={isVisible}
        hasBackdrop={true} //true due to design requirement
        backdropOpacity={0.5}
        //style={STYLES.modalStyle} //commented out due to android design
      >
        <View
          style={[
            {
              height: modalHeight,
              width: "100%",
            },
            styles.container,
          ]}
        >
          <View style={styles.headerContainer}>
            <TextLabel
              style={{
                fontSize: 16,
                color: design["Primary_Color"],
                fontFamily: PRIMARY_EXTRABOLD,
              }}
            >
              {title}
            </TextLabel>
          </View>

          <View style={{ paddingBottom: isDoneButton ? 100 : 0 }}>
            {children}
          </View>

          {isDoneButton && (
            <View style={styles.footerContainer}>
              <View style={{ width: 100 }}>
                <BorderButton
                  onPress={onPress}
                  title={doneButtonText}
                  height={30}
                  style={{
                    height: 30,
                  }}
                  textStyle={{
                    fontSize: 14,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: design["Background_Secondary_Color"],
    borderRadius: 10,
    overflow: "hidden",
  },
  headerContainer: {
    alignItems: "center",
    height: 50,
    backgroundColor: design["Header_Background_Secondary_color"],
    justifyContent: "center",
    borderBottomColor: design["Primary_Color"],
    borderBottomWidth: 4,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: design["Header_Background_Secondary_color"],
  },
});

// export default App;
