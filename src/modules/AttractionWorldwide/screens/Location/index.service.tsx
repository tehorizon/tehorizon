import React, { useCallback, useRef } from "react";
import { ScreenTypes } from "../../interfaces";
import { locationRequest, selectLocation } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Route } from "react-native-tab-view";
import { useDispatch } from "react-redux";
import TopDestinations from "./TopDestinations";
import AllLocations from "./AllLocations";
import { debounce } from "lodash";
import { useRoute } from "@react-navigation/core";
import { useAppSelector } from "@redux/root-reducer";
import { SearchBarRef } from "@components/SeachBar";
/* component containing the business logic separated from view for
 api call trigger */
const LocationServiceComponent = ({
  children,
  navigation,
}: ScreenTypes.screen) => {
  const [searchModal, toggleSearchModal] = useState(false);
  const [cities, updateCities] = useState([]);
  const [index, changeIndex] = useState(0);

  const route = useRoute();

  let { type } = route?.params || {};

  const topDestinations = useAppSelector(
    (state) => state.attractionsReducer?.top_destinations || []
  );
  const allDestinations: Array<{
    title: string;
    data: Array<ScreenTypes.Destination>;
  }> = useAppSelector(
    (state) => state.attractionsReducer?.all_destinations || []
  );

  // refrences
  const searchBar = useRef<SearchBarRef>(null);

  /**
   * routes configurations
   */
  const routes = [
    // { key: "top-destinations", title: "Popular cities" },
    { key: "all-locations", title: "All locations" },
  ];

  /**
   * render tabs
   * @param param0
   * @returns
   */
  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case "top-destinations":
        return (
          <TopDestinations
            topDestinations={topDestinations}
            updateLocation={updateLocation}
          />
        );
      case "all-locations":
        return <AllLocations allDestinations={allDestinations} />;
      default:
        return null;
    }
  };

  const dispatch = useDispatch(); // dispatch action to reducer

  const selectALocation = (city: ScreenTypes.City) =>
    dispatch(selectLocation(city));

  // saga call
  const locationCall = () => dispatch(locationRequest());

  /**
   * select location and go back if available
   * @param index
   */
  const updateLocation = (city: ScreenTypes.City) => {
    selectALocation(city);
    navigation.canGoBack() && navigation.goBack();
  };

  /**
   * cDM
   * do saga call to get Location list from server
   */
  useEffect(() => {
    locationCall();
  }, []);

  /**
   * if route has key, toggle to required Tab
   */
  useEffect(() => {
    setTimeout(() => {
      if (type == "popular_cities") {
        changeIndex(0);
      } else if (type == "all_cities") {
        changeIndex(1);
      }
    }, 1000);
  }, [type]);

  /**
   * filter cities from list using filter query
   * @param query => string
   */
  const filterCities = useCallback(
    debounce((query: string) => {
      query = query.toUpperCase();
      let citiesList: Array<ScreenTypes.City> = [];
      if (query !== "") {
        for (let i = 0; i < allDestinations.length; i++) {
          for (let j = 0; j < allDestinations[i].data.length; j++) {
            let cities = allDestinations[i].data[j].cities.filter(
              (city) =>
                city.name.includes(query) || city.country.includes(query)
            );
            citiesList = [...citiesList, ...cities];
          }
        }
      }
      updateCities(citiesList);
    }, 300),
    [allDestinations]
  );

  return children({
    navigation,
    changeIndex,
    index,
    routes,
    renderScene,
    toggleSearchModal,
    searchModal,
    cities,
    filterCities,
    updateLocation,
    searchBar,
  });
};

export default LocationServiceComponent;
