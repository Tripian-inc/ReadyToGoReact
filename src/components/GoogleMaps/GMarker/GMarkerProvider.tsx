/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import { Providers } from '@tripian/model';
import GMarkerProviderBase from './Base/GMarkerProviderBase/GMarkerProviderBase';

interface IGMarkerProvider {
  providersPoi: Providers.Bb.SearchAccommodationHotelOffer;
  animation?: 1 | 2;
  clusterer?: Clusterer;
  markerPoiClicked: (poi: Providers.Bb.SearchAccommodationHotelOffer) => void;
}

const GMarkerProvider: React.FC<IGMarkerProvider> = ({ providersPoi, animation, clusterer, markerPoiClicked }) => (
  <GMarkerProviderBase coordinate={{ lat: Number(providersPoi.info.latitude), lng: Number(providersPoi.info.longitude) }} animation={animation} clusterer={clusterer} markerPoiClicked={() => markerPoiClicked(providersPoi)} color="black" />
);

export default GMarkerProvider;
