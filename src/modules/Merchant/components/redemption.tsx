import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import Text from "../components/Text";
import i18n, { isRTL } from "@localization";
import { Feather } from "@expo/vector-icons";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import { margin } from "@utils/genericStyles";
import { getDistance } from "@utils/functions";

interface STATE {
  selected_outlet: [];
  selectedOutletId: number;
}
export default function ErrorModal(props) {
  const [selected_outlet, setselected_outlet] = useState(props.selectedOutlet);
  const [selectedOutletId, setselectedOutletId] = useState(0);

  const handleDone = () => {};

  const _handleCountrySelect = (id: number) => {
    setselectedOutletId(id);
  };

  const renderItem = (outlet: any) => {
    const { id, name, human_location, distance } = outlet.item;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => _handleCountrySelect(id)}
        style={styles.listItem}
      >
        <Feather name="map-pin" size={20} color="blue" onPress={() => {}} />
        <View
          style={{
            paddingStart: 15,
            paddingTop: 10,
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Text isRTL={isRTL} style={styles.listItemText}>
            {name}
          </Text>
          <Text isRTL={isRTL} style={styles.listItemText}>
            {human_location}
          </Text>
        </View>
        <Text isRTL={isRTL} style={styles.distanceText}>
          {getDistance(distance)}
        </Text>
      </TouchableOpacity>
    );
  };

  const { isVisible, disable, title, outlets, selectedOutlet, onDone } = props;
  return (
    <Modal
      animationIn="slideInDown"
      animationInTiming={700}
      animationOut="slideOutUp"
      animationOutTiming={700}
      isVisible={isVisible}
      hasBackdrop={true} //true due to design requirement
      coverScreen={true}
      //style={styles.modalStyle} //commented out due to android design
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.cmParent}>
          <View style={styles.cmHeader}>
            <Text isRTL={isRTL} style={styles.cmHeaderText}>
              {title}
            </Text>
            <Text
              // isRTL={isRTL}
              onPress={() => {
                onDone(selected_outlet);
                disable();
              }}
              style={styles.doneButton}
            >
              {i18n.t("Done")}
            </Text>
          </View>
          <View style={styles.cmOutletsCount}>
            <Feather
              name="map-pin"
              size={20}
              color="white"
              onPress={() => {}}
            />
            <Text isRTL={isRTL} style={styles.cmOutletsCountText}>
              5 {i18n.t("Outlets")}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              data={outlets}
              //keyExtractor={(item, index) => item}
              //ref={(e) => (this.categoryList = e)}
              renderItem={(country) => renderItem(country)}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: PRIMARY,
  },
  modalStyle: {
    ...margin(0),
  },
  cmParent: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  cmHeader: {
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    backgroundColor: "white",
    justifyContent: "center",
  },
  cmOutletsCount: {
    alignItems: "center",
    flexDirection: "row",
    height: 35,
    backgroundColor: "grey",
    justifyContent: "center",
  },
  cmOutletsCountText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: "white",
    paddingStart: 10,
  },

  cmHeaderText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    color: "black",
    paddingStart: 10,
  },
  doneButton: {
    fontSize: 14,
    fontFamily: PRIMARY_BOLD,
    paddingEnd: 10,
  },
  listItemSelected: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    color: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
    paddingStart: 15,
    backgroundColor: "rgb(237, 237, 237)",
  },
  listItem: {
    flexDirection: "row",
    height: 65,
    color: "grey",
    alignItems: "center",
    paddingStart: 15,
    borderBottomWidth: 0.7,
  },
  listItemText: {
    color: "grey",
    flex: 1,
    fontFamily: PRIMARY_BOLD,
  },
  distanceText: {
    color: "grey",
    paddingEnd: 20,
    fontFamily: PRIMARY_BOLD,
  },

  cmFooterParent: {
    backgroundColor: "#f2f1f1",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

// export default App;
