import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { RequestTypes, ScreenTypes } from "../../interfaces";
import { useDispatch } from "react-redux";
import { MAP_REF } from "@Outlet/components/map";
import { useAppSelector } from "@redux/root-reducer";
import { getCountryListRequest } from "../../redux/actions";
import CategoryData from "@Home/defaults/CategoryData";
import { setAppLoading, setSkipMode } from "@redux/appReducer/app.actions";

const TravelLocationsService = ({
  children,
  navigation,
  route,
}: ScreenTypes.OutletTabProps) => {
  // states

  //refrences
  const mapRef = useRef<MAP_REF>(null);
  const skipMode = useAppSelector((state) => state.appReducer?.skipMode);

  const dispatch = useDispatch(); // dispatch action to reducer
  //actions
  const onGetCountryListRequest = (data: any) =>
    dispatch(getCountryListRequest(data));
  const onSetAppLoading = (loading: Boolean) =>
    dispatch(setAppLoading(loading));
  const onSetSkipMode = (value: Boolean) => dispatch(setSkipMode(value));

  //reducers
  const countries = useAppSelector((state) => state?.travelReducer?.countries);

  // sagas

  useEffect(() => {
    if (skipMode) {
      onSetAppLoading(true);
      setTimeout(() => {
        onSetSkipMode(false);
        onSetAppLoading(false);
      }, 500);
    }
    onGetCountryListRequest({
      navigation,
      postData: {
        cashless_delivery: 1,
        show_monthly_product: 1,
        user_include_cheers: 0,
        wlcompany: "HCS",
        is_last_mile_enabled: 1,
        is_new_order_status_flow: 1,
        delivery_lat: "25.342237",
        delivery_lng: "51.470325",
        istravel: "true",
      },
    });
  }, []);

  const onClickLocationHandler = (data: any) => {
    const category = CategoryData["Travel"];
    navigation?.navigate("Outlet", {
      screen: "OutletScreen",
      params: { category: category, travelLocation: data },
    });
  };

  return children({
    // props
    countries,
    navigation,
    onClickLocationHandler,
  } as ScreenTypes.OutletTab);
};

export default TravelLocationsService;
