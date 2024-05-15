/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import { Providers } from '@tripian/model';
import GMarkerCarRentBase from './Base/GMarkerCarRentOfferBase/GMarkerCarRentOfferBase';

interface IGMarkerCarRentOffer {
  carRentOffer: Providers.Bb.SearchCarRentOffer;
  animation?: 1 | 2;
  clusterer?: Clusterer;
  markerCarRentOfferClicked: (carRentOffer: Providers.Bb.SearchCarRentOffer) => void;
}

const GMarkerCarRentOffer: React.FC<IGMarkerCarRentOffer> = ({ carRentOffer, animation, clusterer, markerCarRentOfferClicked }) => (
  <GMarkerCarRentBase coordinate={{ lat: Number(carRentOffer.latitude), lng: Number(carRentOffer.longitude) }} animation={animation} clusterer={clusterer} markerCarRentOfferClicked={() => markerCarRentOfferClicked(carRentOffer)} color="black" />
);

export default GMarkerCarRentOffer;
