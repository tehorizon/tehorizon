import { device, expect, element } from "detox";
import { messages, configuration, checkError } from "../../../../e2e/utils";
let { credentials, wrongEmails } = configuration;

let signupDeeplink = `${configuration.scheme[device.getPlatform()]}://${
  configuration.deeplinks.signupScreen[0]
}?vip_key=${credentials.vip_key}`;
export const Signup = () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  it(`Open Signup screen with deeplink ${signupDeeplink}`, async () => {
    await device.launchApp({
      newInstance: true,
      url: signupDeeplink,
      permissions: {
        location: "always",
      },
    });
    await waitFor(element(by.id("Sign_up_screen")))
      .toBeVisible()
      .withTimeout(7000);
  });

  it("Should go back to login screen", async () => {
    await element(by.id("goBack")).tap();
    await expect(element(by.id("loginScreen"))).toBeVisible();
    await element(by.id("moveToSignup")).tap();
    await waitFor(element(by.id("Sign_up_screen")))
      .toBeVisible()
      .withTimeout(2000);
  });

  it("Empty Inputs Functionality", async () => {
    // all fields empty
    await checkError(
      "register",
      messages.Please_fill_in_all_the_required_fields
    );
    //Add Names
    await element(by.id("first_name")).replaceText(credentials.firstName);
    await element(by.id("last_name")).replaceText(credentials.lastName);
    await checkError(
      "register",
      messages.Please_fill_in_all_the_required_fields
    );
    //emailpassword
    await element(by.id("email")).replaceText(credentials.email);
    await element(by.id("password")).replaceText(credentials.password);
    await element(by.id("confirm_password")).replaceText(credentials.password);
    await checkError(
      "register",
      messages.Please_fill_in_all_the_required_fields
    );
  });

  it("Country Modal Show and hide", async () => {
    await element(by.id("country_of_residence")).tap();
    await waitFor(element(by.id("select_country_modal")))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id("select_country_modal"))).toBeVisible();
    await element(by.id("country_done")).tap();
  });

  it("Select Country", async () => {
    await element(by.id("country_of_residence")).tap();
    await waitFor(element(by.id("select_country_modal")))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id("select_country_modal"))).toBeVisible();
    await element(by.id("country1")).tap();
    await element(by.id("country2")).tap();
    await element(by.id("country3")).tap();
    await element(by.id("country_done")).tap();
  });

  it("Scroll Countires List to Pick Pakistan", async () => {
    await element(by.id("country_of_residence")).tap();
    await waitFor(element(by.id("select_country_modal")))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id("select_country_modal"))).toBeVisible();
    await waitFor(element(by.text("Pakistan")))
      .toBeVisible()
      .whileElement(by.id("countries"))
      .scroll(500, "down");
    await element(by.text("Pakistan")).tap();
    await element(by.id("country_done")).tap();
  });

  it("Reviewed Privacy Policy", async () => {
    await checkError(
      "register",
      messages.Please_review_accept_the_Privacy_Policy
    );
    await element(by.id("registerPP")).tap();
  });

  it("Reviewed End User Agreement", async () => {
    await checkError(
      "register",
      messages.Please_review_accept_the_End_User_License_Agreement
    );
    await element(by.id("registerEula")).tap();
  });

  it("Valid Email Functionality", async () => {
    await element(by.id("password")).replaceText(credentials.password);
    for (let index = 0; index < wrongEmails.length; index++) {
      const email = wrongEmails[index];
      await element(by.id("email")).replaceText(email);
      await checkError("register", messages.Please_enter_a_valid_email);
    }
  });

  it("Password functionality", async () => {
    await element(by.id("email")).replaceText(credentials.email);
    await element(by.id("password")).replaceText("123");
    await checkError(
      "register",
      messages.Please_enter_atleast_characters_for_password
    );
    await element(by.id("password")).replaceText(credentials.password);
    await element(by.id("confirm_password")).replaceText("wrong");
    await checkError(
      "register",
      messages.Password_and_confirm_password_do_not_match
    );
    await element(by.id("confirm_password")).replaceText(credentials.password);
  });

  it(`Successfull Sign up with ${credentials.email}`, async () => {
    await device.launchApp({
      newInstance: true,
      url: signupDeeplink,
      permissions: {
        location: "always",
      },
    });
    await waitFor(element(by.id("Sign_up_screen")))
      .toBeVisible()
      .withTimeout(7000);
    await element(by.id("first_name")).replaceText(credentials.firstName);
    await element(by.id("last_name")).replaceText(credentials.lastName);
    await element(by.id("email")).replaceText(credentials.email);
    await element(by.id("password")).replaceText(credentials.password);
    await element(by.id("confirm_password")).replaceText(credentials.password);
    await element(by.id("country_of_residence")).tap();
    await waitFor(element(by.id("select_country_modal")))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id("select_country_modal"))).toBeVisible();
    await element(by.id("country1")).tap();
    await element(by.id("country_done")).tap();
    await element(by.id("registerPP")).tap();
    await element(by.id("registerEula")).tap();
    await element(by.id("register")).tap();

    await waitFor(element(by.id("homeScreenLocationPicker")))
      .toBeVisible()
      .withTimeout(7000);
  });

  it(`Customer already exist with ${credentials.email}`, async () => {
    await device.launchApp({
      newInstance: true,
      delete: true,
      url: signupDeeplink,
      permissions: {
        location: "always",
      },
    });
    await element(by.id("first_name")).replaceText(credentials.firstName);
    await element(by.id("last_name")).replaceText(credentials.lastName);
    await element(by.id("email")).replaceText(credentials.email);
    await element(by.id("password")).replaceText(credentials.password);
    await element(by.id("confirm_password")).replaceText(credentials.password);
    await element(by.id("country_of_residence")).tap();
    await waitFor(element(by.id("select_country_modal")))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id("select_country_modal"))).toBeVisible();
    await element(by.id("country1")).tap();
    await element(by.id("country_done")).tap();
    await element(by.id("registerPP")).tap();
    await element(by.id("registerEula")).tap();
    await checkError(
      "register",
      "Customer with this email address already exists"
    );
    await waitFor(element(by.id("loginScreen")))
      .toBeVisible()
      .withTimeout(2000);
    await waitFor(element(by.id("loginEmail")))
      .toHaveText(credentials.email)
      .withTimeout(2000);
  });
};
