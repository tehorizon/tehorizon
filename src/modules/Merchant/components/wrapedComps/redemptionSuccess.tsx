import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { design, SuccessAnimation } from "rn_fast_track_uilib";
import {
  CustomText,
  CustomSafeAreaView,
  BorderButton,
  Partition,
} from "@components";
import Modal from "@HybridComponents/Modal";
import { PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import {
  margin,
  marginVertical,
  paddingHorizontal,
} from "@utils/genericStyles";
import I18n, { getFlipForRTLStyle } from "@localization";
import { MerchantData, OffersToDisplay } from "../../interfaces/responses";
import Lottie from "lottie-react-native";
import FeedBack from "./FeedBack";
interface PROPS {
  isVisible: boolean;
  merchant: MerchantData;
  selectedOffer: OffersToDisplay;
  closeRemptionSuccessModal: () => void;
  redemptionResponse: Object;
  currency: string;
}
export default function RedemptionSuccess(props: PROPS) {
  const {
    isVisible,
    selectedOffer,
    merchant,
    closeRemptionSuccessModal,
    redemptionResponse,
    currency,
  } = props;
  if (redemptionResponse === undefined || redemptionResponse === null) {
    return <View />;
  }

  const [showRating, setShowRating] = useState(false);
  const donePress = () => {
    setShowRating(true);
    // closeRemptionSuccessModal
  };
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalStyle} //commented out due to android design
    >
      {showRating ? (
        <FeedBack
          redemptionResponse={redemptionResponse}
          merchant={merchant}
          selectedOffer={selectedOffer}
          closeRemptionSuccessModal={closeRemptionSuccessModal}
        />
      ) : (
        <CustomSafeAreaView style={[styles.mainView, getFlipForRTLStyle()]}>
          <View style={styles.topView}>
            <Lottie
              autoPlay
              loop={false}
              source={SuccessAnimation}
              style={[styles.logo, getFlipForRTLStyle()]}
            />
            <CustomText style={styles.savedtext}>
              {I18n.t("You’ve just saved")}
            </CustomText>
            <CustomText style={styles.amount}>
              {currency} {selectedOffer?.savings_estimate || 0}
            </CustomText>
            <CustomText style={[styles.savedtext, styles.secondryColor]}>
              {selectedOffer.name}
            </CustomText>
            {/* <CustomText style={styles.outletName}>{merchant?.name}</CustomText> */}
            {/* <CustomText style={styles.outletDetail}>
            {selectedOffer.details}
          </CustomText> */}
          </View>
          <Partition horizontal style={styles.seprator} />

          <View style={styles.paretntTwo}>
            <CustomText style={styles.redeemText}>
              {I18n.t("Show reference code to merchant")}
            </CustomText>
            <CustomText style={styles.redeemCode}>
              {redemptionResponse?.redemption_code}
            </CustomText>
          </View>
          <BorderButton title={I18n.t("Done")} onPress={donePress} />
        </CustomSafeAreaView>
      )}
    </Modal>
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
    ...paddingHorizontal(16),
  },
  closeButton: {
    marginTop: 64,
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
  outletName: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: PRIMARY_BOLD,
    ...marginVertical(24),
  },
  redeemText: {
    fontSize: 15,
    lineHeight: 20,
    // fontFamily: PRIMARY_BOLD,
  },
  redeemCode: {
    fontSize: 34,
    lineHeight: 41,
    fontFamily: PRIMARY_EXTRABOLD,
    ...marginVertical(24),
  },
  savedtext: {
    fontSize: 15,
    lineHeight: 20,
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
});
