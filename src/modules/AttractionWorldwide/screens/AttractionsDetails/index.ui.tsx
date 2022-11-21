import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import styles from "./styles";
import { ScreenTypes } from "../../interfaces";
import i18n from "@localization";
import Image from "@HybridComponents/Image";
import Modal from "@HybridComponents/Modal";
import { BorderButton, CustomText } from "@components";

const AttractionsComponent = ({
  navigation,
  attractionDetails,
  packageID,
  updatePackageID,
  onBack,
  modalRef,
}: ScreenTypes.attractionsDetails) => {
  return (
    <ScrollView
      style={styles.mainView}
      contentContainerStyle={styles.contentContainerStyle}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <AvailabilityModal ref={modalRef} />
      <View style={styles.topHeader}>
        <Image
          style={styles.headerImage}
          source={{ uri: attractionDetails?.image }}
        />
        <Pressable onPress={onBack} style={styles.backArrowView}>
          <Image
            style={styles.headIcon}
            source={require("@assets/images/arrow_back.png")}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View style={styles.body}>
        <View>
          <CustomText style={styles.title}>
            {attractionDetails?.title || ""}
          </CustomText>
          <CustomText style={styles.detailsHead}>
            {i18n.t("Attraction Details")}
          </CustomText>
          <CustomText style={styles.detailsText}>
            {attractionDetails?.details || ""}
          </CustomText>
          {attractionDetails?.location?.length > 0 && (
            <CustomText style={styles.locationText}>
              <CustomText style={styles.locationHead}>{`\n${i18n.t(
                "Location"
              )} `}</CustomText>
              <CustomText>{attractionDetails?.location}</CustomText>
            </CustomText>
          )}
          {attractionDetails?.address?.length > 0 && (
            <CustomText style={styles.locationText}>
              <CustomText style={styles.locationHead}>{`${i18n.t(
                "Address"
              )}: `}</CustomText>
              <CustomText>{`${attractionDetails?.address}\n`}</CustomText>
            </CustomText>
          )}
          <CustomText style={styles.parkHead}>
            {i18n.t("Select park options")}
          </CustomText>
          {attractionDetails?.packages?.map((item) => (
            <Pressable
              style={[
                styles.packageView,
                item.id == packageID && styles.selectedPackage,
              ]}
              onPress={() => updatePackageID(item.id)}
              key={item.id}
            >
              <CustomText style={styles.packageText}>
                {item?.title || ""}
              </CustomText>
            </Pressable>
          ))}
        </View>
        <BorderButton
          style={styles.availabilityButton}
          title={i18n.t("Check Availability")}
          onPress={
            () => navigation.navigate("Bookings")
            // modalRef?.current?.toggleVisible()
          }
          disabled={packageID == null}
        />
      </View>
    </ScrollView>
  );
};

const AvailabilityModal = forwardRef((props, ref) => {
  const [isVisible, updateVisibility] = useState(false);

  const [selectedTime, setTime] = useState(null);
  const [totalTickets, setTickets] = useState(0);

  const updateTickets = (value: number) => setTickets(totalTickets + value);
  useImperativeHandle(ref, () => ({
    toggleVisible,
  }));
  const toggleVisible = () => updateVisibility(!isVisible);
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.noMargin}
      backdropOpacity={0.6}
    >
      <ScrollView
        style={styles.modal}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={toggleVisible}>
          <Image
            source={require("@assets/icons/cross_black.png")}
            style={styles.crossIcon}
          />
        </Pressable>
        <CustomText style={styles.modalHead}>
          {i18n.t("Select slot for ticket reservation")}
        </CustomText>
        <View style={styles.tourView}>
          <CustomText style={styles.tourText}>{i18n.t("Tour date")}</CustomText>
          <Pressable style={styles.dateView}>
            <View style={styles.dateSubView}>
              <Image
                source={require("@assets/images/calendar.png")}
                style={styles.calendarIcon}
              />
              <CustomText style={styles.dateText}>{`08/26/2022`}</CustomText>
            </View>
            <Image
              source={require("@assets/images/back-arrow.png")}
              style={styles.rightArrow}
            />
          </Pressable>
        </View>
        <View style={styles.timeSlotsView}>
          <CustomText style={styles.timeText}>
            {i18n.t("Select Time")}
          </CustomText>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            .fill(`11:00 AM - 12:00 PM`)
            ?.map((item) => (
              <Pressable style={styles.timeView}>
                <CustomText style={styles.dateText}>{item}</CustomText>
              </Pressable>
            ))}
        </View>
        <View>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item) => (
            <Pressable
              style={[
                styles.timeView,
                item == selectedTime && styles.selectedTimeView,
              ]}
              onPress={() => setTime(item)}
            >
              <CustomText
                style={styles.dateText}
              >{`11:00 AM - 12:00 PM`}</CustomText>
            </Pressable>
          ))}
        </View>
        <View style={styles.ticketsView}>
          <CustomText style={styles.ticketText}>
            {i18n.t("How many tickets?")}
          </CustomText>
          <Ticket
            type={"Adult"}
            price="$32.80"
            disPrice={"$41.00"}
            callBack={updateTickets}
          />
          <Ticket
            type={"Child"}
            price="$30.0"
            disPrice={"$37.50"}
            callBack={updateTickets}
          />
          <Ticket type={"Infant"} price="$0.00" callBack={updateTickets} />
        </View>
        <BorderButton
          style={styles.checkoutButton}
          title={i18n.t("Checkout")}
          disabled={selectedTime == null || totalTickets <= 0}
          onPress={null}
        />
      </ScrollView>
    </Modal>
  );
});

const Ticket = ({ type, price, disPrice = "", callBack }) => {
  const [ticket, updateTicket] = useState(0);

  const ticketMinus = () => {
    if (ticket > 0) {
      updateTicket(ticket - 1);
      callBack && callBack(-1);
    }
  };
  const ticketPlus = () => {
    updateTicket(ticket + 1);
    callBack && callBack(1);
  };
  return (
    <View style={styles.ticketTypeView}>
      <CustomText style={styles.ticketTypeText}>
        <CustomText>{i18n.t(type)}</CustomText>
        <CustomText style={styles.tickeAmountText}> {price}</CustomText>
        <CustomText style={styles.tickeDiscountText}> {disPrice}</CustomText>
      </CustomText>
      <View style={styles.ticketCounterView}>
        <Pressable style={styles.actionIconView} onPress={ticketMinus}>
          <CustomText style={styles.actionIcon}>–</CustomText>
        </Pressable>
        <CustomText style={styles.ticketNumber}>{` ${ticket} `}</CustomText>
        <Pressable style={styles.actionIconView} onPress={ticketPlus}>
          <CustomText style={styles.actionIcon}>+</CustomText>
        </Pressable>
      </View>
    </View>
  );
};
export default AttractionsComponent;
