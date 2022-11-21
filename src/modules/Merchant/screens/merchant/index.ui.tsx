import React from "react";
import { ScreenTypes } from "../../interfaces";
import styles from "./styles";
import {
  DemographicModal,
  CustomSafeAreaView,
  WebViewModal,
  ChangeLocationModal,
  MerchantContinueModal,
  MerchantImageSlider,
  MerchantLocation,
  CustomText,
} from "@components";
import { ScrollView, TouchableOpacity, View } from "react-native";
import RedemptionModal from "@Merchant/components/wrapedComps/redemptionModal";
import CongratulationsModal from "@Merchant/components/wrapedComps/congratulationsModal";
import i18n, { getFlipForRTLStyle } from "@localization";
import Image from "@HybridComponents/Image";
import { Feather } from "@expo/vector-icons";
import RenderOffer from "../../components/offers/renderOffer";

//component containing the view of Mechant screen
const MechantView = ({
  webViewUrl,
  webViewTitle,
  showWebView,
  changeLocationModal,
  merchant,
  selectedOutlet,
  showContinueOutletModal,
  redemptionLoading,
  showRedemptionModal,
  redemptionResponse,
  showError,
  errorString,
  rulesOfUserURL,
  showCongratulationsModal,
  showRedemptionSuccessModal,
  favouriteState,
  expandAmenties,
  amenties,
  offer,
  currency,
  isDemographicVisible,
  handleRedemptionSuccessDone,
  handleCongratulationsModal,
  onBackButton,
  setFavourite,
  onImageClick,
  onLocationClick,
  handleContinueOutletModal,
  onDeliveryButtonPress,
  onClickWebViewAndAnalytics,
  toggleAmenties,
  onMenuClick,
  onDismissDemographicModalHandler,
  disableError,
  disableWebView,
  onChangeLocationDone,
  handleChangeLocation,
  changeOutletCallback,
  continueCallback,
  handleCloseRedemptionModal,
  onRedeemOffer,
  makeCustomAnalyticsStack,
}: ScreenTypes.Mechant) => {
  return merchant?.id > 0 ? (
    <CustomSafeAreaView
      style={[styles.mainView, getFlipForRTLStyle()]}
      edges={["left", "right", "bottom"]}
    >
      <View style={styles.mainView}>
        <View style={styles.mainView}>
          {/* Modals start */}
          <WebViewModal
            urlString={webViewUrl}
            headerString={webViewTitle}
            isVisible={showWebView}
            disableCalback={disableWebView}
          />

          <ChangeLocationModal
            isVisible={changeLocationModal}
            title={merchant?.name}
            outlets={merchant?.outlets}
            onDone={onChangeLocationDone}
            disable={handleChangeLocation}
          />
          <MerchantContinueModal
            outletName={selectedOutlet?.name}
            isVisible={showContinueOutletModal}
            changeOutlet={changeOutletCallback}
            continueWithCurrentOutlet={continueCallback}
          />

          <RedemptionModal
            outletID={selectedOutlet?.id}
            merchant={merchant}
            closeRemptionModal={handleCloseRedemptionModal}
            selectedOffer={offer}
            redeeemOffer={onRedeemOffer}
            overlayLoader={redemptionLoading}
            isVisible={showRedemptionModal}
            redemptionResponse={redemptionResponse}
            pushAnalytics={makeCustomAnalyticsStack}
            showError={showError}
            errorMsg={errorString}
            showRedemptionSuccessModal={showRedemptionSuccessModal}
            disableError={disableError}
            rulesOfUseURL={rulesOfUserURL}
            currency={currency}
            closeRemptionSuccessModal={handleRedemptionSuccessDone}
          />

          <CongratulationsModal
            selectedOffer={offer}
            isVisible={showCongratulationsModal}
            closeModal={handleCongratulationsModal}
            currency={currency}
          />

          {/* Modals end here */}

          <ScrollView
            bounces={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <MerchantImageSlider
              height={227}
              merchant={merchant}
              selectedOutlet={selectedOutlet}
              pushAnalytics={makeCustomAnalyticsStack}
              onImageClick={onImageClick}
              onLocationClick={onLocationClick}
              onBack={onBackButton}
              fav={favouriteState}
              onSetFavourite={setFavourite}
            />

            {merchant?.hero_urls?.length > 0 && (
              <View style={styles.merchantView}>
                <MerchantLocation
                  merchant={merchant}
                  selectedOutlet={selectedOutlet}
                  handleChangeLocation={handleChangeLocation}
                />

                {merchant?.has_delivery_offers && (
                  <TouchableOpacity
                    style={styles.deliverOffer}
                    activeOpacity={1}
                    onPress={onDeliveryButtonPress}
                  >
                    <CustomText style={styles.deliveryText}>
                      {i18n.t("View_Delivery_Offer")}
                    </CustomText>
                  </TouchableOpacity>
                )}

                <View style={styles.offerView}>
                  {merchant?.offers?.map((offer: any, index: number) => (
                    <RenderOffer
                      key={index}
                      offer={offer}
                      onSelectOffer={handleContinueOutletModal}
                    />
                  ))}
                </View>
                {/* Outlet Details */}
                <View>
                  {/* title */}
                  <CustomText style={styles.outletDetailHead}>
                    {i18n.t("Outlet_Details")}
                  </CustomText>
                  <CustomText style={styles.outletDetails}>
                    {`${selectedOutlet?.name}${
                      selectedOutlet?.human_location
                        ? `\n${i18n.t("Location")} ${
                            selectedOutlet?.human_location
                          }`
                        : ""
                    }${
                      selectedOutlet?.mall
                        ? `\n${i18n.t("Mall")}: ${selectedOutlet?.mall}`
                        : ""
                    }${
                      selectedOutlet?.neighborhood
                        ? `\n${i18n.t("Area")}: ${selectedOutlet?.neighborhood}`
                        : ""
                    }${
                      selectedOutlet?.distance !== 0
                        ? `\n${i18n.t("Distance")}: ${selectedOutlet?.distance}`
                        : ""
                    }${
                      merchant?.description
                        ? `\n\n${merchant?.description}`
                        : ""
                    }`}
                  </CustomText>
                </View>
              </View>
            )}
            {/* Amenties details */}
            {merchant?.merchant_attributes?.length > 0 && (
              <TouchableOpacity
                onPress={toggleAmenties}
                activeOpacity={1}
                style={styles.merchantAttributes}
              >
                {/* title */}
                {merchant?.merchant_attributes?.length > 0 && (
                  <CustomText style={styles.sectionName}>
                    {merchant?.merchant_attributes[0]?.section_name}
                  </CustomText>
                )}
                <View
                  style={[
                    styles.amenitiesView,
                    expandAmenties === false && styles.noWrap,
                  ]}
                >
                  {merchant?.merchant_attributes?.length > 0 &&
                    amenties?.map((item: any, index: number) => {
                      return (
                        <View style={styles.amenitiesList} key={index}>
                          <Image
                            style={styles.amenitiesIcon}
                            source={{ uri: item?.image_url || "" }}
                          />
                          <CustomText
                            numberOfLines={2}
                            style={styles.amenitiesTitle}
                          >
                            {item?.name}
                          </CustomText>
                        </View>
                      );
                    })}
                </View>
                {expandAmenties === true && (
                  <View>
                    {(merchant?.website ?? "") != "" && (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={onClickWebViewAndAnalytics}
                        style={styles.webView}
                      >
                        <Image
                          style={styles.amenitiesSmallerIcon}
                          source={require("@assets/images/ic_web_blue.png")}
                        />
                        <CustomText style={styles.webName}>
                          {merchant?.website || ""}
                        </CustomText>
                      </TouchableOpacity>
                    )}
                    {(merchant?.pdf_url ?? "") != "" && (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={onMenuClick}
                        style={styles.webView}
                      >
                        <Image
                          style={styles.amenitiesSmallerIcon}
                          source={require("@assets/images/ic_menu_book.png")}
                        />
                        <CustomText style={styles.webName}>
                          {i18n.t("Download Menu")}
                        </CustomText>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                <View style={styles.moreAmenities}>
                  <Feather
                    onPress={toggleAmenties}
                    style={styles.moreAmenitiesIcon}
                    name="more-horizontal"
                    size={35}
                    color="grey"
                  />
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
      <DemographicModal
        isVisible={isDemographicVisible}
        onCancel={onDismissDemographicModalHandler}
      />
    </CustomSafeAreaView>
  ) : null;
};

export default MechantView;
