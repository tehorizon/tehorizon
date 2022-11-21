import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  NativeModules,
  Platform,
} from "react-native";

const Toast = NativeModules.ToastModule;

const NativeTest = () => {
  const showToast = (message) => {
    Toast.show(message, Toast.SHORT);
    //Toast.s()
  };

  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <TouchableOpacity
        onPress={async () => {
          if (Platform.OS === "android") {
            showToast("Hello");
          } else if (Platform.OS === "ios") {
            await NativeModules.GateawayPackage.name("Hello");
          }
        }}
      >
        <Text>show Toast</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NativeTest;
