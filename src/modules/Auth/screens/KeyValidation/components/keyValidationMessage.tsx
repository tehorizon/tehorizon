import React from "react";

import { CustomText } from "@components";
import { PRIMARY } from "@fonts";
const keyValidationMessage = ({ message }: { message: { text: string } }) => {
  return (
    <CustomText
      style={{
        ...message.options,
        fontSize: 15,
        fontFamily: PRIMARY,
      }}
    >
      {message.text + " "}
    </CustomText>
  );
};

export default keyValidationMessage;
