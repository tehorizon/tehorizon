import JniKeys from "react-native-jni-keys";
import JWT from "expo-jwt";
export const wait = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const createJwt = async () => {
  const apiToken = await JniKeys.getKey("apiToken");
  const serectKey = await JniKeys.getKey("serectKey");
  const payload = {
    api_token: apiToken,
  };
  const jwt = JWT.encode(payload, serectKey);
  return jwt;
};
