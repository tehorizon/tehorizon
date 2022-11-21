import { LoginDataType, SignupDataType } from "@Auth/BL/Interfaces";
import { StackNavigationProp } from "@react-navigation/stack";
import { NetworkTypes } from "./";

export interface common {
  navigation?: StackNavigationProp<any, any>;
  showLoading?: Function | undefined;
}

export interface login extends common {
  postData: LoginDataType;
  checkCaptcha: () => void;
  toggleResendEmailPopup: () => void;
  makeAnalyticsStack: (
    screenName?: string,
    action?: string,
    category_id?: string,
    categories?: string,
    categories_analytics?: string,
    location_id?: number,
    changeSequenceNumber?: boolean
  ) => void;
  createSessionJwt: (sessionToken: string) => Promise<any>;
  checkIsDemographic: (userdata: Object) => void;
}

export interface registration extends common {
  postData: SignupDataType;
  checkCaptcha: () => void;
  toggleRegistrationSuccessModal: (arg1: boolean) => void;
  makeAnalyticsStack: (
    screenName?: string,
    action?: string,
    category_id?: string,
    categories?: string,
    categories_analytics?: string,
    location_id?: number,
    changeSequenceNumber?: boolean
  ) => void;
  createSessionJwt: (sessionToken: string) => Promise<any>;
  checkIsDemographic: (userdata: Object) => void;
}
export interface forgotPassword extends common {
  postData: NetworkTypes.ForgotPasswordData;
  toggleForgetPasswordModal: (status: boolean) => void;
  doneMessageHandler: (data: {
    showDoneMessage: boolean;
    doneMessage: string;
    registrationSuccessMessage?: boolean;
  }) => void;
}

export interface resendEmail {
  button_text: string;
  continue_button_title: string;
  email: string;
  message: string;
  show_continue_button: boolean;
  show_success_popup: boolean;
  title: string;
}

export interface alreadyLoginData {
  image: string;
  title: string;
  message: string;
  alreadyLoginShow: boolean;
  yes_button_title: string;
  no_button_title: string;
}
