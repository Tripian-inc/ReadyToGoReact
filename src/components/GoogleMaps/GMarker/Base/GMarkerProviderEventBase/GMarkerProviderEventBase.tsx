/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import Model, { helper } from '@tripian/model';

interface IGMarkerProviderEventBase {
  coordinate: Model.Coordinate;
  animation?: 1 | 2;
  clusterer?: Clusterer;
  category: string;
  markerEventClicked: () => void;
}

const GMarkerProviderEventBase: React.FC<IGMarkerProviderEventBase> = ({ coordinate, animation, clusterer, category, markerEventClicked }) => {
  const markerIcon = useMemo(
    () => ({
      url: (helper.eventCategoryIcons as Record<string, string>)[category] || (helper.eventCategoryIcons as Record<string, string>).default,
      scaledSize: new window.google.maps.Size(35, 46),
    }),
    [category],
  );

  return (
    <Marker
      position={coordinate}
      icon={markerIcon}
      onClick={() => {
        markerEventClicked();
      }}
      animation={animation}
      clusterer={clusterer}
    />
  );
};

export default GMarkerProviderEventBase;
