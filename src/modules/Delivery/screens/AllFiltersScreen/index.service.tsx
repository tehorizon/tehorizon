import { ScreenTypes } from "../../interfaces";
import React from 'react';
import { View, Text } from 'react-native';

const AllFiltersService = ({ children,navigation, route }:ScreenTypes.screen) => {
  
  return children({
    navigation
  }as ScreenTypes.allFilters);
};
export default AllFiltersService;
