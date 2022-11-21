export interface RequestObjectDataType {
  path: string;
  method: string;
  headers: HeaderDataType;
  postData?: object;
  queryParams?: object;
  errorHandler?: (error: any, requestData: any) => void;
  appendCommonParams?: boolean;
}

interface HeaderDataType {
  Authorization?: string;
  authorizationToken?: string;
}

export interface ForgotPasswordDataType {
  token: string;
  email: string;
  language: string;
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

export interface UserUpdateDataType {
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
}

export interface userProfileImage {
  token: string;
  profile_image: {
    uri: string;
    type: string;
    name: string;
  };
}

export interface RedemptionhistoryAPIdataType {
  sessionToken: string;
  company: string;
  currency: string;
  currentYear: number;
  language: string;
}

export interface RedemptionHistoryData {
  currentYear: string;
  totalNumberOfRedemption: number;
  monthWiseRedemmptions: MonthWiseRedemmptionsData[];
}

export interface MonthWiseRedemmptionsData {
  month: string;
  redemptionCount: number;
  redemptions: RedemptionsData[];
}

export interface RedemptionsData {
  logo: string;
  merchantName: string;
  outletName: string;
  category: string;
  date: string;
  code: string;
  savings: number;
}

export interface UserSavingAPIdataType {
  sessionToken: string;
  company: string;
  currency: string;
  summaryType: string;
  language: string;
}

export interface UserSavingData {
  lifeTimeSaving: number;
  currentYear: number;
  currentMonth: number;
  currentMonthSaving: number;
  savings: SavingData;
}

interface SavingData {
  graph: number[];
  progressBar: ProgressBar[];
}

export interface ProgressBar {
  name: string;
  savings: number;
  totalSavings: number;
}
