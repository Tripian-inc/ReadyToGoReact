/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import { Providers } from '@tripian/model';
import GMarkerProviderVideoBase from './Base/GMarkerProviderVideoBase/GMarkerProviderVideoBase';

interface IGMarkerProviderVideo {
  providerVideo: Providers.Videreo.ResponseResult;
  animation?: 1 | 2;
  clusterer?: Clusterer;
  markerProviderVideoClicked: (tour: Providers.Videreo.ResponseResult) => void;
}

const GMarkerProviderVideo: React.FC<IGMarkerProviderVideo> = ({ providerVideo, animation, clusterer, markerProviderVideoClicked }) => (
  <GMarkerProviderVideoBase coordinate={{ lat: Number(providerVideo.lat), lng: Number(providerVideo.lng) }} animation={animation} clusterer={clusterer} markerTourClicked={() => markerProviderVideoClicked(providerVideo)} color="black" />
);

export default GMarkerProviderVideo;
