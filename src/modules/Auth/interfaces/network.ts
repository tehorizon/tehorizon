export interface RequestObjectDataType {
  path: string;
  method: string;
  headers?: HeaderDataType;
  postData?: Object | string;
  queryParams?: Object;
  noCache?: boolean;
  isEncrypted?: boolean;
}

interface HeaderDataType {
  Authorization?: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
  is_privacy_policy_accepted: "0" | "1";
  is_user_agreement_accepted: "0" | "1";
}

export interface RegistrationRequestData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country_of_residence: string;
  is_privacy_policy_accepted: "0" | "1";
  is_user_agreement_accepted: "0" | "1";
}
export interface ForgotPasswordData {
  email: string;
  token: string;
}
