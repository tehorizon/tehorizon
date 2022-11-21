import { ActionTypes } from "../types";

const initialState = {
  resendEmail: {
    button_text: "RESEND",
    continue_button_title: "CONTINUE",
    email: "",
    message:
      "Please verify your email address to continue using your account. If left unverified, your account will be purged in the next 90 days from the date of registration.",
    show_continue_button: true,
    show_success_popup: 0,
    title: "Verify your email",
  },
  captchaToken: "",
  force_login: false,
  alreadyLoginData: {
    alreadyLoginImageUrl: "",
    alreadyLoginTitle: "",
    alreadyLoginMessage: "",
    alreadyLoginShow: false,
    alreadyLoginButton: "",
    alreadyLoginChangeMindButton: "",
  },
  loginData: {},
  registrationSuccessString: "",
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.AUTH_UPDATE_RESEND_EMAIL:
      return {
        ...state,
        resendEmail: action.resendEmail,
      };
    case ActionTypes.AUTH_UPDATE_CAPTCHA_TOKEN:
      return {
        ...state,
        captchaToken: action.captchaToken,
      };
    case ActionTypes.AUTH_UPDATE_FORCE_LOGIN:
      return {
        ...state,
        force_login: action.force_login,
      };
    case ActionTypes.AUTH_UPDATE_ALREADY_LOGIN_DATA:
      return {
        ...state,
        alreadyLoginData: action.alreadyLoginData,
      };
    case ActionTypes.AUTH_UPDATE_LOGIN_DATA:
      return {
        ...state,
        loginData: action.loginData,
      };
    case ActionTypes.AUTH_UPDATE_REGISTRATION_SUCCESS_MSG:
      return {
        ...state,
        registrationSuccessString: action.message,
      };
    case ActionTypes.AUTH_UPDATE_LOGIN_SHOW:
      return {
        ...state,
        alreadyLoginData: {
          ...state.alreadyLoginData,
          alreadyLoginShow: action.alreadyLoginShow,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
