import React from "react";
import { Keyboard, View } from "react-native";
import { ScreenTypes } from "../../interfaces";
import { design } from "rn_fast_track_uilib";
import globalStyles from "./styles";
import i18n, { getFlipForRTLStyle } from "@localization";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Login from "./Login";
import Register from "./Register";
import ReCaptchaV3 from "@HybridComponents/ReCaptchaV3";
import {
  Header,
  AlreadyLoggedInModal,
  CustomSafeAreaView,
  ResetPasswordSuccessModal,
} from "@components";
import { PRIMARY_EXTRABOLD } from "@fonts";

const Tab = createMaterialTopTabNavigator();

//component containing the view of login screen
const LoginComponent = (props: ScreenTypes.loginSignup) => {
  let {
    showDoneMessage,
    doneMessage,
    alreadyLoginData,
    _captchaRef,
    appConfigs,
    initialRouteName,
    captcha,
    // methods
    handleSkipMode,
    handleForceLogin,
    changedMindCallback,
    updateCaptchaToken,
    hideResetModal,
    makeAnalyticsStack,
  } = props;
  return (
    <CustomSafeAreaView
      style={[globalStyles.droidSafeArea, getFlipForRTLStyle()]}
    >
      <ResetPasswordSuccessModal
        isVisible={showDoneMessage}
        dataString={doneMessage}
        hide={hideResetModal}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: design.Background_Primary_Color
            ? design.Background_Primary_Color
            : "gray",
          flexDirection: "column",
        }}
      >
        <Header showSkip skipModeCallback={handleSkipMode} />

        <AlreadyLoggedInModal
          alreadyLoginData={alreadyLoginData}
          disable={changedMindCallback}
          forceLogin={handleForceLogin}
        />

        {!appConfigs?.isKeyValidationEnabled ? (
          <Tab.Navigator
            initialRouteName={initialRouteName}
            tabBarOptions={{
              allowFontScaling: false,
              inactiveTintColor: design.Tabs_Title_InActive_Color,
              activeTintColor: design.Tabs_Title_Active_Color,
              style: {
                backgroundColor: design.Header_Background_Primary_Color,
                marginTop: 0,
                marginBottom: 0,
                height: 50,
              },
              indicatorStyle: {
                height: 3,
                backgroundColor: design.Active_Tabs_Under_Line_Color,
              },
              labelStyle: {
                fontFamily: PRIMARY_EXTRABOLD,
                lineHeight: 16,
                ...getFlipForRTLStyle(),
              },
            }}
          >
            <Tab.Screen
              testID={"login_tab"}
              name="Login"
              initialParams={props}
              component={Login}
              options={{
                title: i18n.t("SIGN_IN_STRING"),
                textColor: "white",
              }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  navigation.navigate("Login");
                  Keyboard.dismiss();
                  makeAnalyticsStack("Login", "open", "", "", "", 0, true);
                },
              })}
            />
            <Tab.Screen
              testID={"register_tab"}
              name="Register"
              initialParams={props}
              component={Register}
              options={{ title: i18n.t("REGISTER_STRING") }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  navigation.navigate("Register");
                  Keyboard.dismiss();
                  makeAnalyticsStack("Register", "open", "", "", "", 0, true);
                },
              })}
            />
          </Tab.Navigator>
        ) : (
          renderKeyValidationComponents(props)
        )}

        {appConfigs.is_captcha_verification && (
          <ReCaptchaV3
            ref={_captchaRef}
            captchaDomain={captcha}
            siteKey={"6LeY6M8ZAAAAAFg_llhy7PX6hlO0tixNKaR7MznB"}
            onReceiveToken={updateCaptchaToken}
          />
        )}
      </View>
    </CustomSafeAreaView>
  );
};

const renderKeyValidationComponents = (props: ScreenTypes.loginSignup) => {
  let { initialRouteName, navigation, type } = props;

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBarOptions={{
        inactiveTintColor: design["Tabs_Title_InActive_Color"],
        activeTintColor: design["Tabs_Title_Active_Color"],
        style: {
          backgroundColor: design["Header_Background_Primary_Color"],
          marginTop: 0,
          marginBottom: 0,
          height: 40,
        },
        indicatorStyle: {
          height: 3,
          backgroundColor: design["Active_Tabs_Under_Line_Color"],
        },
        labelStyle: {
          fontFamily: PRIMARY_EXTRABOLD,
          lineHeight: 16,
          ...getFlipForRTLStyle(),
        },
      }}
    >
      {type === "LoginWithoutSuccess" || type === "LoginSuccess" ? (
        <Tab.Screen
          testID={"login_tab"}
          name="Login"
          initialParams={props}
          component={Login}
          options={{
            title: i18n.t("SIGN_IN_STRING"),
            textColor: "white",
          }}
        />
      ) : (
        <Tab.Screen
          testID={"register_tab"}
          name="Register"
          initialParams={props}
          component={Register}
          options={{ title: i18n.t("REGISTER_STRING") }}
        />
      )}
    </Tab.Navigator>
  );
};

export default LoginComponent;
