import SignUp from "./sign-up.json";
import SignIn from "./sign-in.json";
import UserProfile from "./user-profile.json";
import ForgotPassword from "./forgot.json";
import update from "./update.json";
import validateKey from "./validate-Key.json";

export const signUpUserApiResponse = () => {
  return SignUp;
};

export const signInUserApiResponse = () => {
  return SignIn;
};

export const getUserProfileApiResponse = () => {
  return UserProfile;
};

export const forgotPasswordApiResponse = () => {
  return ForgotPassword;
};

export const updateUserApiResponse = () => {
  return update;
};

export const ValidateVipKeyResponse = () => {
  return validateKey;
};
