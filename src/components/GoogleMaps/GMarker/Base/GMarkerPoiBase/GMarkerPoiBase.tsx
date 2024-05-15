/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import Model from '@tripian/model';
import { iconUrl } from '../helper';

interface IGMarkerPoiBase {
  poi: Model.Poi;
  markerPoiClicked: (poi: Model.Poi) => void;
  animation?: 1 | 2;
  color?: string;
  clusterer?: Clusterer;
}

const GMarkerPoiBase: React.FC<IGMarkerPoiBase> = ({ poi, markerPoiClicked, animation, color, clusterer }) => {
  const markerIcon = useMemo(
    () => ({
      url: iconUrl(poi.icon, color, poi.offers.length > 0),
      scaledSize: new google.maps.Size(28, 28),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(14, 14),
    }),
    [color, poi.icon, poi.offers.length],
  );

  const callbackMarkerClicked = useCallback(() => {
    markerPoiClicked(poi);
  }, [markerPoiClicked, poi]);

  return (
    <>
      <Marker position={poi.coordinate} icon={markerIcon} onClick={callbackMarkerClicked} animation={animation} title={poi.name} clusterer={clusterer} />;
      {/* {poi.offers.length > 0 && <GMarkerOffer coordinate={poi.coordinate} callbackMarkerClicked={callbackMarkerClicked} title={poi.name} offerCount={poi.offers.length} animation={animation} />} */}
    </>
  );
};

export default GMarkerPoiBase;
