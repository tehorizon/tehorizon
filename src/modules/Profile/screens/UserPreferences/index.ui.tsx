import React, { useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import styles from "./styles";
import i18n, { getFlipForRTLStyle, isRTL } from "@localization";
import EditAccountModal from "../../components/EditAccountModal";
import { design } from "rn_fast_track_uilib";
import PreferenceSection from "../../components/PreferenceSection";
import ActionSheet from "react-native-actionsheet";
import {
  CustomText,
  HeaderWithBackButton,
  WebViewModal,
  SwiperModal,
  ResetPasswordModal,
  ResetPasswordSuccessModal,
  Intro,
} from "@components";
import deviceInfoModule from "react-native-device-info";
import AppConfig from "@fast_track/src/AppConfig.json";
import LayoutButton from "@HybridComponents/LayoutButton";

import DraggableFlatList, {
  ListItem,
} from "@HybridComponents/DraggableFlatList";
import Image from "@HybridComponents/Image";

const PreferenceUI = ({
  data: {
    instructions,
    showInstructionsView,
    profile_image,
    email,
    navigation,
    travel_key,
    user,
    userDefaultObj,
    doneMessage,
    isResetSuccessModalVisible,
    webviewURL,
    webViewTitle,
    showWebView,
    isEditAccountVisible,
    isResetPasswordModalVisible,
    layout,
    subscriptionAvialable,
    chat,
    cashless,
    showIntro,
    pushNotification,
  },
  callbacks: {
    setshowIntro,
    hideInstructionsView,
    makeAnalyticsStack,
    editProfile,
    showResetPasswordModal,
    subscriptionPress,
    openHelp,
    showInstructions,
    openHotelRule,
    openUserLicense,
    openPrivacyPolicy,
    openRuleOfUse,
    onUpdateHandler,
    hideEditAccountModal,
    resetPassword,
    hideResetPasswordModal,
    setisResetSuccessModalVisible,
    disableWebView,
    onPressActionSheetHandler,
    updateLayout,
    onUpdateLayoutRequest,
    rateApp,
    deleteAcccount,
    onChangeNotificationValue,
  },
}: any) => {
  const ActionSheetRef = useRef();

  const showActionSheet = () => {
    ActionSheetRef?.current?.show();
  };

  return (
    <View
      testID="preferencesScreen"
      style={[styles.mainContainer, getFlipForRTLStyle()]}
    >
      <SwiperModal
        slidesData={instructions || []}
        headerString={i18n.t("Instructions")}
        isVisible={showInstructionsView}
        disableCalback={hideInstructionsView}
      />

      <HeaderWithBackButton
        title={i18n.t("PREFERENCES")}
        navigation={navigation}
      />
      <LayoutButton title="Upload Layout" onPress={onUpdateLayoutRequest} />

      <ScrollView
        testID="scrollView"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <DraggableFlatList
          contentContainerStyle={{ paddingBottom: 44 }}
          // style={getFlipForRTLStyle()}
          ListHeaderComponent={() => (
            <View style={styles.profileDetails}>
              <Image
                style={styles.profileImage}
                source={
                  profile_image
                    ? { uri: profile_image }
                    : require("../../images/profiles-icon.png")
                }
                resizeMode="cover"
              />
              <CustomText style={styles.nameText}>
                {user.firstname} {user.lastname}
              </CustomText>
              <CustomText style={styles.emailText}>{email}</CustomText>
              {/* <TouchableOpacity
                onPress={editProfile}
                style={styles.editAccountButton}
              >
                <CustomText style={{ color: design.Primary_Color }}>
                  {i18n.t("EDIT ACCOUNT")}
                </CustomText>
              </TouchableOpacity> */}
            </View>
          )}
          ListFooterComponent={() => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  makeAnalyticsStack("Account", "select_sign_out");
                  showActionSheet();
                }}
                style={styles.signoutButton}
              >
                <CustomText
                  style={{ color: design.Text_Primary_Color, fontSize: 16 }}
                >
                  {i18n.t("Log_Out")}
                </CustomText>
              </TouchableOpacity>
              <CustomText
                style={{
                  color: design.Text_Secondary_Color,
                  fontSize: 14,
                  alignSelf: "center",
                }}
              >
                {`${i18n.t(
                  "App Version"
                )} v${deviceInfoModule.getVersion()} (${deviceInfoModule.getBuildNumber()})${
                  AppConfig.env != "live"
                    ? ` - ${AppConfig.env?.toUpperCase()}`
                    : ""
                }`}
              </CustomText>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          onDragEnd={({ data }: any) => updateLayout(data)}
          data={layout}
          renderItem={({ item, drag, isActive }: any) => {
            switch (item) {
              case "My Account":
                return (
                  <ListItem drag={drag} isActive={isActive}>
                    <PreferenceSection
                      heading={i18n.t("My Account")}
                      options={[
                        {
                          title: i18n.t("Profile detail"),
                          onPress: editProfile,
                        },
                        {
                          title: i18n.t("Reset Password"),
                          onPress: showResetPasswordModal,
                        },
                        {
                          title: i18n.t("Notificattion"),
                          value: pushNotification,
                          onChange: onChangeNotificationValue,
                          disable: true,
                        },
                        // {
                        //   title: i18n.t("Delete Account"),
                        //   onPress: deleteAcccount,
                        //   dangerous: true,
                        // },
                      ]}
                    />
                  </ListItem>
                );
              case "Subscription":
                return (
                  subscriptionAvialable && (
                    <ListItem drag={drag} isActive={isActive}>
                      <PreferenceSection
                        heading={i18n.t("Subscription")}
                        options={[
                          {
                            title: i18n.t("Manage Subscription"),
                            onPress: subscriptionPress,
                          },
                        ]}
                      />
                    </ListItem>
                  )
                );
              case "My History":
                return (
                  <ListItem drag={drag} isActive={isActive}>
                    <PreferenceSection
                      heading={i18n.t("My History")}
                      options={[
                        {
                          title: i18n.t("Savings_History"),
                          onPress: () => navigation.navigate("SavingHistory"),
                        },
                        {
                          title: i18n.t("Redemption_History"),
                          onPress: () =>
                            navigation.navigate("RedemptionHistory"),
                        },
                        ...(cashless
                          ? [
                              {
                                title: i18n.t("Order_History"),
                                onPress: () =>
                                  navigation.navigate("OrderHistory"),
                              },
                            ]
                          : []),
                      ]}
                    />
                  </ListItem>
                );
              case "Help & Support":
                return (
                  <ListItem drag={drag} isActive={isActive}>
                    <PreferenceSection
                      heading={i18n.t("Help & Support")}
                      options={[
                        ...(AppConfig?.showIntro
                          ? [
                              {
                                title: i18n.t("Onboarding Walkthrough"),
                                onPress: () => setshowIntro(true),
                              },
                            ]
                          : []),
                        {
                          testID: "Help",
                          title: i18n.t(`Help${chat ? " & Live Chat" : ""}`),
                          onPress: openHelp,
                        },
                        {
                          title: i18n.t("Instructions"),
                          onPress: showInstructions,
                        },
                        {
                          title: i18n.t("Rules of Use"),
                          onPress: openRuleOfUse,
                        },
                        ...(travel_key === true
                          ? [
                              {
                                title: i18n.t("Hotel Rule of Use"),
                                onPress: openHotelRule,
                              },
                            ]
                          : []),
                      ]}
                    />
                  </ListItem>
                );
              case "About":
                return (
                  <ListItem drag={drag} isActive={isActive}>
                    <PreferenceSection
                      heading={i18n.t("About")}
                      options={[
                        {
                          title: i18n.t("Privacy Policy"),
                          onPress: openPrivacyPolicy,
                        },
                        {
                          title: i18n.t("End User License Agreement"),
                          onPress: openUserLicense,
                        },
                        {
                          title: i18n.t("Rate Our App"),
                          onPress: rateApp,
                        },
                        // ...(Platform.OS != "web"
                        //   ? [
                        //       {
                        //         title: `${i18n.t(
                        //           "App Version"
                        //         )} v${deviceInfoModule.getVersion()} (${deviceInfoModule.getBuildNumber()})${
                        //           AppConfig.env != "live"
                        //             ? ` - ${AppConfig.env?.toUpperCase()}`
                        //             : ""
                        //         }`,
                        //         disable: true,
                        //       },
                        //     ]
                        //   : []),
                      ]}
                    />
                  </ListItem>
                );
              default:
                return null;
            }
          }}
          keyExtractor={(item) => item}
        />
      </ScrollView>
      <EditAccountModal
        user={user || userDefaultObj}
        onUpdate={onUpdateHandler}
        hideEdit={hideEditAccountModal}
        isVisible={isEditAccountVisible}
      />

      <ResetPasswordModal
        isVisible={isResetPasswordModalVisible}
        hide={hideResetPasswordModal}
        resetPassword={resetPassword}
      />
      <ResetPasswordSuccessModal
        dataString={doneMessage}
        isVisible={isResetSuccessModalVisible}
        hide={() => setisResetSuccessModalVisible(false)}
      />

      <WebViewModal
        urlString={webviewURL}
        headerString={webViewTitle}
        isVisible={showWebView}
        disableCalback={disableWebView}
      />

      <ActionSheet
        ref={ActionSheetRef}
        title={i18n.t("Are_you_sure_you_want_to_Sign_Out")}
        options={[i18n.t("Sign_Out"), i18n.t("Cancel")]}
        destructiveButtonIndex={0}
        onPress={onPressActionSheetHandler}
      />
      <Intro
        isVisible={showIntro}
        navigation={navigation}
        onPressSkip={() => setshowIntro(false)}
      />
    </View>
  );
};

export default PreferenceUI;
