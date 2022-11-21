import { device } from "detox";
import { messages, configuration } from "../../../../e2e/utils";

let { locationsList, home } = configuration;
let { sections, categories } = home;
const hasLocationPicked = async (location: string) => {
  await waitFor(element(by.id("locationList")))
    .toBeVisible()
    .withTimeout(2000);
  await waitFor(element(by.id(location)))
    .toBeVisible()
    .withTimeout(3000);
  await element(by.id(location)).tap();
  await waitFor(element(by.id("selectedLocationText")))
    .toHaveText(location)
    .withTimeout(3000);
};
export const HomeScreen = () => {
  beforeAll(async () => {
    await device.disableSynchronization();
  });

  it("Location Picker Flow", async () => {
    await waitFor(element(by.id("homeScreenLocationPicker")))
      .toBeVisible()
      .withTimeout(3000);
    await waitFor(element(by.id("locationSelectionText")))
      .toHaveText(messages.SELECT_LOCATION)
      .withTimeout(1000);
    await element(by.id("gotLocationButton")).tap();

    await hasLocationPicked(locationsList[0]);
  });

  it("Location List Flow", async () => {
    await waitFor(element(by.id("selectedLocationButton")))
      .toBeVisible()
      .withTimeout(3000);
    for (let index = 1; index < locationsList.length; index++) {
      await element(by.id("selectedLocationButton")).tap();
      await hasLocationPicked(locationsList[index]);
    }
  });

  it("Banner Functionality", async () => {
    await waitFor(element(by.id("banner")))
      .toBeVisible()
      .withTimeout(2000);
    await waitFor(element(by.id("bannerDetails")))
      .toBeVisible()
      .whileElement(by.id("banner"))
      .scroll(300, "right");

    await waitFor(element(by.id("banner0")))
      .toBeVisible()
      .whileElement(by.id("banner"))
      .scroll(300, "left");
  });

  it("Sections & their sequence", async () => {
    await waitFor(element(by.id("homeSections")))
      .toBeVisible()
      .withTimeout(2000);
    for (let index = 0; index < sections.length; index++) {
      try {
        await waitFor(element(by.text(sections[index])))
          .toBeVisible()
          .withTimeout(2000);
      } catch (error) {
        await waitFor(element(by.text(sections[index])))
          .toBeVisible()
          .whileElement(by.id("homeSections"))
          .scroll(200, "down");
      }
    }
  });

  it("Categories & their sequence", async () => {
    await device.launchApp({
      newInstance: true,
    });
    await waitFor(element(by.id("homeSections")))
      .toBeVisible()
      .withTimeout(2000);
    await waitFor(element(by.text("Categories")))
      .toBeVisible()
      .whileElement(by.id("homeSections"))
      .scroll(80, "down");
    for (let index = 0; index < categories.list.length; index++) {
      try {
        await waitFor(element(by.id(`category${index}`)))
          .toHaveText(categories.list[index])
          .withTimeout(1000);
      } catch (error) {
        await waitFor(element(by.id(`category${index}`)))
          .toHaveText(categories.list[index])
          .whileElement(by.id("categories"))
          .scroll(40, "right");
      }
    }
  });
};
