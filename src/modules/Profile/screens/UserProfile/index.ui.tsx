import React from "react";
import { TouchableOpacity, View, RefreshControl } from "react-native";
import Header from "../../components/userProfileHeader/index";
import ProfileAndCamera from "../../components/profileAndCamera/index";
import i18n, { getFlipForRTLStyle } from "@localization";
import { CustomText } from "@components";
import DraggableFlatList, {
  ListItem,
} from "@HybridComponents/DraggableFlatList";
import LayoutButton from "@HybridComponents/LayoutButton";
import styles from "./styles";

const ProfileUI = ({
  onPressLeftButtonHandler,
  onPressRightButton,
  makeAnalyticsStack,
  refreshProfile,
  setRefreshing,
  onCameraClick,
  onClickViewBreakDown,
  refreshing,
  location,
  currUser,
  currency,
  layout,
  updateLayout,
  onUpdateLayoutRequest,
}: any) => {
  return (
    <View
      testID="profileScreen"
      style={[styles.mainContainer, getFlipForRTLStyle()]}
    >
      <View style={styles.flex1}>
        <Header
          title={i18n.t("My Profile")}
          onPressBack={onPressLeftButtonHandler}
          onPressRightButton={onPressRightButton}
        />

        <LayoutButton title="Upload Layout" onPress={onUpdateLayoutRequest} />
        <DraggableFlatList
          style={{ flex: 1 }}
          ListHeaderComponent={() => (
            <ProfileAndCamera
              makeAnalyticsStack={makeAnalyticsStack}
              location_id={location ? location.id : 1}
              user={currUser}
              onCameraClick={onCameraClick}
            />
          )}
          refreshControl={
            <RefreshControl
              tintColor="rgb(99,197,151)"
              refreshing={refreshing}
              onRefresh={() => {
                refreshProfile(true);
                setRefreshing(false);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          onDragEnd={({ data }) => updateLayout(data)}
          data={layout}
          renderItem={({ item, drag, isActive }) => {
            switch (item) {
              case "Savings_Breakdown":
                return (
                  <ListItem drag={drag} isActive={isActive}>
                    <View style={styles.box}>
                      <CustomText style={[styles.details, styles.breakdown]}>
                        {i18n.t("Savings_Breakdown")}
                      </CustomText>

                      <CustomText style={styles.details}>
                        {i18n.t("LITTLE_DETAILS_MATTER")}
                      </CustomText>
                    </View>
                  </ListItem>
                );
              case "Total_saving_this_year":
                return (
                  <ListItem drag={drag} isActive={isActive}>
                    <View style={styles.box}>
                      <CustomText style={styles.saving}>
                        {i18n.t("Total_saving_this_year")}
                      </CustomText>

                      <View style={styles.savingSub}>
                        <CustomText style={styles.currencyText}>
                          {currency}
                        </CustomText>
                        <CustomText style={styles.userSaving}>
                          {currUser?.savings > 0 ? currUser.savings : "0"}
                        </CustomText>
                      </View>

                      <TouchableOpacity
                        testID="savingBreakdown"
                        onPress={onClickViewBreakDown}
                      >
                        <CustomText style={styles.savingBreakdown}>
                          {i18n.t("View savings breakdown")}
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </ListItem>
                );
              default:
                return null;
            }
          }}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default ProfileUI;
