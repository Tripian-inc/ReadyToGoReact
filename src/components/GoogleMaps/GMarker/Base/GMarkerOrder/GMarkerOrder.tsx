/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import Model from '@tripian/model';
import { createSvgIcon } from '../helper';

interface IGMarkerOrderBase {
  coordinate: Model.Coordinate;
  callbackMarkerClicked: () => void;
  title: string;
  order: number;
  animation?: 1 | 2;
}

const GMarkerOrderBase: React.FC<IGMarkerOrderBase> = ({ coordinate, callbackMarkerClicked, title, order, animation }) => {
  // const markerIcon = useMemo(
  //   () => ({
  //     url: getOrderImage(order),
  //     scaledSize: new google.maps.Size(18, 18),
  //     anchor: new google.maps.Point(-2, 28),
  //   }),
  //   [order],
  // );

  const svgIcon = useMemo(() => createSvgIcon(order), [order]);

  const orderImageSvg = useMemo(() => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`, [svgIcon]);

  const markerIcon = useMemo(
    () => ({
      url: orderImageSvg,
      scaledSize: new google.maps.Size(25, 25),
      anchor: new google.maps.Point(0, 28),
    }),
    [orderImageSvg],
  );

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

export default GMarkerOrderBase;
