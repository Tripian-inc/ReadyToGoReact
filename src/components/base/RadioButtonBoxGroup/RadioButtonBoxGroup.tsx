import React, { useState } from 'react';
import RadioButtonBox from './RadioButtonBox/RadioButtonBox';
import classes from './RadioButtonBoxGroup.scss';

interface IOptionsIRadioButtonBoxGroup {
  id: number | string;
  text: string;
  description: string;
}

interface IRadioButtonBoxGroup {
  options: Array<IOptionsIRadioButtonBoxGroup>;
  defaultSelectedId?: number;
  onChange: (addedId?: number, removedId?: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  skippable: boolean;
}

const RadioButtonBoxGroup: React.FC<IRadioButtonBoxGroup> = ({ options, defaultSelectedId, onChange, onFocus, onBlur, skippable }) => {
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
        <div
          onKeyPress={() => {}}
          role="button"
          tabIndex={0}
          onFocus={() => {
            if (onFocus) onFocus();
          }}
          onBlur={() => {
            if (onBlur) onBlur();
          }}
          key={`${o.id}-${o.text}`}
          className={classes.radioButtonBoxGroup}
        >
          <RadioButtonBox key={o.id} domId={o.id.toString()} text={o.text} description={o.description} checked={selectedId === o.id} onChange={handleSelectedChange} />
        </div>
      ))}
    </>
  );
};

export default RadioButtonBoxGroup;
