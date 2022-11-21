import { user } from "@Auth/interfaces/responses";
import { NavigationProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export interface GetProfileRequestParams {
  postData: {
    token: string;
    currency: string;
    language: string;
  };
}

export interface updateProfileRequestParams {
  postData: {
    token: string;
    country_of_residence: string;
    mobile_phone: number;
    currency: string;
    push_notifications?: number;
    language: string;
    nationality: string;
    date_of_birth?: string;
    firstname: string;
    lastname: string;
  };
  showLoading?: boolean;
  navigation: StackNavigationProp<any, any>;
  callBack?: () => void;
}

export interface UploadProfileImageRequestParams {
  postData: {
    token: string;
    profile_image: {
      uri: string;
      type: string;
      name: string;
    };
  };
  refreshProfile: () => void;
}

export interface LogoutRequest {
  postData: {
    token: string;
  };
}

export interface RedemptionHistoryRequest {
  postData: {
    sessionToken: string;
    company: string;
    currency: string;
    currentYear: number;
    language: string;
  };
  setRedemptionData: (data: any) => void;
}

export interface SavingHistoryRequest {
  postData: {
    activeTab: number;
    sessionToken: string;
    company: string;
    currency: string;
    summaryType: string;
    language: string;
  };
  onChangeTabHandler: () => void;
}

export interface ForgotPasswordRequest {
  postData: {
    token: string;
    email: string;
    language: string;
  };
  setIsResetSuccessModalVisible: (data: boolean) => {};
  setDoneMessage: (data: string) => {};
}

export interface ProfileDetails {
  selectedCountry: string;
  selectedNationality: string;
  navigation: NavigationProp<any, any>;
  appConfigs: any;
  user: any;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationalityModalVisible: boolean;
  countryModalVisible: boolean;
  mobilePhone: string;
  selectedCurrency: string;
  isDatePickerVisible: boolean;
  currencyModalVisible: boolean;
  updateCountry: (arg: string) => void;
  updateCurrency: (arg: string) => void;
  updateNationality: (arg: string) => void;
  handleDatePickerOpen: () => void;
  setfirstName: (agr: string) => void;
  setlastName: (arg: string) => void;
  setmobilePhone: (arg: string) => void;
  onCountryPress: () => void;
  onNationalityPress: () => void;
  onCurrencyPress: () => void;
  hideDatePicker: (arg: string) => void;
  handleDateChange: (arg: any, arg1: string) => void;
  handleCancelOnDatePicker: () => void;
  onUpdate: () => void;
  deleteAcccount: () => void;
}

export interface changePassword {
  user: any;
  currentPass: string;
  newPass: string;
  confirmPass: string;
  isUpperCaseLetter: boolean;
  isLowerCaseLetter: boolean;
  isContainNumber: boolean;
  navigation: NavigationProp<any, any>;
  setCurrentPass: (arg: string) => void;
  setNewPass: (arg: string) => void;
  setConfirmPass: (arg: string) => void;
}
