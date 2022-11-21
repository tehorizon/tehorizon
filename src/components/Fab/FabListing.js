import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { design } from "rn_fast_track_uilib";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { marginHorizontal } from "@utils/genericStyles";

const windowWidth = Dimensions.get("window").width;

export default FabListing = ({
  onLayoutChange,
  handleClose,
  ordersList,
  hideMenu,
}) => {
  //navigation
  const navigation = useNavigation();
  const [viewHeight, setViewHeight] = useState(10);

  const onItemPress = (orderID) => {
    hideMenu();
    handleClose();
    navigation.navigate("OrderStatus", {
      orderRef: orderID.toString(),
      goBack: true,
    });
  };

  return (
    <View
      onLayout={(event) => {
        var { height } = event.nativeEvent.layout;
        onLayoutChange(height + 10);
        setViewHeight(height + 10);
      }}
      style={[
        styles.mainContainer,
        { height: ordersList.length > 10 ? 400 : 150, flex: 1 },
      ]}
    >
      <ScrollView>
        <View style={styles.cashlessHeader}>
          <Text style={{ fontSize: 8 }}>DELIVERY CASHLESS</Text>
        </View>
        {ordersList.map((list, i) => {
          return (
            <View key={i}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => onItemPress(list.order_id)}
              >
                <Image
                  style={styles.imagePlaceholder}
                  source={{ uri: list.image_url }}
                />
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.outletName,
                      { color: "#" + list.title_text_color },
                    ]}
                  >
                    {list.title}
                  </Text>
                  <Text
                    style={[
                      styles.location,
                      { color: "#" + list.sub_title_text_color },
                    ]}
                  >
                    {list.sub_title}
                  </Text>
                  <View style={styles.rightArrow}>
                    <Feather
                      color={design["Text_Secondary_Color"]}
                      name="chevron-right"
                      size={14}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
  },
  lineBreak: {
    borderBottomColor: design.Background_Primary_Color,
    borderBottomWidth: 1,
  },
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // ...marginVertical(5),
  },
  imagePlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    ...marginHorizontal(7),
  },
  textContainer: {
    flex: 1,
  },
  outletName: {
    fontSize: 11,
  },
  rightArrow: {
    position: "absolute",
    top: "12%",
    right: 5,
  },
  location: {
    fontSize: 11,
    marginTop: 5,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
    width: windowWidth,
  },
  cashlessHeader: {
    paddingLeft: 10,
    height: 20,
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
  },
});
