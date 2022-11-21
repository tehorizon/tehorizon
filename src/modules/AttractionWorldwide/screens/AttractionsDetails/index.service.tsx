import { useAppSelector } from "@redux/root-reducer";
import { useRoute } from "@react-navigation/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ScreenTypes } from "../../interfaces";
import { getAttractionsDetails, selectAttraction } from "../../redux/actions";

/* component containing the business logic separated from view for
 api call trigger */
const AttractionsServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  // states
  const [packageID, updatePackageID] = useState(null);

  let attractionDetails = useAppSelector(
    (state) => state?.attractionsReducer?.selectedAttraction || {}
  );

  // refrences
  const modalRef = useRef(null);

  // actions/calls
  const dispatch = useDispatch();
  const getAttractionsDetailsCall = (data) =>
    dispatch(getAttractionsDetails(data));
  const clearDetails = () => dispatch(selectAttraction({}));
  // get params
  const route = useRoute();
  // cDM, get Attractions Details
  useEffect(() => {
    getAttractionsDetailsCall({
      postData: {
        id: route?.params?.id,
      },
    });

    // componentWIllUnmount
    // clear attraction details data so whenever screen open it will not show wrong info
    return () => {
      clearDetails();
    };
  }, []);

  const onBack = useCallback(() => navigation.goBack(), [navigation]);
  return children({
    navigation,
    attractionDetails,
    packageID,
    updatePackageID,
    onBack,
    modalRef,
  } as ScreenTypes.attractionsDetails);
};

export default AttractionsServiceComponent;
