/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import { Providers } from '@tripian/model';
import GMarkerProviderTourBase from './Base/GMarkerProviderTourBase/GMarkerProviderTourBase';

interface IGMarkerProviderTour {
  providerTour: Providers.Rezdy.Product;
  animation?: 1 | 2;
  clusterer?: Clusterer;
  markerProviderTourClicked: (tour: Providers.Rezdy.Product) => void;
}

const GMarkerProviderTour: React.FC<IGMarkerProviderTour> = ({ providerTour, animation, clusterer, markerProviderTourClicked }) => (
  <GMarkerProviderTourBase coordinate={{ lat: Number(providerTour.latitude), lng: Number(providerTour.longitude) }} animation={animation} clusterer={clusterer} markerTourClicked={() => markerProviderTourClicked(providerTour)} color="black" />
);

export default GMarkerProviderTour;
