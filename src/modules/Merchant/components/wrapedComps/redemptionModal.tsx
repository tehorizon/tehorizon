import React, { useCallback, useState } from "react";
import { StyleSheet, View, Image, ScrollView, FlatList } from "react-native";

import { design } from "rn_fast_track_uilib";
import i18n, { getFlipForRTLStyle } from "@localization";
import { Ionicons } from "@expo/vector-icons";

import {
  Loader,
  CustomText,
  ErrorModal,
  WebViewModal,
  CustomSafeAreaView,
  VoucherView,
  Partition,
} from "@components";
import { PRIMARY, PRIMARY_BOLD, PRIMARY_EXTRABOLD } from "@fonts";
import {
  borderColor,
  borderWidth,
  margin,
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Modal from "@HybridComponents/Modal";
import { MerchantData, OffersToDisplay } from "../../interfaces/responses";
import { RedeemPrams } from "../../interfaces/requests";
import RedemptionSuccessModal from "@Merchant/components/wrapedComps/redemptionSuccess";

interface PROPS {
  outletID: number;
  isVisible: boolean;
  selectedOffer: OffersToDisplay;
  closeRemptionModal: () => void;
  redeeemOffer: (data: RedeemPrams) => void;
  disableError: () => void;
  overlayLoader: boolean;
  showError: boolean;
  errorMsg: string;
  redemptionResponse: any;
  showRedemptionSuccessModal: boolean;
  pushAnalytics: (data: any) => void;
  closeRemptionSuccessModal: () => void;
  rulesOfUseURL: string;
  currency: string;
  merchant: MerchantData;
}
const RedemptionModal = (props: PROPS) => {
  const [code, setCode] = useState("");
  const [showWebView, setshowWebView] = useState(false);

  const disableWebView = () => {
    setshowWebView(false);
  };

  const {
    outletID,
    isVisible,
    merchant,
    selectedOffer,
    redeeemOffer,
    closeRemptionModal,
    overlayLoader,
    showError,
    errorMsg,
    disableError,
    showRedemptionSuccessModal,
    rulesOfUseURL,
    currency,
    pushAnalytics = () => {},
    closeRemptionSuccessModal = () => {},
    redemptionResponse,
  } = props;

  const { validity_date, voucher_rules_of_use } = selectedOffer;
  const options = { month: "short", day: "numeric", year: "numeric" };
  let validDate = new Date(validity_date);

  const onCodeFilled = useCallback(
    (code) => {
      setTimeout(() => {
        const currentDate = new Date();
        const transactionID =
          "Last Sync: " +
          currentDate.getDate() +
          "/" +
          (currentDate.getMonth() + 1) +
          "/" +
          currentDate.getFullYear() +
          " @ " +
          currentDate.getHours() +
          ":" +
          currentDate.getMinutes() +
          ":" +
          currentDate.getSeconds();

        redeeemOffer({
          outlet_id: outletID,
          offer_id: selectedOffer.offer_id,
          merchant_pin: parseInt(code),
          transaction_id: transactionID,
          product_id: selectedOffer?.product_id,
        });
        setCode("");
      }, 100);
    },
    [outletID, selectedOffer?.offer_id, selectedOffer?.product_id]
  );

  const onCodeChanged = useCallback(
    (code) => {
      setCode(code);
      if (code.length === 1) {
        pushAnalytics({
          current_screen: "Redemption Card",
          action: "type_merchant_pin",
          merchant_id: merchant?.id,
          outlet_id: outletID,
          category_id: 0,
          categories: "",
          categories_analytics: "",
          location_id: 0,
          offer_id: props.selectedOffer.offer_id,
          changeSequenceNumber: false,
        });
      }
    },
    [pushAnalytics]
  );

  const onClose = useCallback(() => {
    pushAnalytics({
      current_screen: "Redemption Card",
      action: "click_close",
      merchant_id: merchant?.id,
      outlet_id: outletID,
      category_id: 0,
      categories: "",
      categories_analytics: "",
      location_id: 0,
      offer_id: props.selectedOffer.offer_id,
      changeSequenceNumber: false,
    });
    closeRemptionModal();
  }, [closeRemptionModal, pushAnalytics]);
  return (
    <Modal isVisible={isVisible} style={styles.mainView} avoidKeyboard>
      <CustomSafeAreaView style={[styles.flex, getFlipForRTLStyle()]}>
        <Loader isVisible={overlayLoader} />

        <ErrorModal
          isVisible={showError}
          dataString={errorMsg}
          disable={disableError}
          buttonText={i18n.t("OK")}
        />

        <WebViewModal
          urlString={rulesOfUseURL}
          headerString={i18n.t("Rule of Use")}
          isVisible={showWebView}
          disableCalback={disableWebView}
        />
        <RedemptionSuccessModal
          redemptionResponse={redemptionResponse}
          merchant={merchant}
          selectedOffer={selectedOffer}
          isVisible={showRedemptionSuccessModal}
          closeRemptionSuccessModal={closeRemptionSuccessModal}
          currency={currency}
        />
        <View style={styles.cmHeader}>
          <Ionicons
            name="md-close"
            style={styles.cmCloseButton}
            size={25}
            color="#000"
            onPress={onClose}
          />
        </View>
        <ScrollView style={styles.cmParent} keyboardShouldPersistTaps="handled">
          <View style={styles.logoParent}>
            <Image
              style={[styles.logo, getFlipForRTLStyle()]}
              source={{ uri: merchant?.logo_small_url }}
              resizeMode="contain"
            />
            <CustomText style={styles.outletName}>
              {selectedOffer.name}
            </CustomText>
            <CustomText style={styles.outletDetail}>
              {selectedOffer.details}
            </CustomText>
          </View>
          <FlatList
            horizontal
            data={selectedOffer?.voucher_details || []}
            style={styles.offerFeaturesParetnt}
            contentContainerStyle={styles.contentContainerFeatures}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.offerView}>
                <Image
                  style={[styles.offerImage, getFlipForRTLStyle()]}
                  source={{ uri: item.image }}
                />
                <CustomText style={styles.offerTitle}>{item.title}</CustomText>
              </View>
            )}
          />
          <VoucherView color={design.Secondary_Color}>
            <View style={styles.pinView}>
              <CustomText style={styles.savingText}>
                {currency} {selectedOffer.savings_estimate}
              </CustomText>
              <CustomText style={styles.estimateText}>
                {i18n.t("Your_Estimated_Savings")}
              </CustomText>
              <Partition horizontal style={styles.partition} />
              <CustomText style={styles.pinHead}>
                {`${i18n.t("Please_ask")} ${merchant?.name || ""} ${i18n.t(
                  "to_enter_their_PIN"
                )}`}
              </CustomText>
              <OTPInputView
                style={{ ...styles.OTPView, ...getFlipForRTLStyle() }}
                pinCount={4}
                code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={onCodeChanged}
                onCodeFilled={onCodeFilled}
                autoFocusOnLoad
                codeInputFieldStyle={{
                  ...styles.underlineStyleBase,
                  // ...(wrogOTP ? styles.wrongOTP : {}),
                }}
              />
            </View>
          </VoucherView>
          <View style={styles.validityView}>
            <CustomText style={styles.validityText}>
              {`${i18n.t("Valid")} ${validDate
                .toLocaleDateString("en-GB", options)
                ?.toUpperCase()}`}
            </CustomText>
            <Partition horizontal borderStyle="solid" />
            <CustomText style={styles.offerSubjectText}>
              <CustomText>{i18n.t("Offers_are_subject_to")} </CustomText>
              <CustomText
                style={styles.ruleOfUseText}
                onPress={() => setshowWebView(true)}
              >
                {i18n.t("Rules of Use")}
              </CustomText>
            </CustomText>
          </View>
          {voucher_rules_of_use?.map((rule: string) => (
            <CustomText style={styles.rules}>{rule}</CustomText>
          ))}
        </ScrollView>
      </CustomSafeAreaView>
    </Modal>
  );
};

export default RedemptionModal;
const styles = StyleSheet.create({
  mainView: {
    ...margin(0),
  },
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  cmParent: {
    flex: 1,
    ...marginHorizontal(16),
  },
  cmHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cmCloseButton: {
    paddingEnd: 10,
    paddingTop: 3,
    paddingBottom: 0,
  },
  logoParent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: 93,
    width: 93,
  },
  offerFeaturesParetnt: {
    flex: 1,
    marginTop: 24,
    ...paddingVertical(24),
    borderTopColor: design.Border_Color,
    borderTopWidth: 0.2,
  },
  contentContainerFeatures: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  outletName: {
    marginTop: 12,
    fontFamily: PRIMARY_BOLD,
    fontSize: 17,
    textAlign: "left",
    ...marginHorizontal(18),
    color: design["Text_Primary_Color"],
    lineHeight: 22,
  },
  outletDetail: {
    marginTop: 7,
    fontFamily: PRIMARY,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "left",
    color: design["Text_Primary_Color"],
  },
  offerImage: {
    height: 32,
    width: 32,
    tintColor: design.Text_Primary_Color,
  },
  offerTitle: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 14,
    fontFamily: PRIMARY_BOLD,
    textAlign: "center",
    color: design.Text_Primary_Color,
  },
  offerView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    ...marginHorizontal(5),
  },
  validityView: {
    justifyContent: "center",
    alignItems: "center",
  },
  pinView: {
    ...margin(24),
    alignItems: "center",
    justifyContent: "center",
  },
  savingText: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 34,
    lineHeight: 41,
    color: design["Primary_Color"],
  },
  estimateText: {
    fontSize: 15,
    lineHeight: 20,
    color: design["Text_Secondary_Color"],
  },
  pinHead: {
    fontFamily: PRIMARY_BOLD,
    fontSize: 15,
    color: design["Text_Secondary_Color"],
    lineHeight: 20,
  },
  partition: {
    maxWidth: 248,
    marginVertical: 15,
    opacity: 1,
  },
  OTPView: {
    width: 172,
    height: 34,
    marginTop: 12,
  },
  underlineStyleBase: {
    color: design["Text_Primary_Color"],
    width: 34,
    height: 34,
    fontSize: 13,
    lineHeight: 17,
    fontFamily: PRIMARY,
    borderRadius: design.Global_Border_Radius,
    ...borderColor(design["Border_Color"]),
    ...borderWidth(2),
  },
  wrongOTP: {
    ...borderColor(design["Error_Color"]),
  },
  validityText: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: PRIMARY_BOLD,
    ...marginVertical(24),
  },
  offerSubjectText: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    fontFamily: PRIMARY_BOLD,
  },
  ruleOfUseText: {
    fontFamily: PRIMARY_EXTRABOLD,
  },
  rules: {
    fontFamily: PRIMARY,
    fontSize: 12,
    color: design.Text_Primary_Color,
    paddingLeft: 20,
  },
});
