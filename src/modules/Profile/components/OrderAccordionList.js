import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { design } from "rn_fast_track_uilib";
import i18n from "@localization";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomText } from "@components";
import { PRIMARY } from "@fonts";
import { borderColor, borderWidth } from "@utils/genericStyles";

const OrderAccordionList = (props) => {
  //props
  const { orderHistory } = props;

  //style
  const { headerView, orderItemView, descriptionText, buttonView } = Styles;

  //state

  //navigation
  const navigation = useNavigation();

  const {
    current_year = 0,
    total_deliveries = 0,
    month_wise_orders = [],
  } = orderHistory;

  const onReorderPress = () => {};

  const onViewOrderPress = (orderID) => {
    console.log("asdfasdf onViewOrderPress");
    // navigation.navigate('OrderStatus', {orderRef: orderID});
    navigation.navigate("Delivery", {
      screen: "OrderStatus",
      params: {
        orderRef: orderID.toString(),
      },
    });
    // console.log("asdfasdf navigation: ",navigation)
  };

  const _renderMonthWiseOrder = () => {
    return (
      <>
        {month_wise_orders.map((i) => {
          const { month = "", orders = [] } = i;
          console.log("orderHistory: ", orders);
          return (
            <Collapse style={{ width: "100%" }}>
              <CollapseHeader
                style={[
                  headerView,
                  {
                    backgroundColor:
                      design["Header_Background_Secondary_color"],
                  },
                ]}
              >
                <CustomText
                  style={{
                    color: design["Header_Title_Secondary_Color"],
                    flex: 1,
                  }}
                >
                  {month}
                </CustomText>

                <CustomText
                  style={{ color: design["Header_Title_Secondary_Color"] }}
                >
                  {"Total: "} {orders.length}
                </CustomText>

                <CustomText
                  style={{
                    color: design["Header_Title_Secondary_Color"],
                    marginLeft: 20,
                  }}
                >
                  {"+"}
                </CustomText>
              </CollapseHeader>
              <CollapseBody style={{}}>
                {orders.map((order) => {
                  const {
                    id = 0,
                    merchant = "",
                    logo = "",
                    order_status = "",
                    status_color = design["Text_Primary_Color"],
                    total = "",
                    date = "",
                    savings = "",
                    show_reorder_button = 0,
                    reorder_button_title = "",
                  } = order;
                  return (
                    <View style={orderItemView}>
                      <Image
                        source={{ uri: logo }}
                        style={{ width: 51.6, height: 51.6 }}
                        resizeMode={"contain"}
                      />

                      <View style={{ flex: 1, marginStart: 5, marginEnd: 5 }}>
                        <CustomText
                          style={{ color: design["Text_Primary_Color"] }}
                        >
                          {merchant}
                        </CustomText>
                        <CustomText
                          style={{
                            color: "#" + status_color,
                            marginTop: 5,
                            marginBottom: 5,
                            fontSize: 12,
                          }}
                        >
                          {order_status}
                        </CustomText>

                        <CustomText style={descriptionText}>{total}</CustomText>
                      </View>

                      <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity
                          onPress={() => {
                            show_reorder_button
                              ? onReorderPress(id)
                              : onViewOrderPress(id);
                          }}
                          activeOpacity={1}
                          style={buttonView}
                        >
                          <CustomText
                            style={{
                              fontSize: 12,
                              color: design["Primary_Color"],
                            }}
                          >
                            {reorder_button_title}
                          </CustomText>
                        </TouchableOpacity>

                        <CustomText
                          style={{
                            ...descriptionText,
                            marginBottom: 5,
                            marginTop: 5,
                            color: design["Text_Primary_Color"],
                          }}
                        >
                          {date}
                        </CustomText>

                        <CustomText style={descriptionText}>
                          {savings}
                        </CustomText>
                      </View>
                    </View>
                  );
                })}
              </CollapseBody>
            </Collapse>
          );
        })}
      </>
    );
  };

  return (
    <ScrollView>
      <View style={{ alignItems: "center", paddingTop: 15, paddingBottom: 15 }}>
        <CustomText
          style={{
            fontFamily: PRIMARY,
            color: design["Text_Secondary_Color"],
          }}
        >
          <CustomText
            style={{
              fontFamily: PRIMARY,
              color: design["Text_Secondary_Color"],
            }}
          >
            {i18n.t("Total_Deliveries")}
          </CustomText>{" "}
          {current_year}
        </CustomText>
        <CustomText
          style={{ fontFamily: PRIMARY, fontSize: 18, marginBottom: 5 }}
        >
          {total_deliveries}
        </CustomText>

        {_renderMonthWiseOrder()}
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  headerView: {
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 23,
    paddingRight: 11,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  orderItemView: {
    marginStart: 11,
    marginEnd: 11,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 13,
    paddingBottom: 13,
    paddingStart: 10,
    paddingEnd: 10,
    backgroundColor: design["Background_Secondary_Color"],
    flexDirection: "row",
  },
  descriptionText: {
    color: design["Text_Secondary_Color"],
    fontSize: 12,
    fontFamily: PRIMARY,
  },
  buttonView: {
    paddingBottom: 3.5,
    paddingTop: 3.5,
    paddingStart: 6,
    paddingEnd: 6,
    ...borderColor(design["Primary_Color"]),
    ...borderWidth(1),
  },
});

export default OrderAccordionList;
