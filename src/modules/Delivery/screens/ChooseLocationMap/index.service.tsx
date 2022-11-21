import {
  deletLocationRequest,
  locationObj,
  ScreenTypes,
} from "../../interfaces";
import { useEffect, useRef, useState } from "react";
import i18n from "@localization";
import Geocoder from "react-native-geocoding";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/root-reducer";
import {
  deliveryDetailsRequest,
  deleteLocationRequest,
  setDeliveredLocation,
} from "@delivery/redux/actions";
import JniKeys from "@HybridComponents/JniKeys";
import useGeoLocationFetch from "@fast_track/src/commons/hooks/useGeoLocationFetch";

const ChooseLocationMap = ({
  children,
  navigation,
  route,
}: ScreenTypes.screen) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [currentOpenSwipe, setCurrentOpenSwipe] = useState(-1); // current open swipeout row index

  const swipeout = useRef([]);

  const dispatch = useDispatch(); // dispatch action to reducer

  //selectors
  const deliveryDetails = useAppSelector(
    (state) => state.deliveryDetailReducer?.deliveryDetails
  );
  const currentLocation = useAppSelector(
    (state) => state?.locationReducer?.currentLocation
  );

  // saga calls
  const getDeliveryDetails = () => dispatch(deliveryDetailsRequest());
  const deleteLocation = (data: deletLocationRequest) =>
    dispatch(deleteLocationRequest(data));

  // action
  const updateDeliveredLocation = (deliveredLocation: locationObj) =>
    dispatch(setDeliveredLocation(deliveredLocation));

  /**
   * cDM
   * do saga call to get Delivery details from server
   * then set them to deliveryDetailReducer for usage
   */
  useEffect(() => {
    getDeliveryDetails();
    initGeocoder();
  }, []);

  const initGeocoder = async () => {
    const mapKey = await JniKeys.getKey("GOOGLE_MAP_API_KEY");
    await Geocoder.init(mapKey, { language: "en" }); // set Google API key to get reverse geo address
  };

  /**
   * Swipe Left Buttons
   * @param item
   * @returns
   */
  const rightButtons = (index: number) => [
    {
      text: i18n.t("Edit"),
      backgroundColor: "#007aff",
      color: "white",
      underlayColor: "#007aff",
      onPress: () =>
        navigation.navigate("AddLocation", {
          ...deliveryDetails?.delivery_locations[index],
          itemIndex: index,
        }),
    },
    {
      text: i18n.t("Delete"),
      backgroundColor: "#fb3a2f",
      color: "white",
      underlayColor: "#fb3a2f",
      onPress: () => setModalVisibility(true),
    },
  ];

  const removeLocation = () => {
    deleteLocation({
      delivery_location_id:
        deliveryDetails?.delivery_locations[
          currentOpenSwipe
        ].delivery_location_id?.toString(),
      itemIndex: currentOpenSwipe,
    });
    setModalVisibility(false);
  };

  /**
   * set Delivered Location & go back to prev screen
   * @param item
   */
  const selectLocation = (item: any) => {
    updateDeliveredLocation(item);
    navigation.goBack();
  };

  /**
   * call when successfully swipe a row
   * close previously opened row if opended
   * @param index
   */
  const onSwipeOpen = (index: number) => {
    swipeout.current[currentOpenSwipe]?._close();
    setCurrentOpenSwipe(index);
  };

  /**
   * Get user location and reverse geo address
   then move to Address Deatils screen
   */
  const gotoAddLocationScreen = useGeoLocationFetch(
    async (location, isPermissionBlocked) => {
      let loc = currentLocation || location;
      if (loc?.coords?.latitude && loc?.coords?.longitude) {
        let region = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        let address = await Geocoder.from({
          latitude: region.latitude,
          longitude: region.longitude,
        });
        if (address?.results[0]?.formatted_address) {
          navigation.navigate("AddressDetails", {
            area_city: address?.results[0]?.formatted_address,
            ...region,
          });
        }
      } else if (isPermissionBlocked) {
        // goToSettingAlert();
        console.log("Permission to access location was denied");
      }
    }
  );

  return children({
    isModalVisible,
    currentOpenSwipe,
    swipeout,
    deliveryDetails,
    navigation,
    // methods
    gotoAddLocationScreen,
    onSwipeOpen,
    selectLocation,
    removeLocation,
    rightButtons,
    setModalVisibility,
  } as ScreenTypes.chooseLocationMap);
};

export default ChooseLocationMap;
