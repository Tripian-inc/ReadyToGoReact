/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import { Providers } from '@tripian/model';
import GMarkerProviderEventBase from './Base/GMarkerProviderEventBase/GMarkerProviderEventBase';

interface IGMarkerProviderEvent {
  providerEvent: Providers.Victory.Event;
  clusterer?: Clusterer;
  markerProviderEventClicked: (event: Providers.Victory.Event) => void;
}

const GMarkerProviderEvent: React.FC<IGMarkerProviderEvent> = ({ providerEvent, clusterer, markerProviderEventClicked }) => {
  const findTopParentCategory = (category: Providers.Victory.Category): string => {
    if (!category.parent) {
      return category.slug;
    }

    return findTopParentCategory(category.parent);
  };

  return (
    <GMarkerProviderEventBase
      coordinate={{
        lat: Number(providerEvent.venue.address.latitude),
        lng: Number(providerEvent.venue.address.longitude),
      }}
      clusterer={clusterer}
      category={findTopParentCategory(providerEvent.category)}
      markerEventClicked={() => markerProviderEventClicked(providerEvent)}
    />
  );
};

export default GMarkerProviderEvent;
