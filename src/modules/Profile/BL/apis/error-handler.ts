import i18n from "@localization";
export const profileErrorHandler = (error: any) => {
  console.log({ error, message: error.message }, "error handler");
  if (error?.response?.data?.message) {
    if (error.response.status === 400) {
      throw new Error("Bad Request!");
    } else if (error.response.status === 403||error.response.status === 401) {
      throw new Error("logout");
    } 
    else {
      if (error?.response?.status === 500) {
        throw new Error("Oops! Some Thing Went Wrong!");
      } else {
        if (error?.response?.statusText) {
          throw new Error(error.response.statusText);
        } else {
          throw new Error("Something went wrong!");
        }
      }
    }
  } else if (error?.response?.statusText) {
    throw new Error(error.response.statusText);
  } else {
    throw new Error(i18n.t("you_need_internet"));
  }
};
