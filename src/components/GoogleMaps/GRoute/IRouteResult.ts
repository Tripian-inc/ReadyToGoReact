// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';

export interface IBetweenPoint {
  coordinate: Model.Coordinate;
  nickname: string;
  formatted_address: string;
}

export interface ILeg {
  distance: google.maps.Distance;
  duration: google.maps.Duration;
  travel: {
    text: string;
    value: google.maps.TravelMode;
    between?: {
      pickup: IBetweenPoint;
      dropoff: IBetweenPoint;
    };
  };
}

export interface IMergedDirections {
  walking?: google.maps.DirectionsResult;
  driving?: google.maps.DirectionsResult;
  cycling?: google.maps.DirectionsResult;
  legs: ILeg[];
}
