import React, { useState } from "react";
import { View } from "react-native";
import FastImage, { FastImageProps } from "react-native-fast-image";

interface PROPS extends FastImageProps {
  showPlaceHolder?: boolean;
}
const Image = (props: PROPS) => {
  const [isImgLoaded, handleImgLoaded] = useState(false);

  return (
    <>
      <FastImage {...props} onLoadEnd={() => handleImgLoaded(true)} />
      {props?.showPlaceHolder && !isImgLoaded && (
        <FastImage
          style={[{ position: "absolute" }, props.style || {}]}
          source={require("@assets/icons/placeholder.png")}
          resizeMode={"contain"}
        />
      )}
    </>
  );
};

const ImageBackground = Image;
export default Image;
export { ImageBackground };
