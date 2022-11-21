import { Platform, StatusBar, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// export const colors = {
//   THEME: "rgb(47, 133, 254)",
//   TEXT: "black",
//   PLACEHOLDER: "rgb(199, 199, 199)",
//   LIGHT_TEXT: "rgb(100, 100, 100)",
//   BACKGROUND: "white",
//   WHITE: "white",
//   DIVIDER: "rgb(180, 180, 180)",
//   BACKGROUND_GREY: "rgb(241, 241, 241)",
//   PROGRESS_BAR: "#ffa600",
// };

export const isAndroid = Platform.OS === "android" ? true : false;
export const isIOS = Platform.OS === "ios" ? true : false;
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;
export const STATUSBAR_HEIGHT = isIOS ? 0 : StatusBar.currentHeight;

export const DEFAULT_LANGUAGE = "en";

export const SUPPORTED_LANGUAGES = {
  en: "en",
  ar: "ar",
  zh: "zh",
  gr: "gr",
};

export const MONTHS_LIST = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Jan",
    isSelectable: true,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Feb",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Mar",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Apr",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    title: "May",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    title: "Jun",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d76",
    title: "Jul",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d77",
    title: "Aug",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d78",
    title: "Sep",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d79",
    title: "Oct",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d80",
    title: "Nov",
    isSelectable: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d81",
    title: "Dec",
    fullName: "December",
    isSelectable: true,
  },
];

export const YEARS_LIST = [
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "2016",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "2017",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "2018",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    title: "2019",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    title: "2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d76",
    title: "2021",
  },
];

export const Redeemability = {
  NON_REDEEMABLE: 0,
  REDEEMED: 1,
  REDEEMABLE: 2,
  REUSABLE: 3,
};

export const TravelSectionIdentifier = {
  TRAVEL_CATEGORY: "travel_category",
  GETAWAYS_CATEGORY: "getaways_category",
};
