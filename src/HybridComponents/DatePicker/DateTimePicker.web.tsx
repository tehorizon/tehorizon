import { createElement } from "react-native-web";
import { design } from "rn_fast_track_uilib";
import { marginHorizontal, paddingHorizontal } from "@utils/genericStyles";

const MyWebDatePicker = ({ value, onChange, maxDate, minDate }) => {
  return createElement("input", {
    type: "date",
    min: minDate,
    max: maxDate,
    value: value,
    onChange: (event) => {
      onChange(event, event.target.value);
    },
    style: {
      height: 52,
      ...marginHorizontal(16),
      ...paddingHorizontal(16),
      borderRadius: design["Global_Border_Radius"],
      border: `1px solid ${design.Input_Border_Color}`,
      backgroundColor: design["Input_Background_Color"],
    },
  });
};

export default MyWebDatePicker;
