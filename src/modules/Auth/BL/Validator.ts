import appConfigs from "@fast_track/src/AppConfig.json";
const regex="^[279]\\d{7}$"

const phoneRegex = new RegExp(
  appConfigs?.signupFields?.phone?.regex ||regex|| "^[279]d{7}$",
  "g"
);

const emailValidation = (email: string) =>
  /^\w+([\.-]?\w+\+*?)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const mobileValidate = (mobile: string) => phoneRegex.test(mobile);

export default emailValidation;
