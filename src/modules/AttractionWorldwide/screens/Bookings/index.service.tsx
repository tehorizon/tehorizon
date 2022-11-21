import { ScreenTypes } from "../../interfaces";
import { City } from "../../interfaces/screens";
import { getBookings, selectLocation } from "../../redux/actions";
import { useRoute } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAppSelector } from "@redux/root-reducer";

/* component containing the business logic separated from view for
 api call trigger */
const BookingsServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  const route = useRoute();

  //actions
  const dispatch = useDispatch();
  const onGetBookings = (data: any) => dispatch(getBookings(data));

  //redux states
  const bookings = useAppSelector(
    (state) => state?.attractionsReducer?.bookings || {}
  );

  // cDM, get Attractions Details
  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    onGetBookings({
      postData: {},
    });
  };

  return children({
    navigation,
    bookings,
    onRefresh,
  });
};

export default BookingsServiceComponent;
