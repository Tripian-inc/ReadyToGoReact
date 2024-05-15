import React, { useState, useRef, useEffect } from 'react';
import RSelect, { RSelectOption } from '../../base/RSelect/RSelect';

import isGoogle from '../helper';
import './GPlacesAutocomplete.scss';

interface IGPlacesAutocomplete {
  onSelectedChanged: (selectedPlace: google.maps.places.PlaceResult) => void;
  // idPrefix?: string;
  initialValue?: string;
  boundry?: google.maps.LatLngBounds;
  // country?: string;
}

const GPlacesAutocomplete: React.FC<IGPlacesAutocomplete> = ({
  onSelectedChanged,
  /* idPrefix = 'pu', */ initialValue = '',
  boundry,
  /* country = 'en', */
}) => {
  // const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  // const [selectedSuggestions, setSelectedSuggestions] = useState<google.maps.places.AutocompletePrediction>();

  // const [placesServiceStatus, setPlacesServiceStatus] = useState<google.maps.places.PlacesServiceStatus>();

  const placesService = useRef<google.maps.places.AutocompleteService>();
  const placesDetailService = useRef<google.maps.places.PlacesService>();

  /**
   * initialize
   */
  useEffect(() => {
    const initializeService = () => {
      if (!isGoogle()) {
        setTimeout(() => {
          initializeService();
        }, 1000);
        return;
      }

      placesService.current = new google.maps.places.AutocompleteService();
      placesDetailService.current = new google.maps.places.PlacesService(document.getElementById('fake-attribute-div') as HTMLDivElement);
      // setPlacesServiceStatus(google.maps.places.PlacesServiceStatus.OK);
    };
    initializeService();
  }, []);

  /**
   * click event listener
   */
  /* useEffect(() => {
    const clearSuggestions = () => {
      setSuggestions([]);
    };

    const handleDocumentClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      console.log(target.id);
      if (!target.id.includes(`${idPrefix}-google-places-autocomplete`)) clearSuggestions();
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [idPrefix]); */

  /**
   * Fetch request
   */
  useEffect(() => {
    const fetchRequest = (): google.maps.places.AutocompletionRequest => {
      const request: google.maps.places.AutocompletionRequest = {
        bounds: boundry || undefined,
        // componentRestrictions: { country: 'tr' },
        input: value,
        // location: undefined, // Both location and radius will be ignored if bounds is set
        // radius: undefined, // Both location and radius will be ignored if bounds is set
        // offset: undefined,
        // sessionToken: undefined,
        types: undefined,
      };
      return request;
    };

    const fetchCallback = (results: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
      // console.log('status', status, google.maps.places.PlacesServiceStatus.OK);
      // setPlacesServiceStatus(status);

      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        /* results.forEach((result) => {
          console.log(result.id, result.place_id, result.description);
        }); */
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    const fetch = () => {
      if (placesService.current && value.length > 0) {
        placesService.current.getPlacePredictions(fetchRequest(), fetchCallback);
      }
    };

    fetch();
  }, [boundry, value]);

  const changeValue = (newVal: string) => {
    setValue(newVal.trim());
  };

  /* const renderInput1 = () => {
    return (
      <TextField
        id={`${idPrefix}-google-places-autocomplete-input`}
        name={`${idPrefix}-google-places-autocomplete-input`}
        className="google-places-autocomplete__input"
        autocomplete="off"
        onChange={({ target }) => changeValue(target.value)}
        value={value}
      />
    );
  };

  const renderInput2 = () => {
    const options = suggestions.map((suggestion, index) => ({
      key: suggestion.place_id,
      value: `${suggestion.structured_formatting.main_text} - ${suggestion.description}`,
    }));

    return (
      <Dropdown
        options={options}
        defaultValue="Ank"
        selectChange={(option) => {
          console.log(option);
        }}
      />
    );
  }; */

  const options: RSelectOption[] = suggestions.map((suggestion) => ({
    value: suggestion.place_id,
    label: `${suggestion.structured_formatting.main_text} - ${suggestion.description}`,
  }));

  const handleOnSelectedChanged = (selectedPlace: google.maps.places.AutocompletePrediction) => {
    const req: google.maps.places.PlaceDetailsRequest = {
      placeId: selectedPlace.place_id,
      fields: ['place_id', 'name', 'formatted_address', 'geometry'],
    };
    // console.log(1);
    placesDetailService.current?.getDetails(req, (result: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
      // console.log(2);
      // eslint-disable-next-line no-console
      // console.log(status, result);

      if (status === google.maps.places.PlacesServiceStatus.OK && result) onSelectedChanged(result);
    });
  };

  return (
    <>
      <div id="fake-attribute-div" />
      <RSelect
        options={options}
        selectedOptionValue={undefined}
        onInputChange={(newVal) => {
          changeValue(newVal);
        }}
        onSelectedOptionChange={(option) => {
          const suggestion = suggestions.find((x) => x.place_id === option.value);
          if (suggestion) handleOnSelectedChanged(suggestion);
        }}
      />
    </>
  );
};

export default GPlacesAutocomplete;
