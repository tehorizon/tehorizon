import React, { useState } from "react";
import { Image as FastImage, ImageBackground } from "react-native";

const Image = (props) => {
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
export default Image;

export { ImageBackground };
