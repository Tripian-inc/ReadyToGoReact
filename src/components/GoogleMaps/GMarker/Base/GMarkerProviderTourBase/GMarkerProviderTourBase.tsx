/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import Model from '@tripian/model';
import { iconUrl } from '../helper';

interface IGMarkerProviderTourBase {
  coordinate: Model.Coordinate;
  animation?: 1 | 2;
  clusterer?: Clusterer;
  color?: string;
  markerTourClicked: () => void;
}

const GMarkerProviderTourBase: React.FC<IGMarkerProviderTourBase> = ({ coordinate, animation, clusterer, color, markerTourClicked }) => {
  const markerIcon = useMemo(
    () => ({
      url: iconUrl('Camel', color),
      scaledSize: new google.maps.Size(28, 40),
    }),
    [color],
  );

  return (
    <Marker
      position={coordinate}
      icon={markerIcon}
      onClick={() => {
        markerTourClicked();
      }}
      animation={animation}
      clusterer={clusterer}
    />
  );
};

export default GMarkerProviderTourBase;
