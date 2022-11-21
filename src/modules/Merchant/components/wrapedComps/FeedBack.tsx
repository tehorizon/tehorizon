import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { design, Feedback } from "rn_fast_track_uilib";
import {
  CustomText,
  CustomInput,
  CustomSafeAreaView,
  BorderButton,
  Partition,
} from "@components";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import {
  margin,
  marginVertical,
  paddingHorizontal,
} from "@utils/genericStyles";
import I18n, { getFlipForRTLStyle } from "@localization";
import { MerchantData, OffersToDisplay } from "../../interfaces/responses";
import Lottie from "lottie-react-native";
import Stars from "./Star";

interface PROPS {
  merchant: MerchantData;
  selectedOffer: OffersToDisplay;
  closeRemptionSuccessModal: () => void;
  redemptionResponse: Object;
}
export default function FeedBack(props: PROPS) {
  const { selectedOffer, merchant, closeRemptionSuccessModal } = props;
  const [rating, setRating] = useState(0);

  let behavior: "padding" | "height" =
    Platform.OS === "ios" ? "padding" : "height";

  useEffect(() => {
    setRating(0);
  }, []);

  return (
    <KeyboardAvoidingView behavior={behavior}>
      <CustomSafeAreaView style={[styles.mainView, getFlipForRTLStyle()]}>
        <Pressable onPress={closeRemptionSuccessModal}>
          <Image
            style={styles.closeButton}
            source={require("@assets/icons/cross_black.png")}
            resizeMode="contain"
          />
        </Pressable>
        <View style={styles.topView}>
          <Lottie
            autoPlay
            loop={false}
            source={Feedback}
            style={[styles.logo, getFlipForRTLStyle()]}
          />
          <CustomText style={[styles.rateExperienceText]}>
            {I18n.t("Rate_your_experience_at")}
          </CustomText>
          <CustomText style={styles.outletName}>{merchant?.name}</CustomText>
        </View>
        <Partition horizontal style={styles.seprator} />
        <View style={styles.paretntTwo}>
          <CustomText style={styles.improveText}>
            {I18n.t("Help_us_improve_the_experience")}
          </CustomText>
          <Stars onSelectRating={(data: number) => setRating(data)} />
          <CustomInput
            placeholder={I18n.t("Enter_your_feedback_here")}
            multiline
            returnKeyType="next"
            customStyle={styles.feedBakc}
            style={styles.inputStyle}
          />
        </View>
        <BorderButton
          title={I18n.t("Submit")}
          disabled={!rating ? true : false}
          onPress={closeRemptionSuccessModal}
        />
      </CustomSafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    ...margin(0),
    justifyContent: "flex-end",
  },
  mainView: {
    backgroundColor: design.Background_Secondary_Color,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    ...paddingHorizontal(24),
  },
  closeButton: {
    marginTop: 24,
    width: 16,
    height: 16,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  topView: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 182,
    width: 182,
  },
  paretntTwo: {
    alignItems: "center",
  },
  rateExperienceText: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
    marginBottom: 4,
  },
  outletName: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: PRIMARY_BOLD,
    color: design.Text_Secondary_Color,
  },
  improveText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  secondryColor: {
    color: design.Text_Secondary_Color,
  },
  amount: {
    fontSize: 34,
    fontFamily: PRIMARY_EXTRABOLD,
    color: design.Primary_Color,
    ...marginVertical(5),
  },
  seprator: {
    ...marginVertical(24),
  },
  feedBakc: {
    height: 92,
    ...marginVertical(16),
    backgroundColor: design.Background_Secondary_Color,
  },
  inputStyle: {
    height: 92,
    paddingTop: 16,
    textAlignVertical: "top",
  },
  starStyle: {
    width: 100,
    height: 20,
    marginBottom: 20,
  },
});
