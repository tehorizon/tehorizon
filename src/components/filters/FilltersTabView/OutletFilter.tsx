import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import Section from "./Section";
import i18n from "@localization";
import { design } from "rn_fast_track_uilib";
import { useAppSelector } from "@redux/root-reducer";
import { setSelectedFilter } from "@fast_track/src/modules/Outlet/redux/actions";
import { useDispatch } from "react-redux";
import BorderButton from "../../Buttons/BorderButton";
import { SCREEN_WIDTH } from "@fast_track/src/commons/constants/constants";
import { SelectedFilter } from "@fast_track/src/modules/Outlet/interfaces/responses";

const OutletFilter = ({
  categoryKey,
  filters = [],
}: {
  categoryKey: string;
  filters: Array<any>;
}) => {
  //states
  const [isVisible, setIsVisible] = useState(false);

  //redux states
  let allSelectedFilters = useAppSelector(
    (state) => state?.outletReducer?.selectedFilters || {}
  );
  let selectedFilters = useAppSelector(
    (state) => state?.outletReducer?.selectedFilters[categoryKey] || {}
  );

  //actions
  const dispatch = useDispatch();
  const onSetSelectedFilters = (data: SelectedFilter) =>
    dispatch(setSelectedFilter(data));

  const onSlectNewOffer = () => {
    selectedFilters.show_new_offers = selectedFilters?.show_new_offers
      ? null
      : true;
    setSelectedFilters(selectedFilters);
  };

  const openModalList = () => {
    setIsVisible(!isVisible);
  };

  const setSelectedFilters = (data) => {
    allSelectedFilters[categoryKey] = data;
    onSetSelectedFilters(allSelectedFilters);
  };

  const onClearHandler = () => {
    if (selectedFilters && selectedFilters) {
      let categorySelectedFilter = {
        show_new_offers: null,
        sub_category_filter: "",
        cuisine_filter: [],
        filters_selected_for_no: [],
        filters_selected_for_yes: [],
        sort_by_filter: "",
      };
      setSelectedFilters(categorySelectedFilter);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.mb20}>
        <Section
          title={i18n.t("Sort_by")}
          data={{
            section_name: i18n.t("Sort_by"),
            selection_type: 4,
          }}
          onSetSelectedFilter={setSelectedFilters}
          selectedFilters={selectedFilters}
        />

        {filters?.map((filterItem) => {
          return (
            <Section
              title={filterItem?.section_name}
              data={filterItem}
              onPress={openModalList}
              selectedFilters={selectedFilters}
              onSetSelectedFilter={setSelectedFilters}
            />
          );
        })}
      </View>
      <BorderButton
        theme="white"
        title={i18n.t("Clear_all")}
        style={{ width: SCREEN_WIDTH - 48, alignSelf: "center" }}
        onPress={onClearHandler}
      />
    </ScrollView>
  );
};

export default OutletFilter;

const styles = {
  scrollView: {
    backgroundColor: design["Background_Secondary_Color"],
    flexGrow: 1,
  },
  mb20: {
    marginBottom: 20,
  },
};
