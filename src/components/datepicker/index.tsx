import React, { useState } from "react";
import { View, Platform, Text, TouchableOpacity } from "react-native";
import BottomSheet from "./bottomSheet";
import moment from "moment";
import i18n from "@localization";
import DateTimePicker from "@HybridComponents/DatePicker/DateTimePicker";

const DatePicker = ({
  mode,
  minDate,
  maxDate,
  minuteInterval,
  timeZoneOffsetInMinutes,
  display,
  is24Hour,
  handleDateChanged,
  date,
  cancelBtnText,
  handleCancelBtnPress,
  confirmBtnText,
  handleConfirmButtonPress,
  iosBottomSheetCustomHeader,
  iosBottomSheetContainerStyles,
  iosBottomSheetHeaderStyles,
  iosBottomSheetContentStyles,
  forwardRef,
  iosBottomSheetInitialPosition,
  iosBottomSheetSnapPoints,
  iosBottomSheetBackdrop,
  iosBottomSheetBackDropDismissByPress,
  //android
  androidMode,
  getFlipForRTLStyle,
}) => {
  const [value, setValue] = useState(date);

  const getDate = (date = date) => {
    if (!date) {
      let now = new Date();
      if (minDate) {
        let _minDate = getDate(minDate);
        if (now < _minDate) {
          return _minDate;
        }
      }
      if (maxDate) {
        let _maxDate = getDate(maxDate);
        if (now > _maxDate) {
          return _maxDate;
        }
      }
      return now;
    }
    if (date instanceof Date) {
      return date;
    }
    return moment(date, format).toDate();
  };

  const handleDateChange = (event: any, value: any) => {
    setValue(value);
  };

  let maxDateObj = maxDate && getDate(maxDate);
  let minDateObj = minDate && getDate(minDate);

  if (Platform.OS != "android") {
    return (
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={forwardRef}
        initialPosition={iosBottomSheetInitialPosition}
        snapPoints={iosBottomSheetSnapPoints}
        isBackDrop={iosBottomSheetBackdrop}
        isBackDropDismissByPress={iosBottomSheetBackDropDismissByPress}
        isRoundBorderWithTipHeader={false}
        containerStyle={{
          backgroundColor: "#fff",
          ...iosBottomSheetContainerStyles,
        }}
        headerStyle={{ ...iosBottomSheetHeaderStyles }}
        bodyStyle={{
          flex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          ...iosBottomSheetContentStyles,
        }}
        header={
          iosBottomSheetCustomHeader ? (
            iosBottomSheetCustomHeader
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={handleCancelBtnPress}>
                <Text> {cancelBtnText ? cancelBtnText : i18n.t("Cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleConfirmButtonPress(value)}>
                <Text> {confirmBtnText ? confirmBtnText : i18n.t("Done")}</Text>
              </TouchableOpacity>
            </View>
          )
        }
        body={
          <DateTimePicker
            value={value}
            is24Hour={is24Hour === undefined ? false : is24Hour}
            display={"spinner"}
            onChange={handleDateChange}
            mode={mode ? mode : "datetime"}
            textColor={"black"}
            minimumDate={minDateObj}
            maximumDate={maxDateObj}
            minuteInterval={minuteInterval ? minuteInterval : null}
            timeZoneOffsetInMinutes={
              timeZoneOffsetInMinutes ? timeZoneOffsetInMinutes : null
            }
          />
        }
      />
    );
  }
  return (
    <View>
      <DateTimePicker
        value={date}
        is24Hour={is24Hour === undefined ? false : is24Hour}
        display={display ? display : "default"}
        onChange={handleDateChanged}
        mode={mode ? mode : "datetime"}
        textColor={"black"}
        minimumDate={minDateObj}
        maximumDate={maxDateObj}
        minuteInterval={minuteInterval ? minuteInterval : null}
        timeZoneOffsetInMinutes={
          timeZoneOffsetInMinutes ? timeZoneOffsetInMinutes : null
        }
      />
    </View>
  );
};

export default DatePicker;
