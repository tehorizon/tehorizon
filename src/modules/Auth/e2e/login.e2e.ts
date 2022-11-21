import { device } from "detox";
import { messages, configuration, checkError } from "../../../../e2e/utils";
import { showIntro } from "../../../AppConfig.json";
let { credentials, wrongEmails } = configuration;
export const LoginScreen = () => {
  beforeAll(async () => {
    !showIntro &&
      (await device.launchApp({
        newInstance: false,
        permissions: {
          location: "always",
          photos: "YES",
          camera: "YES",
        },
      }));
  });

  it("Empty Inputs Functionality", async () => {
    await waitFor(element(by.id("loginScreen")))
      .toBeVisible()
      .withTimeout(7000);
    // both empty
    await checkError("login", messages.All_fields_are_required);
    // password empty
    await checkError("login", messages.All_fields_are_required);

    // only email
    await element(by.id("loginEmail")).replaceText(credentials.email);
    await checkError("login", messages.All_fields_are_required);

    // only password
    await element(by.id("loginEmail")).replaceText("");
    await element(by.id("loginEmail")).clearText();
    await element(by.id("loginPassword")).replaceText(credentials.password);
    await checkError("login", messages.All_fields_are_required);
  });

  it("Valid Email Functionality", async () => {
    await element(by.id("loginPassword")).replaceText(credentials.password);
    for (let index = 0; index < wrongEmails.length; index++) {
      const email = wrongEmails[index];
      await element(by.id("loginEmail")).replaceText(email);
      await checkError("login", messages.Please_enter_a_valid_email);
    }
  });

  it("Toggle Password Functionality", async () => {
    await waitFor(element(by.id("loginScreen")))
      .toBeVisible()
      .withTimeout(7000);
    await element(by.id("loginPassword")).replaceText(credentials.password);
    await element(by.id("togglePassVisibility")).tap();
    await waitFor(element(by.id("loginPassword"))).toHaveText(
      credentials.password
    );
    await element(by.id("togglePassVisibility")).tap();
    await waitFor(element(by.id("loginPassword"))).not.toHaveText(
      credentials.password
    );
  });

  it("Reviewed Privacy Policy", async () => {
    await element(by.id("loginEmail")).replaceText(credentials.email);
    await element(by.id("loginPassword")).replaceText(credentials.password);
    await checkError("login", messages.Please_review_accept_the_Privacy_Policy);
  });

  it("Reviewed End User Agreement", async () => {
    await element(by.id("loginEmail")).replaceText(credentials.email);
    await element(by.id("loginPassword")).replaceText(credentials.password);
    await element(by.id("loginPP")).tap();
    await checkError(
      "login",
      messages.Please_review_accept_the_End_User_License_Agreement
    );
  });

  it("Forget Password Button Functionality", async () => {
    await element(by.id("forgotPassword")).tap();
    await waitFor(element(by.id("forgetPasswordModal")))
      .toBeVisible()
      .withTimeout(6000);

    await waitFor(element(by.id("forgetHeading")))
      .toHaveText(messages.ENTER_REGISTERED_EMAIL)
      .withTimeout(2000);
    await element(by.id("resetCrossIcon")).tap();
    await expect(element(by.id("forgetPasswordModal"))).not.toBeVisible();
  });

  it("Forget Email Validity", async () => {
    await element(by.id("forgotPassword")).tap();
    await waitFor(element(by.id("forgetPasswordModal")))
      .toBeVisible()
      .withTimeout(6000);
    for (let index = 0; index < wrongEmails.length; index++) {
      const email = wrongEmails[index];
      await element(by.id("forgetEmail")).replaceText(email);
      await element(by.id("forgetEmail")).tapReturnKey();
      await waitFor(element(by.id("resetEmailSuccessModal")))
        .not.toBeVisible()
        .withTimeout(700);
    }
    await element(by.id("resetCrossIcon")).tap();
    await expect(element(by.id("forgetPasswordModal"))).not.toBeVisible();
  });

  // uncomment to interact with server
  it("Reset Email Call", async () => {
    await element(by.id("forgotPassword")).tap();
    await waitFor(element(by.id("forgetPasswordModal")))
      .toBeVisible()
      .withTimeout(6000);
    await element(by.id("forgetEmail")).replaceText(credentials.email);
    await element(by.id("forgetEmail")).tapReturnKey();
    await waitFor(element(by.id("resetEmailSuccessModal"))).toBeVisible();
    await element(by.id("resetSuccessDone")).tap();
  });

  it("Move to Signup Functionality", async () => {
    await device.launchApp({
      newInstance: true,
    });
    await element(by.id("moveToSignup")).tap();
    await waitFor(element(by.id("Sign_up_screen")))
      .toBeVisible()
      .withTimeout(2000);
  });

  // uncomment to interact with server
  it("Skip Mode Functionality", async () => {
    await device.launchApp({
      newInstance: true,
    });
    await element(by.id("skipMode")).tap();
    await waitFor(element(by.id("homeScreenLocationPicker")))
      .toBeVisible()
      .withTimeout(2000);
  });

  it(`Login with ${credentials.email}`, async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {
        location: "always",
      },
    });
    await element(by.id("loginEmail")).replaceText(credentials.email);
    await element(by.id("loginPassword")).replaceText(credentials.password);
    await element(by.id("loginPP")).tap();
    await element(by.id("loginEula")).tap();
    await element(by.id("login")).tap();
    try {
      // if force Login
      await waitFor(element(by.id("forceLogin")))
        .toBeVisible()
        .withTimeout(3000);
      await element(by.id("forceLogin")).tap();
    } catch (e) {
      // expect(e);
    }
    await waitFor(element(by.id("homeScreenLocationPicker")))
      .toBeVisible()
      .withTimeout(7000);
  });
};
