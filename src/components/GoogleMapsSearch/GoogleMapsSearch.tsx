/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Model from '@tripian/model';
import './GoogleMapsSearch.scss';

interface IGoogleMapsSearch {
  zoom: number;
  bounds?: google.maps.LatLngBounds;
  center: Model.Coordinate;
  coordinate?: Model.Coordinate;
  onChange: (coordinate: Model.Coordinate) => void;
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
};

const GoogleMapsSearch: React.FC<IGoogleMapsSearch> = ({ zoom, bounds, center, coordinate, onChange }) => {
  const mapRef: React.MutableRefObject<google.maps.Map | undefined> = useRef();

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (bounds) mapRef.current?.fitBounds(bounds);
  };

  useEffect(() => {
    if (coordinate) {
      mapRef.current?.panTo(coordinate);
      mapRef.current?.setZoom(17);
    }
  }, [coordinate]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const clickedCoordinate: Model.Coordinate = { lat: event.latLng?.lat() || 0, lng: event.latLng?.lng() || 0 };
    onChange(clickedCoordinate);
  };

  return (
    <GoogleMap onClick={handleMapClick} mapContainerClassName="google-maps-search-container" options={googleMapsOptions} zoom={zoom} center={center} onLoad={onMapLoad}>
      {coordinate && <Marker position={{ lat: coordinate.lat, lng: coordinate.lng }} animation={1} />}
    </GoogleMap>
  );
};

export default GoogleMapsSearch;
