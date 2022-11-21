import CryptoJS from "crypto-js";
import JniKeys from "@HybridComponents/JniKeys";

export const getEncyptedString = async (body: Object) => {
  let key = CryptoJS.enc.Utf8.parse(await JniKeys.getKey("MAIN_SAULT"));
  let iv = CryptoJS.enc.Utf8.parse(await JniKeys.getKey("MAIN_IV"));

  let ciphertext = CryptoJS.AES.encrypt(
    typeof body === "object" ? JSON.stringify(body) : body,
    key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  let replacedText = ciphertext
    .toString()
    .split("+")
    .join("-")
    .split("=")
    .join(",")
    .split("/")
    .join("_");
  return replacedText;
  // return ciphertext.toString().replaceAll('+','-').replaceAll('=',',').replaceAll('/','_');
};
