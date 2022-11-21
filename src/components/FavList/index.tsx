import React, { useMemo } from "react";

import { View, StyleSheet } from "react-native";
import Text from "../Text/Text";
import { design } from "rn_fast_track_uilib";
import { borderColor, padding } from "@utils/genericStyles";
import Outlet from "../Outlet";

const FavLists = (props: any) => {
  const { locationName, favouriteList, onfavouriteClick } = props;
  let list = useMemo(
    () =>
      Object.keys(favouriteList)?.length > 0 ? Object.keys(favouriteList) : [],
    [favouriteList]
  );
  return (
    <>
      <View style={fav_styles.listItemParent}>
        <Text>{locationName}</Text>
      </View>
      {list.map((item) => {
        return (
          <Outlet
            key={item}
            favouriteList={favouriteList}
            item={favouriteList[item]}
            onClick={onfavouriteClick}
            locationName={locationName}
            containerStyle={fav_styles.itemContainer}
            distanContainerStyle={fav_styles.distanceView}
          />
        );
      })}
    </>
  );
};

const fav_styles = StyleSheet.create({
  listItemParent: {
    borderBottomWidth: 1,
    ...borderColor("#D1D1D1"),
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: design.Secondary_Color,
  },
  itemContainer: {
    borderBottomWidth: 1,
    ...borderColor("#D1D1D1"),
  },
  distanceView: {
    borderRadius: 12,
    backgroundColor: design.Border_Color,
    ...padding(5),
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
});

export default FavLists;
