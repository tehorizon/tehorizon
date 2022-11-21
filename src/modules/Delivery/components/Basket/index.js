import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
// import basketData from "../../assets/basketViewparams.json";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@redux/root-reducer";

import { getFinalOutletBasketData, getFinalUserBasketData } from "./helpers";

import {
  MinimumOrderModal,
  DeliveryFeeModal,
  SelectDeliveryLocationModal,
  OutletIsClosed,
} from "@components";
import { PRIMARY_EXTRABOLD } from "@fonts";
import { borderColor, borderWidth, padding } from "@utils/genericStyles";
import i18n from "@localization";

const index = (props) => {
  const {
    outletCurrency,
    minimumOrderAmount,
    deliveryMinimumAmountMessage,
    selectedDeliverToLocation,
    isOpen,
    deliveryCartParams,
    selectedOutlet,
    merchant,
    orderID,
  } = props;

  //Selectors
  const basket = useAppSelector(
    (state) => state.deliveryDetailReducer.deliveryOutletDetail.basket
  );
  const totalCount = useAppSelector(
    (state) =>
      state.deliveryDetailReducer.deliveryOutletDetail.basket.totalCount
  );
  const totalPrice = useAppSelector(
    (state) =>
      state.deliveryDetailReducer.deliveryOutletDetail.basket.totalPrice
  );
  const basketIsEmpty = useAppSelector(
    (state) => state.deliveryDetailReducer.deliveryOutletDetail.basket.isEmpty
  );
  const user = useAppSelector((state) => state.userReducer.userInfo);
  const userSessionToken = useAppSelector(
    (state) => state.userReducer.userSessionToken
  );

  //local states
  const [minimumOrderModalVisibility, setMinimumOrderModalVisibility] =
    useState(false);

  const [outletIsCloseModal, setOutletIsCloseModal] = useState(false);

  const navigation = useNavigation();
  const [selectDeliveryLocationModal, setSelectDeliveryLocationModal] =
    useState(false);

  if (basketIsEmpty === true) {
    return null;
  }

  if (selectedOutlet.id !== basket.outlet_id) {
    return null;
  }

  const checkMinimumPrice = () => {
    if (totalPrice <= minimumOrderAmount) {
      return true;
    } else {
      return false;
    }
  };

  const checkSelectedDeliverToLocation = () => {
    if (
      selectedDeliverToLocation &&
      Object.keys(selectedDeliverToLocation).length === 0 &&
      selectedDeliverToLocation.constructor === Object
    ) {
      return true;
    } else {
      return false;
    }
  };

  const orderChecks = () => {
    if (!isOpen) {
      //show modal if outlet is closed
      setOutletIsCloseModal(true);
    } else if (checkSelectedDeliverToLocation()) {
      //show select location modal
      setSelectDeliveryLocationModal(true);
    } else if (checkMinimumPrice()) {
      //show minimum price dialog
      setMinimumOrderModalVisibility(true);
    } else {
      const postData = makeBasketViewData();
      console.log(postData, "basket data");
      navigation.navigate("Basket", {
        data: postData,
        url: "https://entcartut.theentertainerme.com/delivery",
      });
    }
  };

  const makeBasketViewData = (outlet_id, outletType, deliveryInfo) => {
    const addedProducts = basket.products;

    const { outlets } = merchant;
    const outlet = outlets[0];

    const outletInfo = {
      outletID: outlet?.id,
      outlet_name: outlet?.name,
      outlet_phonenumber: outlet?.telephone,
      outlet_sf_id: outlet?.sfId,
      merchantID: merchant.id,
      merchant_sf_id: merchant?.merchant_sf_id, //Not found
      deliveryCharges: merchant.deliveryCharges,
      total_items: basket.totalCount,
      subtotalPrice: basket.totalPrice,
      totalPrice: basket.totalPrice,
      discount_on_whole_basket: false,
      discountPrice: 0,
      appliedVouchers: [],
      currency: merchant.outletCurrency,
      specialInstruction: "",
    };

    const delivery_cart_params = {
      // zone_id: deliveryInfo.localZoneId,
      ...deliveryCartParams,
    };

    // console.log(reduxState.userReducer.userInfo, 'randomCheck1');
    // return
    const userInfo = getFinalUserBasketData(
      user,
      selectedDeliverToLocation,
      merchant.selected_locations
    );

    let finalData;

    finalData = {
      ...outletInfo,
      delivery_cart_params,
      editOrderIdleTimerValue: merchant?.edit_order_idle_timer_value,
      editOrderTimerValue: merchant?.edit_order_timer_value,
      addedProducts,
      userInfo,
      token: userSessionToken,
      outletType: "delivery",
    };

    if (orderID) {
      finalData["order_id"] = orderID;
    }

    return finalData;
  };

  const handleNewOrderModalOkayPress = () => {
    setMinimumOrderModalVisibility(false);
  };

  const handleSelectLocationModalOkay = () => {
    setSelectDeliveryLocationModal(false);
  };

  return (
    <View>
      <OutletIsClosed
        isVisible={outletIsCloseModal}
        handleOkay={(show_restaurants) => {
          setOutletIsCloseModal(false);
          show_restaurants && navigation.goBack();
        }}
      />
      <SelectDeliveryLocationModal
        isVisible={selectDeliveryLocationModal}
        handleOkay={handleSelectLocationModalOkay}
      />

      <DeliveryFeeModal
        isVisible={false}
        minimumOrderAmount={minimumOrderAmount}
        deliveryMinimumAmountMessage={deliveryMinimumAmountMessage}
        handleAddMoreItems={() => alert("delivery fee Add more items")}
        handleCancel={() => alert("delivery fee modal cancel")}
      />

      <MinimumOrderModal
        isVisible={minimumOrderModalVisibility}
        minimumOrderAmount={minimumOrderAmount}
        totalPrice={totalPrice}
        outletCurrency={outletCurrency}
        handleOkay={handleNewOrderModalOkayPress}
      />

      <TouchableOpacity
        activeOpacity={1}
        style={styles.basketView}
        onPress={orderChecks}
      >
        <View style={styles.countView}>
          <Text style={styles.count}>{totalCount}</Text>
        </View>
        <View style={styles.basketTextView}>
          <Text style={styles.basketText}>{i18n.t("VIEW_BASKET")}</Text>
        </View>
        <View style={styles.priceView}>
          <Text style={styles.price}>
            {outletCurrency} {totalPrice}
          </Text>
          <Text style={styles.beforeSaving}>{i18n.t("Before_Savings")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  basketView: {
    backgroundColor: design["Primary_Color"]
      ? design["Primary_Color"]
      : "black",
    height: 55,
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    ...padding(5),
  },
  countView: {
    ...borderWidth(1),
    ...borderColor("white"),
    borderRadius: 15,
    height: 30,
    width: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 13,
    color: design["Primary_Color"],
  },
  basketTextView: {
    flex: 1,
    alignItems: "center",
  },
  basketText: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 16,
    color: design.Border_Button_Text_Color,
  },
  priceView: {
    ...padding(5),
    alignItems: "center",
  },
  price: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 16,
    color: design.Border_Button_Text_Color,
  },
  beforeSaving: {
    fontFamily: PRIMARY_EXTRABOLD,
    fontSize: 10,
    color: design.Border_Button_Text_Color,
  },
});
