import React from "react";
import moment from "moment";
import DateTimePicker from "../datepicker";
import { padding } from "@utils/genericStyles";

const SelectDateTime = ({
  isVisible,
  handleCancel,
  date,
  handleDone,
  handleDateChange,
  maxDate,
}) => {
  return isVisible ? (
    <DateTimePicker
      date={date}
      handleDateChanged={handleDateChange}
      handleCancelBtnPress={handleCancel}
      handleConfirmButtonPress={handleDone}
      maxDate={maxDate || moment().toDate()}
      minDate={new Date(1950, 0, 1)}
      is24Hour={false}
      mode="date"
      iosBottomSheetHeaderStyles={{ ...padding(8) }}
      iosBottomSheetContentStyles={{ paddingTop: 16 }}
      iosBottomSheetInitialPosition={"40%"}
      iosBottomSheetSnapPoints={["40%"]}
      iosBottomSheetBackdrop={true}
      iosBottomSheetBackDropDismissByPress={false}
    />
  ) : null;
};

export default SelectDateTime;
