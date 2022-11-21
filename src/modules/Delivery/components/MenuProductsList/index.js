import React, { useState } from "react";
import { View, Text } from "react-native";
import MenuProductListItem from "../MenuProductItem/index";
import { useDispatch } from "react-redux";
import { setBasketValues } from "@delivery/redux/actions";
import { NewOrderModal } from "@components";
import { FlatList } from "react-native-gesture-handler";

const MenuProductList = ({ menuProductsList, merchant, basketIsEmpty }) => {
  //local states
  const [newOrderData, setNewOrderData] = useState(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [products, setProducts] = useState(menuProductsList.products);

  //actions
  const dispatch = useDispatch();
  const addToBasket = (data) => dispatch(setBasketValues(data));

  const handleNewOrderModal = (data) => {
    setShowNewOrderModal(true);
    let products = [];
    products.push(data.cartItem);
    data.products = products;
    delete data.cartItem;
    setNewOrderData(data);
  };

  const handleNewOrder = () => {
    setShowNewOrderModal(false);
    newOrderData.setItemCount(1);
    let temp = newOrderData;
    delete temp["setItemCount"];
    addToBasket(temp);
  };

  if (!menuProductsList) {
    return (
      <View>
        <Text>No item found</Text>
      </View>
    );
  }

  return (
    <View>
      <NewOrderModal
        isVisible={showNewOrderModal}
        handleCancel={() => {
          setShowNewOrderModal(false);
        }}
        handleNewOrder={handleNewOrder}
      />

      <FlatList
        // key={menuActiveTab}
        zIndex={100}
        nestedScrollEnabled
        data={menuProductsList.products}
        keyExtractor={(item) => item.id}
        renderItem={(item, index) => {
          return (
            <MenuProductListItem
              menuProductsListItem={item.item}
              merchant={merchant}
              key={index}
              products={products}
              handleNewOrderModal={handleNewOrderModal}
            />
          );
        }}
        ListFooterComponent={() => {
          if (!basketIsEmpty) {
            return (
              <View
                style={{ height: 55, width: "100%", backgroundColor: "white" }}
              />
            );
          } else {
            return null;
          }
        }}
      />
    </View>
  );
};

export default MenuProductList;
