import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import Model from '@tripian/model';
import GMarker from '../GoogleMaps/GMarker/GMarker';

import './GoogleMapsPoiInfo.scss';

interface IGoogleMapsPoiInfo {
  zoom: number;
  /* center: Model.Coordinate; */
  poi: Model.Poi;
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
  /* streetViewControlOptions: { position: 3 }, */
};

const GoogleMapsPoiInfo: React.FC<IGoogleMapsPoiInfo> = ({ zoom, /* center, */ poi }) => (
  <GoogleMap
    /* ref={googleMaps} */
    /* id="tripian-map" */
    mapContainerClassName="google-maps-poi-info-container"
    /* https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions */
    options={googleMapsOptions}
    zoom={zoom}
    center={poi.coordinate}
  >
    <GMarker poi={poi} animation={1} />
  </GoogleMap>
);

export default GoogleMapsPoiInfo;
