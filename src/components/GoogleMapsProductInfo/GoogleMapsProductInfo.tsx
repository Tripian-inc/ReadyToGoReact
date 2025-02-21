/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Model from '@tripian/model';
import './GoogleMapsProductInfo.scss';

interface IGoogleMapsProductInfo {
  zoom: number;
  center: Model.Coordinate;
}

const googleMapsOptions: google.maps.MapOptions = {
  mapTypeControl: false,
  zoomControl: true,
  zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_CENTER,
  },
  clickableIcons: false,
  fullscreenControl: false,
  streetViewControl: false,
};

const GoogleMapsProductInfo: React.FC<IGoogleMapsProductInfo> = ({ zoom, center }) => (
  <GoogleMap
    mapContainerClassName="google-maps-product-info-container"
    /* https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions */
    options={googleMapsOptions}
    zoom={zoom}
    center={center}
  >
    <Marker position={center} animation={1} />
  </GoogleMap>
);

export default GoogleMapsProductInfo;
