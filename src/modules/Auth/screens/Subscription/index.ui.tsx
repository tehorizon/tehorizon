import React from "react";
import { View } from "react-native";
import { ScreenTypes } from "../../interfaces";
import i18n, { getFlipForRTLStyle } from "@localization";
import styles from "./styles";

//Components
import BulletPoint from "./Components/BulletPoint";

import {
  CustomSafeAreaView,
  CustomText,
  BorderButton,
  Header,
} from "@components";
import { marginHorizontal, marginVertical } from "@utils/genericStyles";

//component containing the view
const SubscriptionComponent = (props: ScreenTypes.Subscription) => {
  //props
  let {} = props;

  const values = [
    "2,300+ food offers across Oman",
    "800+ drinks offers across Oman",
    "1,200+ beauty & fitness offers across Oman",
    "1,000+ attractions & leisure offers across Oman",
    "Includes hotel offers & packages",
  ];

  const renderBulletPoint = (values: Array<string>) => {
    return values.map((value) => {
      return <BulletPoint value={value} />;
    });
  };

  return (
    <CustomSafeAreaView style={[styles.mainView, getFlipForRTLStyle()]}>
      <Header />

      <View style={{ ...marginHorizontal(16) }}>
        <CustomText style={styles.heading}>
          {i18n.t("WELCOME_BACK")}{" "}
        </CustomText>

        <CustomText style={styles.description}>
          {
            "Discover great deals while saving with the amazing 2-for-1 offers*."
          }
        </CustomText>

        <View style={{ ...marginVertical(24) }}>
          {renderBulletPoint(values)}
        </View>

        <CustomText style={styles.priceText}>{"OMR 1.90 Per Month"}</CustomText>

        <CustomText style={[styles.priceText, styles.trailText]}>
          {"after your trial ends"}
        </CustomText>

        <BorderButton
          style={styles.subscriptionButton}
          onPress={() => {
            console.log("hello");
          }}
          title={i18n.t("RESTART_SUBSCRIPTION")}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default SubscriptionComponent;
