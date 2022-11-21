import CryptoJS from "crypto-js";
import JniKeys from "@HybridComponents/JniKeys";

export const decryptData = async (data) => {
  if (typeof data == "string") {
    let key = CryptoJS.enc.Utf8.parse(await JniKeys.getKey("MAIN_SAULT"));
    let iv = CryptoJS.enc.Utf8.parse(await JniKeys.getKey("MAIN_IV"));
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedJSON = decrypted.toString(CryptoJS.enc.Utf8);
    if (decryptedJSON.includes("{")) {
      return JSON.parse(decryptedJSON);
    } else {
      return decryptedJSON;
    }
  } else {
    return data;
  }
};
