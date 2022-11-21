import moment from "moment";

export default {
  getFormattedDate(date, format) {
    const dateObj = moment(date);
    const formattedDate = moment(dateObj).format(format);
    return formattedDate;
  },
};

const getColor = (color = "") => {
  if (color != "") {
    if (color?.includes("#") || color?.includes("rgb")) {
      return color;
    } else {
      return `#${color}`;
    }
  }
};

const getDistance = (distance) =>
  distance >= 1000 ? `${Math.round(distance / 1000)}km` : `${distance}m`;
export { getColor, getDistance };
