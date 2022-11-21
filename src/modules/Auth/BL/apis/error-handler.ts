import i18n from "@localization";
export const authErrorHandler = (error: any, requestData: any) => {
  if (error?.response?.data?.message) {
    const errorData = {
      messageText: error.response.data.message,
      code: error.response.data.code,
      email: requestData?.email,
    };
    throw errorData;
  } else if (
    error.response &&
    error.response.status &&
    error.response.statusText
  ) {
    if (error.response.status === 500) {
      throw { messageText: "Oops! Some Thing Went Wrong!" };
    } else {
      throw { messageText: error.response.statusText };
    }
  } else {
    throw { messageText: i18n.t("you_need_internet") };
  }
};
