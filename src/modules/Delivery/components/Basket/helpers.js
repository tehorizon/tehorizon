function getFinalOutletBasketData(data) {
  console.log(data, "randomCheck");
  const outletInfo = {
    outletID: data.outlet_id,
    outlet_name: data.name,
    outlet_phonenumber: data.telephone,
    outlet_sf_id: data.outletSfId,
    merchantID: data.merchantID,
    merchant_sf_id: data.sfId,
    deliveryCharges: data.deliveryCharges,
    total_items: data.basketInfo.count,
    subtotalPrice: data.basketInfo.totalPrice,
    totalPrice: data.basketInfo.totalPrice,
    discount_on_whole_basket: false,
    discountPrice: 0,
    appliedVouchers: [],
    currency: data.outletCurrency,
    specialInstruction: "",
  };

  return outletInfo;
}

function getFinalUserBasketData(user, selectedLocation, locations) {
  console.log({ locations });
  const userInfo = {
    userId: String(user.userId),
    name: `${user.firstname} ${user.lastname}`,
    phoneNumber: user.mobile_phone,
    selectedLocationObject: {
      street: selectedLocation?.street,
      latitude: selectedLocation?.latitude,
      longitude: selectedLocation?.longitude,
      is_current_location: true,
      getCompleteAddress:
        selectedLocation?.home_office_address +
        " " +
        selectedLocation?.street +
        " " +
        selectedLocation?.area_city,
      home_office_address: selectedLocation?.home_office_address,
      area_city: selectedLocation?.area_city,
      deliveryAddressName: selectedLocation?.title,
      special_instructions: selectedLocation?.special_instructions,
      title: selectedLocation?.title,
    },
    selectedLocations: locations.map((location) => ({
      street: location.street,
      latitude: location.latitue,
      longitude: location.longitude,
      is_current_location: false,
      getCompleteAddress:
        location.homeOfficeAddress +
        " " +
        location.street +
        " " +
        location.areaCity,
      home_office_address: location.homeOfficeAddress,
      area_city: location.areaCity,
      deliveryAddressName: location.title,
      special_instructions: location.special_instructions,
      title: location.title,
    })),
  };

  return userInfo;
}

export { getFinalOutletBasketData, getFinalUserBasketData };
