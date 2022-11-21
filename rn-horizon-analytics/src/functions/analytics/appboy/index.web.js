import { Platform, Linking } from "react-native";
import appboy from "@braze/web-sdk";

const getDeviceToken = async () => {
  var deviceToken = "";
  return deviceToken;
};

const registerUserAppBoy = (userProfile) => {
  console.log({ user: userProfile });
  appboy.changeUser?.(userProfile?.userId || "");
  appboy.getUser().setFirstName(userProfile?.firstname || "");
  appboy.getUser().setLastName(userProfile?.lastname || "");
  appboy.getUser().setEmail(userProfile?.email || "");
  appboy.getUser().setCountry(userProfile?.country_of_residence || "");
  appboy
    .getUser()
    .setGender(
      userProfile?.gender === "male"
        ? appboy.User.Genders.MALE
        : appboy.User.Genders.FEMALE
    );
  appboy.getUser().setPhoneNumber(userProfile?.mobile_phone ?? "9713412321");
  // try {
  //   const dob = moment(userProfile.date_of_birth, 'DD/MM/YYYY');
  //   appboy.setDateOfBirth(dob.year(), dob.month() + 1, dob.date());
  // } catch (error) {}

  //   appboy.setEmailNotificationSubscriptionType(
  //     appboy.NotificationSubscriptionTypes.SUBSCRIBED,
  //   );
  appboy
    .getUser()
    .setEmailNotificationSubscriptionType(
      appboy.User.NotificationSubscriptionTypes.SUBSCRIBED
    );
  appboy
    .getUser()
    .setPushNotificationSubscriptionType(
      appboy.User.NotificationSubscriptionTypes.SUBSCRIBED
    );
  appboy.openSession();
};

const registerSelectedLocation = (locationName) => {
  appboy
    .getUser()
    .setCustomUserAttribute(
      "Product Location Selected in the App",
      locationName
    );
};

const registrationCompleteEvent = () => {
  appboy.logCustomEvent("registration complete", {});
  return;
};

const afterRedemptionEvent = (redemptionEventData) => {
  appboy.logCustomEvent("Redeemed", {
    Redemptiondate: new Date(),
    ...redemptionEventData,
  });
  return;
};

const onSearchEvent = (data) => {
  appboy.logCustomEvent("Global Search", {
    "Last Search": data.lastSearch,
    Timestamp: data.timeStamp,
  });
  return;
};

const setDatOfBirth = (dateOfBirth) => {
  appboy.getUser().setDateOfBirth(dateOfBirth);
};

const pushEnableDisable = (isEnable) => {
  const subscriptionType = isEnable ? "subscribed" : "unsubscribed";
  appboy.getUser().setPushNotificationSubscriptionType(subscriptionType);
};

const androidGetInitialURL = (callback) => {
  Linking.getInitialURL()
    .then((url) => {
      callback(url);
    })
    .catch((e) => {
      console.log(e);
    });
};

const AppBoyGetInitialURL =
  Platform.OS === "ios" ? appboy.getInitialURL : androidGetInitialURL;

const launchNewsFeed = (viewId) => {
  console.log({ viewId });
  appboy.display.toggleFeed(viewId);
};

// export default {
//   updateUser,
//   registrationCompleteEvent,
//   afterRedemptionEvent,
//   onSearchEvent,
//   setDatOfBirth,
//   getDeviceToken,
//   registerSelectedLocation,
//   pushEnableDisable,
//   AppBoyGetInitialURL,
//   launchNewsFeed,
// };

export default {
  registerUserAppBoy,
  registrationCompleteEvent,
  afterRedemptionEvent,
  onSearchEvent,
  setDatOfBirth,
  getDeviceToken,
  registerSelectedLocation,
  pushEnableDisable,
  AppBoyGetInitialURL,
};
