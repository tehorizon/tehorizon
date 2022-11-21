import React from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import CompanyInfo from "../../components/CompanyInfo";
import PriceWithExpiry from "../../components/PriceWithExpiry";
import SubscriptionButton from "../../components/SubscriptionButton";
import { design } from "rn_fast_track_uilib";
import { CustomText, HeaderWithBackButton } from "@components";
import { PRIMARY_BOLD } from "@fonts";
import I18n from "@localization";

const SubscriptionUI = ({
  isSubscribed,
  onSubscriptionPress,
  navigation,
}: any) => {
  //TODO: move these to localization if not provided by the api
  const subscriptionText = isSubscribed
    ? "Cancel Subscription"
    : "Reactivate Subscription";
  const moreInfoText = isSubscribed
    ? "If you cancel now, you can still access your subcription untill 08 Sep 2021"
    : "Your subscription expires on 08 Sep 2021, you can reactivate your subscription to continue using our service.";
  const subscriptionTextColor = isSubscribed
    ? "rgb(210,47,112)"
    : "rgb(39,99,158)";

  const expiryText = isSubscribed
    ? "Recurring billing • Cancel at any time"
    : "Expires on 08 Sep 2021";
  return (
    <View style={styles.container}>
      <HeaderWithBackButton
        title={I18n.t("Edit Subscription")}
        navigation={navigation}
      />
      <View style={styles.content}>
        {/* displays Entertainer logo with renewal info */}

        <CompanyInfo
          image={require("@assets/images/ent-icon.png")}
          companyName={"The Entertainer"}
          subscriptionTitle={"Monthly Suscription"}
          renewalDate={"Next Renewal Date: 07 Sep 2021"}
        />
        {/* displays price p/m with expiry date*/}
        <PriceWithExpiry
          style={styles.priceExpiry}
          price="XX.XX OMR 1.90/Month"
          expiry={expiryText}
        />

        {/* displays button for subscription/cancellation */}
        <SubscriptionButton
          text={subscriptionText}
          textStyle={{ color: subscriptionTextColor }}
          onPress={onSubscriptionPress}
        />
        {/* additional information about subscription */}
        <CustomText style={styles.moreInfoText}>{moreInfoText}</CustomText>
      </View>
    </View>
  );
};

export default SubscriptionUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 26,
  },
  priceExpiry: {
    marginTop: 20,
    marginBottom: 20,
  },
  moreInfoText: {
    fontSize: 13,
    lineHeight: 18,
    marginStart: 16,
    marginEnd: 16,
    marginTop: 14,
    color: design["Text_Lite_Color"],
    fontFamily: PRIMARY_BOLD,
  },
});
