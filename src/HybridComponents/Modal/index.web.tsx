import React from "react";
import { Modal, View, ViewStyle } from "react-native";

interface PROPS {
  children: any;
  isVisible: boolean;
  animationType?: "fade" | "slide";
  transparent?: boolean;
  backdropOpacity?: number;
  style: ViewStyle;
}

let CModal = (props: PROPS) => {
  let {
    children,
    isVisible,
    animationType = "fade",
    transparent = true,
    backdropOpacity = 1,
    style = {},
  } = props;
  return (
    <Modal
      visible={isVisible}
      animationType={animationType}
      {...props}
      transparent={transparent}
    >
      <View
        style={[
          {
            flex: 1,
            backgroundColor: `rgba(0,0,0,${backdropOpacity})`,
          },
          style,
        ]}
      >
        {children}
      </View>
    </Modal>
  );
};
export default CModal;
