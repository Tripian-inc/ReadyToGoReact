/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import Model from '@tripian/model';
import { iconUrl } from '../helper';

interface IGMarkerCarRentOfferBase {
  coordinate: Model.Coordinate;
  animation?: 1 | 2;
  clusterer?: Clusterer;
  color?: string;
  markerCarRentOfferClicked: () => void;
}

const GMarkerCarRentOfferBase: React.FC<IGMarkerCarRentOfferBase> = ({ coordinate, animation, clusterer, color, markerCarRentOfferClicked }) => {
  const markerIcon = useMemo(
    () => ({
      url: iconUrl('kcar', color),
      scaledSize: new google.maps.Size(28, 40),
    }),
    [color],
  );

  return (
    <Marker
      position={coordinate}
      icon={markerIcon}
      onClick={() => {
        markerCarRentOfferClicked();
      }}
      animation={animation}
      clusterer={clusterer}
    />
  );
};

export default GMarkerCarRentOfferBase;
