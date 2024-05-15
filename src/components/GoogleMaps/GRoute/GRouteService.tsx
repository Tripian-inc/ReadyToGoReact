import React, { useCallback, useMemo } from 'react';
import { DirectionsService } from '@react-google-maps/api';

interface IGRouteService {
  options: google.maps.DirectionsRequest;
  callback: (result: any, status: any, travelMode: any) => void;
}

const GRouteService: React.FC<IGRouteService> = ({ options, callback }) => {
  const callBackService = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (result) callback(result, status, options.travelMode);
    },
    [callback, options.travelMode],
  );

  const gRouteService = useMemo(() => <DirectionsService options={options} callback={callBackService} />, [options, callBackService]);

  return gRouteService;
};

export default GRouteService;
