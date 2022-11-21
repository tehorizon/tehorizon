import React from "react";
import { StyleSheet, View } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";
import { design } from "rn_fast_track_uilib";
import { Favourite, HeaderWithBackButton } from "@components";
import { ScreenTypes } from "../../interfaces";
import { PRIMARY_EXTRABOLD } from "@fonts";
import { paddingVertical } from "@fast_track/src/utils/genericStyles";

//component containing the view of Favorite screen
const FavoriteView = ({
  onfavouriteClick,
  favourite,
  navigation,
}: ScreenTypes.Favorite) => {
  return (
    <View style={[styles.mainView, getFlipForRTLStyle()]}>
      <HeaderWithBackButton
        title={i18n.t("Favourites")}
        navigation={navigation}
      />
      <View style={styles.mainView}>
        <Favourite onfavouriteClick={onfavouriteClick} favourite={favourite} />
      </View>
    </View>
  );
};

export default FavoriteView;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
  favoriteView: {
    alignItems: "center",
    backgroundColor: design.Header_Background_Primary_Color,
    borderBottomWidth: 3,
    borderBottomColor: design.Active_Tabs_Under_Line_Color,
    ...paddingVertical(3),
  },
  favoriteText: {
    fontFamily: PRIMARY_EXTRABOLD,
    lineHeight: 16,
    ...getFlipForRTLStyle(),
    color: design.Text_Primary_Color,
  },
});
