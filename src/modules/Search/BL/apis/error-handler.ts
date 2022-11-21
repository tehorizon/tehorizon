import i18n from "@localization";

export const searchErrorHandler = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    if (error.response.status === 401) {
      throw new Error("logout");
    } else if (error.response.status === 403) {
      throw new Error("logout");
    } else {
      throw new Error(error.response.data.message);
    }
  } else if (
    error.response &&
    error.response.status &&
    error.response.statusText
  ) {
    throw new Error(error.response.statusText);
  } else {
    throw new Error(i18n.t("you_need_internet"));
  }
};
