import { InputRef } from "@components/Input";
import { PhoneNumberRef } from "@components/PhoneNumber";
import { useRoute } from "@react-navigation/core";
import { useRef, useState } from "react";
import { ScreenTypes } from "../../interfaces";
import { BottomUpModalRef } from "@components/BottomUpModal";

/* component containing the business logic separated from view for
 api call trigger */
const CIFIDServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  const route = useRoute();
  // refecnces
  const phoneNumRef = useRef<PhoneNumberRef>();
  const cifidRef = useRef<InputRef>();
  let alertRef = useRef<BottomUpModalRef>(null);
  let otpRef = useRef<BottomUpModalRef>(null);

  const [phoneNumber, updatePhoneNumber] = useState("");
  const [cifid, updateCIFID] = useState("");

  const proceedSignup = () => {
    // send saga call
    otpRef?.current?.toggleVisible();
  };
  return children({
    navigation,
    phoneNumRef,
    cifidRef,
    phoneNumber,
    cifid,
    alertRef,
    otpRef,
    updatePhoneNumber,
    updateCIFID,
    proceedSignup,
    navigation,
  } as ScreenTypes.CIFID);
};

export default CIFIDServiceComponent;
