import React from "react";
import { View } from "react-native";
import _ from "lodash";
import Cheers from "@Outlet/components/cheers";
import Map from "@Outlet/components/map";
import { CustomListing } from "@components";
import { ScreenTypes } from "../../interfaces";
import styles from "./styles";

//component containing the view of Outlet screen
const OutletView = ({
  // props
  mode,
  outletList,
  userProvidedCheersCheck,
  isUserFilledCheersCheck,
  cheersRules,
  activeTabUid,
  tab,
  favouriteList,
  //ref
  mapRef,
  // methods
  getCheersDataHelper,
  getOutletsDataHelper,
  onOutletClick,
  cheersSubmit,
}: ScreenTypes.OutletTab) => {
  return (
    <View style={styles.mainView} testID={`tab-${tab}`}>
      <View style={{ flex: 1 }}>
        {mode === "List" ? (
          <CustomListing
            OutletList={outletList}
            tab={tab}
            getOutlet={getOutletsDataHelper}
            onOutletClick={onOutletClick}
            favouriteList={favouriteList}
          />
        ) : (
          <Map
            ref={mapRef}
            tab={tab}
            markerArray={outletList}
            onOutletClick={onOutletClick}
          />
        )}
      </View>
      {mode === "List" &&
        activeTabUid === "cheers" &&
        // activeTabLocal === 1 &&
        !userProvidedCheersCheck && (
          <Cheers
            cheersChecked={isUserFilledCheersCheck}
            cheersRules={cheersRules}
            getCheersData={getCheersDataHelper}
            cheersSubmit={cheersSubmit}
          />
        )}
    </View>
  );
};

export default OutletView;
