import { Onboarding } from "./onboarding.e2e";
import { showIntro } from "../../../AppConfig.json";
import { LoginScreen } from "./login.e2e";
import { Signup } from "./signup.e2e";

showIntro && describe("Onboarding Flow", Onboarding);
describe("Signup", Signup);
describe("Login Flow", LoginScreen);
