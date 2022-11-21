import { put, takeLatest } from "@redux-saga/core/effects";
import { setAppLoading, setErrorObject } from "@redux/appReducer/app.actions";
import { RequestTypes } from "@Merchant/interfaces";
import { ActionTypes } from "../types";
import MerchantBL from "@Merchant/BL";
import { setMerchantValues } from "../actions";
import I18n from "@localization";
import { MerchantData } from "../../interfaces/responses";

function* getMerchantRequest(params: {
  type: string;
  data: RequestTypes.MerchantRequest;
}) {
  let { merchantID, token } = params.data;
  try {
    yield put(setAppLoading(true));
    let merchantData: { data: MerchantData } = yield MerchantBL.getMerchantById(
      token,
      merchantID
    );
    if (merchantData?.data) {
      yield put(setMerchantValues(merchantData?.data));
    }
    yield put(setAppLoading(false));
  } catch (e) {
    yield put(setAppLoading(false));
    yield put(
      setErrorObject({ message: e?.message || e?.messageText, status: true })
    );
  }
}

function* redeeemOfferRequest(params: {
  type: string;
  data: RequestTypes.ReddemOfferRequest;
}) {
  let {
    postData,
    token,
    postAnalyticsEvents,
    handleOnShowRedemptionSuccessModal,
    makeCustomAnalyticsStack,
    makeCustomAnalyticsOnInternetUnavaliable,
    customError,
    appLoading,
  } = params.data;
  try {
    yield appLoading(true);

    if (!/^\d+$/.test(postData?.merchant_pin?.toString() || "--")) {
      throw new Error(I18n.t("Invalid Merchant PIN"));
    }
    const redemptionResponse: RequestTypes.RedumptionResponse =
      yield MerchantBL.getRemption(token, postData);

    postAnalyticsEvents(postData, redemptionResponse);
    yield appLoading(false);
    yield handleOnShowRedemptionSuccessModal();
  } catch (e) {
    yield appLoading(false);
    if (e.message !== "logout") {
      makeCustomAnalyticsStack();
    }
    if (e.message !== I18n.t("you_need_internet")) {
      makeCustomAnalyticsOnInternetUnavaliable &&
        makeCustomAnalyticsOnInternetUnavaliable();
    }
    yield customError({ message: e?.message || e?.messageText, status: true });
  }
}

export function* MerchantSagas() {
  yield takeLatest(ActionTypes.GET_MERCHANT_REQUEST, getMerchantRequest);
  yield takeLatest(ActionTypes.REDEEM_OFFER_REQUEST, redeeemOfferRequest);
}
