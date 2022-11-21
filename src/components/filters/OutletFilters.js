import React, { useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import SectionList from "./sectionlist";
import { defaultFilter, arabicFilter } from "./defaults";
import ModalBox from "../modal";
import ModalBoxListItem from "./modalListItem";
import i18n, { isRTL } from "@localization";
import { design } from "rn_fast_track_uilib";
import { useAppSelector } from "@redux/root-reducer";
import { useDispatch } from "react-redux";
import { setSelectedFilter } from "@Outlet/redux/actions";

const OutletFilter = ({ categoryKey }) => {
  const dispatch = useDispatch(); // dispatch action to reducer
  const onSetSelectedFilters = (data) => dispatch(setSelectedFilter(data));

  const filters = isRTL
    ? arabicFilter.filter.filter((x) => x.category_name === categoryKey)
    : defaultFilter.filter.filter((x) => x.category_name === categoryKey);
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState();
  const sectionlist = filters[0].filter_sections;

  let selectedFilters = useAppSelector(
    (state) => state?.outletReducer?.selectedFilters[categoryKey] || {}
  );
  const onPressDoneHandler = () => {
    setIsVisible(!isVisible);
  };

  const onClickModalBoxListItemCusine = (name) => {
    let found = selectedFilters.cuisine_filter?.indexOf(name);
    if (found >= 0) {
      selectedFilters?.cuisine_filter.splice(found, 1);
    } else {
      selectedFilters?.cuisine_filter.push(name);
    }
    onSetSelectedFilter(selectedFilters);
  };

  const onClickModalBoxListItem = (item) => {
    selectedFilters.sub_category_filter = item == "All" ? "" : item;
    onSetSelectedFilter(selectedFilters);
    setIsVisible(!isVisible);
  };
  const onSlectNewOffer = () => {
    selectedFilters.show_new_offers = selectedFilters?.show_new_offers
      ? null
      : true;
    onSetSelectedFilter(selectedFilters);
  };

  const openModalList = (type) => {
    setIsVisible(!isVisible);
    setModalType(type);
  };

  const onSetSelectedFilter = (data) => {
    selectedFilters[categoryKey] = data;
    onSetSelectedFilters(selectedFilters);
  };

  const renderItem = (data, index) => {
    const item = data.item;
    return (
      <ModalBoxListItem
        item={item}
        index={index}
        isSelected={
          selectedFilters.sub_category_filter === item?.name ? true : false
        }
        onPress={onClickModalBoxListItem}
      />
    );
  };
  const renderItemcuisine = (data, index) => {
    const item = data.item;
    return (
      <ModalBoxListItem
        item={item}
        index={index}
        isSelected={selectedFilters.cuisine_filter.find(
          (element) => element == item?.name
        )}
        onPress={onClickModalBoxListItemCusine}
      />
    );
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#F3F3F3",
        }}
      />
    );
  };
  return (
    <ScrollView
      style={{
        backgroundColor: design["Background_Secondary_Color"],
        flexGrow: 1,
      }}
    >
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <SectionList
          title={i18n.t("OFFERS")}
          data={{
            section_name: i18n.t("NEW_OFFERS"),
            selection_type: 4,
          }}
          onChange={onSlectNewOffer}
          checked={selectedFilters?.show_new_offers == true}
          selectedFilters={selectedFilters}
        />

        {sectionlist?.map((filterItem) => {
          return (
            <SectionList
              title={filterItem.section_name}
              data={filterItem}
              onPress={openModalList}
              onSetSelectedFilter={null}
              selectedFilters={selectedFilters}
              onSetSelectedFilter={onSetSelectedFilter}
            />
          );
        })}
      </View>

      <ModalBox
        type="md"
        title={modalType == 1 ? "Type" : "Select cuisine"}
        isVisible={isVisible}
        isDoneButton={modalType === 1 ? false : true}
        doneButtonText={i18n.t("DONE")}
        onPress={onPressDoneHandler}
      >
        <FlatList
          data={
            modalType == 1 ? sectionlist[0].options : sectionlist[1].options
          }
          renderItem={modalType == 1 ? renderItem : renderItemcuisine}
          ItemSeparatorComponent={modalType == 1 ? null : FlatListItemSeparator}
          extraData={sectionlist}
        />
      </ModalBox>
    </ScrollView>
  );
};

export default OutletFilter;
