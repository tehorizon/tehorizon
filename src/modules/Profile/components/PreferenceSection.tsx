import React from "react";
import { FlatList, View } from "react-native";
import { isRTL } from "@localization";
import styles from "../screens/UserPreferences/styles";
import { CustomText } from "@components";
import PreferenceOption from "./PreferenceOption";
const PreferenceSection = ({ heading, options }: any) => {
  return (
    <View style={styles.preferenceSection}>
      <CustomText isRTL={isRTL} style={styles.headingText}>
        {heading}
      </CustomText>
      <FlatList
        contentContainerStyle={{ marginTop: 10 }}
        data={options}
        renderItem={({ item }) => (
          <PreferenceOption
            testID={options.testID}
            title={item.title}
            onPress={item.onPress}
            disable={item.disable}
            dangerous={item.dangerous}
            value={item.value}
            onChange={item.onChange}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "rgb(230, 230, 230)" }} />
        )}
      />
    </View>
  );
};

export default PreferenceSection;
