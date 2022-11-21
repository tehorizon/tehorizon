import { Platform } from "react-native";
import { hasGmsSync } from "react-native-device-info";
import NetInfo from "@react-native-community/netinfo";
export const hasGmsAndroid = async () => {
  if (Platform.OS === "android") {
    return hasGmsSync();
  } else {
    return true;
  }
};

export const getNetInfo = async () => {
  const state = await NetInfo.fetch();
  return state;
};

export const userDefaultObj = {
  country_of_residence: "",
  currency: "USD",
  date_of_birth: "",
  is_demographics_updated: 1,
  email: "",
  firstname: "",
  gender: "male",
  lastname: "",
  mobile_phone: "",
  nationality: "",
  profile_image: "",
  push_notifications: 1,
  savings: 0,
  userId: 1,
};
