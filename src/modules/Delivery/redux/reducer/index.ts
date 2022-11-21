import { ActionTypes } from "../types";

const INITIAL_STATE = {
  deliveryOutletDetail: {
    basket: {
      products: [],
      totalCount: 0,
      totalPrice: 0,
      outlet_id: 0,
      outletType: "delivery",
      merchant_id: 0,
      outletName: "",
      merchantName: "",
      isEmpty: true,
    },
    selectedOutlet: null,
    outletDetail: null,
    outletDetailMenuTabs: null,
    menuActiveTab: 0,
    menuProducts: null,
    deliveryInfo: {
      deliveryRules: null,
      localZoneId: null,
    },
    isAbleToDeliver: false,
  },
  deliveryDetails: {
    location_tags: [],
    delivery_locations: [],
    selectedDeliverToLocation: {},
  },
  outletListing: {
    outlets: [],
    searchOutlets: undefined,
  },
  pendingOrderStatus: {
    orders: [],
  },
  lastOrder: {},
  cancelOrderResponse: {},
  editOrderDetails: null,
  reOrderValidationResponse: null,
  deliveryHomeLoader: false,
  deliverySearchLoader: false,
};

const getData = (products: any) => {
  let count = 0;
  let price = 0;
  products.forEach((product: any) => {
    count += product.count;
    price += product.price;
    if (product.selectedOptions.length > 0) {
      product.selectedOptions.forEach((item: any) => {
        price += item.price;
      });
    }
  });

  return {
    count,
    price,
  };
};

const removeItemFromProducts = (products: any, productId: string | number) => {
  let tempItems = [];
  let foundInstance = false;
  for (let index = 0; index < products.length; index++) {
    const item = products[index];
    // console.log(item,productId,'testing');
    if (productId === item.productId && !foundInstance) {
      foundInstance = true;
    } else {
      tempItems.push(item);
    }
  }

  return tempItems;
};

const removeAllItemFromProducts = (
  products: any,
  productId: string | number
) => {
  let tempItems = [];
  for (let index = 0; index < products.length; index++) {
    const item = products[index];
    if (productId !== item.productId) {
      tempItems.push(item);
    }
  }

  return tempItems;
};

const removeItemFromProductsByIndex = (products: any, productIndex: number) => {
  let tempItems = [];
  let foundInstance = false;
  for (let index = 0; index < products.length; index++) {
    const item = products[index];
    if (productIndex == index && !foundInstance) {
      foundInstance = true;
    } else {
      tempItems.push(item);
    }
  }
  return tempItems;
};

const deliveryDetailReducer = (state = INITIAL_STATE, action: any) => {
  //console.log(action, 'actions');
  switch (action.type) {
    case ActionTypes.SET_SELECTED_OUTLET:
      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          selectedOutlet: { ...action.data },
        },
      };

    case ActionTypes.SET_OUTLET_DETAIL:
      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          outletDetail: { ...action.data },
          menuActiveTab: 0,
        },
      };

    case ActionTypes.SET_OUTLET_DETAIL_MENU_TABS:
      const actionData = action.data ? [...action.data] : null;
      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          outletDetailMenuTabs: actionData,
        },
      };

    case ActionTypes.SET_MENU_ACTIVE_TAB:
      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          menuActiveTab: action.data,
        },
      };

    case ActionTypes.SET_MENU_PRODUCT_LIST:
      const menuData = action.data ? [...action.data] : null;
      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          menuProducts: menuData,
        },
      };

    case ActionTypes.CLEAR_OUTLET_DETAILS_DATA:
      return {
        ...state,
        deliveryOutletDetail: INITIAL_STATE.deliveryOutletDetail,
      };

    case ActionTypes.SET_BASKET_VALUES:
      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          basket: { ...action.data },
        },
      };

    case ActionTypes.SET_BASKET_ITEM:
      const tempProducts = [
        ...state.deliveryOutletDetail.basket.products,
        action.data,
      ];
      const data = getData(tempProducts);
      let tempCount = data.count;
      let tempPrice = data.price;
      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          basket: {
            ...state.deliveryOutletDetail.basket,
            products: tempProducts,
            totalCount: tempCount,
            totalPrice: tempPrice,
          },
        },
      };

    case ActionTypes.REMOVE_BASKET_ITEM:
      const { productId, deleteAll } = action.data;
      let removeProducts = undefined;
      if (deleteAll) {
        removeProducts = removeAllItemFromProducts(
          state.deliveryOutletDetail.basket.products,
          productId
        );
      } else {
        removeProducts = removeItemFromProducts(
          state.deliveryOutletDetail.basket.products,
          productId
        );
      }

      const afterRemoveData = getData(removeProducts);

      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          basket: {
            ...state.deliveryOutletDetail.basket,
            products: removeProducts,
            totalCount: afterRemoveData.count,
            totalPrice: afterRemoveData.price,
            isEmpty:
              afterRemoveData.count === 0 && afterRemoveData.price === 0
                ? true
                : false,
          },
        },
      };

    case ActionTypes.REMOVE_BASKET_ITEM_BY_INDEX:
      const filterProducts = removeItemFromProductsByIndex(
        state.deliveryOutletDetail.basket.products,
        action.data
      );
      const productsData = getData(filterProducts);

      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          basket: {
            ...state.deliveryOutletDetail.basket,
            products: filterProducts,
            totalCount: productsData.count,
            totalPrice: productsData.price,
            isEmpty:
              productsData.count === 0 && productsData.price === 0
                ? true
                : false,
          },
        },
      };

    case ActionTypes.SET_DELIVERY_DETAILS:
      return {
        ...state,
        deliveryDetails: {
          ...state.deliveryDetails,
          ...action.deliveryDetails,
        },
      };
    case ActionTypes.SET_DELIVERY_LOCATION_LIST:
      return {
        ...state,
        deliveryDetails: {
          ...state.deliveryDetails,
          delivery_locations: action.delivery_locations,
        },
      };
    case ActionTypes.SET_OUTLET_LISTING:
      return {
        ...state,
        outletListing: {
          ...state.outletListing,
          outlets: [...action.data],
        },
      };
    case ActionTypes.SET_SEARCH_OUTLET_LISTING:
      return {
        ...state,
        outletListing: {
          ...state.outletListing,
          searchOutlets: [
            action.extraData
              ? [state.outletListing.searchOutlets, ...action.data.outlets]
              : action.data.outlets,
          ],
        },
      };
    case ActionTypes.PUSH_NEW_LOCATION:
      return {
        ...state,
        deliveryDetails: {
          ...state.deliveryDetails,
          delivery_locations: [
            ...state.deliveryDetails.delivery_locations,
            action.location,
          ],
        },
      };
    case ActionTypes.SET_PENDING_ORDER_STATUS:
      return {
        ...state,
        pendingOrderStatus: {
          ...state.pendingOrderStatus,
          ...action.data.data,
        },
      };

    case ActionTypes.SET_DELIVERY_INFO:
      return {
        ...state,
        deliveryDetails: {
          ...state.deliveryDetails,
          deliveryInfo: action.data,
        },
      };
    case ActionTypes.SET_DELIVERED_LOCATION:
      return {
        ...state,
        deliveryDetails: {
          ...state.deliveryDetails,
          selectedDeliverToLocation: action.selectedDeliverToLocation,
        },
      };
    case ActionTypes.SET_ORDER_STATUS_DETAILS:
      return {
        ...state,
        orderStatusDetails: {
          ...state.orderStatusDetails,
          ...action.data,
        },
      };
    case ActionTypes.SET_ORDER_STATUSES:
      return {
        ...state,
        orderStatuses: {
          ...state.orderStatuses,
          ...action.data,
        },
      };
    case ActionTypes.SET_CASHLESS_ORDER_HISTORY:
      return {
        ...state,
        cashlessOrderHistory: {
          ...state.cashlessOrderHistory,
          ...action.data,
        },
      };

    case ActionTypes.RESET_DATA_AFTER_SUCCESS_ORDER:
      return {
        ...state,
        lastOrder: state.deliveryOutletDetail,
        // deliveryOutletDetail:INITIAL_STATE.deliveryOutletDetail
      };

    case ActionTypes.SET_DELIVERY_ORDER_DETAILS:
      return {
        ...state,
        deliveryOutletDetail: state.lastOrder,
        lastOrder: {},
      };

    case ActionTypes.SET_EDIT_ORDER_DETAILS:
      return {
        ...state,
        editOrderDetails: action.data,
      };
    case ActionTypes.SET_CANCEL_ORDER:
      return {
        ...state,
        cancelOrderResponse: action.data,
      };
    case ActionTypes.CLEAR_CANCEL_ORDER_DATA:
      return {
        ...state,
        cancelOrderResponse: {},
      };

    case ActionTypes.SET_REORDER_VALIDATION_REQUEST:
      return {
        ...state,
        reOrderValidationResponse: action.data,
      };

    case ActionTypes.SET_REORDER_BASKET:
      const { addedProducts, outlet } = action.data;
      const products = [
        ...state.deliveryOutletDetail.basket.products,
        ...addedProducts,
      ];

      const { count, price } = getData(addedProducts);
      return {
        ...state,
        deliveryOutletDetail: {
          ...state.deliveryOutletDetail,
          basket: {
            ...state.deliveryOutletDetail.basket,
            products: products,
            totalCount: count,
            totalPrice: price,
            isEmpty: false,
            outlet_id: outlet.id,
            merchant_id: outlet.merchant.id,
            outletName: outlet.name,
            merchantName: outlet.merchant_name,
          },
          selectedOutlet: {
            id: outlet.id,
          },
        },
      };

    case ActionTypes.SET_DELIVERY_HOME_LOADER:
      return {
        ...state,
        deliveryHomeLoader: action.data,
      };

    case ActionTypes.SET_DELIVERY_SEARCH_LOADER:
      return {
        ...state,
        deliverySearchLoader: action.data,
      };

    default:
      return state;
  }
};

export default deliveryDetailReducer;
