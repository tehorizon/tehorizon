import login from "./LoginBL";
import signup from "./SignupBL";
import forgotPassword from "./ForgotPasswordBL";
import resendEmail from "./ResendEmail";
import getUserProfile from "./GetUserProfile";
import demoGraphic from "./DemographicUpdateBL";
import ValidateVipKey from "./ValidateVipKey";

const Auth = {
  login,
  signup,
  forgotPassword,
  resendEmail,
  getUserProfile,
  demoGraphic,
  ValidateVipKey,
};

export default Auth;
