import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { ScreenTypes } from "../../interfaces";
let timer;

/* component containing the business logic separated from view for
 api call trigger */
const OTPServiceComponent = ({ children, navigation }: ScreenTypes.screen) => {
  const route = useRoute();
  const [countdown, updateCountDown] = useState(600); // sec
  const [isResending, toggleResending] = useState(false); // sec

  const onCodeFilled = (code: string) => {
    console.log(`Code is ${code}, you are good to go!`);
  };

  return children({
    navigation,
    onCodeFilled,
    countdown,
    isResending,
  } as ScreenTypes.OTP);
};

export default OTPServiceComponent;
