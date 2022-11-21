import i18n from "@localization";
export const merchantErrorHandler = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else if (
    error.response &&
    error.response.status &&
    error.response.statusText
  ) {
    if (error.response.status === 500) {
      throw { messageText: "Opps! Some Thing Went Wrong!" };
    } else {
      throw { messageText: error.response.statusText };
    }
  } else {
    throw new Error(i18n.t("you_need_internet"));
  }
};
