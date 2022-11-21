import deliveryLocation from "./DeliveryLocation/deliveryLocationBL";
import addNewLocation from "./DeliveryLocation/addNewLocationBL";
import updateLocation from "./DeliveryLocation/updateLocationBL";
import deleteLocation from "./DeliveryLocation/deleteLocationBL";
import getDeliveryOutlets from "./devliveryOutletBL";
import getDeliveryOutletDetail from "./devliveryDetailBL";
import cashlessPendingOrderStatus from "./cashlessPendingOrderStatus";
import orderStatusDetails from "./orderStatusDetails";
import orderStatuses from "./orderStatuses";
import cashlessOrderHistory from "./cashlessOrderHistory";
import cancelOrderBL from "./cancelOrderBL";
import editOrderDetails from "./editOrderDetail";
import reOrderValidation from "./reOrderValidation";

const Delivery = {
  deliveryLocation,
  getDeliveryOutletDetail,
  addNewLocation,
  getDeliveryOutlets,
  updateLocation,
  deleteLocation,
  cashlessPendingOrderStatus,
  orderStatusDetails,
  orderStatuses,
  cashlessOrderHistory,
  cancelOrderBL,
  editOrderDetails,
  reOrderValidation,
};

export default Delivery;
