import i18n from "@localization";

export const configErrorHandler = (error: any) => {
  console.log(error.response, "error is here");
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
  } else if (error.response && error.response.status >= 500) {
    throw new Error("Oops! Some Thing Went Wrong!");
  } else {
    throw new Error(i18n.t("you_need_internet"));
  }
};
