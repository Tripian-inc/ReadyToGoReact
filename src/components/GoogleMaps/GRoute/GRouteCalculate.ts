/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/brace-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { helper } from '@tripian/model';
import { ILeg, IMergedDirections } from './IRouteResult';

const WALKING_DISTANCE_MAX = 2100;

const getLeg = (dleg: google.maps.DirectionsLeg, travelText: 'Driving' | 'Walking' | 'Bicycling'): ILeg => {
  let travelMode = google.maps.TravelMode.BICYCLING;
  if (travelText === 'Driving') travelMode = google.maps.TravelMode.DRIVING;
  else if (travelText === 'Walking') travelMode = google.maps.TravelMode.WALKING;

  const leg: ILeg = {
    distance: dleg.distance || { text: '', value: 0 },
    duration: dleg.duration || { text: '', value: 0 },
    travel: {
      text: travelText,
      value: travelMode,
      between: {
        pickup: {
          coordinate: { lat: dleg.start_location.lat(), lng: dleg.start_location.lng() },
          formatted_address: dleg.start_address,
          nickname: dleg.start_address,
        },
        dropoff: {
          coordinate: { lat: dleg.end_location.lat(), lng: dleg.end_location.lng() },
          formatted_address: dleg.end_address,
          nickname: dleg.end_address,
        },
      },
    },
  };

  return leg;
};
const getAllLeg = (dlegs: google.maps.DirectionsLeg[], travelText: 'Driving' | 'Walking' | 'Bicycling'): ILeg[] => dlegs.map((x) => getLeg(x, travelText));

const mergeDirections = (directionsWalking?: google.maps.DirectionsResult, directionsDriving?: google.maps.DirectionsResult, directionsCycling?: google.maps.DirectionsResult): IMergedDirections | undefined => {
  // console.debug('mergeDirections', directionsWalking, directionsDriving, directionsCycling);
  const result: IMergedDirections = { legs: [] };

  // (i) Cycling
  if (directionsCycling && directionsCycling.routes.length > 0) {
    result.cycling = helper.deepCopy(directionsCycling);
    result.legs = getAllLeg(directionsCycling.routes[0].legs, 'Bicycling');
    console.debug('mergeDirections-i', result);
    return result;
  }

  // (ii) Walking (no driving)
  if (directionsDriving === undefined && directionsWalking !== undefined && directionsWalking.routes.length > 0) {
    result.walking = helper.deepCopy(directionsWalking);
    result.legs = getAllLeg(directionsWalking.routes[0].legs, 'Walking');
    console.debug('mergeDirections-ii', result);
    return result;
  }

  // (iii) Driving (no walking)
  if (directionsWalking === undefined && directionsDriving !== undefined && directionsDriving.routes.length > 0) {
    result.driving = helper.deepCopy(directionsDriving);
    result.legs = getAllLeg(directionsDriving.routes[0].legs, 'Driving');
    console.debug('mergeDirections-iii', result);
    return result;
  }

  // (iv) No directions
  if (directionsWalking === undefined || directionsWalking.routes.length === 0 || directionsDriving === undefined || directionsDriving.routes.length === 0 || directionsWalking.routes[0].legs.length !== directionsDriving.routes[0].legs.length) {
    console.debug('mergeDirections-iv', undefined);
    return undefined;
  }

  // (v) Merge Walking-Driving
  result.walking = helper.deepCopy(directionsWalking);
  result.walking.routes[0].legs = [];
  result.driving = helper.deepCopy(directionsDriving);
  result.driving.routes[0].legs = [];

  directionsWalking.routes[0].legs.forEach((wleg: google.maps.DirectionsLeg, index: number) => {
    if (wleg.distance !== undefined && result.driving !== undefined) {
      // get walking
      if (wleg.distance.value < WALKING_DISTANCE_MAX && result.walking) {
        result.walking.routes[0].legs.push(wleg);
        const leg: ILeg = getLeg(wleg, 'Walking');
        result.legs.push(leg);
      }
      // get driving
      else {
        // extra control for diffirent size legs walking and driving (i)
        const dleg: google.maps.DirectionsLeg = directionsDriving.routes[0].legs[index];
        result.driving.routes[0].legs.push(dleg);
        const leg: ILeg = getLeg(dleg, 'Driving');
        result.legs.push(leg);
      }
    }
  });

  console.debug('mergeDirections-v', result);
  return result;
};

export default mergeDirections;
