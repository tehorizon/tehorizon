export interface RequestObjectDataType {
  path: string;
  method: string;
  headers: HeaderDataType;
  postData?: object;
  queryParams?: object;
  errorHandler?: Function;
  appendCommonParams?: Boolean;
}

interface HeaderDataType {
  Authorization: string;
}

export interface SignupDataType {
  token: string;
  email: string;
  mobile_phone?: string;
  confirmEmail: string;
  password: string;
  confirm_password: string;
  firstname: string;
  lastname: string;
  country_of_residence: string;
  gender: string;
  nationality?: string;
  date_of_birth?: string;
  privacyPolicyCheck: boolean;
  endUserLicenseAgreementCheck: boolean;
  isDemographics?: boolean;
  key: string;
}

export interface LoginDataType {
  token: string;
  email: string;
  password: string;
  privacyPolicyCheck: boolean;
  endUserLicenseAgreementCheck: boolean;
  force_login?: boolean;
}

export interface ForgotPasswordDataType {
  token: string;
  email: string;
}

export interface ResendEmailDataType {
  token: string;
  email: string;
}

export interface UserProfileDataType {
  userId: number;
  country_of_residence: string;
  currency: string;
  gender: string;
  push_notifications: boolean;
  nationality: string;
  mobile_phone: number | null;
  email: string;
  is_demographics_updated: boolean;
  firstname: string;
  lastname: string;
  profile_image: string;
  savings: number;
  date_of_birth: string;
}

export interface DemographicsDataType {
  token: string;
  nationality: string;
  date_of_birth: string;
  gender: string;
  currency: string;
}
