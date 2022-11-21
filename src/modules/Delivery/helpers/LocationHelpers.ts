import * as geolib from 'geolib';

function isPointInPolygon(point, allCoordinates) {
  let latLngs = [];
  allCoordinates.forEach((element, index) => {
    latLngs.push({
      latitude: element.lat,
      longitude: element.lng,
    });
  });

  const isInPoligon = geolib.isPointInPolygon(point, allCoordinates);
  return isInPoligon;
}

function isInRadius(
  currentLat,
  locationLat,
  currentLong,
  locationLng,
  circleRadius
) {
  const distance = geolib.getDistance(
    { latitude: currentLat, longitude: currentLong },
    { latitude: locationLat, longitude: locationLng }
  );

  return circleRadius < distance;
}

function checkIsDeliveryInRegion(currentLocation, deliveryRegion, deliveryRegions, deliveryInfo) {
  let isInDeliveryRegionLocal = false;
  try {
    console.log(deliveryRegions,'hello hello')
    if (deliveryRegions != null) {
      
      for (let index = 0; index < deliveryRegions.length; index++) {
        const regionItem = deliveryRegions[index];
        if (regionItem.map_shape_info && regionItem.map_shape_info.shape_type) {
          if (regionItem.map_shape_info.shape_type === 'circle') {
            isInDeliveryRegionLocal = isInRadius(
              currentLocation.latitude,
              regionItem.map_shape_info.lat,
              currentLocation.longitude,
              regionItem.map_shape_info.lng,
              regionItem.map_shape_info.radius || 0
            );
          } else {
            isInDeliveryRegionLocal = isPointInPolygon(
              {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              },
              regionItem.coordinates
            );
          }
          deliveryInfo.localZoneId = regionItem.zone_id || 0;
          if (isInDeliveryRegionLocal) {
            deliveryInfo.deliveryRules = regionItem.delivery_rules;
            break;
          }
          
        } else {
          console.log('else');
          
        }
      }
    } else if (deliveryRegion != null) {
      isInDeliveryRegionLocal = isPointInPolygon(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        deliveryRegion
      );
    }
    
    return isInDeliveryRegionLocal;
  } catch (error) {
    console.log('error in location', error);
  }
  return isInDeliveryRegionLocal;
}
export { isPointInPolygon, isInRadius, checkIsDeliveryInRegion };
