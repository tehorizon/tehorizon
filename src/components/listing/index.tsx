import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FlatList, FlatListProps, StyleSheet, View } from "react-native";
import { marginHorizontal } from "@utils/genericStyles";

import { design } from "rn_fast_track_uilib";
import { borderColor, paddingVertical } from "@utils/genericStyles";
import { SCREEN_WIDTH } from "@commons/constants/constants";
import { CustomNoRecord } from "@components";
import { outletItemInterface } from "@fast_track/src/modules/Outlet/BL/Interfaces";
import { ActivityIndicator } from "react-native-paper";
import { useAppSelector } from "@redux/root-reducer";
import Outlet from "../Outlet";

interface PROPS {
  OutletList: outletItemInterface[];
  getOutlet: (arg?: boolean) => void;
  onOutletClick: (data: outletItemInterface) => void;
  favouriteList: outletItemInterface;
  isSearch?: boolean;
  tab?: string;
  ListEmptyComponent?: ReactElement | null;
}
const Listing = memo((props: PROPS) => {
  let {
    OutletList = [],
    getOutlet = (arg1?: boolean, arg2?: Function) => {},
    isSearch = false,
    tab = "",
    onOutletClick,
  } = props;
  const [isFetching, updateFetching] = useState(false);
  const [isFirstTime, updateStatus] = useState(true); // to hide on first time

  let isLoading = useAppSelector((state) => state?.appReducer?.isLoading);

  useEffect(() => {
    updateStatus(false);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (OutletList?.length > 0 && OutletList?.length % 60 == 0) {
      updateFetching(true);
      getOutlet(false, () => {
        updateFetching(false);
      });
    }
  }, [OutletList?.length, getOutlet]);

  const onRefresh = useCallback(() => getOutlet(true), [getOutlet]);
  return (
    <FlatList
      testID={`list-${tab}`}
      style={styles.container}
      refreshing={isLoading}
      onRefresh={!isSearch ? onRefresh : null}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={Separator}
      keyExtractor={(item) => item?.id?.toString()}
      onEndReached={handleLoadMore}
      ListEmptyComponent={!isFirstTime ? CustomNoRecord : null}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetching ? Footer : null}
      {...props}
      data={OutletList}
      renderItem={({ item }) => (
        <Outlet item={item} onClick={onOutletClick} {...props} />
      )}
    />
  );
});

const Separator = memo(() => <View style={styles.separator} />);

const Footer = memo(() => (
  <View style={styles.footer}>
    <ActivityIndicator size="large" color={design.Primary_Color} />
  </View>
));
export default Listing;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: design["Outlet_Background_Color"],
  },
  container: {
    flex: 1,
    backgroundColor: design["Background_Primary_Color"],
  },
  outletNameWraooer: {
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    height: 1,
    ...marginHorizontal(16),
    backgroundColor: "#D1D1D1",
  },
  typeWrapper: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 6,
  },
  marchantLogo: {
    height: 70,
    width: 70,
    resizeMode: "cover",
    ...marginHorizontal(10),
  },
  marchantDetails: {
    width: SCREEN_WIDTH - 90,
    flexDirection: "row",
  },
  marchantName: {
    fontSize: 16,
    marginTop: 9,
    color: design["List_Title_Primary_Color"],
  },
  outletName: {
    fontSize: 14,
    color: design["List_Subtitle_Color"],
    marginTop: 3,
  },
  attributeValue: {
    fontSize: 12,
    color: design["List_Subtitle_Color"],
  },
  attributeImage: {
    height: "100%",
    width: "100%",
  },
  attributeImageView: {
    width: 19.6,
    height: 19.6,
    marginRight: 5.4,
  },
  outletFooterView: {
    alignItems: "flex-end",
    marginLeft: 10,
    marginRight: 14,
    alignSelf: "center",
  },
  distance: {
    color: design["List_Subtitle_Color"],
    marginTop: 5,
  },
  fvtImage: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  padding10: {
    paddingTop: 10,
  },
  footer: {
    ...paddingVertical(20),
    borderTopWidth: 1,
    ...borderColor("#CED0CE"),
  },
  icon: {
    height: 40,
    width: 40,
  },
});
