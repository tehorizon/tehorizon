import { Platform, Linking } from "react-native";
import moment from "moment";
import ReactAppboy, { Genders } from "react-native-appboy-sdk";

const getDeviceToken = async () => {
  var deviceToken = "";
  return deviceToken;
};

const registerUserAppBoy = (userProfile) => {
  ReactAppboy.enableSDK();
  ReactAppboy.changeUser(userProfile.userId + "");
  ReactAppboy.setFirstName(userProfile.firstname);
  ReactAppboy.setLastName(userProfile.lastname);
  ReactAppboy.setEmail(userProfile.email);
  ReactAppboy.setCountry(userProfile.country_of_residence);
  ReactAppboy.setGender(
    userProfile.gender === "male" ? Genders.MALE : Genders.FEMALE
  );
  ReactAppboy.setPhoneNumber(userProfile.mobile_phone);
  try {
    if (userProfile?.date_of_birth) {
      const dob = moment(userProfile.date_of_birth, "DD/MM/YYYY");
      ReactAppboy.setDateOfBirth(dob.year(), dob.month() + 1, dob.date());
    }
  } catch (error) {
    console.log(error);
  }

  ReactAppboy.setEmailNotificationSubscriptionType(
    ReactAppboy.NotificationSubscriptionTypes.SUBSCRIBED
  );
  ReactAppboy.setPushNotificationSubscriptionType(
    ReactAppboy.NotificationSubscriptionTypes.SUBSCRIBED
  );
};

const registerSelectedLocation = (locationName) => {
  ReactAppboy.setCustomUserAttribute(
    "Product Location Selected in the App",
    locationName
  );
};

const registrationCompleteEvent = () => {
  ReactAppboy.logCustomEvent("registration complete", {});
  return;
};

const afterRedemptionEvent = (redemptionEventData) => {
  ReactAppboy.logCustomEvent("Redeemed", {
    Redemptiondate: new Date(),
    ...redemptionEventData,
  });
};

const onSearchEvent = (data) => {
  ReactAppboy.logCustomEvent("Global Search", {
    "Last Search": data.lastSearch,
    Timestamp: data.timeStamp,
  });
};

const setDatOfBirth = (dateOfBirth) => {
  ReactAppboy.setDateOfBirth(dateOfBirth);
};

const pushEnableDisable = (isEnable) => {
  const subscriptionType = isEnable ? "subscribed" : "unsubscribed";
  ReactAppboy.setPushNotificationSubscriptionType(subscriptionType);
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
  Platform.OS === "ios" ? ReactAppboy.getInitialURL : androidGetInitialURL;

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
