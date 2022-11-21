import { device, expect } from "detox";
import { and } from "react-native-reanimated";
import { checkError, sleep } from "../../../../e2e/utils";

export const UserPrefrencesScreen = () => {
  it("Reset password flow", async () => {
    await sleep(3000);
    await element(by.id("Reset Password")).tap();
    await waitFor(element(by.id("resetConfirmationModal")))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id("resetNo")).tap();
    await sleep(1000);
    await element(by.id("Reset Password")).tap();
    await waitFor(element(by.id("resetConfirmationModal")))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id("resetYes")).tap();
    try {
      await waitFor(element(by.id("resetEmailSuccessModal")))
        .toBeVisible()
        .withTimeout(5000);
      await element(by.id("resetSuccessDone")).tap();
    } catch (e) {
      await waitFor(element(by.id("error_modal_view")))
        .toBeVisible()
        .withTimeout(5000);
      await waitFor(element(by.id("error_modal_text")))
        .toHaveText("Oops! Some Thing Went Wrong!")
        .withTimeout(2000);
      await element(by.id("handle_ok")).tap();
    }
  });

  it("Delete Account flow", async () => {
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id("Delete Account")).tap();
    await waitFor(element(by.type("_UIAlertControllerActionView")))
      .toBeVisible()
      .withTimeout(5000);
    try {
      await element(
        by.label("Cancel").and(by.type("_UIAlertControllerActionView"))
      ).tap();
    } catch (e) {
      await element(
        by.label("Ok").and(by.type("_UIAlertControllerActionView"))
      ).tap();
    }
  });

  it("Goto Saving History", async () => {
    await element(by.id("Savings History")).tap();
    await sleep(1000);
    await waitFor(element(by.id("loader")))
      .not.toBeVisible()
      .withTimeout(12000);
    await sleep(2000);
    await element(by.id("headerBackButton")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(1000);
  });

  it("Goto Redemption History", async () => {
    await sleep(1000);
    await element(by.id("Redemption History")).tap();
    await waitFor(element(by.id("loader")))
      .not.toBeVisible()
      .withTimeout(14000);
    await sleep(2000);
    await element(by.id("headerBackButton")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(1000);
  });

  it("Goto Order History", async () => {
    await sleep(1000);
    await element(by.id("Order History")).tap();
    await waitFor(element(by.id("loader")))
      .not.toBeVisible()
      .withTimeout(12000);
    await sleep(1200);
    await element(by.id("headerBackButton")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(2000);
  });

  it("Open help", async () => {
    await sleep(1000);
    await element(by.id("Help")).tap();
    await waitFor(element(by.id("webViewContainer"))).toBeVisible();
    await waitFor(element(by.id("webViewHeaderTitle"))).toHaveLabel("Help");
    await waitFor(element(by.id("webViewLoader")))
      .not.toBeVisible()
      .withTimeout(7000);
    await waitFor(element(by.id("webView")))
      .toBeVisible()
      .withTimeout(3000);
    await sleep(1000);
    await element(by.id("webViewClose")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Open Instructions", async () => {
    await sleep(1000);
    await element(by.id("scrollView")).scroll(100, "down");
    await element(by.id("Instructions")).tap();
    await waitFor(element(by.id("swiperModal"))).toBeVisible();
    await waitFor(element(by.id("swiperModalHeaderTitle"))).toHaveLabel(
      "Instructions"
    );
    await sleep(1000);
    for (let i = 0; i < 3; i++) {
      await element(by.id("swiperModal")).swipe("left", "slow");
    }
    for (let i = 0; i < 3; i++) {
      await element(by.id("swiperModal")).swipe("right", "slow");
    }
    await element(by.id("swiperModalClose")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Open Rules of use", async () => {
    await sleep(1000);
    await element(by.id("scrollView")).scroll(100, "down");
    await element(by.id("Rules of Use")).tap();
    await waitFor(element(by.id("webViewContainer"))).toBeVisible();
    await waitFor(element(by.id("webViewHeaderTitle"))).toHaveLabel(
      "Rules of Use"
    );
    await waitFor(element(by.id("webViewLoader")))
      .not.toBeVisible()
      .withTimeout(7000);
    await waitFor(element(by.id("webView")))
      .toBeVisible()
      .withTimeout(3000);
    await sleep(1000);
    await element(by.id("webViewClose")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Open Privacy Policy", async () => {
    await sleep(1000);
    await element(by.id("scrollView")).scrollTo("bottom");
    await element(by.id("Privacy Policy")).tap();
    await waitFor(element(by.id("webViewContainer"))).toBeVisible();
    await waitFor(element(by.id("webViewHeaderTitle"))).toHaveLabel(
      "Privacy Policy"
    );
    await waitFor(element(by.id("webViewLoader")))
      .not.toBeVisible()
      .withTimeout(7000);
    await waitFor(element(by.id("webView")))
      .toBeVisible()
      .withTimeout(3000);
    await sleep(1000);
    await element(by.id("webViewClose")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Open End User License Agreement", async () => {
    await sleep(1000);
    await element(by.id("End User License Agreement")).tap();
    await waitFor(element(by.id("webViewContainer"))).toBeVisible();
    await waitFor(element(by.id("webViewHeaderTitle"))).toHaveLabel(
      "End User License Agreement"
    );
    await waitFor(element(by.id("webViewLoader")))
      .not.toBeVisible()
      .withTimeout(7000);
    await waitFor(element(by.id("webView")))
      .toBeVisible()
      .withTimeout(3000);
    await sleep(1000);
    await element(by.id("webViewClose")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(5000);
  });
};
