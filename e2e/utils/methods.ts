import { element } from "detox";

const checkError = async (button: string, message: string) => {
  await element(by.id(button)).tap();
  await waitFor(element(by.id("error_modal_view")))
    .toBeVisible()
    .withTimeout(2000);
  await waitFor(element(by.id("error_modal_text")))
    .toHaveText(message)
    .withTimeout(2000);
  await element(by.id("handle_ok")).tap();
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export { checkError, sleep };
