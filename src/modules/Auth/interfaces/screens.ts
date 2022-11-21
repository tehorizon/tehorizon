import { RefObject } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, RouteProp } from "@react-navigation/core";
import { InputRef } from "@components/Input";
import { PhoneNumberRef } from "@components/PhoneNumber";
import { BottomUpModalRef } from "@components/BottomUpModal";
export interface screen {
  navigation: StackNavigationProp<any, any>;
  children?: any;
}

export interface login extends screen {
  errorText: string;
  showResendEmailPopup: boolean;
  resendEmail: {
    button_text: string;
    continue_button_title: string;
    email: string;
    message: string;
    show_continue_button: boolean;
    show_success_popup: boolean;
    title: string;
  };
  errorHandler: (arg: any) => void;
  pushAnalytics: (arg: any) => void;
  pp_url: string;
  eula_url: string;
  keyValidationData: {
    type: string;
  };
  onLogin: (arg: any) => void;
  handleSkipMode: () => void;
  onForgotPassword: (email: string) => void;
  onResendEmail: (arg: any) => void;
  onResendEmailContinue: () => void;
}

export interface loginScreen extends screen {
  isPrivacyPolicyAccepted: boolean;
  isEndUserLicenceAccepted: boolean;
  showWebView: boolean;
  webviewURL: string;
  webViewTitle: string;
  appConfigs: any;
  keyValidationData: {
    type: string;
  };
  errorText: string;
  showResendEmailPopup: boolean;
  resendEmail: any;
  isKeyValidationEnabled: boolean;
  onResendEmailContinue: any;
  type: string;
  emailRef: any;
  passRef: any;
  forgetRef: any;
  showDoneMessage: boolean;
  registrationSuccessMessage: boolean;
  doneMessage: string;
  showRegistrationSuccessModal: boolean;
  alreadyLoginData: any;
  _captchaRef: any;
  siteKey: string;
  //methods
  updateCaptchaToken: (arg: string) => void;
  handlePrivacyPolicy: () => void;
  handleEULA: () => void;
  handleLoginButton: () => void;
  privacyPolicyPressed: () => void;
  endUserLicensePressed: () => void;
  onResendEmailPressed: () => void;
  closeForgotPasswordModal: () => void;
  showForgotPasswordModal: () => void;
  disableWebView: () => void;
  onForgotPasswordPressed: (email: string) => void;
  hideResetModal: () => void;
  handleSkipMode: () => void;
  changedMindCallback: () => void;
  handleForceLogin: () => void;
}

export interface signup extends screen {
  showRegistrationSuccessModal: boolean;
  errorHandler: (arg: any) => void;
  pushAnalytics: (arg: any) => void;
  pp_url: string;
  eula_url: string;
  registrationSuccessString: boolean;
  onCloseRegistrationSuccess: () => void;
  handleSkipMode: () => void;
  onRegistration: (arg: any) => void;
}

export interface signupScreen extends screen {
  keyValidationData: any;
  showRegistrationSuccessModal: boolean;
  appConfigs: any;
  registrationSuccessString: string;
  isKeyValidationEnabled: boolean;
  type: string;
  isPrivacyPolicyAccepted: boolean;
  isEndUserLicenceAccepted: boolean;
  showCountryModal: boolean;
  showNationalityModal: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isDatePickerVisible: boolean;
  showWebView: boolean;
  selectedCountry: string;
  selectedNationality: string;
  dateOfBirth: string;
  gender: string;
  webviewURL: string;
  webViewTitle: string;
  phoneNumRef: any;
  firstNameRef: any;
  lastNameRef: any;
  emailRef: any;
  confirmEmailRef: any;
  passRef: any;
  confirmPasswordRef: any;
  _captchaRef: any;
  siteKey: string;
  //methods
  onCloseRegistrationSuccess: () => void;
  updateCaptchaToken: (captchaToken: string) => {
    type: string;
    captchaToken: string;
  };
  handleSkipMode: () => void;
  toggleCountryModal: (arg: boolean) => void;
  toggleNationalityModal: (arg: boolean) => void;
  updateGender: (arg: string) => void;
  handleRegisterButton: () => void;
  handlePrivacyPolicy: () => void;
  handleEULA: () => void;
  disableWebView: () => void;
  handleSelectedCountryCallback: (arg: string) => void;
  handleSelectedNationalityCallback: (arg: string) => void;
  showDatePicker: () => void;
  hideDatePicker: () => void;
  handleDateChange: (arg: any, arg1: any) => void;
  privacyPolicyPressed: () => void;
  EULPressed: () => void;
  navigateToLogin: () => void;
}

export interface loginSignup extends login, signup {
  t: Function;
  showDoneMessage: boolean;
  doneMessage: string;
  alreadyLoginData: Object;
  _captchaRef: RefObject<null>;
  appConfigs: {
    is_captcha_verification: boolean;
    isKeyValidationEnabled: boolean;
  };
  initialRouteName: string;
  route: RouteProp<ParamListBase, "Auth">;
  captcha: string;
  type: string;
  // methods
  handleForceLogin: () => void;
  changedMindCallback: () => void;
  updateCaptchaToken: (arg: string) => void;
  hideResetModal: () => void;
  makeAnalyticsStack: (
    screenName?: string,
    action?: string,
    category_id?: string,
    categories?: string,
    categories_analytics?: string,
    location_id?: number,
    changeSequenceNumber?: boolean
  ) => void;
}

export interface KeyValidation {
  email: string;
  appConfig: {
    is_captcha_verification: boolean;
    keyValidationMessage: Array<{ text: string }>;
  };
  keyInput1: RefObject<null>;
  emailInputRef: RefObject<null>;
  keyInputValue1: string;
  keyInput2: RefObject<null>;
  keyInputValue2: string;
  keyInput3: RefObject<null>;
  keyInputValue3: string;
  // methods
  setEmail: (arg: string) => void;
  onChangeInput1: (e: string) => void;
  onChangeKeyInput2: (e: string) => void;
  onChangeKeyInput3: (e: string) => void;
  handleSubmit: () => void;
  onSignup: () => void;
  onEmailSubmit: () => void;
  onKeyInput1Submit: () => void;
}

export interface phoneNumber extends screen {
  phoneNumRef: RefObject<null>;
  appConfigs: {
    signupFields: {
      firstname: {
        show: boolean;
        autoCapitalize:
          | "none"
          | "sentences"
          | "words"
          | "characters"
          | undefined;
      };
      lastname: {
        show: boolean;
        autoCapitalize:
          | "none"
          | "sentences"
          | "words"
          | "characters"
          | undefined;
      };
      email: {
        show: boolean;
        autoCapitalize:
          | "none"
          | "sentences"
          | "words"
          | "characters"
          | undefined;
      };
      confirmEmail: {
        show: boolean;
        autoCapitalize:
          | "none"
          | "sentences"
          | "words"
          | "characters"
          | undefined;
      };
      password: {
        show: boolean;
        autoCapitalize:
          | "none"
          | "sentences"
          | "words"
          | "characters"
          | undefined;
      };
      confirmPassword: {
        show: boolean;
        autoCapitalize:
          | "none"
          | "sentences"
          | "words"
          | "characters"
          | undefined;
      };
      phone: {
        show: boolean;
        code: string;
        autoCapitalize:
          | "none"
          | "sentences"
          | "words"
          | "characters"
          | undefined;
      };
      dob: {
        show: boolean;
        format: string;
      };
      gender: {
        show: boolean;
      };
      nationality: {
        show: boolean;
      };
      residence: {
        show: boolean;
      };
    };
  };
  validatePhoneNumber: () => void;
}

export interface OTP extends screen {
  onCodeFilled: (code: string) => void;
  countdown: number;
  isResending: boolean;
}

export interface CIFID extends screen {
  cifidRef: RefObject<InputRef>;
  phoneNumRef: RefObject<PhoneNumberRef>;
  alertRef: RefObject<BottomUpModalRef>;
  otpRef: RefObject<BottomUpModalRef>;
  phoneNumber: string;
  cifid: string;
  updatePhoneNumber: Function;
  updateCIFID: Function;
  proceedSignup: () => void;
}
export interface Subscription {}
