// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useMemo /* , useCallback */ } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';

const walkingLineSymbol: google.maps.Symbol = {
  path: 0, // 'M -2,-2 2,-2 2,2 -2,2 z', //window.google.maps.SymbolPath.CIRCLE,
  strokeWeight: 0,
  fillOpacity: 1,
  fillColor: '#4285f4',
};

const walkingPathLine: google.maps.PolylineOptions = {
  strokeColor: '#0eb7f6',
  strokeOpacity: 0,
  icons: [
    {
      icon: walkingLineSymbol,
      offset: '0',
      repeat: '10px',
    },
  ],
};

const cyclingPathLine: google.maps.PolylineOptions = {
  strokeColor: '#37a140', // '#fbbc05',
  strokeWeight: 4,
  strokeOpacity: 1,
};

const drivingPathLine: google.maps.PolylineOptions = {
  strokeColor: '#4285f4', // '#fbbc05',
  strokeWeight: 4,
  strokeOpacity: 1,
};

const directionsRendererDefaults: google.maps.DirectionsRendererOptions = {
  suppressMarkers: true, // Dont add markers to route,
  // preserveViewport: true, // Dont set map boundry to route
  suppressBicyclingLayer: true,
};

const directionsRendererWalking: google.maps.DirectionsRendererOptions = {
  ...directionsRendererDefaults,
  polylineOptions: walkingPathLine,
};

const directionsRendererCycling: google.maps.DirectionsRendererOptions = {
  ...directionsRendererDefaults,
  polylineOptions: cyclingPathLine,
};

const directionsRendererDriving: google.maps.DirectionsRendererOptions = {
  ...directionsRendererDefaults,
  polylineOptions: drivingPathLine,
};

interface IGRouteRender {
  directions?: { walking?: google.maps.DirectionsResult; driving?: google.maps.DirectionsResult; cycling?: google.maps.DirectionsResult };
}

const GRouteRender: React.FC<IGRouteRender> = ({ directions }) => {
  // const memoizedOnLoadRender = useCallback(() => {
  // eslint-disable-next-line no-console
  /* console.log('memoizedOnLoadRender', window.twindow.map, window.twindow.map?.getBounds());
    window.twindow.planBounds = window.twindow.map?.getBounds(); */
  /* setTimeout(() => {
      // console.log('memoizedOnLoadRender setTimeout', window.twindow.map, window.twindow.map?.getBounds());
      if (window.twindow.map) window.twindow.planBounds = window.twindow.map?.getBounds();
    }, 3000); */
  // }, []);

  const directionsRenderer = useMemo(() => {
    const rendered = [];

    if ((directions?.walking?.routes[0]?.legs?.length || 0) > 0) {
      rendered.push(<DirectionsRenderer key="walking" options={{ ...directionsRendererWalking, directions: directions?.walking }} /* onLoad={memoizedOnLoadRender} */ />);

      try {
        // eslint-disable-next-line no-console
        // console.log('directions?.walking', directions?.walking?.routes[0].bounds);
        window.twindow.planBounds = directions?.walking?.routes[0].bounds;
        // eslint-disable-next-line no-empty
      } catch {}
    }

    if ((directions?.driving?.routes[0]?.legs?.length || 0) > 0) {
      rendered.push(
        <DirectionsRenderer
          key="driving"
          options={{ ...directionsRendererDriving, directions: directions?.driving }}
          // onLoad={memoizedOnLoadRender}
        />,
      );

      try {
        // eslint-disable-next-line no-console
        // console.log('directions?.driving', directions?.driving?.routes[0].bounds);
        window.twindow.planBounds = directions?.driving?.routes[0].bounds;
        // eslint-disable-next-line no-empty
      } catch {}
    }

    if ((directions?.cycling?.routes[0]?.legs?.length || 0) > 0) {
      rendered.push(
        <DirectionsRenderer
          key="cycling"
          options={{ ...directionsRendererCycling, directions: directions?.cycling }}
          // onLoad={memoizedOnLoadRender}
        />,
      );

      try {
        // eslint-disable-next-line no-console
        // console.log('directions?.driving', directions?.driving?.routes[0].bounds);
        window.twindow.planBounds = directions?.driving?.routes[0].bounds;
        // eslint-disable-next-line no-empty
      } catch {}
    }

    return <>{rendered}</>;
  }, [directions]);

  return directionsRenderer;
};

export default GRouteRender;
