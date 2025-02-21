/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useRef } from 'react';
import { GoogleMap, InfoBox, MarkerClusterer } from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer';
import Model, { Providers } from '@tripian/model';
// import LoadScriptOnlyIfNeeded from './LoadScriptOnlyIfNeeded/LoadScriptOnlyIfNeeded';
// import IgmapState from '../../redux/model/IgmapState';

import './GoogleMaps.css';
import GMarker from './GMarker/GMarker';
import GRoute from './GRoute/GRoute';
import { ILeg } from './GRoute/IRouteResult';
import GMarkerProvider from './GMarker/GMarkerProvider';
import GMarkerCarRentOffer from './GMarker/GMarkerCarRentOffer';
import GMarkerProviderTour from './GMarker/GMarkerProviderTour';
import GMarkerProviderVideo from './GMarker/GMarkerProviderVideo';
import GMarkerProviderEvent from './GMarker/GMarkerProviderEvent';
import VictoryProductMapCard from '../../providers/victory/VictoryProductMapCard/VictoryProductMapCard';

// const markerClustererIconsImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
// const markerClustererIconsImagePath = 'https://s3-eu-west-1.amazonaws.com/poi-pics/Icon/markerclusterer/wm';
const markerClustererIconsImagePath = 'https://s3-eu-west-1.amazonaws.com/poi-pics/Icon/markerclusterer/bm';

interface Itwindow {
  map?: google.maps.Map;
  planBounds?: google.maps.LatLngBounds | null;
  cityBounds?: google.maps.LatLngBounds | null;
  meMarker?: google.maps.Marker;
  config?: any;
  langCode?: string;
}
declare global {
  interface Window {
    twindow: Itwindow;
  }
}
window.twindow = window.twindow || {};

interface IGoogleMaps {
  onCenterChanged: () => void;
  onZoomChanged: () => void;

  steps: Model.Step[];
  alternativePois: Model.Poi[];
  searchPoi?: Model.Poi;
  searchAreaPois?: Model.Poi[];
  providersPois?: Providers.Bb.SearchAccommodationHotelOffer[];
  carRentOffers?: Providers.Bb.SearchCarRentOffer[];
  providerTours?: Providers.Rezdy.Product[];
  providerVideos?: Providers.Videreo.ResponseResult[];
  providerEvents?: Providers.Victory.Event[];
  cityBounds: google.maps.LatLngBoundsLiteral;

  setLegs: (legs: ILeg[]) => void;

  focusMarkerStepOrPoiId?: number | string;
  focusMarkerProviderPoiCode?: string;
  focusMarkerCarRentLocationCode?: string;
  focusMarkerProviderTourLocationCode?: {
    lat: number;
    long: number;
  };
  focusMarkerProviderVideoLocationCode?: {
    lat: number;
    long: number;
  };
  focusMarkerProviderEvent?: Providers.Victory.Event;
  mapClicked: (e: any) => void;
  markerStepClicked: (step: Model.Step) => void;
  markerAlternativeClicked: (poi: Model.Poi) => void; // , stepIndex: number) => void;
  markerSearchThisAreaClicked: (poi: Model.Poi) => void;
  markerProvidersPoiClicked: (poi: Providers.Bb.SearchAccommodationHotelOffer) => void;
  markerCarRentOfferClicked: (offer: Providers.Bb.SearchCarRentOffer) => void;
  markerProviderTourClicked: (tour: Providers.Rezdy.Product) => void;
  markerProviderVideoClicked: (video: Providers.Videreo.ResponseResult) => void;
  markerProviderEventClicked: (video: Providers.Victory.Event) => void;
  eventCardClicked: (eventid: number) => void;
  hideRoutes?: boolean;
  cycling?: boolean;
}

const googleMapsOptions: google.maps.MapOptions = {
  mapTypeControl: false,
  zoomControl: true,
  zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_CENTER,
  },
  clickableIcons: false,
  fullscreenControl: false,
  streetViewControl: false,
  /* streetViewControlOptions: { position: 3 }, */
};

const GoogleMaps: React.FC<IGoogleMaps> = ({
  onCenterChanged,
  onZoomChanged,
  steps,
  alternativePois,
  searchPoi,
  searchAreaPois,
  providersPois,
  carRentOffers,
  providerTours,
  providerVideos,
  providerEvents,
  cityBounds,
  setLegs,
  focusMarkerStepOrPoiId,
  focusMarkerProviderPoiCode,
  focusMarkerCarRentLocationCode,
  focusMarkerProviderTourLocationCode,
  focusMarkerProviderVideoLocationCode,
  focusMarkerProviderEvent,
  mapClicked,
  markerStepClicked,
  markerAlternativeClicked,
  markerSearchThisAreaClicked,
  markerProvidersPoiClicked,
  markerCarRentOfferClicked,
  markerProviderTourClicked,
  markerProviderVideoClicked,
  markerProviderEventClicked,
  eventCardClicked,
  hideRoutes = false,
  cycling = false,
}) => {
  const googleMaps: any = useRef();
  window.twindow.cityBounds = new google.maps.LatLngBounds({ lat: cityBounds.south, lng: cityBounds.west }, { lat: cityBounds.north, lng: cityBounds.east });

  const onMapLoad = (map: any) => {
    googleMaps.current = map;
    window.twindow.map = map;
    if (window.twindow.cityBounds) window.twindow.map?.fitBounds(window.twindow.cityBounds);
  };

  const onClick = (...args: any) => {
    // eslint-disable-next-line no-console
    // console.log({ lat: args[0].latLng.lat(), lng: args[0].latLng.lng() });
    mapClicked(args[0]);
  };

  const GRouteMemo = useMemo(() => {
    /* if (steps.length <= 1) {
      setLegs([]);
      return null;
    } */

    const poIdOrderRef = steps.reduce((previousValue: string, currentValue: Model.Step) => `${previousValue},${currentValue.poi.id || currentValue.poi.name}`, 'poIdOrderRef');

    const coordinates = steps.map((s) => s.poi.coordinate);

    return <GRoute coordinates={coordinates} poIdOrderRef={poIdOrderRef} setLegs={setLegs} cycling={cycling} />;
  }, [setLegs, steps, cycling]);

  // const focusedStep = steps.find((s) => s.id === focusMarkerStepOrPoiId);
  // return (
  //   <>
  //     {steps
  //       .filter((s) => s.id !== focusMarkerStepOrPoiId)
  //       .map((step, index) => (
  //         // eslint-disable-next-line react/no-array-index-key
  //         <GMarker key={`${step.id}-${index}`} step={step} markerStepClicked={markerStepClicked} />
  //       ))}
  //     {focusedStep ? <GMarker key={focusedStep.id} step={focusedStep} markerStepClicked={markerStepClicked} animation={1} /> : null}
  //   </>
  // );
  const stepMarkers = useMemo(
    () => (
      <>
        {steps.map((step, index) => (
          <GMarker
            // eslint-disable-next-line react/no-array-index-key
            key={`${step.id}-${index}`}
            step={step}
            markerStepClicked={markerStepClicked}
            animation={step.id === focusMarkerStepOrPoiId ? 1 : 2}
          />
        ))}
      </>
    ),
    [steps, markerStepClicked, focusMarkerStepOrPoiId],
  );

  return (
    <div className="tripian-map-container">
      {/* https://react-google-maps-api-docs.netlify.com/#googlemap, https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions */}
      <GoogleMap id="tripian-map" options={googleMapsOptions} onCenterChanged={onCenterChanged} onZoomChanged={onZoomChanged} onClick={onClick} onLoad={onMapLoad}>
        {stepMarkers}

        {!hideRoutes && GRouteMemo}

        {alternativePois.map((alternativePoi) => (
          <GMarker key={`alternative_marker_${alternativePoi.id}`} poi={alternativePoi} markerPoiClicked={markerAlternativeClicked} animation={focusMarkerStepOrPoiId?.toString() === alternativePoi.id ? 1 : 2} />
        ))}

        {searchPoi && alternativePois.findIndex((alternativePoi) => alternativePoi.id === searchPoi.id) === -1 ? <GMarker key={`search_poi_marker_${searchPoi.id}`} poi={searchPoi} animation={1} /> : 2}

        {searchAreaPois ? (
          <MarkerClusterer options={{ imagePath: markerClustererIconsImagePath }}>
            {(clusterer: Clusterer) => (
              <>
                {searchAreaPois.map((searchAreaPoi: Model.Poi) => (
                  <GMarker key={`marker_cluster_${searchAreaPoi.id}`} poi={searchAreaPoi} clusterer={clusterer} markerPoiClicked={markerSearchThisAreaClicked} />
                ))}
              </>
            )}
          </MarkerClusterer>
        ) : null}

        {providersPois &&
          providersPois.map((providersPoi) => (
            <GMarkerProvider key={`provider_poi_marker_${providersPoi.info.hotelCode}`} providersPoi={providersPoi} animation={focusMarkerProviderPoiCode === providersPoi.info.hotelCode ? 1 : 2} markerPoiClicked={markerProvidersPoiClicked} />
          ))}

        {carRentOffers &&
          carRentOffers.map((carRentOffer: Providers.Bb.SearchCarRentOffer) => (
            <GMarkerCarRentOffer
              key={`car_rent_offer_${carRentOffer.supplierCode}-${carRentOffer.locationCode}`}
              animation={focusMarkerCarRentLocationCode === carRentOffer.locationCode ? 1 : 2}
              markerCarRentOfferClicked={markerCarRentOfferClicked}
              carRentOffer={carRentOffer}
            />
          ))}

        {providerTours &&
          providerTours.map((providerTour: Providers.Rezdy.Product, i: number) => (
            <GMarkerProviderTour
              // eslint-disable-next-line react/no-array-index-key
              key={`tour_${i}_${providerTour.latitude}-${providerTour.longitude}`}
              animation={focusMarkerProviderTourLocationCode?.lat === providerTour.latitude && focusMarkerProviderTourLocationCode.long === providerTour.longitude ? 1 : 2}
              markerProviderTourClicked={markerProviderTourClicked}
              providerTour={providerTour}
            />
          ))}

        {providerVideos &&
          providerVideos.map((providerVideo: Providers.Videreo.ResponseResult, i: number) => (
            <GMarkerProviderVideo
              // eslint-disable-next-line react/no-array-index-key
              key={`tour_${i}_${providerVideo.lat}-${providerVideo.lng}`}
              animation={focusMarkerProviderVideoLocationCode?.lat === providerVideo.lat && focusMarkerProviderVideoLocationCode.long === providerVideo.lng ? 1 : 2}
              markerProviderVideoClicked={markerProviderVideoClicked}
              providerVideo={providerVideo}
            />
          ))}

        {providerEvents && providerEvents.map((providerEvent: Providers.Victory.Event) => <GMarkerProviderEvent key={`event_${providerEvent.id}`} markerProviderEventClicked={markerProviderEventClicked} providerEvent={providerEvent} />)}
        {focusMarkerProviderEvent && (
          <InfoBox
            options={{
              closeBoxURL: '',
              enableEventPropagation: true,
              pixelOffset: new google.maps.Size(-120, -18),
            }}
            position={new google.maps.LatLng(Number(focusMarkerProviderEvent.venue.address.latitude), Number(focusMarkerProviderEvent.venue.address.longitude))}
          >
            <VictoryProductMapCard event={focusMarkerProviderEvent} bodyClicked={(event) => eventCardClicked(event.id)} />
          </InfoBox>
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;
