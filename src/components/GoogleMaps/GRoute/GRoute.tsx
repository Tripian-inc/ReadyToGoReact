/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Model from '@tripian/model';
import GRouteService from './GRouteService';
import GRouteRender from './GRouteRender';
import mergeDirections from './GRouteCalculate';
import { IMergedDirections, ILeg } from './IRouteResult';

interface IGRoute {
  coordinates: Array<Model.Coordinate>;
  setLegs: (legs: ILeg[]) => void;
  poIdOrderRef: string;
  cycling: boolean;
}

const GRoute: React.FC<IGRoute> = ({ coordinates, setLegs, poIdOrderRef, cycling }) => {
  const [mergedDirections, setMergedDirections] = useState<IMergedDirections>();
  const [routeResponseWalking, setRouteResponseWalking] = useState<{ renderResponse?: google.maps.DirectionsResult }>({ renderResponse: undefined });
  const [routeResponseCycling, setRouteResponseCycling] = useState<{ renderResponse?: google.maps.DirectionsResult }>({ renderResponse: undefined });
  const [routeResponseDriving, setRouteResponseDriving] = useState<{ renderResponse?: google.maps.DirectionsResult }>({ renderResponse: undefined });

  useEffect(() => {
    setRouteResponseWalking({ renderResponse: undefined });
    setRouteResponseCycling({ renderResponse: undefined });
    setRouteResponseDriving({ renderResponse: undefined });
    setMergedDirections(undefined);
  }, [poIdOrderRef]);

  useEffect(() => {
    const newMergedDirections = mergeDirections(routeResponseWalking.renderResponse, routeResponseDriving.renderResponse, routeResponseCycling.renderResponse);

    setMergedDirections(newMergedDirections);
  }, [routeResponseDriving.renderResponse, routeResponseWalking.renderResponse, routeResponseCycling.renderResponse]);

  useEffect(() => {
    if (mergedDirections) setLegs(mergedDirections.legs);
  }, [setLegs, mergedDirections]);

  useEffect(() => {
    if (coordinates.length < 2 || poIdOrderRef === ',0,0') {
      setLegs([]);
    }
  }, [coordinates.length, poIdOrderRef, setLegs]);

  const optionDriving: google.maps.DirectionsRequest = useMemo(
    () => ({
      travelMode: google.maps.TravelMode.DRIVING,
      origin: coordinates[0],
      destination: coordinates[coordinates.length - 1],
      waypoints: coordinates.slice(1, coordinates.length - 1).map((c) => ({ location: new google.maps.LatLng(c.lat, c.lng) })),
      unitSystem: google.maps.UnitSystem.METRIC,
    }),
    [coordinates],
  );

  const optionCycling: google.maps.DirectionsRequest = useMemo(
    () => ({
      travelMode: google.maps.TravelMode.BICYCLING,
      origin: coordinates[0],
      destination: coordinates[coordinates.length - 1],
      waypoints: coordinates.slice(1, coordinates.length - 1).map((c) => ({ location: new google.maps.LatLng(c.lat, c.lng) })),
      unitSystem: google.maps.UnitSystem.METRIC,
    }),
    [coordinates],
  );

  const optionWalking: google.maps.DirectionsRequest = useMemo(
    () => ({
      travelMode: google.maps.TravelMode.WALKING,
      origin: coordinates[0],
      destination: coordinates[coordinates.length - 1],
      waypoints: coordinates.slice(1, coordinates.length - 1).map((c) => ({ location: new google.maps.LatLng(c.lat, c.lng) })),
      unitSystem: google.maps.UnitSystem.METRIC,
    }),
    [coordinates],
  );

  const callbackGRouteResponse = useCallback((result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus, travelMode: google.maps.TravelMode) => {
    // eslint-disable-next-line no-console
    // check for request google roure direction callback
    // console.log('callback gRoute', travelMode, status);
    if (status === 'OK') {
      if (travelMode === google.maps.TravelMode.DRIVING) {
        setRouteResponseDriving({ renderResponse: result });
      } else if (travelMode === google.maps.TravelMode.WALKING) {
        setRouteResponseWalking({ renderResponse: result });
      } else if (travelMode === google.maps.TravelMode.BICYCLING) {
        setRouteResponseCycling({ renderResponse: result });
      }
    }
  }, []);

  const gRoute = useMemo(
    () => (
      <>
        {mergedDirections ? null : (
          <>
            <GRouteService options={optionDriving} callback={callbackGRouteResponse} />
            {cycling && <GRouteService options={optionCycling} callback={callbackGRouteResponse} />}
            <GRouteService options={optionWalking} callback={callbackGRouteResponse} />
          </>
        )}
        <GRouteRender directions={mergedDirections} />
      </>
    ),
    [callbackGRouteResponse, cycling, mergedDirections, optionDriving, optionCycling, optionWalking],
  );

  if (coordinates.length < 2 || poIdOrderRef === ',0,0') {
    return null;
  }

  return gRoute;
};

export default GRoute;
