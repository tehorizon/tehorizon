import React from "react";
import { Image } from "react-native";

const CompanyHeaderLogo = (props) => {
  const { getFlipForRTLStyle } = props;
  return (
    <Image
      style={{
        alignSelf: "center",
        resizeMode: "contain",
        height: 60,
        marginTop: 0,
        ...getFlipForRTLStyle(),
      }}
      source={require("@assets/images/companyHeader.png")}
    />
  );
};

export default CompanyHeaderLogo;
