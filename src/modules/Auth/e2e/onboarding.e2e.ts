import { device } from "detox";

export const Onboarding = () => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      delete: true,
    });
  });

  it("Swipe Gesture Functionality", async () => {
    await waitFor(element(by.id("onboarding")))
      .toBeVisible()
      .withTimeout(7000);

    await element(by.id("onboarding")).swipe("left", "fast", 1, 0.8, NaN);
    await expect(element(by.id("slide1"))).toBeVisible();
    await element(by.id("slide1")).swipe("left", "fast", 1, 0.8, NaN);
    await expect(element(by.id("slide2"))).toBeVisible();
  });

  it("Arrow Tap Functionality", async () => {
    await waitFor(element(by.id("nextArrow")))
      .toBeVisible()
      .withTimeout(7000);

    await element(by.id("nextArrow")).tap();
    await expect(element(by.id("slide1"))).toBeVisible();
    await element(by.id("nextArrow")).tap();
    await expect(element(by.id("slide2"))).toBeVisible();
    await element(by.id("nextArrow")).tap();
    await waitFor(element(by.id("loginScreen"))).toBeVisible();
  });

  it("Skip Button Functionality", async () => {
    await waitFor(element(by.id("skip_onboarding")))
      .toBeVisible()
      .withTimeout(7000);

    await element(by.id("skip_onboarding")).tap();
    await waitFor(element(by.id("loginScreen"))).toBeVisible();
  });
};
