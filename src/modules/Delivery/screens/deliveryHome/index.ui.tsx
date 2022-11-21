import React, { memo } from "react";
import { View, Dimensions, FlatList, RefreshControl } from "react-native";
import {
  Chips,
  Header,
  OutletList,
  SearchInput,
  CuisinesModal,
  CuisinLocationSelector,
} from "@delivery/components";
import I18n from "@localization";
import styles from "./styles";
import { ScreenTypes } from "../../interfaces";
import { ActivityIndicator } from "react-native-paper";
import { design } from "@fast_track/libraries/rn_fast_track_uilib/build";
import { CustomText } from "@fast_track/src/components";

const windowHeight = Dimensions.get("window").height;

const DeliveryHomeView = ({
  isVisible,
  selectedList,
  outletListing,
  options,
  isLoadingData,
  isFetching,
  SelectedDeliverToLocation,
  loadMoreOutlets,
  refreshList,
  selectedCuisines,
  setIsVisible,
  setSearchText,
  onBack,
  onRefresh,
  navigation,
}: ScreenTypes.home) => {
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={"Online Delivery"}
        onBack={onBack}
      />
      <CuisinLocationSelector
        navigation={navigation}
        showModal={() => setIsVisible(true)}
        selectedLocation={SelectedDeliverToLocation}
      />
      <SearchInput
        navigation={navigation}
        list={selectedList}
        setSearchText={(text: string) => {
          setSearchText(text);
        }}
      />

      {/* Cuisines Modal */}
      <CuisinesModal
        list={options}
        windowHeight={windowHeight}
        isVisible={isVisible}
        showModal={() => setIsVisible(false)}
        selectedList={selectedList}
        selectedCuisines={(list: any) => selectedCuisines(list)}
        refreshList={refreshList}
      />

      {/* selected cuisines */}
      <Chips list={selectedList} selectedCuisines={selectedCuisines} />

      {/* outlet listing */}
      <FlatList
        data={outletListing}
        style={styles.outletListContainer}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={false} />
        }
        renderItem={({ item }: any) => (
          <OutletList outlet={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          !isLoadingData ? (
            <View style={styles.emptyList}>
              <CustomText>{I18n.t("Sorry_no_result_found")}</CustomText>
            </View>
          ) : null
        }
        ListFooterComponent={isFetching ? Footer : null}
        onEndReached={loadMoreOutlets}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
export default DeliveryHomeView;

const Footer = memo(() => (
  <View style={styles.footer}>
    <ActivityIndicator size="large" color={design.Primary_Color} />
  </View>
));
