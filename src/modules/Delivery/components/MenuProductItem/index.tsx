import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch } from "react-redux";

import {
  setBasketValues,
  setBasketItem,
  removeBasketItem,
  removeBasketItemByIndex,
} from "@delivery/redux/actions";
import DeleteProductModal from "../DeleteProductModal";

import OrderCustomizationModal from "../OrderCustomization/index";
import { NewOrderModal } from "@components";
import { PRIMARY_BOLD, PRIMARY } from "@fonts";
import {
  marginVertical,
  padding,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";
import Image from "@HybridComponents/Image";
import { useAppSelector } from "@redux/root-reducer";

const MenuProductListItem = ({
  menuProductsListItem = {},
  products = [],
  handleNewOrderModal = (data: any) => {},
  ...props
}) => {
  //Selectors
  const basket = useAppSelector(
    (state) => state.deliveryDetailReducer.deliveryOutletDetail.basket
  );
  const basketProducts = useAppSelector(
    (state) =>
      state.deliveryDetailReducer?.deliveryOutletDetail?.basket?.products || []
  );
  const basketIsEmpty = useAppSelector(
    (state) => state.deliveryDetailReducer.deliveryOutletDetail.basket.isEmpty
  );
  const selectedOutlet = useAppSelector(
    (state) => state.deliveryDetailReducer.deliveryOutletDetail.selectedOutlet
  );

  //actions dispacher
  const dispatch = useDispatch();
  const onSetBasketValues = (data) => dispatch(setBasketValues(data));
  const onSetBasketItem = (data) => dispatch(setBasketItem(data));
  const onRemoveBasketItem = (data) => dispatch(removeBasketItem(data));
  const onRemoveBasketItemByIndex = (data) =>
    dispatch(removeBasketItemByIndex(data));

  const [itemCount, setItemCount] = useState(0);
  const [orderCustomizationModal, setOrderCustomizationModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [filterProducts, setFilterProducts] = useState(undefined);

  useEffect(() => {
    // console.log(menuProductsListItem)
    setCount(menuProductsListItem);
  }, [basketProducts?.length, basket?.totalCount, basket?.outlet_id]);

  const setCount = (item) => {
    if (basketProducts?.length === 0) {
      return;
    }
    let count = 0;
    basketProducts.forEach((product) => {
      if (product?.productId === item?.productId) {
        count++;
      }
    });
    setItemCount(count);
  };

  if (!menuProductsListItem) {
    return (
      <View>
        <Text>No item found</Text>
      </View>
    );
  }

  const getSelectedProductCustomizations = (customisations) => {
    let productSelections = [];

    customisations.forEach((customisation) => {
      customisation.options.forEach((option) => {
        option.options_items.forEach((optionItem) => {
          if (optionItem.is_selected) {
            productSelections.push({
              is_selected: optionItem.is_selected,
              item_id: optionItem.item_id,
              price: optionItem.price,
              sectionId: customisation.section_id,
              sub_title: optionItem.sub_title,
              title: optionItem.title,
              mainTitle: option.title,
            });
          }
        });
      });
    });

    return productSelections;
  };

  const handleAddToCart = (customisations = []) => {
    //utils

    setOrderCustomizationModal(false);

    let productSelections = getSelectedProductCustomizations(customisations);

    if (basketIsEmpty) {
      //make a new addition
      let cartItem = {
        productId: menuProductsListItem.productId,
        isCustomisable: menuProductsListItem.is_customisable,
        count: itemCount + 1,
        voucherId: menuProductsListItem.voucher_id || "",
        name: menuProductsListItem.name,
        itemSubtotalPrice:
          (itemCount + 1) *
          productSelections.reduce((total, currentValue) => {
            return total + currentValue.price;
          }, menuProductsListItem.price),
        selectedOptions: productSelections,
        price: menuProductsListItem.price,
      };

      let totalCount = cartItem.count;
      let totalPrice = cartItem.itemSubtotalPrice;
      let merchant_id = props.merchant.id || 0;
      let outlet_id = selectedOutlet.id || 0;
      let isEmpty = false;
      let outletName = selectedOutlet.name;
      let merchantName = props.merchant.name;
      let products = [cartItem];
      onSetBasketValues({
        totalCount,
        totalPrice,
        merchant_id,
        outlet_id,
        isEmpty,
        outletName,
        merchantName,
        products,
      });

      setItemCount(itemCount + 1);
    } else if (!basketIsEmpty && selectedOutlet.id !== basket.outlet_id) {
      let cartItem = {
        productId: menuProductsListItem.productId,
        isCustomisable: menuProductsListItem.is_customisable,
        count: itemCount + 1,
        voucherId: menuProductsListItem.voucher_id || "",
        name: menuProductsListItem.name,
        itemSubtotalPrice:
          (itemCount + 1) *
          productSelections.reduce((total, currentValue) => {
            return total + currentValue.price;
          }, menuProductsListItem.price),
        selectedOptions: productSelections,
        price: menuProductsListItem.price,
      };

      let totalCount = cartItem.count;
      let totalPrice = cartItem.itemSubtotalPrice;
      let merchant_id = props.merchant.id || 0;
      let outlet_id = selectedOutlet.id || 0;
      let isEmpty = false;
      let outletName = selectedOutlet.name;
      let merchantName = props.merchant.name;
      let products = [cartItem];

      handleNewOrderModal({
        totalCount,
        totalPrice,
        merchant_id,
        outlet_id,
        isEmpty,
        outletName,
        merchantName,
        cartItem,
        products,
        setItemCount,
      });
    } else {
      let cartItem = {
        productId: menuProductsListItem.productId,
        isCustomisable: menuProductsListItem.is_customisable,
        count: 1,
        voucherId: menuProductsListItem.voucher_id || "",
        name: menuProductsListItem.name,
        itemSubtotalPrice: productSelections.reduce((total, currentValue) => {
          return total + currentValue.price;
        }, menuProductsListItem.price),
        selectedOptions: productSelections,
        price: menuProductsListItem.price,
      };

      onSetBasketItem(cartItem);
      setItemCount(itemCount + 1);
    }
  };

  // const handleMinusFromCart = () => {
  //   if (itemCount > 0) {
  //     setItemCount(itemCount - 1);
  //   }
  //
  //
  //   onRemoveBasketItem(props.menuProductsListItem.productId)
  //
  // };
  const handleMinusFromCart = (isCustomisable) => {
    if (isCustomisable) {
      // const products = basketProducts.filter((product: any, index: number) => {
      //   if (product.productId === menuProductsListItem.productId) {
      //     let item = { ...product, index: index };
      //     return item;
      //   }
      // });
      const products = [];
      for (let x = 0; x < basketProducts.length; x++) {
        const product = basketProducts[x];
        if (product.productId === menuProductsListItem?.productId) {
          products.push({
            ...product,
            index: x,
          });
        }
      }
      if (products.length > 1) {
        //show popup
        setFilterProducts(products);
        setShowDeleteProductModal(true);
        // if (itemCount > 0) {
        //   setItemCount(itemCount - 1);
        // }
        // onRemoveBasketItemByIndex(2)
      } else {
        if (itemCount > 0) {
          setItemCount(itemCount - 1);
        }
        onRemoveBasketItem({
          productId: menuProductsListItem?.productId,
          deleteAll: false,
        });
      }
    } else {
      if (itemCount > 0) {
        setItemCount(itemCount - 1);
      }
      onRemoveBasketItem({
        productId: menuProductsListItem?.productId,
        deleteAll: false,
      });
    }
  };

  const onRemoveAllPress = (productID) => {
    console.log("productID: ", productID);
    if (itemCount > 0) {
      setItemCount(itemCount - filterProducts.length);
      setFilterProducts(undefined);
      setShowDeleteProductModal(false);
      onRemoveBasketItem({
        productId: menuProductsListItem?.productId,
        deleteAll: true,
      });
    }
  };

  const onRemovePress = (indexToDelete) => {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
      console.log("productArray 1: ", filterProducts);
      const productArray = [];
      let index = 0;
      for (let i = 0; i < filterProducts.length; i++) {
        if (filterProducts[i].index !== indexToDelete) {
          productArray.push({
            ...filterProducts[i],
            index: index,
          });
          index++;
        }
      }
      if (productArray.length !== 0) {
        setFilterProducts(productArray);
      } else {
        setShowDeleteProductModal(false);
      }

      onRemoveBasketItemByIndex(indexToDelete);
    }
  };

  const onAddPress = () => {
    if (
      menuProductsListItem.is_customisable === true &&
      menuProductsListItem.customizations.length > 0
    ) {
      // const newArrayOfObj = menuProductsListItem.customizations.map(
      //   ({ options: data, ...rest }) => ({
      //     data,
      //     ...rest,
      //   })
      // );
      setSelectedItem(menuProductsListItem);
      setOrderCustomizationModal(true);
      // console.log({ newArrayOfObj });
    } else {
      handleAddToCart();
    }
  };
  return (
    <>
      <OrderCustomizationModal
        isVisible={orderCustomizationModal}
        onBack={() => setOrderCustomizationModal(false)}
        customisations={selectedItem?.customizations}
        handleAddToCart={handleAddToCart}
      />
      {showDeleteProductModal && (
        <DeleteProductModal
          isVisible={true}
          products={filterProducts}
          onDonePress={() => {
            setShowDeleteProductModal(false);
          }}
          onRemovePress={onRemovePress}
          onRemoveAllPress={onRemoveAllPress}
        />
      )}

      <View style={styles.item}>
        <View style={styles.detailsView}>
          <Image
            source={{
              uri: menuProductsListItem.imageURL,
            }}
            style={styles.img}
          />
          <View style={styles.flex}>
            <Text style={styles.nameText}>{menuProductsListItem.name}</Text>

            <Text style={styles.description}>
              {menuProductsListItem.description}
            </Text>
          </View>
        </View>

        <View style={styles.curencyView}>
          <Text style={styles.currency}>{`AED ${
            menuProductsListItem?.price || 0
          }`}</Text>
          {itemCount === 0 ? (
            <AntDesign
              name="pluscircle"
              size={22}
              color={styles.primaryColor.color}
              style={styles.padding5}
              onPress={() => {
                //alert('plus clicked')
                if (
                  menuProductsListItem.is_customisable === true &&
                  menuProductsListItem.customizations.length > 0
                ) {
                  setSelectedItem(menuProductsListItem);
                  setOrderCustomizationModal(true);
                  // console.log(menuProductsListItem);
                } else {
                  handleAddToCart();
                }
              }}
            />
          ) : (
            <View style={styles.row}>
              <AntDesign
                name="minuscircle"
                size={22}
                color={styles.primaryColor.color}
                style={styles.padding5}
                onPress={() => {
                  handleMinusFromCart(menuProductsListItem.is_customisable);
                }}
              />
              <Text style={styles.count}>{itemCount}</Text>
              <AntDesign
                name="pluscircle"
                size={22}
                color={styles.primaryColor.color}
                style={styles.padding5}
                onPress={onAddPress}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default MenuProductListItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: design.Background_Secondary_Color,
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: design.Border_Color,
    ...paddingHorizontal(12),
    // marginTop: 3,
  },
  detailsView: {
    flex: 1,
    flexDirection: "row",
    marginRight: 10,
  },
  img: {
    height: 27,
    width: 27,
    marginRight: 20,
  },
  flex: {
    flex: 1,
  },
  nameText: {
    marginTop: 20,
    fontFamily: PRIMARY_BOLD,
    fontSize: 14,
    marginBottom: 6,
  },
  description: {
    fontFamily: PRIMARY,
    fontSize: 12,
    marginBottom: 5,
  },
  curencyView: {
    ...marginVertical(20),
    alignItems: "flex-end",
  },
  currency: {
    fontFamily: PRIMARY,
    marginBottom: 6,
    fontSize: 14,
  },
  padding5: {
    ...paddingVertical(5),
  },
  count: {
    ...paddingVertical(5),
    ...paddingHorizontal(10),
    color: design["Primary_Color"] ? design["Primary_Color"] : "black",
  },
  primaryColor: {
    color: design["Primary_Color"] ? design["Primary_Color"] : "black",
  },
  flex1row: {
    flex: 1,
    flexDirection: "row",
  },
  flex01: {
    flex: 1,
    flexDirection: "row",
  },
  flex07: {
    // flexDirection: "column",
    flex: 0.7,
    paddingTop: 15,
  },
  row: {
    flexDirection: "row",
    // justifyContent: "center",
  },
  space_between: {
    justifyContent: "space-between",
  },
  allignCenter: {
    alignItems: "center",
  },

  flex02: {
    flex: 0.2,
    // flexDirection: "column",
    alignItems: "center",
    paddingTop: 18,
  },
});
