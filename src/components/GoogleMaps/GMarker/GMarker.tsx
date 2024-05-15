/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useMemo } from 'react';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import Model from '@tripian/model';
import GMarkerStepBase from './Base/GMarkerStepBase/GMarkerStepBase';
import GMarkerPoiBase from './Base/GMarkerPoiBase/GMarkerPoiBase';

interface IGMarker {
  step?: Model.Step;
  poi?: Model.Poi;
  markerStepClicked?: (step: Model.Step) => void;
  markerPoiClicked?: (poi: Model.Poi) => void;
  animation?: 1 | 2;
  clusterer?: Clusterer;
}

const GMarker: React.FC<IGMarker> = ({ step, poi, markerStepClicked, markerPoiClicked, animation, clusterer }) => {
  const callbackMarkerClicked = useCallback(() => {
    if (step && markerStepClicked) {
      markerStepClicked(step);
    } else if (poi && markerPoiClicked) {
      markerPoiClicked(poi);
    }
  }, [markerPoiClicked, markerStepClicked, poi, step]);

  const gMarker = useMemo(() => {
    if (step) return <GMarkerStepBase step={step} markerStepClicked={callbackMarkerClicked} animation={animation} clusterer={clusterer} />;
    if (poi) return <GMarkerPoiBase poi={poi} markerPoiClicked={callbackMarkerClicked} animation={animation} clusterer={clusterer} />;
    return null;
  }, [animation, callbackMarkerClicked, clusterer, poi, step]);

  return gMarker;
};

export default GMarker;
