import { sleep } from "@fast_track/e2e/utils";
import { device, expect } from "detox";

export const UserProfileScreen = () => {
  it("Goto profile", async () => {
    await waitFor(element(by.id("homeScreen")))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id("userTab")).tap();
    await waitFor(element(by.id("profileScreen")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Open Bottom Sheet", async () => {
    await element(by.id("cameraIcon")).tap();
    await waitFor(element(by.id("actionSheet"))).toBeVisible();
    await element(by.text("Cancel")).tap();
  });

  it("Open camera", async () => {
    await sleep(3000);
    await element(by.id("cameraIcon")).tap();
    await waitFor(element(by.id("actionSheet"))).toBeVisible();
    await element(by.text("Camera")).tap();
  });

  it("Open Gallery", async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id("homeScreen")))
      .toBeVisible()
      .withTimeout(7000);
    await element(by.id("userTab")).tap();
    await waitFor(element(by.id("profileScreen")))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id("cameraIcon")).tap();
    await waitFor(element(by.id("actionSheet"))).toBeVisible();
    await element(by.text("Gallery")).tap();
  });

  it("Goto Saving Breakdown and back to profile", async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id("homeScreen")))
      .toBeVisible()
      .withTimeout(7000);
    await element(by.id("userTab")).tap();
    await waitFor(element(by.id("profileScreen")))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id("savingBreakdown")).tap();
    await waitFor(element(by.id("savingBreakdownScreen")))
      .toBeVisible()
      .withTimeout(7000);
    await waitFor(element(by.id("loader")))
      .not.toBeVisible()
      .withTimeout(12000);
    await element(by.id("headerBackButton")).tap();
    await waitFor(element(by.id("profileScreen")))
      .toBeVisible()
      .withTimeout(3000);
  });

  it("Goto preferences", async () => {
    await sleep(1000);
    await element(by.id("headerRightButton")).tap();
    await waitFor(element(by.id("preferencesScreen")))
      .toBeVisible()
      .withTimeout(5000);
  });
};
