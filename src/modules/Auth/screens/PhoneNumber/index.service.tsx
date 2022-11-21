import { useRoute } from "@react-navigation/core";
import { useAppSelector } from "@redux/root-reducer";
import { useCallback } from "react";
import { ScreenTypes } from "../../interfaces";

/* component containing the business logic separated from view for
 api call trigger */
const PhoneNumberServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  const route = useRoute();
  const appConfigs = useAppSelector((state) => state?.appReducer?.AppConfigs);

  /**
   * validate number and call API
   */
  const validatePhoneNumber = useCallback(() => {}, []);

  return children({
    navigation,
    appConfigs,
    validatePhoneNumber,
  } as ScreenTypes.phoneNumber);
};

export default PhoneNumberServiceComponent;
