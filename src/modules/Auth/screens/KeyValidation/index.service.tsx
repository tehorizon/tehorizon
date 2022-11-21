import { ScreenTypes } from "../../interfaces";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  setAppLoading,
  setErrorObject,
  setKeyValidationData,
} from "@redux/appReducer/app.actions";
import { useAppSelector } from "@redux/root-reducer";

import AuthBL from "@Auth/BL";

/* component containing the business logic separated from view for
 api call trigger */
const KetValidationServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  //declarations
  const dispatch = useDispatch();

  //refrences of input fields
  const emailInputRef = useRef(null);
  const keyInput1 = useRef(null);
  const keyInput2 = useRef(null);
  const keyInput3 = useRef(null);

  //app states or selectors
  const appConfig = useAppSelector((state) => state?.appReducer?.AppConfigs);
  const token = useAppSelector((state) => state?.appReducer?.userSessionToken);

  const [email, setEmail] = useState("");
  const [keyInputValue1, setKeyInputValue1] = useState("");
  const [keyInputValue2, setKeyInputValue2] = useState("");
  const [keyInputValue3, setKeyInputValue3] = useState("");

  //actions use Reducers
  const onAppLoading = (data: boolean) => dispatch(setAppLoading(data));
  const onSetErrorMessage = (data: any) => dispatch(setErrorObject(data));
  const onSetKeyValidationData = (data: any) =>
    dispatch(setKeyValidationData(data));

  //handling effects
  useEffect(() => {}, [appConfig]);

  //temp consoles
  console.log(appConfig, "temp console");

  const handleSubmit = async () => {
    try {
      //validation

      //api calling
      onAppLoading(true);
      const vipKey = keyInputValue1 + keyInputValue2 + keyInputValue3;
      const response = await AuthBL.ValidateVipKey(token, vipKey, email);
      onAppLoading(false);
      console.log(response);

      if (
        response?.is_customer_exists === true &&
        response?.validation_status === true
      ) {
        //navigate to login screen
        //saving key and email to redux to use on login screen
        const type = "LoginSuccess";
        onSetKeyValidationData({
          key: vipKey,
          email: email,
          is_customer_exists: response?.is_customer_exists,
          validation_status: response?.validation_status,
          type: type,
        });
        navigation.navigate("Registeration", { type: type });
      } else if (
        response?.is_customer_exists === false &&
        response?.validation_status === true
      ) {
        //navigate to Register screen
        //saving key and email to redux to use on Register screen
        const type = "RegisterSuccess";
        onSetKeyValidationData({
          key: vipKey,
          email: email,
          is_customer_exists: response?.is_customer_exists,
          validation_status: response?.validation_status,
          type: type,
        });
        navigation.navigate("Registeration", { type: type });
      } else {
        //show error
        onSetErrorMessage({
          status: true,
          message: appConfig.keyValidationGenericErrorMessage
            ? appConfig.keyValidationGenericErrorMessage
            : "Invalid validation",
        });
      }
    } catch (error) {
      onAppLoading(false);
      console.log(error);
      onSetErrorMessage({ status: true, message: error.message });
    }
  };

  const onChangeInput1 = useCallback(
    (e) => {
      if (e.length === 3) {
        setKeyInputValue1(e);
        keyInput2?.current?.focus();
      } else {
        setKeyInputValue1(e);
      }
    },
    [keyInput2]
  );

  const onChangeKeyInput2 = useCallback(
    (e) => {
      if (e.length === 3) {
        setKeyInputValue2(e);
        keyInput3?.current?.focus();
      } else if (e.length === 0) {
        setKeyInputValue2(e);
        keyInput1?.current?.focus();
      } else {
        setKeyInputValue2(e);
      }
    },
    [keyInput3, keyInput1]
  );

  const onChangeKeyInput3 = useCallback(
    (e) => {
      if (e.length === 3) {
        setKeyInputValue3(e);
      } else if (e.length === 0) {
        setKeyInputValue3(e);
        keyInput2?.current?.focus();
      } else {
        setKeyInputValue3(e);
      }
    },
    [keyInput2]
  );

  const onSignup = useCallback(() => {
    navigation.navigate("Registeration", { type: "RegisterSuccess" });
  }, [navigation]);

  const onEmailSubmit = useCallback(() => {
    keyInput1?.current?.focus();
  }, [keyInput1]);

  const onKeyInput1Submit = useCallback(() => {
    keyInput2?.current?.focus();
  }, [keyInput2]);
  return children({
    email,
    appConfig,
    keyInput1,
    emailInputRef,
    keyInputValue1,
    keyInput2,
    keyInputValue2,
    keyInput3,
    keyInputValue3,
    // methods
    setEmail,
    onChangeInput1,
    onChangeKeyInput2,
    onChangeKeyInput3,
    handleSubmit,
    onSignup,
    onEmailSubmit,
    onKeyInput1Submit,
  });
};

export default KetValidationServiceComponent;
