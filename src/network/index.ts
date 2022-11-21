// import axios from "./axios";
import { Platform } from "react-native";
import { getCommonParams } from "./networkHelpers";
import { decryptData } from "./decryption";
import { getEncyptedString } from "./encryption";
import { invokeApi as invokeWithoutSsl } from "./invokeApi";
import { invokeApi as invokeWithSsl } from "./SslPinning";
import * as Urls from "./urls";
import AppConfig from "../AppConfig.json";
const invokeApi =
  Platform.OS != "web" && AppConfig.sslPinningEnable
    ? invokeWithSsl
    : invokeWithoutSsl;

export { getCommonParams, invokeApi, Urls, decryptData, getEncyptedString };
