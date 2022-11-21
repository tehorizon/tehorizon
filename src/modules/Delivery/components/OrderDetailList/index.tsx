import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { design } from "rn_fast_track_uilib";

//Components
import OrderDetailListItem from "@delivery/components/OrderDetailListItem";

import { CustomText } from "@components";

const OrderDetailList = (props) => {
  //props
  const { style, orderDetail } = props;
  console.log("orderDetail: ", orderDetail);

  //Style
  const { listHeaderView, listHeaderTitle, itemSeparatorView } = Style;

  const listHeader = (title) => {
    return (
      <View style={listHeaderView}>
        <CustomText style={listHeaderTitle}>{title}</CustomText>
      </View>
    );
  };

  const { order_header_title = "", order_items = [] } = orderDetail;

  return (
    <FlatList
      data={order_items}
      style={style}
      ListHeaderComponent={listHeader(order_header_title)}
      renderItem={({ item }) => {
        return <OrderDetailListItem item={item} />;
      }}
    />
  );
};

const Style = StyleSheet.create({
  listHeaderView: {
    backgroundColor: design["Header_Background_Secondary_color"],
  },
  listHeaderTitle: {
    marginTop: 14,
    marginLeft: 8,
    marginBottom: 7,
    fontSize: 15,
    color: design["Header_Title_Secondary_Color"],
  },
});

export default OrderDetailList;
