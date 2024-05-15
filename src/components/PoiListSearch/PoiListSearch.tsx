import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import PoiListCard from '../PoiListCard/PoiListCard';
import TextField from '../base/TextField/TextField';

interface IPoiListSearch {
  pois: Model.Poi[];
  poiSearch: Function;
  // poiSearch: (name?: string) => void;
}

const PoiListSearch: React.FC<IPoiListSearch> = ({ poiSearch, pois }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      if (input.length > 2) {
        poiSearch(input);
      }
    }
    return () => {
      didCancel = true;
    };
  }, [input, poiSearch]);

  const changed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const componentsN = pois.map((p) => {
    if (p.status) {
      return (
        <div key={p.id}>
          <PoiListCard poi={p} />
        </div>
      );
    }
    return null;
  });

  return (
    <div>
      <TextField
        onChange={changed}
        name="poiListSearch"
        placeholder="Search with Keywords"
        value={input}
        size="large"
        style={{
          width: '100%',
        }}
      />
      <span>{pois.filter((p) => p.status === true).length} result found.</span>
      <br />
      <br />
      {pois.filter((p) => p.status === true).length === 0 ? <span>Not Found.</span> : componentsN}
    </div>
  );
};

export default PoiListSearch;
