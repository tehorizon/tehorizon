import React from "react";
import styles from "./styles";
import { ScreenTypes } from "../../interfaces";
import { FlatList } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { CustomText, HeaderWithBackButton } from "@components";
import i18n from "@localization";
import { SafeAreaView } from "react-native-safe-area-context";
const City = ({
  city,
  updateLocation,
}: {
  city: ScreenTypes.City;
  updateLocation: (city: ScreenTypes.City) => void;
}) => {
  return (
    <Pressable
      style={styles.item}
      onPress={() => updateLocation(city)}
      testID={city.iso_code}
    >
      <CustomText style={styles.title}>{city.name}</CustomText>
    </Pressable>
  );
};

const DestinationComponent = ({
  cities,
  updateLocation,
  navigation,
}: ScreenTypes.destinations) => {
  return (
    <SafeAreaView style={styles.mainView} edges={["bottom"]}>
      <HeaderWithBackButton
        title={i18n.t("Select City")}
        navigation={navigation}
      />
      <FlatList
        testID={"destinations_list"}
        data={cities}
        renderItem={({ item }) => (
          <City city={item} updateLocation={updateLocation} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default DestinationComponent;
