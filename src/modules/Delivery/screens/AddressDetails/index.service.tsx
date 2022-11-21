import { ScreenTypes } from "../../interfaces";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addOrUpdateLocationRequest } from "@delivery/redux/actions";
import { useAppSelector } from "@redux/root-reducer";
import { TAG } from "../../interfaces/screens";

const AddressDetails = ({
  children,
  navigation,
  route,
}: ScreenTypes.screen) => {
  let {
    area_city = "",
    latitude = 0,
    longitude = 0,
    tag = {},
    special_instructions = "",
    home_office_address = "",
    itemIndex = -1,
    delivery_location_id = null,
  } = route?.params || {};

  //states
  const [address, updateAddress] = useState("");
  const [specialInstructions, updateSI] = useState("");
  const [saveLocation, toggleSaveLocation] = useState(false);
  const [selectedTag, updateTag] = useState<TAG | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  //selectors
  const deliveryDetails = useAppSelector(
    (state) => state?.deliveryDetailReducer?.deliveryDetails
  );

  const dispatch = useDispatch(); // dispatch action to reducer

  /**
   * Saga call to
   * pushNewLocation add new location to server if saveLocation true
   * otherwise add new location locally
   */
  const pushNewLocation = () =>
    dispatch(
      addOrUpdateLocationRequest({
        postData: {
          special_instructions: specialInstructions,
          title: selectedTag?.tag_name || "",
          home_office_address: address,
          tag_id: selectedTag?.tag_id?.toString() || "",
          area_city,
          latitude: latitude?.toString(),
          longitude: longitude?.toString(),
          delivery_location_id: delivery_location_id?.toString(),
          street: "",
        },
        navigation,
        itemIndex,
        saveLocation,
      })
    );

  /**
   * cDM
   * update address & special instruction if has any
   * update selected location on basic of selected tag
   * update tagName only if not Home & Work
   */
  useEffect(() => {
    updateSI(special_instructions);
    updateAddress(home_office_address);
    if (tag?.tag_id) {
      updateTag({ ...tag });
      toggleSaveLocation(true);
    }
  }, []);

  /**
   * select suggested location's tag id
   * if selected `Other` then also popup to enter new custom Location
   * @param item
   */
  const updateTagID = useCallback(
    (item: any) => {
      if (item?.tag_label == "Custom") {
        if (selectedTag?.tag_label == "Custom") {
          updateTag({ ...item, tag_name: selectedTag?.tag_name });
          setModalVisible(true);
          return;
        }
        setModalVisible(true);
      }
      updateTag(item);
    },
    [selectedTag?.tag_name]
  );

  const hideModalVisible = useCallback(
    (tag_name = "") => {
      setModalVisible(false);
      if (selectedTag?.tag_name && tag_name?.length > 0) {
        updateTag({ ...selectedTag, tag_name }); // update current tage with new location
      } else {
        if (selectedTag?.tag_name != "Other") {
          console.log("here1", selectedTag?.tag_name, tag_name);
          return;
        }
        updateTag(null); // unselect tag as no location name provided
      }
    },
    [selectedTag?.tag_name]
  );

  return children({
    address,
    specialInstructions,
    saveLocation,
    selectedTag,
    area_city,
    isModalVisible,
    deliveryDetails,
    navigation,
    // methods
    hideModalVisible,
    updateAddress,
    updateSI,
    toggleSaveLocation,
    updateTagID,
    pushNewLocation,
  } as ScreenTypes.locationDetails);
};

export default AddressDetails;
