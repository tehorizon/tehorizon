import i18n from "@localization";

export const outletErrorHandler = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    if (error.response.status === 401) {
      throw new Error("logout");
    } else if (error.response.status === 403) {
      throw new Error("logout");
    } else {
      throw new Error(error.response.data.message);
    }
  } else if (error.response && error.response.status) {
    if (error.response.status >= 500) {
      throw new Error(i18n.t("Opps! Some Thing Went Wrong!"));
    } else {
      throw new Error(i18n.t("you_need_internet"));
    }
  } else {
    throw new Error(i18n.t("you_need_internet"));
  }
};
