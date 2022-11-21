import AppConfig from "../AppConfig.json";

export const getSslKeys = (): any => {
  //TODO: change appconfig based on current env
  return AppConfig.sslKeys;
};
