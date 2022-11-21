import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import BackIcon from "../../components/BackIcon";
const SubscriptionService = ({ children }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigation = useNavigation();

  const onSubscriptionPress = () => {
    setIsSubscribed((val) => !val);
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: "Edit Subscription",
  //     headerTitleAlign: "center",
  //     headerLeft: () => <BackIcon onPress={onBackPress} />,
  //   });
  // }, []);

  return children({
    onSubscriptionPress,
    isSubscribed,
    navigation,
  });
};

export default SubscriptionService;
