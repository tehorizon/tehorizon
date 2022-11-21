import React from "react";
import { BlurView } from "expo-blur";

const BlurViewWeb = (props) => {
  const { children, blurType, blurAmount } = props;
  return (
    <BlurView tint={blurType} intensity={blurAmount} {...props}>
      {children}
    </BlurView>
  );
};
export default BlurViewWeb;
