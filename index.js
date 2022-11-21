import "react-native-gesture-handler";
import { AppRegistry, Platform } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS == "web") {
  // require("@utils/vectorIconsWebIntegrator");
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById("app-root"),
  });
  if (module.hot) {
    module.hot.accept();
  }
}
