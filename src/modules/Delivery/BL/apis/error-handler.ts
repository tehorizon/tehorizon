import i18n from "@localization";

export const deliveryErrorHandler = (error: any) => {
  console.log(error, "axios:");
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else if (
    error.response &&
    error.response.status &&
    error.response.statusText
  ) {
    if (error.response.status >= 500) {
      throw new Error(i18n.t("Something_went_wrong"));
    }
    // if(error.response.status === 500 || error.response.status === 502 )
    // {
    // 	throw new Error(i18n.t('Something_went_wrong'));
    // }
    // else
    // {
    // 	throw new Error(error.response.statusText);
    // }
  } else {
    console.log("invokeApi -> checkpoint-2 --> ", error);
    throw new Error(i18n.t("you_need_internet"));
  }
};
