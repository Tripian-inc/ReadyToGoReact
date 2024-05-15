import React, { useState } from 'react';

import RadioButton from './RadioButton/RadioButton';

interface IOptionsIRadioButtonGroup {
  id: number | string;
  text: string;
}

interface IRadioButtonGroup {
  options: Array<IOptionsIRadioButtonGroup>;
  defaultSelectedId?: number;
  onChange: (addedId?: number, removedId?: number) => void;
  skippable: boolean;
}

const RadioButtonGroup: React.FC<IRadioButtonGroup> = ({ options, defaultSelectedId, onChange, skippable }) => {
  const [selectedId, setSelectedId] = useState(defaultSelectedId);

  const handleSelectedChange = (checked: boolean, domId: string) => {
    if (checked) {
      onChange(+domId, selectedId);
      setSelectedId(+domId);
    } else if (skippable) {
      onChange(undefined, selectedId);
      setSelectedId(undefined);
    }
  };

  return (
    <>
      {options.map((o) => (
        <RadioButton key={o.id} domId={o.id.toString()} text={o.text} checked={selectedId === o.id} onChange={handleSelectedChange} />
      ))}
    </>
  );
};

export default RadioButtonGroup;
