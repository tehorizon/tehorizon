import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { ScreenTypes } from "@Attractions/interfaces";
import Image from "@HybridComponents/Image";
import { City } from "@Attractions/interfaces/screens";

const TopDestinations = ({
  topDestinations,
  updateLocation,
}: ScreenTypes.popularLocation) => {
  const renderItem = ({ item, index }: { item: City; index: number }) => (
    <TouchableOpacity
      onPress={() => updateLocation(item)}
      style={styles.itemView}
      testID={item.name}
    >
      <Image source={{ uri: item.image_url }} style={styles.bgImage} />
      <View style={styles.flagView}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Image source={{ uri: item.flag_image }} style={styles.flagIcon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      testID={"popular_locations"}
      data={topDestinations}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      numColumns={2}
      bounces={false}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TopDestinations;
