import { ScreenTypes } from "../../interfaces";
import { City } from "../../interfaces/screens";
import { selectLocation } from "../../redux/actions";
import { useRoute } from "@react-navigation/core";
import { useDispatch } from "react-redux";

/* component containing the business logic separated from view for
 api call trigger */
const DestinationServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  const route = useRoute();
  const dispatch = useDispatch();

  const selectALocation = (city: City) => dispatch(selectLocation(city));

  /**
   * select location and go back if available
   * @param index
   */
  const updateLocation = (city: City) => {
    selectALocation(city);
    navigation.navigate("AttractionWorldwide");
  };

  return children({
    navigation,
    cities: route?.params?.cities,
    updateLocation,
  });
};

export default DestinationServiceComponent;
