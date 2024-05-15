/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback } from 'react';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import Model from '@tripian/model';
import GMarkerPoiBase from '../GMarkerPoiBase/GMarkerPoiBase';
import GMarkerOrder from '../GMarkerOrder/GMarkerOrder';

interface IGMarkerStepBase {
  step: Model.Step;
  markerStepClicked: (step: Model.Step) => void;
  animation?: 1 | 2;
  color?: string;
  clusterer?: Clusterer;
}

const GMarkerStepBase: React.FC<IGMarkerStepBase> = ({ step, markerStepClicked, animation, color, clusterer }) => {
  const callbackMarkerClicked = useCallback(() => {
    markerStepClicked(step);
  }, [markerStepClicked, step]);

  return (
    <>
      <GMarkerPoiBase poi={step.poi} markerPoiClicked={callbackMarkerClicked} color={color} animation={animation} clusterer={clusterer} />
      <GMarkerOrder coordinate={step.poi.coordinate} callbackMarkerClicked={callbackMarkerClicked} title={step.poi.name} order={step.order} animation={animation} />
      {/* {step.poi.offers.length > 0 && <GMarkerOffer coordinate={step.poi.coordinate} callbackMarkerClicked={callbackMarkerClicked} title={step.poi.name} offerCount={step.poi.offers.length} animation={animation} />} */}
    </>
  );
};

export default GMarkerStepBase;
