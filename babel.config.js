const path = require("path");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "module:metro-react-native-babel-preset",
        {
          unstable_disableES6Transforms: true,
        },
      ],
    ],
    env: {
      production: {
        plugins: ["transform-remove-console", "react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          // cwd: "packagejson",
          root: ["./src"],
          alias: {
            "@localization": path.resolve(
              __dirname,
              "./src/utils/localization/I18n.js"
            ),
            "@company": "./src/company.json",
            "@commons": "./src/commons",
            "@components": "./src/components",
            "@colors": "./src/commons/colors",
            "@companyApis": "./src/companyAPis.json",
            "@appConfig": "./src/AppConfig.json",
            "@Auth": "./src/modules/Auth/",
            "@Outlet": "./src/modules/Outlet/",
            "@Home": "./src/modules/Home/",
            "@Profile": "./src/modules/Profile/",
            "@Search": "./src/modules/Search/",
            "@Favorite": "./src/modules/Favorite/",
            "@Merchant": "./src/modules/Merchant/",
            "@Notification": "./src/modules/Notification/",
            "@utils": "./src/utils",
            "@redux": "./src/redux",
            "@fast_track": "./",
            "@HybridComponents": "./src/HybridComponents",
            "@assets": "./src/assets",
            "@network": "./src/network",
            "@fonts": "./src/commons/fonts",
            "@delivery": "./src/modules/Delivery/",
            "@jailbreak": "./src/modules/JailBreak",
            "@Travel": "./src/modules/Travel/",
            "@Attractions": "./src/modules/AttractionWorldwide/",
          },
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
  };
};
