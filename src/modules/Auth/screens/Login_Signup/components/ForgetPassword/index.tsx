import React, {
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { View, Platform, UIManager, LayoutAnimation } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

import { CustomText, CustomInput } from "@components";
import BlurView from "@HybridComponents/BlurView";
import emailValidation from "@Auth/BL/Validator";
interface PROPS {
  disable: () => void;
  submitEmail: (email: string) => void;
  isVisible?: boolean;
  dataString?: string;
}

export interface ForgetRefObj {
  handleDisable: () => void;
  handleSubmit: () => void;
  toggleVisibility: (arg: boolean) => void;
}
let intensity = Platform.OS == "ios" ? 5 : 50;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ForgetPassword = React.forwardRef(
  (props: PROPS, ref: Ref<ForgetRefObj>) => {
    const [isVisible, toggleVisible] = useState(false);
    let { disable = () => {}, submitEmail = () => {}, dataString = "" } = props;

    const [email, setEmail] = useState(dataString);
    const [textError, toggleTextError] = useState(false);

    /**
     * only call when email change after error
     */
    useEffect(() => {
      if (textError) {
        toggleTextError(false);
      }
    }, [email]);

    useImperativeHandle(ref, () => ({
      handleDisable,
      handleSubmit,
      toggleVisibility,
    }));

    const handleDisable = useCallback(() => {
      setEmail("");
      disable();
    }, [disable]);

    const handleSubmit = () => {
      if (emailValidation(email)) {
        // callback
        submitEmail(email);
        disable();
      } else {
        toggleTextError(true);
      }
    };

    const toggleVisibility = (status: boolean) => {
      if (status) {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, "easeInEaseOut", "opacity")
        );
      }
      toggleVisible(status);
    };
    return isVisible ? (
      <BlurView
        style={[styles.centeredView, getFlipForRTLStyle()]}
        blurAmount={intensity}
        blurType="dark"
        testID="forgetPasswordModal"
      >
        <View style={styles.modalView}>
          <Ionicons
            testID="resetCrossIcon"
            style={styles.iconStyle}
            name="md-close"
            size={30}
            color="#b5b5b5"
            onPress={handleDisable}
          />
          <CustomText style={styles.forgetPasstext}>
            {i18n.t("FORGOT_PASSWORD")}
          </CustomText>

          <CustomText style={styles.modalText} testID="forgetHeading">
            {i18n.t("ENTER_REGISTERED_EMAIL")}
          </CustomText>

          <CustomInput
            testID="forgetEmail"
            autoFocus
            style={{
              color: textError === true ? "red" : "black",
            }}
            customStyle={styles.inputStyle}
            value={email}
            placeholder={i18n.t("REGISTER_EMAIL")}
            placeholderTextColor="rgb(191,191, 197)"
            onChangeText={setEmail}
            onSubmitEditing={handleSubmit}
            autoCapitalize="none"
            multiline={false}
            keyboardType={"email-address"}
          />
        </View>
      </BlurView>
    ) : null;
  }
);

export default ForgetPassword;
