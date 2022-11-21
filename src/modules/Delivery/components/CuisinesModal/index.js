import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { design } from "rn_fast_track_uilib";
import Modal from "@HybridComponents/Modal";
import { PRIMARY, PRIMARY_BOLD } from "@fonts";
import I18n from "@localization";
import SearchBar from "../Search";
import * as i18nCollection from "@localization";
import {
  marginHorizontal,
  paddingVertical,
} from "@fast_track/src/utils/genericStyles";
import { FontAwesome } from "@expo/vector-icons";
import Chips from "../Chips";

export default CuisinesModal = ({
  isVisible,
  windowHeight,
  showModal,
  selectedCuisines,
  selectedList,
  list,
  refreshList,
}) => {
  const [checkboxes, setCheckboxes] = useState(list);

  const onButtonPress = () => {
    const selectedCheckBoxes = checkboxes.filter((cb) => cb.ischecked === true);
    showModal();
    refreshList(checkboxes, selectedCheckBoxes);
  };

  const toggleCheckbox = (uid, index) => {
    const checkboxData = [...checkboxes];
    checkboxData[index].ischecked = !checkboxData[index].ischecked;
    setCheckboxes(checkboxData);
    selectedCuisines(checkboxData);
    // const selectedCheckBoxes = checkboxes.filter((cb) => cb.ischecked === true);
  };
  const onSearch = (text) => {
    if (text != "") {
      const filterList = list.filter((item, index) =>
        item?.name?.toLowerCase().includes(text?.toLowerCase())
      );
      setCheckboxes(filterList);
    } else {
      setCheckboxes(list);
    }
  };

  return (
    <Modal
      animationIn="slideInDown"
      animationInTiming={700}
      animationOut="slideOutUp"
      animationOutTiming={700}
      isVisible={isVisible}
      hasBackdrop={true} //true due to design requirement
      backdropOpacity={0.5}
    >
      <View
        style={[
          {
            height: windowHeight - 80,
          },
          styles.modalContainer,
        ]}
      >
        <View style={styles.header}>
          {/* <View></View> */}
          <Text style={styles.title}>{I18n.t("Cuisines")}</Text>
          <TouchableOpacity onPress={() => onButtonPress()} activeOpacity={1}>
            <Text style={styles.done}>{I18n.t("Done")}</Text>
          </TouchableOpacity>
        </View>
        <SearchBar
          // ref={searchBar}
          testID={"search_input"}
          onChangeText={onSearch}
          i18nCollection={i18nCollection}
        />
        {/* selected cuisines */}
        <Chips
          list={selectedList}
          selectedCuisines={(list: any) => selectedCuisines(list)}
          view={"wrap"}
        />
        <ScrollView>
          {checkboxes.map((cb, index) => {
            return (
              <TouchableOpacity
                onPress={() => toggleCheckbox(cb.uid, index)}
                key={index}
                activeOpacity={1}
                style={styles.checkboxContainer}
              >
                <Text
                  style={{
                    color: cb.ischecked
                      ? design.Text_Primary_Color
                      : design.DISABLED_COLOR,
                  }}
                >
                  {cb.name}
                </Text>
                {/* <CheckBox
                  key={index}
                  checked={cb.ischecked}
                  onPress={() => toggleCheckbox(cb.uid, index)}
                  checkedColor={design.Text_Secondary_Color}
                /> */}
                {cb.ischecked && (
                  <FontAwesome name="check" size={15} color="black" />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
  },
  title: {
    color: design.Header_Title_Primary_Color,
    fontSize: 18,
    fontFamily: PRIMARY_BOLD,
    textAlign: "center",
    alignSelf: "center",
  },
  done: {
    color: design.Header_Title_Primary_Color,
    fontSize: 14,
    fontFamily: PRIMARY,
    textAlign: "center",
    marginBottom: 9.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "flex-end",
    backgroundColor: design.Header_Background_Primary_Color,
    ...marginHorizontal(20),
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: design.Border_Color,
    ...paddingVertical(15),
    ...marginHorizontal(20),
  },
});
