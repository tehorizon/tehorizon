import React from "react";
import styles from "./styles";
import { ScreenTypes } from "../../interfaces";
import { FlatList } from "react-native-gesture-handler";
import { Pressable, View } from "react-native";
import { CustomText, HeaderWithBackButton } from "@components";
import i18n from "@localization";
import { SafeAreaView } from "react-native-safe-area-context";
import Image from "@HybridComponents/Image";
import moment from "moment";

const Booking = ({ item }: any) => {
  return (
    <View style={styles.item}>
      <View style={styles.leftView}>
        <Image
          source={{ uri: item?.image }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.btnContainer}>
          <CustomText style={styles.bookedText}>{"Confirmed"}</CustomText>
        </View>
      </View>
      <View style={[styles.leftView, styles.rightView]}>
        <View style={styles.detailsContainer}>
          <CustomText style={styles.title}>{item?.location}</CustomText>
          <CustomText style={styles.title}>{item?.ticket_details}</CustomText>
          <CustomText style={styles.title}>
            {moment(item?.date).format("dddd, Do MMM YYYY")}
          </CustomText>
        </View>
        <View style={styles.btnContainer}>
          <CustomText style={[styles.bookedText, styles.cancelText]}>
            {"Cancel Booking"}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const DestinationComponent = ({
  bookings,
  navigation,
  onRefresh,
}: ScreenTypes.bookings) => {
  return (
    <SafeAreaView style={styles.mainView} edges={["bottom"]}>
      <HeaderWithBackButton
        title={i18n.t("Bookings")}
        navigation={navigation}
      />
      <FlatList
        testID={"destinations_list"}
        showsVerticalScrollIndicator={false}
        data={bookings}
        style={styles.listContainer}
        refreshing={true}
        onRefresh={onRefresh}
        renderItem={({ item }) => <Booking item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default DestinationComponent;
