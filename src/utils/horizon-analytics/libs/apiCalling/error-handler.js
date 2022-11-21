import i18n from "@localization";

export const analyticsErrorHandler = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else if (
    error.response &&
    error.response.status &&
    error.response.statusText
  ) {
    if (error.response.status === 401) {
    }
    throw new Error(error.response.statusText);
  } else {
    throw new Error(i18n.t("you_need_internet"));
  }
};
