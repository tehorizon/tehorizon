import { useAppSelector } from "@redux/root-reducer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ScreenTypes } from "../../interfaces";
import { getAttractions } from "../../redux/actions";
import { SearchBarRef } from "@components/SeachBar";

/* component containing the business logic separated from view for
 api call trigger */
const AttractionsServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  //references
  const searchBar = useRef<SearchBarRef>(null);

  // states
  let attractions = useAppSelector(
    (state) => state?.attractionsReducer?.attractions || []
  );
  const currency = useAppSelector(
    (state) => state.userReducer?.userInfo?.currency || "AED"
  );
  const selectedLocation = useAppSelector(
    (state) => state.attractionsReducer?.selectedLocation
  );

  // actions/calls
  const dispatch = useDispatch();
  const getAttractionsCall = (data) => dispatch(getAttractions(data));

  const pickLocation = () => navigation.navigate("AllLocation");
  // cDM, get Attractions
  useEffect(() => {
    getAttractionsCall({});
  }, []);
  return children({
    navigation,
    attractions,
    currency,
    searchBar,
    selectedLocation,
    pickLocation,
  } as ScreenTypes.attractions);
};

export default AttractionsServiceComponent;
