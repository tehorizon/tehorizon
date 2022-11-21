import { device } from "detox";
import { messages, configuration, sleep } from "../../../../e2e/utils";

let { home } = configuration;
let { categories } = home;
let { tabs } = categories;
export const OutletScreen = () => {
  for (let index = 0; index < categories.list.length; index++) {
    let category = categories.list[index];
    it(`${category} flow`, async () => {
      await waitFor(element(by.id("homeSections")))
        .toBeVisible()
        .withTimeout(3000);
      try {
        await waitFor(element(by.text("Categories")))
          .toBeVisible()
          .withTimeout(1000);
      } catch (error) {
        await waitFor(element(by.text("Categories")))
          .toBeVisible()
          .whileElement(by.id("homeSections"))
          .scroll(40, "down");
      }
      try {
        await waitFor(element(by.id(category)))
          .toBeVisible()
          .withTimeout(1000);
      } catch (error) {
        await waitFor(element(by.id(category)))
          .toBeVisible()
          .whileElement(by.id("categories"))
          .scroll(40, "right");
      }
      await element(by.id(category)).tap();
      await waitFor(element(by.id("outletHeading")))
        .toHaveText(category)
        .withTimeout(5000);
      await waitFor(element(by.id("loader")))
        .not.toBeVisible()
        .withTimeout(7000);
      // tabs existence
      for (let i = 0; i < tabs.length; i++) {
        await waitFor(element(by.id(tabs[i])))
          .toBeVisible()
          .withTimeout(1000);
      }

      if (tabs.length > 1) {
        // check tap
        await element(by.id(tabs[1])).tap();
        await waitFor(element(by.id(`tab-${tabs[1]}`)))
          .toBeVisible()
          .withTimeout(7000);
        // check swipe
        await element(by.id(`tab-${tabs[1]}`)).swipe("right", "fast", 0.5);
        await waitFor(element(by.id(`tab-${tabs[0]}`)))
          .toBeVisible()
          .withTimeout(7000);
      }
      // go back
      await waitFor(element(by.id("backButton")))
        .toBeVisible()
        .withTimeout(5000);
      await element(by.id("backButton")).tap();
      await sleep(2000);
    });
  }
};
