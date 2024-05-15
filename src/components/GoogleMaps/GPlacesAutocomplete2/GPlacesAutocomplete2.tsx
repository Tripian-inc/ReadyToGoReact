/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect, useState } from 'react';
import Input from '../../base/Input/Input';
import isGoogle from '../helper';
import './GPlacesAutocomplete2.scss';

interface IGPlacesAutocomplete2 {
  onSelectedChanged: (selectedPlace: google.maps.places.PlaceResult) => void;
  initialText?: string;
  boundry?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const GPlacesAutocomplete2: React.FC<IGPlacesAutocomplete2> = ({ onSelectedChanged, initialText, boundry, placeholder, disabled, onFocus, onBlur }) => {
  const [text, setText] = useState(initialText);
  const [initialized, setInitialized] = useState(false);
  const placesAutocomplete = useRef<google.maps.places.Autocomplete>();

  /**
   * initialize
   */
  useEffect(() => {
    const init = () => {
      if (!isGoogle()) {
        setTimeout(() => {
          init();
        }, 500);
        return;
      }

      const autocompleteOptions: google.maps.places.AutocompleteOptions = {
        strictBounds: true,
      };

      placesAutocomplete.current = new google.maps.places.Autocomplete(document.getElementById('google-autocompelete') as HTMLInputElement, autocompleteOptions);

      // console.log('setTimeout set 1');
      setTimeout(() => {
        // if (!unmounted) {
        const pacContainerParent = document.getElementById('pac-container-parent');
        const pacContainer = document.getElementsByClassName('pac-container')[0];
        if (pacContainer) pacContainerParent?.appendChild(pacContainer);
        // console.log('setTimeout set 2');
        // }
      }, 1000);

      setInitialized(true);
    };

    init();

    // console.log('useEffect init');
    return () => {
      const pacContainers = document.getElementsByClassName('pac-container');
      for (let i = 0; i < pacContainers.length; i += 1) {
        const pacContainer = pacContainers[i];
        pacContainer.remove();
      }
    };
  }, []);

  /**
   * Listener
   */
  useEffect(() => {
    const placeChangeListener = placesAutocomplete.current?.addListener('place_changed', () => {
      const place = placesAutocomplete.current?.getPlace();
      if (place) {
        setText(`${place.name} ${place.formatted_address}`);
        onSelectedChanged(place);
      }
    });

    return () => {
      if (placeChangeListener) {
        google.maps.event.removeListener(placeChangeListener);
      }
    };
  }, [onSelectedChanged]);

  /**
   * setBounds
   */
  useEffect(() => {
    // console.log(boundry);
    if (placesAutocomplete.current && boundry) {
      placesAutocomplete.current.setBounds(boundry);
    }
    // console.log('initialized, boundry');

    // console.log('setBounds');
  }, [initialized, boundry]);

  useEffect(() => {
    // console.log('useEffect initialText');
    setText(initialText);
  }, [initialText]);

  return (
    <>
      <Input
        id="google-autocompelete"
        name="google-autocompelete"
        placeholder={placeholder}
        value={text || ''}
        onChange={(newText) => {
          if (!newText.target.value) {
            onSelectedChanged({ name: '' });
          }
          // console.log(newText.target.value);
          setText(newText.target.value);
        }}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div id="pac-container-parent" />
    </>
  );
};

export default GPlacesAutocomplete2;
