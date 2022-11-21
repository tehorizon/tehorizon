const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = path.resolve(__dirname);
const { presets } = require(`${appDirectory}/babel.config.js`);

const fs = require("fs-extra");

const compileNodeModules = [
  "expo-jwt",
  "@expo/vector-icons",
  "expo-font",
  "react-native-actionsheet",
  "react-native-tab-view",
  "react-native-swiper",
  "react-native-elements",
  "react-native-reanimated",
  "react-native-screens",
  "react-native-pie",
  "react-native-google-places-autocomplete",
  "react-native-animatable",
  "react-native-web-swiper",
  "react-native-keyboard-aware-scroll-view",
  "@react-native-community/geolocation",
  "react-native-gesture-handler",
  "react-native-safe-area-context",
  "@twotalltotems/react-native-otp-input",
  "react-native-modalize",
  "react-native-draggable",
  "react-native-web-svg-charts",
  "react-native-svg",
  "react-native-portalize",
  "@react-navigation/bottom-tabs",
  "@react-navigation/stack",
  "@react-navigation/native",
  "@react-navigation/material-top-tabs",
  "@react-navigation/core",
  "expo-image-picker",
  "react-native-draggable-flatlist",
  "react-native-vector-icons",
  "expo-blur",
  "rn-gzip",
  "react-native-bouncy-checkbox",
  "react-native-device-info",
  "react-native-ratings",
  // Add every react-native package that needs compiling
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  include: [
    path.resolve(__dirname, "index.js"),
    path.resolve(__dirname, "App.js"),
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "assets"),
    ...compileNodeModules,
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets,
      plugins: ["react-native-web"],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
      esModule: false,
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: "@svgr/webpack",
    },
  ],
};

const vectorIconsLoader = {
  test: /\.(otf|ttf|eot|woff|woff2)$/,
  loader: "file-loader", // or directly file-loader
  include: [
    path.resolve(__dirname, "node_modules/react-native-vector-icons/"),
    path.resolve(__dirname, "assets/fonts/"),
  ],
};

const reactNativePager = {
  test: /\.js$|tsx?$/,
  exclude: /node_modules[/\\](?!react-native-vector-icons)/,
  use: {
    loader: "babel-loader",
    options: {
      // Disable reading babel configuration
      babelrc: false,
      configFile: false,

      // The configuration for compilation
      presets: [
        ["@babel/preset-env", { useBuiltIns: "usage" }],
        "@babel/preset-react",
        "@babel/preset-flow",
        "@babel/preset-typescript",
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
      ],
    },
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/i,
  use: ["style-loader", "css-loader"],
};

const webViewRule = {
  test: /postMock.html$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};
const changeAppName = () => {
  let appconfig = fs.readJSONSync("./src/AppConfig.json");
  fs.writeFileSync(
    "./ios/ar.lproj/InfoPlist.strings",
    `"CFBundleDisplayName" ="${appconfig?.companyNameAr}";
    "CFBundleName" ="${appconfig?.companyNameAr}";`
  );
  fs.writeFileSync(
    "./ios/en.lproj/InfoPlist.strings",
    `"CFBundleDisplayName" ="${appconfig?.companyName}";
    "CFBundleName" ="${appconfig?.companyName}";`
  );
};
module.exports = () => {
  fs.writeJsonSync("./port.json", JSON.parse(`{"layout":${process.env.PORT}}`));
  changeAppName();
  return {
    mode: "development",
    entry: ["babel-polyfill", path.join(__dirname, "index.js")],
    devtool: "inline-source-map",

    devServer: {
      devMiddleware: {
        publicPath: process.env.ROUTE_PREFIX || "",
        writeToDisk: true,
      },
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }

        // nginx
        devServer.app.get("/setupLayout", (req, response) => {
          fs.writeJsonSync(req.query["path"], JSON.parse(req.query["data"]));
          response.send("Success");
        });

        return middlewares;
      },
      historyApiFallback: {
        index: "/",
      },
    },

    output: {
      path: path.resolve(appDirectory, "dist"),
      publicPath: process.env.ROUTE_PREFIX || "",
      filename: "dev.bundle.js",
      globalObject: "this",
    },

    module: {
      rules: [
        babelLoaderConfiguration,
        imageLoaderConfiguration,
        svgLoaderConfiguration,
        cssLoaderConfiguration,
        vectorIconsLoader,
        webViewRule,
        reactNativePager,
      ],
    },

    resolve: {
      extensions: [
        ".web.tsx",
        ".web.ts",
        ".tsx",
        ".ts",
        ".web.js",
        ".js",
        ".css",
      ],
      alias: {
        "react-native$": require.resolve("react-native-web"),
        "react-native-swipeout": require.resolve("rc-swipeout"),
        "@": path.resolve("resources/js"),
        "@appConfig": path.resolve("./src/AppConfig.json"),
        "react-native-webview": "react-native-web-webview",
        "react-native-linear-gradient": "react-native-web-linear-gradient",
        "react-native-maps": "react-native-web-maps",
        "@Auth": path.resolve("./src/modules/Auth/"),
        "@Outlet": path.resolve("./src/modules/Outlet/"),
        "@Home": path.resolve("./src/modules/Home/"),
        "@Profile": path.resolve("./src/modules/Profile/"),
        "@Favorite": path.resolve("./src/modules/Favorite/"),
        "@Merchant": path.resolve("./src/modules/Merchant/"),
        "@delivery": path.resolve("./src/modules/delivery/"),
        "@jailbreak": path.resolve("./src/modules/JailBreak/"),
        "@Notification": path.resolve("./src/modules/Notification/"),
        "@Travel": path.resolve("./src/modules/Travel/"),
        "@Attractions": path.resolve("./src/modules/AttractionWorldwide/"),
        "@company": path.resolve("./src/company.json"),
        "@commons": path.resolve("./src/commons/"),
        "@components": path.resolve("./src/components"),
        "@colors": path.resolve("./src/commons/colors"),
        "@companyApis": path.resolve("./src/companyAPis.json"),
        "@localization": path.resolve("./src/utils/localization/I18n.js"),
        "@utils": path.resolve("./src/utils"),
        "@redux": path.resolve("./src/redux"),
        "@HybridComponents": path.resolve("./src/HybridComponents"),
        "@assets": path.resolve("./src/assets"),
        "@fast_track": path.resolve("./"),
        "@network": path.resolve("./src/network"),
        "@fonts": path.resolve("./src/commons/fonts"),
        "rn-horizon-analytics": path.resolve(
          __dirname,
          "./rn-horizon-analytics"
        ),
        rn_fast_track_uilib: path.resolve(
          __dirname,
          "./libraries/rn_fast_track_uilib/build"
        ),
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        // title: appconfig?.companyName || "Fasttrack",
        template: path.join(__dirname, "index.html"),
        // favicon: path.join(
        //   __dirname,
        //   "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png"
        // ),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        // See: https://github.com/necolas/react-native-web/issues/349
        __DEV__: JSON.stringify(true),
      }),
      new webpack.DefinePlugin({ process: { env: {} } }),
    ],
  };
};
