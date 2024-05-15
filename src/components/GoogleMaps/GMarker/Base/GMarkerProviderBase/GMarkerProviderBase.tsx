/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import Model from '@tripian/model';
import { iconUrl } from '../helper';

interface IGMarkerProviderBase {
  coordinate: Model.Coordinate;
  animation?: 1 | 2;
  clusterer?: Clusterer;
  color?: string;
  markerPoiClicked: () => void;
}

const GMarkerProviderBase: React.FC<IGMarkerProviderBase> = ({ coordinate, animation, clusterer, color, markerPoiClicked }) => {
  const markerIcon = useMemo(
    () => ({
      url: iconUrl('yHomebase', color),
      scaledSize: new google.maps.Size(28, 40),
    }),
    [color],
  );

  // eslint-disable-next-line @typescript-eslint/no-redeclare
  /* const markerClicked = () => {
    setShowInfo((prev) => !prev);
  }; */

  return (
    <Marker
      position={coordinate}
      icon={markerIcon}
      onClick={() => {
        // markerClicked();
        markerPoiClicked();
      }}
      animation={animation}
      clusterer={clusterer}
    >
      {/* {showInfo && <InfoWindow onCloseClick={() => {}}>{content}</InfoWindow>} */}
    </Marker>
  );
};

export default GMarkerProviderBase;
