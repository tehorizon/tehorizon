import React, {
  useImperativeHandle,
  forwardRef,
  // Ref,
  useRef,
  useState,
  Ref,
} from "react";
import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../Text/Text";
import i18n, { isRTL } from "@localization";
import { design } from "rn_fast_track_uilib";
import {
  borderColor,
  borderWidth,
  marginHorizontal,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import emailValidation from "@Auth/BL/Validator";
import Image from "@HybridComponents/Image";

export interface CustomInputProps
  extends React.ComponentProps<typeof TextInput> {
  style?: Object | Array<Object>;
  showHide?: boolean;
  customStyle?: Object | Array<Object>;
  isPassword?: boolean;
  changeCallback?: Function;
  label?: string;
  labelStyle?: Object | Array<Object>;
  lock?: boolean;
}

export interface InputRef {
  focus: Function;
  blur: Function;
  getValue: () => string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const CustomInput = forwardRef(
  (props: CustomInputProps, ref: Ref<InputRef>) => {
    let {
      style = {},
      showHide = false,
      customStyle = {},
      isPassword = false,
      testID = "genericInput",
      changeCallback,
      keyboardType = "",
      label = "",
      labelStyle = {},
      lock = false,
      multiline = false,
    } = props;
    const [errorMsg, updateErrorMsg] = useState("");
    const [hidePassword, togglePassword] = useState(isPassword);
    const [value, changeValue] = useState("");
    const textInput = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => textInput?.current?.focus(),
      blur: () => textInput?.current?.blur(),
      getValue: () => value,
      setValue: changeValue,
    }));

    const updateValue = (value: string) => {
      changeValue(value);
      changeCallback && changeCallback(value);
    };

    const checkEmailErrors = (email: string) =>
      updateErrorMsg(
        email != "" && !emailValidation(email)
          ? "Please_enter_a_valid_email"
          : ""
      );

    const onBlur = () => {
      switch (keyboardType) {
        case "email-address":
          checkEmailErrors(value);
          break;

        default:
          break;
      }
    };
    return (
      <>
        <View
          style={[
            styles.mainView,
            customStyle,
            errorMsg != "" && styles.errorView,
          ]}
        >
          {!label ? null : (
            <CustomText style={[styles.label, labelStyle]}>{label}</CustomText>
          )}
          <View style={styles.row}>
            <TextInput
              testID={testID}
              ref={textInput}
              autoCorrect={false}
              caretHidden={false}
              placeholderTextColor={design["Input_Placeholder_Color"]}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              value={value}
              onChangeText={updateValue}
              {...props}
              style={[
                styles.textInput,
                isRTL && { textAlign: "right" },
                style,
                // isRTL && styles.flipStyle,
              ]}
              onBlur={onBlur}
              secureTextEntry={hidePassword}
              allowFontScaling={false}
              editable={lock ? false : true}
              multiline={multiline}
            />
            {(showHide || lock) && (
              <TouchableOpacity
                testID={"togglePassVisibility"}
                style={styles.eyeTextView}
                activeOpacity={1}
                onPress={() => showHide && togglePassword(!hidePassword)}
              >
                <Image
                  style={[styles[lock ? "lock" : "eyeIcon"]]}
                  source={
                    lock
                      ? require("@assets/images/lock-icon.png")
                      : !hidePassword
                      ? require("@assets/icons/open-eye.png")
                      : require("@assets/icons/close-eye.png")
                  }
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {errorMsg != "" && (
          <CustomText style={styles.errorMsg}>{i18n.t(errorMsg)}</CustomText>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    marginTop: 12,
    backgroundColor: design["Input_Background_Color"],
    ...borderColor(design.Input_Border_Color),
    ...borderWidth(1),
    borderRadius: design["Global_Border_Radius"],
    height: 52,
    justifyContent: "center",
    ...paddingVertical(8),
  },
  errorView: {
    ...borderColor(design.Error_Color),
  },
  eyeText: {
    fontSize: 12,
    fontFamily: PRIMARY_BOLD,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: design["Link_Color"],
    color: design["Link_Color"],
  },
  eyeTextView: {
    ...marginHorizontal(10),
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: PRIMARY,
    lineHeight: 20,
    ...paddingVertical(0),
    fontWeight: "300",
    color: design["Text_Primary_Color"],
    ...paddingHorizontal(16),
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
  errorMsg: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 4,
    color: design.Error_Color,
    fontFamily: PRIMARY_BOLD,
  },
  eyeIcon: {
    width: 18,
    height: 12,
  },
  labelView: {},
  label: {
    fontSize: 11,
    fontFamily: PRIMARY_BOLD,
    ...paddingHorizontal(16),
    color: design.Input_Label_Color,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  lock: {
    width: 24,
    height: 24,
  },
});

export default CustomInput;
