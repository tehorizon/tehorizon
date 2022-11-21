import { LinkingOptions } from "@react-navigation/native";
import { getStateFromPath } from "@react-navigation/core";
import { Linking, Platform } from "react-native";
import Config from "react-native-config";
import Branch, { BranchSubscriptionEvent } from "@HybridComponents/Branch";
import CategoryData from "@Home/defaults/CategoryData";
import { store } from "@redux/store";
import { setSkipMode } from "@redux/appReducer/app.actions";

const getAnyParamsPath = (path: string) => {
  let newPath = "";
  const route = path.split("?");
  newPath = `${route[0].toLowerCase()}`;
  if (route?.length > 1) {
    let params = route[1].split("&");
    for (let i = 0; i < params.length; i++) {
      newPath += `/:${params[i].split("=")[0]}`;
    }
  }
  return newPath;
};

const getCanonicalUrl = (params) => {
  let url = "";
  if (params && params?.deeplink) {
    let linkArray = params["~referring_link"]?.split("?");
    if (linkArray?.length > 1) {
      linkArray[0] = params.deeplink;
      url = linkArray?.join("?");
    } else {
      url = params.deeplink;
    }
  }
  return url;
};
const linking: LinkingOptions = {
  prefixes: [
    `${
      Platform.OS == "android"
        ? Config.URI_SCHEME_ANDROID
        : Config.URI_SCHEME_IOS
    }://`,
  ],
  // Custom function to get the URL which was used to open the app
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    let url = await Linking.getInitialURL(); // android

    // Next, you would need to get the initial URL from your third-party integration
    // It depends on the third-party SDK you use
    // For example, to get to get the initial URL for branch.io:
    const params = await Branch.getLatestReferringParams();
    if (params && params["+clicked_branch_link"]) {
      // Indicates initialization success and some other conditions.
      // No link was opened.
      return getCanonicalUrl(params);
    }
    if (Platform.OS != "web" && url != null) {
      return url;
    }
  },

  // Custom function to subscribe to incoming links
  subscribe(listener) {
    // First, you may want to do the default deep link handling
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    Linking.addEventListener("url", onReceiveURL);

    // Next, you would need to subscribe to incoming links from your third-party integration
    // For example, to get to subscribe to incoming links from branch.io:
    Branch.subscribe(({ error, params, uri }: BranchSubscriptionEvent) => {
      if (error) {
        console.error("Error from Branch: " + error);
        return;
      }
      console.log(params, "deeplink5");

      if (params && params["+non_branch_link"]) {
        const nonBranchUrl = params["+non_branch_link"];
        // Route non-Branch URL if appropriate.
        return;
      }

      if (params && !params["+clicked_branch_link"]) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
        return;
      }

      // A Branch link was opened
      let url = getCanonicalUrl(params);

      (url || uri) && listener(url || uri);
    });

    return () => {
      // Clean up the event listeners
      Linking.removeListener("url", onReceiveURL);
      // Branch.unsubscribe();
    };
  },
  config: {
    screens: {
      Tab: {
        initialRouteName: "Home",
        screens: {
          Home: {
            screens: {
              HomeTab: {
                initialRouteName: "HomeScreen",
                screens: {
                  HomeScreen: {
                    path: "fasttrack/:type?/:code?",
                    parse: {
                      type: String,
                      code: String,
                    },
                  },
                  Outlet: {
                    screens: {
                      OutletScreen: {
                        path: "opencategory/:category?/:limit?", // "allofers", "monthlyoffers" => need details of monthlyoffers to perfectly handle
                        parse: {
                          category: (category) => CategoryData[category],
                          limit: Number,
                        },
                      },
                    },
                  },
                },
              },
              Notification: {
                screens: {
                  NotificationScreen: "notifications",
                },
              },
              Delivery: {
                initialRouteName: "DeliveryHome",
                screens: {
                  DeliveryHome: {
                    path: "viewdeliveryoutlets/:category",
                    parse: {
                      category: (category) => CategoryData[category],
                      limit: Number,
                    },
                  },
                },
              },
              Favourite: {
                screens: {
                  FavouriteStack: {
                    screens: {
                      FavouriteScreen: "favourites",
                    },
                  },
                },
              },
              User: {
                initialRouteName: "UserProfile",
                screens: {
                  UserProfile: "myprofile",
                },
              },
            },
          },
          Search: {
            screens: {
              SearchScreen: {
                path: "quicksearch",
              },
            },
          },
          Merchant: {
            screens: {
              MerchantScreen: {
                path: "merchantdetailpage/:merchant_id/:outlet_id/:location_id?",
                parse: {
                  merchant_id: Number,
                  outlet_id: Number,
                  location_id: Number,
                },
              },
            },
          },
          Preference: {
            initialRouteName: "PreferenceScreen",
            screens: {
              PreferenceScreen: "prefrences/:type", // "help"
              RedemptionHistory: "redemptionhistory", // "redemptionhistory"
              SavingHistory: "savings",
            },
          },
          SavingBreakdown: {
            screens: {
              SavingsHistory: {
                path: "savingsbreakdown",
                exact: true,
              },
              RedemptionsHistory: {
                path: "redemptionsbreakdown",
                exact: true,
              },
            },
          },
        },
      },
      Auth: {
        screens: {
          Registeration: {
            initialRouteName: "Login",
            screens: {
              Register: {
                path: "ninedigitkey/:vip_key?",
                parse: {
                  vip_key: String,
                },
              },
            },
          },
        },
      },
    },
  },

  getStateFromPath(path, config) {
    console.log({ path, config });
    const state = store.getState();
    let skipMode = state?.appReducer?.skipMode;
    // remove tabs for skip mode
    if (skipMode) {
      config.screens.Tab = {
        initialRouteName: "Home",
        screens: {
          Home: {
            screens: {
              HomeTab: config.screens.Tab.screens.Home.screens.HomeTab,
            },
          },
          Merchant: {
            screens: {
              MerchantScreen: {
                path: "merchantdetailpage/:merchant_id/:outlet_id/:location_id?",
                parse: {
                  merchant_id: Number,
                  outlet_id: Number,
                  location_id: Number,
                },
              },
            },
          },
          Search: {
            screens: {
              SearchScreen:
                config.screens.Tab.screens.Search.screens.SearchScreen,
            },
          },
        },
      };
    }
    //manage multiple path for same screen

    if (
      path.toLowerCase() == "alloffers" ||
      path.toLowerCase() == "monthlyoffers"
    ) {
      path = "opencategory";
    }

    if (
      path.toLowerCase() == "help" ||
      path.toLowerCase() == "ruleofuse" ||
      path.toLowerCase() == "tutorial" ||
      path.toLowerCase() == "wallet" ||
      path.toLowerCase() == "eula" ||
      path.toLowerCase() == "myinformation" ||
      path.toLowerCase() == "rateapp"
    ) {
      path = `prefrences/${path}`;
    }

    if (
      path.toLowerCase() == "locations" ||
      path.toLowerCase() == "categories"
    ) {
      path = `fasttrack/${path}`;
    }

    if (
      path.toLowerCase()?.includes("filtersearch") ||
      path.toLowerCase()?.includes("appsearch") ||
      path.toLowerCase()?.includes("quicksearch")
    ) {
      config.screens.Tab.screens.Search.screens.SearchScreen = {
        path: getAnyParamsPath(path),
        parse: {
          search: (value: string) => value?.replaceAll("%20", " "),
          category: (category: string) => CategoryData[category],
          filters_selected_for_no: (values: string) =>
            values?.replaceAll("+", " ")?.replaceAll("%20", " ")?.split(","),
          filters_selected_for_yes: (values: string) =>
            values?.replaceAll("+", " ")?.replaceAll("%20", " ")?.split(","),
          sub_category_filter: (values: string) => values?.split(","),
        },
      };
    }

    if (path.toLowerCase()?.includes("merchantdetailpage")) {
      config.screens.Tab.screens.Merchant.screens.MerchantScreen = {
        path: getAnyParamsPath(path),
      };
    }

    // parse query params
    const route = path.split("?");
    if (route?.length > 1) {
      let params = route[1].split("&");
      path = `${route[0].toLowerCase()}`;
      for (let i = 0; i < params.length; i++) {
        let value = params[i].split("=")[1];
        path += `/${value}`;
      }
    } else {
      path = path.toLowerCase();
    }

    // end manage multiple paths
    // getawys?code=12121
    if (path?.includes("getaway")) {
      path = path?.replace("getaway", "fasttrack/getaway");
    }

    if (path?.includes("register")) {
      path = path?.replace("register", "ninedigitkey");
    }

    if (path?.includes("ninedigitkey") && skipMode) {
      store.dispatch(setSkipMode());
    }

    console.log({ path, config });
    return getStateFromPath(path, config);
  },
};

export default linking;
