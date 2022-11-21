import { ScreenTypes } from "../../interfaces";
import React from "react";
import { ScrollView } from "react-native";
import i18n, { getFlipForRTLStyle } from "@localization";

//Components
import {
  DeliveryDetailCard,
  OrderStatusCard,
  OrderDetailList,
  TotalCard,
  Button,
  CancelModal,
  CancelSuccessModal,
} from "@delivery/components";
import { HeaderWithBackButton } from "@components";

import styles from "./styles";

const OrderStatus = ({
  orderRef,
  showEditableButton,
  showCancelModal,
  showCancelSuccessModal,
  isLoadingData,
  selectedOrderStatusDetails,
  selectedOrderStatuses,
  navigation,
  //methods
  setShowCancelModal,
  cancelOrder,
  onEditOrderPress,
  onHide,
  onCancel,
}: ScreenTypes.orderStatus) => {
  return (
    <>
      {/*<Loader isVisible={isLoadingData} />*/}

      {/*Header*/}
      <HeaderWithBackButton
        customStyle={getFlipForRTLStyle()}
        title={i18n.t("Order_Status")}
      />

      {selectedOrderStatusDetails && (
        <ScrollView style={styles.mainView}>
          <DeliveryDetailCard
            style={styles.deliveryDetailsCard}
            customerDetails={selectedOrderStatusDetails?.data?.customer_details}
          />
          {selectedOrderStatuses && (
            <OrderStatusCard
              style={styles.mb14}
              orderStatusData={selectedOrderStatuses.data}
            />
          )}
          <OrderDetailList
            style={styles.mb14}
            orderDetail={selectedOrderStatusDetails?.data?.order}
          />
          <TotalCard
            style={styles.mb20}
            orderDetail={selectedOrderStatusDetails?.data}
          />
          {showEditableButton && (
            <Button
              style={styles.mb10}
              title={i18n.t("Edit_Order")}
              onPress={onEditOrderPress}
            />
          )}

          {selectedOrderStatusDetails?.data.is_show_cancel_button && (
            <Button
              style={styles.cancelButton}
              title={i18n.t("Cancel_Order")}
              onPress={() => {
                setShowCancelModal(true);
              }}
            />
          )}

          {showCancelModal && (
            <CancelModal
              hide={() => {
                setShowCancelModal(false);
              }}
              onCancel={onCancel}
            />
          )}

          {showCancelSuccessModal && <CancelSuccessModal hide={onHide} />}
        </ScrollView>
      )}
    </>
  );
};

export default OrderStatus;
