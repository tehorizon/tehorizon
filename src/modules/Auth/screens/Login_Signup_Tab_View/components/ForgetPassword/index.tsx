import React, {
  Component,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import i18n from "@localization";
import { design } from "rn_fast_track_uilib";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

import { CustomText, CustomInput } from "@components";
import { PRIMARY_EXTRABOLD } from "@fonts";
import { borderColor, borderWidth, padding } from "@utils/genericStyles";
import { BlurView } from "expo-blur";
interface PROPS {
  disable: () => void;
  submitEmail: (email: string) => void;
  isVisible?: boolean;
  dataString?: string;
}

interface RefObj {
  validateEmail: (email: string) => void;
  handleDisable: () => void;
  handleSubmit: () => void;
}
let intensity = Platform.OS == "ios" ? 20 : 50;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ForgetPassword = React.forwardRef((props: PROPS, ref: Ref<RefObj>) => {
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
    validateEmail: validateEmail,
    handleDisable: handleDisable,
    handleSubmit: handleSubmit,
    toggleVisibility: toggleVisibility,
  }));

  const validateEmail = useCallback((email: string) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
  }, []);

  const handleDisable = useCallback(() => {
    setEmail("");
    disable();
  }, [disable]);

  const handleSubmit = () => {
    if (validateEmail(email)) {
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
  return (
    isVisible && (
      <BlurView style={styles.centeredView} intensity={intensity} tint="dark">
        <View style={styles.modalView}>
          <Ionicons
            style={styles.iconStyle}
            name="md-close"
            size={30}
            color="#b5b5b5"
            onPress={handleDisable}
          />
          <CustomText
            style={{
              fontSize: 16,
              fontFamily: PRIMARY_EXTRABOLD,
              paddingTop: 10,
              color: design.Text_Tertiary_Color,
              fontWeight: "bold",
              letterSpacing: 0,
            }}
          >
            {i18n.t("FORGOT_PASSWORD")}
          </CustomText>

          <CustomText style={styles.modalText}>
            {i18n.t("ENTER_REGISTERED_EMAIL")}
          </CustomText>

          <CustomInput
            autoFocus
            style={{
              color: textError === true ? "red" : "black",
            }}
            customStyle={{
              height: 35,
              width: "90%",
              backgroundColor: "#ffffff",
              elevation: 1,
              ...borderColor(design.Border_Color),
              ...borderWidth(1),
              marginBottom: 50,
              borderRadius: 5,
              overflow: "hidden",
            }}
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
    )
  );
});

export default ForgetPassword;
