import { RequestTypes } from "../../interfaces";
import { MerchantData, OffersToDisplay } from "../../interfaces/responses";
import { ActionTypes } from "../types";

export const setMerchantValues = (data: MerchantData) => ({
  type: ActionTypes.SET_MERCHANT_VALUES,
  data: data,
});

export const setSelectedOutlet = (index: number) => ({
  type: ActionTypes.SET_SELECTED_OUTLET,
  index,
});
export const setSelectedOffer = (data: OffersToDisplay) => ({
  type: ActionTypes.SET_SELECTED_OFFER,
  data: data,
});

export const setDefaultValues = () => ({
  type: ActionTypes.RESET_MERCHANT,
});

export const setFavourite = (data) => ({
  type: ActionTypes.SET_FAV,
  data: data,
});

export const getMerchantRequest = (data: RequestTypes.MerchantRequest) => ({
  type: ActionTypes.GET_MERCHANT_REQUEST,
  data,
});

export const onRedeemOfferRequest = (
  data: RequestTypes.ReddemOfferRequest
) => ({
  type: ActionTypes.REDEEM_OFFER_REQUEST,
  data,
});
