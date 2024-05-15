/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import Model from '@tripian/model';
import { getOrderImage } from '../helper';

interface IGMarkerOffer {
  coordinate: Model.Coordinate;
  callbackMarkerClicked: () => void;
  title: string;
  offerCount: number;
  animation?: 1 | 2;
}

const GMarkerOffer: React.FC<IGMarkerOffer> = ({ coordinate, callbackMarkerClicked, title, offerCount, animation }) => {
  const markerIcon = useMemo(
    () => ({
      url: getOrderImage(offerCount),
      scaledSize: new google.maps.Size(24, 24),
      anchor: new google.maps.Point(20, 52),
    }),
    [offerCount],
  );

  if (offerCount === 0) return null;

  return (
    <Marker
      position={coordinate}
      icon={markerIcon}
      onClick={callbackMarkerClicked}
      /* label={{ text: (step.order + 1).toString(), fontSize: '13px', color: 'white' }} */
      animation={animation}
      title={title}
    />
  );
};

export default GMarkerOffer;
