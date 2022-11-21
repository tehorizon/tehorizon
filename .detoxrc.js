const fs = require("fs-extra");
let env = fs.readFileSync(".env");
let APP_NAME = env?.toLocaleString()?.split("APP_NAME=")[1]?.split("\n")[0];
let URI_SCHEME_IOS = env
  ?.toLocaleString()
  ?.split("URI_SCHEME_IOS=")[1]
  ?.split("\n")[0];
let URI_SCHEME_ANDROID = env
  ?.toLocaleString()
  ?.split("URI_SCHEME_ANDROID=")[1]
  ?.split("\n")[0];
let config = fs.readJSONSync("e2e/utils/configurations.json");
let appconfig = fs.readJSONSync("src/AppConfig.json");

config["credentials"]["email"] = `sherazi+${appconfig?.company?.toLowerCase()}${
  appconfig?.env
}${Math.floor(Math.random() * 1000000)}@theentertainerasia.com`;
config["scheme"] = {
  ios: URI_SCHEME_IOS,
  android: URI_SCHEME_ANDROID,
};
fs.writeJSONSync("e2e/utils/configurations.json", config);

module.exports = {
  testRunner: "jest",
  runnerConfig: "e2e/config.json",
  apps: {
    "ios.release": {
      type: "ios.app",
      binaryPath: `ios/build/Build/Products/Release-iphonesimulator/${APP_NAME}.app`,
      build:
        "xcodebuild -workspace ios/ftrntemplate.xcworkspace -scheme ftrntemplate -configuration Release -sdk iphonesimulator -derivedDataPath ios/build",
    },
    "ios.debug": {
      type: "ios.app",
      binaryPath: `ios/build/Build/Products/Debug-iphonesimulator/${APP_NAME}.app`,
      build:
        "xcodebuild -workspace ios/ftrntemplate.xcworkspace -scheme ftrntemplate -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
    },
    "android.debug": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
    },
    "android.release": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 13 Pro Max",
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "Pixel_3a_API_30_x86",
      },
    },
  },
  configurations: {
    "ios.sim.debug": {
      device: "simulator",
      app: "ios.debug",
      artifacts: {
        rootDir: ".artifacts/ios/debug",
      },
    },
    "ios.sim.release": {
      device: "simulator",
      app: "ios.release",
    },
    "android.sim.debug": {
      device: "emulator",
      app: "android.debug",
    },
    "android.sim.release": {
      device: "emulator",
      app: "android.release",
    },
  },
  artifacts: {
    rootDir: ".artifacts",
    log: { enabled: true },
    uiHierarchy: "enabled",
    screenshot: {
      shouldTakeAutomaticSnapshots: true,
      keepOnlyFailedTestsArtifacts: true,
      takeWhen: {
        testStart: false,
        testDone: true,
      },
    },
    video: {
      android: {
        bitRate: 4000000,
      },
      simulator: {
        codec: "hevc",
      },
    },
  },
};
