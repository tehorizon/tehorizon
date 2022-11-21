import React, { useEffect, useState } from "react";
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

//Redux
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/root-reducer";
import {
  reOrderValidationRequest,
  setReOrderValidationRequest,
  setReOrderBasket,
} from "@delivery/redux/actions";

//Components
import Alert from "@delivery/components/Alert";

//Images
import outletClosedIcon from "@assets/images/outletClosedIcon.png";

import { CustomText } from "@components";
import { PRIMARY } from "@fonts";
import {
  borderColor,
  borderWidth,
  marginHorizontal,
  marginVertical,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";

const OrderAccordionList = ({ orderHistory }) => {
  //style
  const { headerView, orderItemView, descriptionText, buttonView } = Styles;

  //state
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});

  //Redux
  const dispatch = useDispatch();
  const reOrderValidationResponse = useAppSelector(
    (state) => state.deliveryDetailReducer?.reOrderValidationResponse
  );

  // saga calls
  const reOrderValidation = (data) => dispatch(reOrderValidationRequest(data));

  //navigation
  const navigation = useNavigation();

  const {
    current_year = 0,
    total_deliveries = 0,
    month_wise_orders = [],
  } = orderHistory;
  let selectedOrder = undefined;

  //useEffect for reOrderValidationResponse
  useEffect(() => {
    if (reOrderValidationResponse) {
      const { validation, outlet, addedProducts } =
        reOrderValidationResponse.data;
      const alertData = {
        image: outletClosedIcon,
        title: validation.title,
        message: validation.message,
        buttonTitle: i18n.t("Close"),
        defaultAction: () => {
          setAlertData({});
          setShowAlert(false);
          dispatch(setReOrderValidationRequest(null));
        },
      };
      if (validation.should_proceed) {
        if (validation.status_type == "item_availability") {
          alertData.defaultAction = () => {
            navigation.navigate("DeliveryOutletDetail", {
              outletParams: outlet,
            });
            dispatch(setReOrderValidationRequest(null));
          };
          (alertData.buttonTitle = i18n.t("CONTINUE")),
            (alertData.extraButtons = [
              {
                title: i18n.t("Cancel"),
                action: () => {
                  setAlertData({});
                  setShowAlert(false);
                  dispatch(setReOrderValidationRequest(null));
                },
              },
            ]);
          setAlertData(alertData);
          setShowAlert(true);
        } else if (validation.status_type == "outlet_not_exist") {
          alertData.defaultAction = () => {
            navigation.navigate("DeliveryOutletDetail", {
              outletParams: outlet,
            });
            dispatch(setReOrderValidationRequest(null));
          };
          setAlertData(alertData);
          setShowAlert(true);
        } else {
          navigation.navigate("DeliveryOutletDetail", { outletParams: outlet });
          dispatch(setReOrderBasket({ addedProducts, outlet }));
          dispatch(setReOrderValidationRequest(null));
        }
      } else {
        setAlertData(alertData);
        setShowAlert(true);
      }
    } else {
    }
  }, [reOrderValidationResponse]);

  // const showAlert = (data) => {
  //
  // }

  const onLocationChange = (location) => {
    if (selectedOrder) {
      const data = {
        order_id: selectedOrder.orderID.toString(),
        outlet_id: selectedOrder.outletID.toString(),
        merchant_id: selectedOrder.merchantID.toString(),
      };
      console.log("asdfasdf location data", data);
      reOrderValidation(data);
    }
  };

  const onReorderPress = () => {
    navigation.navigate("LocationPickerMap", {
      onLocationChange: onLocationChange,
    });
  };

  const onViewOrderPress = (orderID) => {
    console.log("asdfasdf onViewOrderPress");
    // navigation.navigate('OrderStatus', {orderRef: orderID});
    navigation.navigate("Delivery", {
      screen: "OrderStatus",
      params: {
        orderRef: orderID.toString(),
        goBack: true,
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
                    merchant_id = 0,
                    outlet_id = 0,
                  } = order;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onViewOrderPress(id);
                      }}
                      activeOpacity={1}
                      style={orderItemView}
                    >
                      <Image
                        source={{ uri: logo }}
                        style={{ width: 51.6, height: 51.6 }}
                        resizeMode={"contain"}
                      />

                      <View style={{ flex: 1, ...marginHorizontal(5) }}>
                        <CustomText
                          style={{ color: design["Text_Primary_Color"] }}
                        >
                          {merchant}
                        </CustomText>
                        <CustomText
                          style={{
                            color: "#" + status_color,
                            ...marginVertical(5),
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
                            selectedOrder = {
                              orderID: id,
                              merchantID: merchant_id,
                              outletID: outlet_id,
                            };
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
                            ...marginVertical(5),
                            color: design["Text_Primary_Color"],
                          }}
                        >
                          {date}
                        </CustomText>

                        <CustomText style={descriptionText}>
                          {savings}
                        </CustomText>
                      </View>
                    </TouchableOpacity>
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
    <>
      {showAlert && <Alert data={alertData} />}
      <ScrollView>
        <View style={{ alignItems: "center", ...paddingVertical(15) }}>
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
            style={{
              fontFamily: PRIMARY,
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {total_deliveries}
          </CustomText>

          {_renderMonthWiseOrder()}
        </View>
      </ScrollView>
    </>
  );
};

const Styles = StyleSheet.create({
  headerView: {
    ...paddingVertical(4),
    paddingLeft: 23,
    paddingRight: 11,
    flexDirection: "row",
    ...marginVertical(5),
  },
  orderItemView: {
    ...marginHorizontal(11),
    ...marginVertical(5),
    ...paddingVertical(13),
    ...paddingHorizontal(10),
    backgroundColor: design["Background_Secondary_Color"],
    flexDirection: "row",
  },
  descriptionText: {
    color: design["Text_Secondary_Color"],
    fontSize: 12,
    fontFamily: PRIMARY,
  },
  buttonView: {
    ...paddingHorizontal(6),
    ...paddingVertical(3.5),
    ...borderColor(design["Primary_Color"]),
    ...borderWidth(1),
  },
});

export default OrderAccordionList;
