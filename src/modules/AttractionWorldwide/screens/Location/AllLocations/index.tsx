import React, { useRef } from "react";
import { Image, Pressable, SectionList, View } from "react-native";
import styles from "./styles";
import { ScreenTypes } from "../../../interfaces";
import alphabets from "./Alphabets.json";
import { useNavigation } from "@react-navigation/core";
import { CustomText as Text } from "@components";
const AllLocations = ({ allDestinations }: ScreenTypes.allLocations) => {
  const list = useRef<SectionList>(null);
  return (
    <View style={styles.mainView} testID={"all_locations"}>
      <SectionList
        testID={"countries_sections"}
        ref={list}
        style={styles.sectionList}
        sections={allDestinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item destination={item} />}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        getItemLayout={(
          data,
          index // use this to scroll to locations outside the render window
        ) => ({ length: 40, offset: 40 * index, index })}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
      <View style={styles.alphaList}>
        {alphabets?.map(({ title, index }) => (
          <Pressable
            key={title}
            onPressIn={() => {
              list.current?.scrollToLocation({
                viewPosition: 0,
                sectionIndex: index,
                itemIndex: 0,
              });
            }}
          >
            <Text style={styles.alphaText}>{title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const Item = ({ destination }: { destination: ScreenTypes.Destination }) => {
  let navigation = useNavigation();
  return (
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate("Select City", { cities: destination.cities })
      }
      testID={destination.name}
    >
      <Text style={styles.title}>{destination.name}</Text>
      <Image
        style={styles.arrow}
        source={require("@assets/images/right-arrow.png")}
      />
    </Pressable>
  );
};
export default AllLocations;
