import React, { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import { FavEmpty, FavList } from "@components";
import { Favorite } from "@Favorite/interfaces/screens";

const Fav = ({ favourite, onfavouriteClick }: Favorite) => {
  let favouriteList = useMemo(
    () => (Object.keys(favourite)?.length > 0 ? Object.keys(favourite) : []),
    [favourite]
  );
  return (
    <FlatList
      style={styles.mainView}
      data={favouriteList}
      contentContainerStyle={styles.mainView}
      ListEmptyComponent={<FavEmpty />}
      renderItem={({ item }) => (
        <FavList
          locationName={item}
          favouriteList={favourite[item]}
          onfavouriteClick={onfavouriteClick}
        />
      )}
      keyExtractor={(item) => item}
    />
  );
};

export default Fav;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"],
  },
});
