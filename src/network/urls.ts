import AppConfig from "@fast_track/src/AppConfig.json";
import EndPoints from "@fast_track/src/EndPoints.json";

export const AUTH_BASE_URL = EndPoints[AppConfig?.env].userServices;

export const HOME_BASE_URL = EndPoints[AppConfig?.env]?.homeServices;

export const CONFIG_BASE_URL = EndPoints[AppConfig?.env]?.configsServices;

export const OUTLET_BASE_URL = EndPoints[AppConfig?.env]?.outletServices;

export const USER_BASE_URL = EndPoints[AppConfig?.env]?.userServices;

export const REDEMPTION_URL =
  EndPoints[AppConfig?.env]?.redemptionHistoryServices;

export const REDEMPTION_SERVICE_URL =
  EndPoints[AppConfig?.env]?.redemptionServices;

export const SAVING_HISTORY_URL =
  EndPoints[AppConfig?.env]?.userSavingHistoryServices;

export const MERCHANT_BASE_URL = EndPoints[AppConfig?.env]?.merchantServices;

export const WEBPAGE_URL = EndPoints[AppConfig?.env]?.webpage;

export const DELIVERY_BASE_URL = EndPoints[AppConfig?.env]?.deliveryServices;

export const USER_DELETE_BASE_URL =
  EndPoints[AppConfig?.env]?.deleteUserService;

export const DELIVERY_CASHLESS = EndPoints[AppConfig?.env]?.deliveryCashless;

export const TRAVEL_BASE_URL = EndPoints[AppConfig?.env]?.travelService;
